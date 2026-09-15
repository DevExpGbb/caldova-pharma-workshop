const statusStyles = new Map([
  ['Needs review', 'review'],
  ['Current', 'current'],
  ['Draft', 'draft'],
]);

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

export function renderDocuments(records) {
  return records.map((record) => `
    <li class="document-card">
      <div class="card-top">
        <span class="document-icon" aria-hidden="true">&#9636;</span>
        <span class="status status--${statusStyles.get(record.status) ?? 'unspecified'}">${escapeHtml(record.status || 'Not specified')}</span>
      </div>
      <p class="document-id">${escapeHtml(record.id)}</p>
      <h3>${escapeHtml(record.title)}</h3>
      <p class="document-team">${escapeHtml(record.team)}</p>
    </li>
  `).join('');
}
