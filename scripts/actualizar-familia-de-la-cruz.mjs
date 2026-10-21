/**
 * PERFIL DE LA FAMILIA DE LA CRUZ (script de una sola vez)
 * ----------------------------------------------------------------------------
 * Completa el perfil creado con `agregar-familia-de-la-cruz.mjs`: integrantes,
 * rol, historia, camino, oración, apoyo, y los datos de contacto que se ven en
 * la página de la EDE (correo y teléfono), en español, inglés y portugués.
 *
 * Uso (PowerShell, desde la raíz del proyecto):
 *   node scripts/actualizar-familia-de-la-cruz.mjs            -> solo muestra
 *   $env:SANITY_WRITE_TOKEN = '<token Editor>'
 *   node scripts/actualizar-familia-de-la-cruz.mjs --aplicar  -> escribe
 *
 * Es seguro repetirlo: siempre deja el perfil con estos mismos valores.
 * Pendiente: el botón «Apoyar» abre WhatsApp hasta que la familia entregue su
 * enlace de PayPal.me; entonces se escribe en `support.link` (desde el Studio).
 */
import { createClient } from '@sanity/client';

const aplicar = process.argv.includes('--aplicar');
const token = process.env.SANITY_WRITE_TOKEN;
if (aplicar && !token) {
  console.error('Falta SANITY_WRITE_TOKEN. Ejecuta sin --aplicar para ver qué haría.');
  process.exit(1);
}

const client = createClient({ projectId: 'dukpncxs', dataset: 'production', apiVersion: '2025-08-01', useCdn: false, token });

const ID = 'person-familia-de-la-cruz';

const s = (es, en, pt) => ({ _type: 'localeString', es, en, pt });
const t = (es, en, pt) => ({ _type: 'localeText', es, en, pt });
const miembro = (_key, name, relation) => ({ _key, _type: 'member', name, relation });
const hito = (_key, label, title, text) => ({ _key, _type: 'personMilestone', label, title, text });

const datos = {
  // Por seguridad, de los niños solo el primer nombre.
  members: [
    miembro('m-edward', 'Edward', 'adult'),
    miembro('m-steffanie', 'Steffanie', 'adult'),
    miembro('m-alef', 'Álef', 'child'),
    miembro('m-sara', 'Sara', 'child'),
    miembro('m-asaf', 'Asaf', 'child'),
  ],
  country: s('Colombia y Brasil', 'Colombia and Brazil', 'Colômbia e Brasil'),
  role: s('Líderes de la EDE', 'DTS leaders', 'Líderes da EDE'),
  since: '2015',

  bio: t(
    'Edward llegó a JUCUM en 2015 y Steffanie en 2016. Edward conoció JUCUM porque la hija del pastor de su iglesia fue a hacer la escuela y le habló de ella; Steffanie, por una amiga que predicó en su iglesia, y luego el Señor confirmó su llamado a hacer la escuela. Decidieron servir porque entendieron que el Señor los llamó y, desde entonces, sirven a través de la EDE.',
    'Edward joined YWAM in 2015 and Steffanie in 2016. Edward learned about YWAM because the daughter of his church’s pastor went to take the school and told him about it; Steffanie, through a friend who preached at her church, and then the Lord confirmed her calling to take the school. They decided to serve because they understood the Lord had called them and, ever since, they have served through the DTS.',
    'Edward chegou à JOCUM em 2015 e Steffanie em 2016. Edward conheceu a JOCUM porque a filha do pastor de sua igreja foi fazer a escola e lhe falou dela; Steffanie, por meio de uma amiga que pregou em sua igreja, e depois o Senhor confirmou seu chamado para fazer a escola. Decidiram servir porque entenderam que o Senhor os chamou e, desde então, servem por meio da EDE.',
  ),

  milestones: [
    hito(
      'hito-2015',
      '2015',
      s('Edward llega a JUCUM', 'Edward joins YWAM', 'Edward chega à JOCUM'),
      t(
        'Conoce JUCUM porque la hija del pastor de su iglesia fue a hacer la escuela y le habló de ella.',
        'He learns about YWAM because the daughter of his church’s pastor went to take the school and told him about it.',
        'Conhece a JOCUM porque a filha do pastor de sua igreja foi fazer a escola e lhe falou dela.',
      ),
    ),
    hito(
      'hito-2016',
      '2016',
      s('Steffanie llega a JUCUM', 'Steffanie joins YWAM', 'Steffanie chega à JOCUM'),
      t(
        'Conoce JUCUM por una amiga que predicó en su iglesia. Después, el Señor confirma su llamado a hacer la escuela.',
        'She learns about YWAM through a friend who preached at her church. Then the Lord confirms her calling to take the school.',
        'Conhece a JOCUM por meio de uma amiga que pregou em sua igreja. Depois, o Senhor confirma seu chamado para fazer a escola.',
      ),
    ),
    hito(
      'hito-hoy',
      'Desde entonces',
      s('Sirven en la EDE', 'They serve in the DTS', 'Servem na EDE'),
      t(
        'Entienden que el Señor los llamó y, como familia, sirven como líderes de la EDE.',
        'They understand the Lord has called them and, as a family, they serve as DTS leaders.',
        'Entendem que o Senhor os chamou e, como família, servem como líderes da EDE.',
      ),
    ),
  ],

  prayerRequest: t(
    'Que puedan hacer la voluntad de Dios y que su familia y las personas conozcan quién es Dios y Jesucristo.',
    'That they may do God’s will, and that their family and the people around them may know who God and Jesus Christ are.',
    'Que possam fazer a vontade de Deus e que sua família e as pessoas conheçam quem é Deus e Jesus Cristo.',
  ),

  // Sin `link`: el botón abre su WhatsApp hasta que entreguen el enlace de PayPal.me.
  support: {
    _type: 'object',
    enabled: true,
    text: t(
      'Tu apoyo mensual ayuda a cubrir la educación de los hijos de la familia.',
      'Your monthly support helps cover the children’s education.',
      'Seu apoio mensal ajuda a cobrir a educação dos filhos da família.',
    ),
  },

  // Encabezan la EDE: su correo y teléfono aparecen en la página de la escuela («Contacto»).
  schools: [{ _key: 'escuela-ede', _type: 'reference', _ref: 'school-ede' }],
  email: 'edemleticia@gmail.com',
  phone: '+57 314 482 6093',
  whatsapp: '573144826093',
};

async function main() {
  if (!(await client.fetch('defined(*[_id == $id][0]._id)', { id: ID }))) throw new Error(`No existe ${ID}; ejecuta antes agregar-familia-de-la-cruz.mjs`);
  const borrador = token ? await client.fetch('defined(*[_id == $id][0]._id)', { id: `drafts.${ID}` }) : false;
  console.log(`→ Familia De la Cruz: ${Object.keys(datos).join(', ')}`);
  if (borrador) console.warn('⚠ Hay un borrador sin publicar de este perfil en el Studio; al publicarlo podría pisar estos cambios.');
  if (!aplicar) return console.log('\nListo. Ejecuta con --aplicar para escribirlo en Sanity.');

  await client.patch(ID).set(datos).commit();
  console.log('✔ Perfil actualizado.');
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
