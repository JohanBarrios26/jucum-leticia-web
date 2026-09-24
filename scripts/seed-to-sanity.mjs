/**
 * EXPORTA EL CONTENIDO LOCAL A SANITY (se usa una sola vez)
 * ----------------------------------------------------------------------------
 * Lee src/lib/content/seed.ts y genera studio/seed/seed.ndjson con todos los
 * documentos y las fotos. Luego se importa con:
 *     cd studio && npm run import-seed
 *
 * Uso:  node scripts/seed-to-sanity.mjs
 */
import { register } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

register('./ts-assets-loader.mjs', import.meta.url);
const seed = await import('../src/lib/content/seed.ts');

let keyCounter = 0;
const key = () => `k${(++keyCounter).toString(36).padStart(4, '0')}`;
// Rango de orden compatible con @sanity/orderable-document-list (orden alfabético).
const rank = (i) => `0|${String.fromCharCode(97 + i)}00000:`;
const compact = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined));

function photo(img) {
  if (!img) return undefined;
  // `src` es la ruta absoluta del archivo (ver ts-assets-loader.mjs).
  return {
    _type: 'photo',
    _sanityAsset: `image@${pathToFileURL(img.src).href}`,
    alt: img.alt,
    temporary: img.temporary ?? false,
  };
}

const docs = [];

// Configuración del sitio
const s = seed.siteSettings;
docs.push(
  compact({
    _id: 'siteSettings',
    _type: 'siteSettings',
    organizationName: s.organizationName,
    tagline: s.tagline,
    shortDescription: s.shortDescription,
    email: s.email,
    phones: s.phones.map((p) => ({ _key: key(), _type: 'phone', label: p.label, number: p.number })),
    whatsapp: s.whatsapp,
    location: s.location,
    social: compact(s.social),
  }),
);

// Página de inicio
const h = seed.home;
docs.push({
  _id: 'home',
  _type: 'home',
  seo: h.seo,
  hero: { ...h.hero, image: photo(h.hero.image) },
  about: h.about,
  activities: h.activities,
  shortTerm: { ...h.shortTerm, image: photo(h.shortTerm.image) },
});

// Ministerios
seed.ministries.forEach((m, i) =>
  docs.push(
    compact({
      _id: `ministry-${m.slug}`,
      _type: 'ministry',
      orderRank: rank(i),
      active: m.active,
      name: m.name,
      slug: { _type: 'slug', current: m.slug },
      image: photo(m.image),
      shortDescription: m.shortDescription,
      fullDescription: m.fullDescription,
      activities: m.activities,
    }),
  ),
);

// Escuelas
seed.schools.forEach((sc, i) =>
  docs.push(
    compact({
      _id: `school-${sc.slug}`,
      _type: 'school',
      orderRank: rank(i),
      active: sc.active,
      name: sc.name,
      fullName: sc.fullName,
      slug: { _type: 'slug', current: sc.slug },
      image: photo(sc.image),
      description: sc.description,
      activities: sc.activities,
      duration: sc.duration,
      dates: sc.dates,
      location: sc.location,
      audience: sc.audience,
      requirements: sc.requirements,
      cost: sc.cost,
      enrollment: sc.enrollment,
      contacts: [],
    }),
  ),
);

// Caminos para participar (IDs fijos: joinPath-pray, joinPath-serve…)
seed.joinPaths.forEach((p) =>
  docs.push({ _id: `joinPath-${p.key}`, _type: 'joinPath', key: p.key, title: p.title, text: p.text }),
);

// Galería
seed.gallery.forEach((g, i) =>
  docs.push(
    compact({
      _id: `gallery-${i + 1}`,
      _type: 'galleryItem',
      orderRank: rank(i),
      image: photo(g.image),
      title: g.title,
      category: g.category,
      publishable: g.publishable,
    }),
  ),
);

mkdirSync(new URL('../studio/seed/', import.meta.url), { recursive: true });
const out = new URL('../studio/seed/seed.ndjson', import.meta.url);
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join('\n') + '\n');
console.log(`✓ ${docs.length} documentos → studio/seed/seed.ndjson`);
