/**
 * Cargador para Node: permite importar src/lib/content/seed.ts fuera de Astro.
 *   - Resuelve el alias "@/..." → src/...
 *   - Agrega la extensión .ts a imports sin extensión.
 *   - Convierte `import foto from './x.jpg'` en la ruta absoluta del archivo.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const srcDir = new URL('../src/', import.meta.url);

export async function resolve(specifier, context, next) {
  let spec = specifier;
  if (spec.startsWith('@/')) spec = new URL(spec.slice(2), srcDir).href;
  if ((spec.startsWith('.') || spec.startsWith('file:')) && !/\.[a-z0-9]+$/i.test(spec)) {
    const candidate = new URL(`${spec}.ts`, context.parentURL);
    if (existsSync(fileURLToPath(candidate))) spec = candidate.href;
  }
  return next(spec, context);
}

export async function load(url, context, next) {
  if (/\.(jpe?g|png|webp|avif)$/i.test(url)) {
    return { format: 'module', shortCircuit: true, source: `export default ${JSON.stringify(fileURLToPath(url))};` };
  }
  return next(url, context);
}
