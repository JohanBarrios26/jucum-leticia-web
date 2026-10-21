/**
 * CORREO PÚBLICO DEL SITIO (script de una sola vez)
 * ----------------------------------------------------------------------------
 * Cambia el correo de contacto que se muestra en el pie, en «Contacto», en las
 * páginas legales y en los datos para buscadores por contacto@jucumleticia.org
 * (Cloudflare Email Routing lo reenvía a los Gmail de JUCUM).
 *
 * Uso (PowerShell, desde la raíz del proyecto):
 *   node scripts/actualizar-correo-contacto.mjs            -> solo muestra
 *   $env:SANITY_WRITE_TOKEN = '<token Editor>'
 *   node scripts/actualizar-correo-contacto.mjs --aplicar  -> escribe
 *
 * También se puede cambiar a mano en el Studio: Ajustes del sitio → Correo.
 */
import { createClient } from '@sanity/client';

const aplicar = process.argv.includes('--aplicar');
const token = process.env.SANITY_WRITE_TOKEN;
if (aplicar && !token) {
  console.error('Falta SANITY_WRITE_TOKEN. Ejecuta sin --aplicar para ver qué haría.');
  process.exit(1);
}

const client = createClient({ projectId: 'dukpncxs', dataset: 'production', apiVersion: '2025-08-01', useCdn: false, token });

const NUEVO = 'contacto@jucumleticia.org';

async function main() {
  const { email } = await client.fetch('*[_id == "siteSettings"][0]{email}');
  if (email === NUEVO) return console.log(`= El correo ya es ${NUEVO}`);
  console.log(`→ siteSettings.email: ${email ?? '(vacío)'} → ${NUEVO}`);
  if (!aplicar) return console.log('\nListo. Ejecuta con --aplicar para escribirlo en Sanity.');

  await client.patch('siteSettings').set({ email: NUEVO }).commit();
  console.log('✔ Correo actualizado. El sitio lo mostrará tras la próxima reconstrucción.');
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
