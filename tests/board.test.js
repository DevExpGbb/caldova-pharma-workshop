import test from 'node:test';
import assert from 'node:assert/strict';
import { documents } from '../src/documents.js';
import { renderDocuments } from '../src/render.js';

test('the original collection has six complete, uniquely identified documents', () => {
  assert.equal(documents.length, 6);
  assert.equal(new Set(documents.map(({ id }) => id)).size, documents.length);
  for (const record of documents) {
    assert.match(record.id, /^CDOC-\d{3}$/);
    assert.ok(record.title.length > 0);
    assert.ok(record.team.length > 0);
  }
});

test('rendering the full collection preserves its records and ordering', () => {
  const snapshot = structuredClone(documents);
  const html = renderDocuments(documents);
  assert.equal((html.match(/class="document-card"/g) ?? []).length, documents.length);
  let previous = -1;
  for (const record of documents) {
    const position = html.indexOf(record.id);
    assert.ok(position > previous);
    previous = position;
    assert.ok(html.includes(record.title));
  }
  assert.deepEqual(documents, snapshot);
});

test('document fields render as text rather than markup', () => {
  const html = renderDocuments([{
    id: '<id>',
    title: '<script>alert("training")</script>',
    team: "Learning & 'Practice'",
    status: '<custom>',
  }]);
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('Learning &amp; &#39;Practice&#39;'));
  assert.ok(html.includes('&lt;custom&gt;'));
});

test('unspecified editorial labels have a readable neutral presentation', () => {
  const html = renderDocuments([{ id: 'CDOC-999', title: 'Example', team: 'Training', status: null }]);
  assert.ok(html.includes('Not specified'));
  assert.ok(html.includes('status--unspecified'));
});
