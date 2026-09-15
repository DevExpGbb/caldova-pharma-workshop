import test from 'node:test';
import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { stagePackage, rememberLock, readVersion, skillNames, validateSkill } from '../scripts/package.mjs';
import { verifyEntries } from '../scripts/verify-package.mjs';

const manifest = readFileSync(new URL('../agent-package/apm.yml.example', import.meta.url), 'utf8');
const sampleSkill = (name) => `---\nname: ${name}\ndescription: Use this test fixture only for structural package validation.\n---\nReport a structural test result without external actions.\n`;
const sourceLock = `lockfile_version: '1'
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

function sourceFixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'caldova-package-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(path.join(root, 'agent-package'));
  writeFileSync(path.join(root, 'agent-package/apm.yml'), manifest);
  for (const name of skillNames) {
    const folder = path.join(root, '.github/skills', name);
    mkdirSync(folder, { recursive: true });
    writeFileSync(path.join(folder, 'SKILL.md'), sampleSkill(name));
  }
  return root;
}

function entries() {
  const root = 'caldova-workshop-skills-0.1.0';
  return [
    { name: `${root}/plugin.json`, text: JSON.stringify({ $schema: 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json', name: 'caldova-workshop-skills', version: '0.1.0' }) },
    { name: `${root}/mcp.json`, text: JSON.stringify({ $schema: 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json', mcpServers: {} }) },
    { name: `${root}/apm.lock.yaml`, text: `pack:\n  format: agent-plugin\n${sourceLock}` },
    ...skillNames.map((name) => ({ name: `${root}/skills/${name}/SKILL.md`, text: sampleSkill(name) })),
  ];
}

test('staging fails rather than installing missing learner skills', (t) => {
  const root = sourceFixture(t);
  rmSync(path.join(root, '.github/skills/intake/SKILL.md'));
  assert.throws(() => stagePackage(root), /Author the three skills/);
});

test('staging copies precisely the three authored entrypoints', (t) => {
  const root = sourceFixture(t);
  const result = stagePackage(root);
  assert.deepEqual(result.skills, skillNames);
  for (const name of skillNames) {
    assert.equal(readFileSync(path.join(result.stage, `.apm/skills/${name}/SKILL.md`), 'utf8'), sampleSkill(name));
  }
});

test('release staging checks version and requires a persisted lock', (t) => {
  const root = sourceFixture(t);
  assert.throws(() => stagePackage(root, 'v0.2.0'), /does not match/);
  assert.throws(() => stagePackage(root, 'v0.1.0'), /requires committed/);
});

test('remember-lock rejects source edits after staging', (t) => {
  const root = sourceFixture(t);
  const { stage } = stagePackage(root);
  writeFileSync(path.join(stage, 'apm.lock.yaml'), sourceLock);
  writeFileSync(path.join(root, '.github/skills/intake/SKILL.md'), `${sampleSkill('intake')}\nNew instruction.\n`);
  assert.throws(() => rememberLock(root), /changed since staging/);
});

test('remember-lock persists a structural fixture without changing sources', (t) => {
  const root = sourceFixture(t);
  const { stage } = stagePackage(root);
  const lock = sourceLock;
  writeFileSync(path.join(stage, 'apm.lock.yaml'), lock);
  const { lockfile } = rememberLock(root);
  assert.equal(readFileSync(lockfile, 'utf8'), lock);
  assert.equal(readFileSync(path.join(root, '.github/skills/intake/SKILL.md'), 'utf8'), sampleSkill('intake'));
});

test('remember-lock refuses a dangling destination symlink', { skip: process.platform === 'win32' && !process.env.CI }, (t) => {
  const root = sourceFixture(t);
  const { stage } = stagePackage(root);
  writeFileSync(path.join(stage, 'apm.lock.yaml'), sourceLock);
  const unintended = path.join(root, 'unintended-lock.yaml');
  symlinkSync(unintended, path.join(root, 'agent-package/apm.lock.yaml'));
  assert.throws(() => rememberLock(root), /symlinked input/);
  assert.equal(existsSync(unintended), false);
});

test('unlisted resources are not silently lost or included', (t) => {
  const root = sourceFixture(t);
  writeFileSync(path.join(root, '.github/skills/intake/answers.md'), 'Not runtime content.');
  assert.throws(() => stagePackage(root), /additional resources/);
});

test('staging refuses symlinks to other content', { skip: process.platform === 'win32' && !process.env.CI }, (t) => {
  const root = sourceFixture(t);
  const target = path.join(root, '.github/skills/intake/SKILL.md');
  rmSync(target);
  symlinkSync(path.join(root, '.github/skills/code-review/SKILL.md'), target);
  assert.throws(() => stagePackage(root), /symlinked/);
});

test('manifest accepts only the fixed three-skill workshop contract', () => {
  assert.equal(readVersion(manifest), '0.1.0');
  assert.equal(readVersion(manifest.replace('"0.1.0"', '"1.2.3"')), '1.2.3');
  assert.throws(() => readVersion(manifest.replace('dependencies: {}', 'dependencies:\n  apm: [unreviewed/package]')), /unchanged except/);
  assert.throws(() => readVersion(manifest.replace('"0.1.0"', '"01.1.0"')), /SemVer/);
});

test('the source contract accepts only the exact pinned development baseline', () => {
  const dependency = 'devexpgbb/zava-agent-config/plugins/secure-baseline#931cfb58663154415f8a13e14680f548114d4555';
  const normalized = manifest.replaceAll('\r\n', '\n');
  const approved = normalized.includes('devDependencies:')
    ? normalized
    : normalized.replace('dependencies: {}', `dependencies: {}\ndevDependencies:\n  apm:\n    - ${dependency}\ncompilation:\n  source_attribution: true`);
  assert.equal(readVersion(approved), '0.1.0');
  for (const [before, after] of [
    [dependency, dependency.split('#')[0]],
    [dependency, `${dependency}\n    - microsoft/extra`],
    ['dependencies: {}\ndevDependencies:', 'dependencies:'],
    ['source_attribution: true', 'source_attribution: false'],
  ]) {
    const changed = approved.replace(before, after);
    assert.notEqual(changed, approved, 'The negative case must change the manifest.');
    assert.throws(() => readVersion(changed), /unchanged except/);
  }
});

test('manifest comparison supports LF and CRLF templates and inputs', async (t) => {
  const lf = manifest.replaceAll('\r\n', '\n');
  const variants = [lf, lf.replaceAll('\n', '\r\n')];
  for (const template of variants) {
    const root = sourceFixture(t);
    mkdirSync(path.join(root, 'scripts'));
    writeFileSync(path.join(root, 'agent-package/apm.yml.example'), template);
    const modulePath = path.join(root, 'scripts/package.mjs');
    copyFileSync(new URL('../scripts/package.mjs', import.meta.url), modulePath);
    const { readVersion: readWithTemplate } = await import(pathToFileURL(modulePath).href);
    for (const input of variants) assert.equal(readWithTemplate(input), '0.1.0');
  }
});

test('skill metadata requires a matching name and authored body', () => {
  assert.throws(() => validateSkill(sampleSkill('wrong'), 'intake'), /must match/);
  assert.throws(() => validateSkill('---\nname: intake\n---\nTODO\n', 'intake'), /description/);
  assert.throws(() => validateSkill('---\nname: intake\ndescription: ""\n---\nDraft a source-bound request.\n', 'intake'), /description/);
  assert.doesNotThrow(() => validateSkill(sampleSkill('intake').replace('structural package validation', 'r\u00e9sum\u00e9 drafting \u2014 fictional only'), 'intake'));
});

test('portable inventory, identity and empty MCP configuration pass', () => {
  assert.equal(verifyEntries(entries(), '0.1.0').files.length, 6);
});

test('archive verification requires unchanged development-only lock provenance', () => {
  for (const [before, after] of [
    ['is_dev: true', 'is_dev: false'],
    ['resolved_commit: 931cfb58663154415f8a13e14680f548114d4555', 'resolved_commit: main'],
    ['declared_license: MIT', 'declared_license: unknown'],
    ['deployments: []', 'deployments: [unexpected]'],
  ]) {
    const altered = entries();
    altered[2].text = altered[2].text.replace(before, after);
    assert.throws(() => verifyEntries(altered, '0.1.0'), /development lock/);
  }
  const removed = entries();
  removed[2].text = 'pack:\n  format: agent-plugin\n';
  assert.throws(() => verifyEntries(removed, '0.1.0'), /development lock/);
});

test('staging and remembering reject a stale or production dependency lock', (t) => {
  const root = sourceFixture(t);
  const { stage } = stagePackage(root);
  writeFileSync(path.join(stage, 'apm.lock.yaml'), sourceLock.replace('is_dev: true', 'is_dev: false'));
  assert.throws(() => rememberLock(root), /development lock/);
  writeFileSync(path.join(root, 'agent-package/apm.lock.yaml'), sourceLock.replace('is_dev: true', 'is_dev: false'));
  assert.throws(() => stagePackage(root, 'v0.1.0'), /development lock/);
});

test('wrong versions, extra files, duplicates and hidden components fail', () => {
  assert.throws(() => verifyEntries(entries(), '0.2.0'), /exactly/);
  assert.throws(() => verifyEntries([...entries(), { name: 'answers.md', text: 'instructor' }], '0.1.0'), /exactly/);
  assert.throws(() => verifyEntries([...entries(), entries()[0]], '0.1.0'), /exactly/);
  const altered = entries();
  const plugin = JSON.parse(altered[0].text);
  plugin['com.github.copilot'] = { hooks: './hooks' };
  altered[0].text = JSON.stringify(plugin);
  assert.throws(() => verifyEntries(altered, '0.1.0'), /extension fields/);
});

test('an MCP configuration must be an empty object, not an array or server', () => {
  for (const mcpServers of [[], { unexpected: { command: 'server' } }]) {
    const altered = entries();
    altered[1].text = JSON.stringify({ $schema: 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json', mcpServers });
    assert.throws(() => verifyEntries(altered, '0.1.0'), /empty MCP/);
  }
});
