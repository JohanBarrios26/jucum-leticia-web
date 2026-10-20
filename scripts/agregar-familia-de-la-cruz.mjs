/**
 * AGREGAR UNA FAMILIA DEL EQUIPO EN SANITY (script de una sola vez)
 * ----------------------------------------------------------------------------
 * Crea el perfil «Familia De la Cruz» con su foto y su WhatsApp. Por ahora no
 * hay más datos (integrantes, historia, país…): se completan después desde el
 * panel (Studio).
 *
 * Uso (PowerShell, desde la raíz del proyecto):
 *   node scripts/agregar-familia-de-la-cruz.mjs <ruta-a-la-foto.jpg>            -> solo muestra
 *   $env:SANITY_WRITE_TOKEN = '<token Editor>'
 *   node scripts/agregar-familia-de-la-cruz.mjs <ruta-a-la-foto.jpg> --aplicar  -> escribe
 *
 * Es seguro repetirlo: si el perfil ya existe, no lo toca.
 * Para otra familia: copia este archivo y cambia el bloque `perfil`.
 */
import { readFile } from 'node:fs/promises';
import { createClient } from '@sanity/client';

const ruta = process.argv[2];
const aplicar = process.argv.includes('--aplicar');
const token = process.env.SANITY_WRITE_TOKEN;

if (!ruta || ruta.startsWith('--')) {
  console.error('Indica la ruta de la foto (JPG): node scripts/agregar-familia-de-la-cruz.mjs foto.jpg');
  process.exit(1);
}
if (aplicar && !token) {
  console.error('Falta SANITY_WRITE_TOKEN. Ejecuta sin --aplicar para ver qué haría.');
  process.exit(1);
}

const client = createClient({ projectId: 'dukpncxs', dataset: 'production', apiVersion: '2025-08-01', useCdn: false, token });

const ID = 'person-familia-de-la-cruz';

/** Datos de la familia. El WhatsApp va con código de país y sin espacios ni «+». */
const perfil = {
  name: 'Familia De la Cruz',
  slug: 'familia-de-la-cruz',
  whatsapp: '573144826093',
  alt: {
    es: 'La familia De la Cruz sonríe sentada en un sofá: papá, mamá y tres niños',
    en: 'The De la Cruz family smiles together on a sofa: dad, mom and three children',
    pt: 'A família De la Cruz sorri sentada em um sofá: pai, mãe e três crianças',
  },
};

async function main() {
  if (await client.fetch('defined(*[_id == $id][0]._id)', { id: ID })) {
    return console.log(`= ${ID} ya existe; no se hace nada.`);
  }

  // Va al final de la lista, después de la última persona (orden del panel).
  const [{ orderRank: ultimo } = {}] = await client.fetch('*[_type == "person" && defined(orderRank)] | order(orderRank desc)[0...1]{orderRank}');
  console.log(`→ Crear ${ID} (${perfil.name}) · WhatsApp ${perfil.whatsapp} · orden: después de ${ultimo ?? '(ninguno)'}`);

  if (!aplicar) return console.log('\nListo para crear. Ejecuta con --aplicar para escribirlo en Sanity.');

  const foto = await client.assets.upload('image', await readFile(ruta), { filename: 'familia-de-la-cruz.jpg' });
  console.log(`   foto subida: ${foto._id}`);

  await client.create({
    _id: ID,
    _type: 'person',
    name: perfil.name,
    slug: { _type: 'slug', current: perfil.slug },
    whatsapp: perfil.whatsapp,
    photo: {
      _type: 'photo',
      asset: { _type: 'reference', _ref: foto._id },
      alt: { _type: 'localeString', ...perfil.alt },
      temporary: false,
    },
    authorized: true,
    orderRank: siguienteRango(ultimo),
  });
  console.log('✔ Perfil creado. Aparece en /personas/ cuando el sitio se reconstruya.');
}

/** Un rango que queda justo después del último (los de Sanity son texto ordenable). */
function siguienteRango(ultimo) {
  if (!ultimo) return '0|100034:';
  const [prefijo, cuerpo] = ultimo.split('|');
  const letras = cuerpo.replace(':', '');
  return `${prefijo}|${letras}i:`; // añadir un carácter mayor deja el nuevo después del anterior
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
