import { documents } from './documents.js';
import { renderDocuments } from './render.js';

document.querySelector('#document-list').innerHTML = renderDocuments(documents);
document.querySelector('#document-count').textContent = `${documents.length} documents`;
