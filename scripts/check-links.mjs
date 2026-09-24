/**
 * REVISIÓN DE ENLACES ROTOS (criterio de aceptación §37: "No existen enlaces rotos")
 * ----------------------------------------------------------------------------
 * Recorre todas las páginas de dist/ (después de `npm run build`) y verifica que
 * cada enlace interno (href/src que empiezan con "/") lleve a un archivo o
 * página existente, y que las anclas (#orando, #viniendo…) existan en destino.
 *
 * Uso:  npm run build && npm run check:links
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) files.push(p);
  }
})(DIST);

/** ¿Existe el destino de una URL interna? (archivo o carpeta con index.html) */
function targetFile(url) {
  const clean = decodeURIComponent(url.split('#')[0].split('?')[0]);
  const p = join(DIST, clean);
  if (existsSync(p) && statSync(p).isFile()) return p;
  const index = join(p, 'index.html');
  return existsSync(index) ? index : null;
}

const broken = new Set();
const missingAnchors = new Set();
let checked = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    checked++;
    const target = targetFile(url);
    if (!target) {
      broken.add(`${file} → ${url}`);
      continue;
    }
    const hash = url.split('#')[1];
    if (hash && target.endsWith('.html') && !readFileSync(target, 'utf8').includes(`id="${hash}"`)) {
      missingAnchors.add(`${file} → ${url}`);
    }
  }
}

console.log(`Páginas: ${files.length} · enlaces internos revisados: ${checked}`);
if (broken.size) console.log('\n✗ Enlaces rotos:\n' + [...broken].join('\n'));
if (missingAnchors.size) console.log('\n✗ Anclas sin destino:\n' + [...missingAnchors].join('\n'));
if (!broken.size && !missingAnchors.size) console.log('✓ Sin enlaces rotos ni anclas perdidas.');
process.exit(broken.size || missingAnchors.size ? 1 : 0);
