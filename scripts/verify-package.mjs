import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { packageName, skillNames, stableVersion, validateSkill } from './package.mjs';

function run(command, args, env = process.env) {
  const result = spawnSync(command, args, { encoding: 'utf8', env, maxBuffer: 2 * 1024 * 1024 });
  if (result.error) throw new Error(`${command} unavailable: ${result.error.message}`);
  if (result.status !== 0) throw new Error(`${command} failed: ${result.stderr.trim()}`);
  return result.stdout;
}

function readArchive(archive) {
  if (process.platform === 'win32') {
    const script = [
      '$ErrorActionPreference = "Stop"',
      'Add-Type -AssemblyName System.IO.Compression.FileSystem',
      '$zip = [IO.Compression.ZipFile]::OpenRead($env:WORKSHOP_ARCHIVE)',
      'try { $items = @($zip.Entries | ForEach-Object {',
      'if ($_.Length -gt 262144) { throw "Archive entry too large" }',
      '$reader = [IO.StreamReader]::new($_.Open())',
      'try { @{ name=$_.FullName; text=$reader.ReadToEnd() } } finally { $reader.Dispose() }',
      '}); ConvertTo-Json -InputObject $items -Compress } finally { $zip.Dispose() }',
    ].join('; ');
    return JSON.parse(run('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', script], {
      ...process.env, WORKSHOP_ARCHIVE: archive,
    }));
  }
  const names = run('unzip', ['-Z1', archive]).trim().split('\n');
  if (names.length > 20) throw new Error('Unexpected archive inventory.');
  return names.map((name) => ({ name, text: run('unzip', ['-p', archive, name]) }));
}

export function verifyEntries(entries, version) {
  if (!stableVersion.test(version)) throw new Error('Expected stable SemVer version (for example 0.1.0).');
  const root = `${packageName}-${version}`;
  const expected = ['plugin.json', 'mcp.json', 'apm.lock.yaml', ...skillNames.map((name) => `skills/${name}/SKILL.md`)]
    .map((name) => `${root}/${name}`).sort();
  const actual = entries.map(({ name }) => name).sort();
  if (JSON.stringify(expected) !== JSON.stringify(actual)) {
    throw new Error(`Archive must contain exactly:\n${expected.join('\n')}\nFound:\n${actual.join('\n')}`);
  }
  const content = (name) => entries.find((entry) => entry.name === `${root}/${name}`).text;
  const plugin = JSON.parse(content('plugin.json'));
  const permittedKeys = new Set(['$schema', 'name', 'version', 'description', 'author', 'license']);
  if (Object.keys(plugin).some((key) => !permittedKeys.has(key))
      || plugin.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json'
      || plugin.name !== packageName || plugin.version !== version) {
    throw new Error('Unexpected plugin schema, name, version, or extension fields.');
  }
  const mcp = JSON.parse(content('mcp.json'));
  if (mcp.$schema !== 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json'
      || !mcp.mcpServers || typeof mcp.mcpServers !== 'object'
      || Array.isArray(mcp.mcpServers) || Object.keys(mcp.mcpServers).length
      || Object.keys(mcp).some((key) => !['$schema', 'mcpServers'].includes(key))) {
    throw new Error('Workshop package must have empty MCP configuration.');
  }
  if (!/^\s+format: agent-plugin\s*$/m.test(content('apm.lock.yaml'))) {
    throw new Error('Embedded APM lock must record the agent-plugin format.');
  }
  for (const name of skillNames) validateSkill(content(`skills/${name}/SKILL.md`), name);
  return { name: packageName, version, files: actual };
}

export function verifyArchive(archive, version) {
  archive = path.resolve(archive);
  const bytes = readFileSync(archive);
  if (bytes.length > 1024 * 1024) throw new Error('Workshop archive exceeds the 1 MiB inspection limit.');
  return {
    ...verifyEntries(readArchive(archive), version),
    sha256: createHash('sha256').update(bytes).digest('hex'),
    archive,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [archive, version, ...extra] = process.argv.slice(2);
    if (archive === '--help') {
      console.log('node scripts/verify-package.mjs <archive.zip> <version>\nRequires unzip (macOS/Linux) or Windows PowerShell. Reads without extracting. JSON on stdout; errors on stderr.');
    } else {
      if (!archive || !version || extra.length) throw new Error('Expected archive path and package version. Use --help.');
      console.log(JSON.stringify(verifyArchive(archive, version), null, 2));
    }
  } catch (error) {
    console.error(`Archive verification stopped: ${error.message}`);
    process.exitCode = 1;
  }
}
