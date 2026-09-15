import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { validateSkill, skillNames } from './package.mjs';

const root = process.cwd();
const failures = [];
function check(condition, message) {
  if (!condition) failures.push(message);
}
function filesIn(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) return [];
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}

const documents = ['README.md', ...filesIn('docs'), ...filesIn('fixtures'), ...filesIn('instructor')].filter((file) => /\.md(?:\.example)?$/.test(file));
for (const file of documents) {
  check(existsSync(file), `Missing document: ${file}`);
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  const prose = text.replace(/```[\s\S]*?```/g, '');
  for (const match of prose.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const link = match[1];
    if (/^(https?:|mailto:|#)/.test(link)) continue;
    const target = path.resolve(path.dirname(file), decodeURIComponent(link.split('#')[0]));
    check(target.startsWith(`${root}${path.sep}`) && existsSync(target), `${file}: broken local link ${link}`);
  }
}

const labs = filesIn('docs/labs').filter((file) => file.endsWith('.md')).sort();
check(labs.length === 13, 'Expected 13 participant labs, numbered 00 through 12.');
labs.forEach((file, index) => {
  check(path.basename(file).startsWith(`${String(index).padStart(2, '0')}-`), `${file}: incorrect lab number`);
  const text = readFileSync(file, 'utf8');
  for (const heading of ['Start here', 'Why', 'Actions', 'Checkpoint', 'Recovery', 'Next']) {
    check(text.includes(`## ${heading}`), `${file}: missing "${heading}" section`);
  }
});
for (const name of skillNames) {
  const file = `instructor/solutions/${name}.md.example`;
  if (!existsSync(file)) {
    failures.push(`Missing inert instructor example: ${file}`);
  } else {
    try { validateSkill(readFileSync(file, 'utf8'), name); }
    catch (error) { failures.push(`${file}: ${error.message}`); }
  }
}
for (const file of filesIn('.github/workflows')) {
  const text = readFileSync(file, 'utf8');
  for (const [, reference] of text.matchAll(/uses:\s*([^\s#]+)/g)) {
    check(/^[\w/-]+@[a-f0-9]{40}$/.test(reference), `${file}: unpinned action ${reference}`);
  }
  check(!text.includes('pull_request_target'), `${file}: unsafe event for this workshop`);
}

if (existsSync('instructor/evals.json')) {
  const evals = JSON.parse(readFileSync('instructor/evals.json', 'utf8'));
  check(evals.skills.length === 3, 'Expected evals for all three skills.');
  for (const skill of evals.skills) {
    check(skill.content.length === 3, `${skill.name}: expected three content comparisons`);
    for (const [split, count] of [['train', 6], ['validation', 4]]) {
      check(skill.triggers[split].positive.length === count && skill.triggers[split].negative.length === count,
        `${skill.name}: expected a balanced fixed 60/40 trigger split`);
    }
  }
} else failures.push('Missing instructor/evals.json.');

if (process.argv.includes('--starter')) {
  for (const directory of ['.github/skills', '.agents', '.claude', '.apm', 'skills']) {
    check(!filesIn(directory).some((file) => path.basename(file) === 'SKILL.md'), `Starter contains an active skill in ${directory}`);
  }
  check(!existsSync('.github/copilot-instructions.md'), 'Starter must not preinstall workflow instructions.');
  check(!existsSync('agent-package/apm.yml'), 'Starter must leave the source manifest inert.');
  for (const file of filesIn('src').filter((file) => file.endsWith('.js'))) {
    check(!/\.filter\s*\(/.test(readFileSync(file, 'utf8')), `${file}: starter must not solve filtering`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Workshop checks passed: ${documents.length} documents, ${labs.length} labs, three inert skill examples${process.argv.includes('--starter') ? ', unsolved starter' : ''}.`);
}
