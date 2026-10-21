/**
 * ACTIVAR EL BOTÓN «APOYAR» EN TODAS LAS PERSONAS (script de una sola vez)
 * ----------------------------------------------------------------------------
 * Marca `support.enabled = true` en cada perfil de persona o familia. No toca
 * el enlace ni el texto de apoyo que ya tenga cada perfil. Sin enlace propio, el
 * botón abre WhatsApp (el de la persona o, si no tiene, el de JUCUM).
 *
 * Uso (PowerShell, desde la raíz del proyecto):
 *   node scripts/activar-apoyo-todos.mjs            -> solo muestra
 *   $env:SANITY_WRITE_TOKEN = '<token Editor>'
 *   node scripts/activar-apoyo-todos.mjs --aplicar  -> escribe
 *
 * Para desactivarlo en alguien, quita «Mostrar botón Apoyar» en su perfil (Studio).
 */
import { createClient } from '@sanity/client';

const aplicar = process.argv.includes('--aplicar');
const token = process.env.SANITY_WRITE_TOKEN;
if (aplicar && !token) {
  console.error('Falta SANITY_WRITE_TOKEN. Ejecuta sin --aplicar para ver qué haría.');
  process.exit(1);
}

const client = createClient({ projectId: 'dukpncxs', dataset: 'production', apiVersion: '2025-08-01', useCdn: false, token });

async function main() {
  const personas = await client.fetch('*[_type == "person" && !(_id in path("drafts.**"))]{_id, name, "activo": support.enabled == true}');
  const pendientes = personas.filter((p) => !p.activo);
  for (const p of personas) console.log(`${p.activo ? '=' : '→'} ${p.name}${p.activo ? ' (ya activo)' : ''}`);

  if (!pendientes.length) return console.log('\nTodos tienen el botón activo.');
  if (!aplicar) return console.log(`\n${pendientes.length} perfil(es) por activar. Ejecuta con --aplicar para escribirlo.`);

  const transaccion = client.transaction();
  for (const p of pendientes) {
    transaccion.patch(p._id, (patch) => patch.setIfMissing({ support: { _type: 'object' } }).set({ 'support.enabled': true }));
  }
  await transaccion.commit();
  console.log(`\n✔ Botón «Apoyar» activado en ${pendientes.length} perfil(es).`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
