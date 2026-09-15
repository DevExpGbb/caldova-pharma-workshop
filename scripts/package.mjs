import {
  copyFileSync, lstatSync, mkdirSync, readFileSync, readdirSync,
  realpathSync, rmSync, writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const skillNames = ['intake', 'plan-to-spec', 'code-review'];
export const packageName = 'caldova-workshop-skills';
export const stableVersion = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const template = readFileSync(new URL('../agent-package/apm.yml.example', import.meta.url), 'utf8').replaceAll('\r\n', '\n');
// Exact APM 0.31.0 lock contract for the single pinned development input.
const developmentLock = `lockfile_version: '1'
apm_version: 0.31.0
dependencies:
- repo_url: devexpgbb/zava-agent-config
  name: secure-baseline
  host: github.com
  resolved_commit: 931cfb58663154415f8a13e14680f548114d4555
  resolved_ref: 931cfb58663154415f8a13e14680f548114d4555
  version: 6.2.0
  virtual_path: plugins/secure-baseline
  is_virtual: true
  package_type: apm_package
  content_hash: sha256:e82eba0cc254ca707293b8241f1450956ba859c083e0b1c6c7149e8859ac97aa
  is_dev: true
  declared_license: MIT
deployments: []
`;

export function validateLock(text, { packed = false } = {}) {
  let normalized = text.replaceAll('\r\n', '\n');
  if (packed) {
    const header = normalized.match(/^pack:\n(?: {2,}[^\n]*\n)+/)?.[0];
    if (!header || !/^  format: agent-plugin$/m.test(header)) {
      throw new Error('Embedded development lock must record the agent-plugin format.');
    }
    normalized = normalized.slice(header.length);
  }
  if (normalized !== developmentLock) {
    throw new Error('Unexpected development lock. Use APM 0.31.0 and the exact pinned dev dependency; regenerate with ordinary apm lock. Do not edit or discard provenance.');
  }
}

export function readVersion(manifest) {
  const normalized = manifest.replaceAll('\r\n', '\n');
  const version = normalized.match(/^version: "([^"]+)"$/m)?.[1];
  if (!version || !stableVersion.test(version)) {
    throw new Error('Use a quoted stable SemVer version, for example version: "0.1.0".');
  }
  // This workshop accepts its small fixed manifest, not arbitrary YAML.
  if (normalized !== template.replace('version: "0.1.0"', `version: "${version}"`)) {
    throw new Error('Use agent-package/apm.yml.example unchanged except its version. Extend the staging and archive allowlists deliberately before adding resources.');
  }
  return version;
}

export function validateSkill(text, name) {
  const normalized = text.replaceAll('\r\n', '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]+)$/);
  if (!match) throw new Error(`${name}: expected YAML frontmatter and an authored body.`);
  const fields = match[1];
  const declaredName = fields.match(/^name:\s*['"]?([a-z0-9-]+)['"]?\s*$/m)?.[1];
  if (declaredName !== name) throw new Error(`${name}: frontmatter name must match its directory.`);
  const description = fields.match(/^description:\s*(.*(?:\n[ \t]+.*)*)/m)?.[1]?.trim();
  const descriptionText = description?.replace(/^[>|][-+]?\s*/, '')
    .replace(/^(['"])([\s\S]*)\1$/, '$2').replaceAll(/\s+/g, ' ').trim();
  if (!descriptionText || descriptionText.length > 1024) {
    throw new Error(`${name}: description must contain 1-1024 characters.`);
  }
  const body = match[2].trim();
  if (!body || /^(?:TODO|Write your instructions here\.?)$/i.test(body)) {
    throw new Error(`${name}: replace the placeholder with your own procedure.`);
  }
  if (body.split('\n').length > 500 || body.length > 20000) {
    throw new Error(`${name}: keep the body below 500 lines and 20,000 characters; review the 5,000-token guidance too.`);
  }
}

function requireRegularFile(root, relative) {
  let current = root;
  for (const component of relative.split('/')) {
    current = path.join(current, component);
    const entry = lstatSync(current, { throwIfNoEntry: false });
    if (!entry || entry.isSymbolicLink()) {
      throw new Error(`Missing or symlinked input: ${relative}. Author the three skills before packaging.`);
    }
  }
  if (!lstatSync(current).isFile()) throw new Error(`Expected a regular file: ${relative}`);
  return current;
}

function safeScratch(root) {
  const scratch = path.join(root, '.workshop');
  const entry = lstatSync(scratch, { throwIfNoEntry: false });
  if (entry && (entry.isSymbolicLink() || !entry.isDirectory())) {
    throw new Error('.workshop must be a real local scratch directory, not a symlink.');
  }
  mkdirSync(scratch, { recursive: true });
  return scratch;
}

export function stagePackage(root = process.cwd(), releaseTag) {
  root = realpathSync(root);
  const inputs = skillNames.map((name) => {
    const relative = `.github/skills/${name}/SKILL.md`;
    const file = requireRegularFile(root, relative);
    if (readdirSync(path.dirname(file)).some((entry) => entry !== 'SKILL.md')) {
      throw new Error(`${name}: additional resources found. Extend the explicit source and output allowlists before packaging; nothing is silently dropped.`);
    }
    const content = readFileSync(file, 'utf8');
    validateSkill(content, name);
    return { name, file, content };
  });
  const manifestFile = requireRegularFile(root, 'agent-package/apm.yml');
  const manifest = readFileSync(manifestFile, 'utf8');
  const version = readVersion(manifest);
  if (releaseTag !== undefined && releaseTag !== `v${version}`) {
    throw new Error(`Tag ${releaseTag} does not match package version v${version}.`);
  }
  const lockPath = path.join(root, 'agent-package/apm.lock.yaml');
  const lockEntry = lstatSync(lockPath, { throwIfNoEntry: false });
  if (releaseTag !== undefined && !lockEntry) {
    throw new Error('Release requires committed agent-package/apm.lock.yaml. Run apm lock in staging and remember-lock first.');
  }
  if (lockEntry) {
    requireRegularFile(root, 'agent-package/apm.lock.yaml');
    validateLock(readFileSync(lockPath, 'utf8'));
  }
  const scratch = safeScratch(root);
  const stage = path.join(scratch, 'package');
  if (lstatSync(stage, { throwIfNoEntry: false })?.isSymbolicLink()) throw new Error('Refusing symlinked package staging directory.');
  // Only this fixed generated directory is replaced; source skills are never edited.
  rmSync(stage, { recursive: true, force: true });
  mkdirSync(stage);
  writeFileSync(path.join(stage, 'apm.yml'), manifest);
  for (const { name, content } of inputs) {
    const directory = path.join(stage, '.apm', 'skills', name);
    mkdirSync(directory, { recursive: true });
    writeFileSync(path.join(directory, 'SKILL.md'), content);
  }
  if (lockEntry) copyFileSync(lockPath, path.join(stage, 'apm.lock.yaml'));
  return { name: packageName, version, stage, skills: skillNames };
}

export function rememberLock(root = process.cwd()) {
  root = realpathSync(root);
  const stagedManifest = requireRegularFile(root, '.workshop/package/apm.yml');
  const sourceManifest = requireRegularFile(root, 'agent-package/apm.yml');
  if (readFileSync(stagedManifest, 'utf8') !== readFileSync(sourceManifest, 'utf8')) {
    throw new Error('Source manifest changed since staging. Stage again, then run apm lock.');
  }
  for (const name of skillNames) {
    const source = requireRegularFile(root, `.github/skills/${name}/SKILL.md`);
    const staged = requireRegularFile(root, `.workshop/package/.apm/skills/${name}/SKILL.md`);
    if (!readFileSync(source).equals(readFileSync(staged))) {
      throw new Error(`${name} changed since staging. Stage again, then run apm lock.`);
    }
  }
  const lock = requireRegularFile(root, '.workshop/package/apm.lock.yaml');
  validateLock(readFileSync(lock, 'utf8'));
  const destination = path.join(root, 'agent-package/apm.lock.yaml');
  if (lstatSync(destination, { throwIfNoEntry: false })) requireRegularFile(root, 'agent-package/apm.lock.yaml');
  copyFileSync(lock, destination);
  return { lockfile: destination };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [command, tag, ...extra] = process.argv.slice(2);
    if (extra.length) throw new Error('Too many arguments. Use --help.');
    if (command === '--help') {
      console.log('node scripts/package.mjs stage [vMAJOR.MINOR.PATCH]\nnode scripts/package.mjs remember-lock\nStages only authored skills; never installs or releases anything. JSON on stdout; errors on stderr.');
    } else if (command === 'stage') {
      console.log(JSON.stringify(stagePackage(process.cwd(), tag), null, 2));
      console.error('Next: cd .workshop/package, run apm lock, then cd ../.. and node scripts/package.mjs remember-lock.');
    } else if (command === 'remember-lock' && tag === undefined) {
      console.log(JSON.stringify(rememberLock(), null, 2));
    } else {
      throw new Error('Expected stage or remember-lock. Use --help.');
    }
  } catch (error) {
    console.error(`Packaging stopped: ${error.message}`);
    process.exitCode = 1;
  }
}
