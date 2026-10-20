/**
 * PERFIL OFICIAL DE LA FAMILIA BARRIOS MENDOZA (script de una sola vez)
 * ----------------------------------------------------------------------------
 * Reemplaza los datos de prueba por el perfil oficial: historia, camino (línea
 * de tiempo), versículo, oración, WhatsApp y apoyo personal (PayPal), en
 * español, inglés y portugués.
 *
 * Uso (PowerShell, desde la raíz del proyecto):
 *   node scripts/actualizar-familia-barrios-mendoza.mjs            -> solo muestra
 *   $env:SANITY_WRITE_TOKEN = '<token Editor>'
 *   node scripts/actualizar-familia-barrios-mendoza.mjs --aplicar  -> escribe
 *
 * Es seguro repetirlo: siempre deja el perfil con estos mismos valores.
 * Para editar a otra persona, copia el archivo y cambia `ID` y `datos`.
 */
import { createClient } from '@sanity/client';

const aplicar = process.argv.includes('--aplicar');
const token = process.env.SANITY_WRITE_TOKEN;
if (aplicar && !token) {
  console.error('Falta SANITY_WRITE_TOKEN. Ejecuta sin --aplicar para ver qué haría.');
  process.exit(1);
}

const client = createClient({ projectId: 'dukpncxs', dataset: 'production', apiVersion: '2025-08-01', useCdn: false, token });

const ID = '6bac3a30-922d-495b-8edf-4baa3608a35d';

const s = (es, en, pt) => ({ _type: 'localeString', es, en, pt });
const t = (es, en, pt) => ({ _type: 'localeText', es, en, pt });
const hito = (_key, label, title, text) => ({ _key, _type: 'personMilestone', label, title, text });

const datos = {
  since: '2018',
  country: s('Colombia', 'Colombia', 'Colômbia'),
  role: s('Coordinadores de Redes', 'Network Coordinators', 'Coordenadores de Redes'),

  quote: t(
    'El corazón del hombre piensa su camino; mas Jehová dirige sus pasos. — Proverbios 16:9',
    'The heart of man plans his way, but the Lord establishes his steps. — Proverbs 16:9',
    'O coração do homem traça o seu caminho, mas o Senhor lhe dirige os passos. — Provérbios 16:9',
  ),

  bio: t(
    'Camila llegó a JUCUM en 2018, sirvió cuatro años como líder de la EDE y fundó el ministerio Adorarte, para que los niños conozcan y adoren al Señor por medio de las artes. Johan, ingeniero de sistemas, llegó en 2026 por el llamado del Señor a realizar la EDE. Casados desde 2024, hoy sirven como familia misionera en la base de JUCUM Leticia, en el área de redes, poniendo todos sus dones y habilidades al servicio de la obra del Señor.',
    'Camila joined YWAM in 2018, served for four years as a DTS leader and founded the Adorarte ministry, so that children may know and worship the Lord through the arts. Johan, a systems engineer, arrived in 2026, called by the Lord to take the DTS. Married since 2024, they now serve as a missionary family at the YWAM Leticia base, in the area of networks, putting all their gifts and skills at the service of the Lord’s work.',
    'Camila chegou à JOCUM em 2018, serviu quatro anos como líder da EDE e fundou o ministério Adorarte, para que as crianças conheçam e adorem o Senhor por meio das artes. Johan, engenheiro de sistemas, chegou em 2026, chamado pelo Senhor, para fazer a EDE. Casados desde 2024, hoje servem como família missionária na base da JOCUM Letícia, na área de redes, colocando todos os seus dons e habilidades a serviço da obra do Senhor.',
  ),

  milestones: [
    hito(
      'hito-2018',
      '2018',
      s('Camila llega a JUCUM', 'Camila joins YWAM', 'Camila chega à JOCUM'),
      t('Realiza su escuela y comienza su camino misionero.', 'She takes her school and begins her missionary journey.', 'Faz sua escola e começa seu caminho missionário.'),
    ),
    hito(
      'hito-ede-adorarte',
      '4 años',
      s('Líder de la EDE y nace Adorarte', 'DTS leader and Adorarte is born', 'Líder da EDE e nasce o Adorarte'),
      t(
        'Sirve como líder en la EDE y funda el ministerio Adorarte, que busca que los niños conozcan y adoren al Señor por medio de las artes.',
        'She serves as a DTS leader and founds the Adorarte ministry, which seeks for children to know and worship the Lord through the arts.',
        'Serve como líder na EDE e funda o ministério Adorarte, que busca que as crianças conheçam e adorem o Senhor por meio das artes.',
      ),
    ),
    hito(
      'hito-2024',
      '2024',
      s('Camila y Johan se casan', 'Camila and Johan marry', 'Camila e Johan se casam'),
      t(
        'Tras un tiempo en su ciudad, Camila se reencuentra con Johan Barrios. Al casarse comienza una nueva misión como familia.',
        'After some time in her hometown, Camila meets Johan Barrios again. When they marry, a new mission begins for them as a family.',
        'Depois de um tempo em sua cidade, Camila reencontra Johan Barrios. Ao se casarem, começa uma nova missão como família.',
      ),
    ),
    hito(
      'hito-2026',
      '2026',
      s('Johan llega a la EDE', 'Johan arrives for the DTS', 'Johan chega à EDE'),
      t(
        'Johan, ingeniero de sistemas, conocía JUCUM por Camila. Por el llamado del Señor llega a JUCUM Leticia a realizar la EDE y termina su entrenamiento para servir a tiempo completo. Camila regresa a la base y vuelve a servir como líder de la EDE.',
        'Johan, a systems engineer, knew YWAM through Camila. Called by the Lord, he comes to YWAM Leticia to take the DTS and completes his training to serve full time. Camila returns to the base and serves again as a DTS leader.',
        'Johan, engenheiro de sistemas, conhecia a JOCUM por meio da Camila. Chamado pelo Senhor, chega à JOCUM Letícia para fazer a EDE e conclui seu treinamento para servir em tempo integral. Camila volta à base e serve novamente como líder da EDE.',
      ),
    ),
    hito(
      'hito-estudios',
      'En paralelo',
      s('Camila se prepara para los niños', 'Camila trains for the children', 'Camila se prepara para as crianças'),
      t(
        'Estudia Licenciatura en Educación Infantil para impulsar los dones que el Señor le dio y su ministerio Adorarte, y así darles lo mejor a los niños y niñas de todas las naciones.',
        'She studies Early Childhood Education to strengthen the gifts the Lord gave her and her Adorarte ministry, and so give the best to boys and girls of every nation.',
        'Estuda Licenciatura em Educação Infantil para impulsionar os dons que o Senhor lhe deu e seu ministério Adorarte, e assim dar o melhor às crianças de todas as nações.',
      ),
    ),
    hito(
      'hito-hoy',
      'Hoy',
      s('Sirviendo en redes', 'Serving in networks', 'Servindo em redes'),
      t(
        'Como familia misionera sirven en la base de JUCUM Leticia, en el área de redes, con todos sus dones y habilidades.',
        'As a missionary family they serve at the YWAM Leticia base, in the area of networks, with all their gifts and skills.',
        'Como família missionária servem na base da JOCUM Letícia, na área de redes, com todos os seus dons e habilidades.',
      ),
    ),
  ],

  // Tres ideas: la página las muestra como tarjetas.
  prayerRequest: t(
    'Unidad familiar. Dirección de Dios para dar el 100 % en la voluntad del Padre. Sostenimiento de parte de Dios.',
    'Family unity. God’s direction to give 100% in the Father’s will. God’s provision and sustenance.',
    'Unidade familiar. Direção de Deus para dar 100% na vontade do Pai. Sustento da parte de Deus.',
  ),

  // El botón «Escribir», «Orar» y «Apoyar» llegan a este WhatsApp (solo admite uno).
  whatsapp: '573126734365',

  support: {
    _type: 'object',
    enabled: true,
    link: 'https://www.paypal.me/mendozacamila',
    text: t(
      'Tu apoyo mensual sostiene a nuestra familia para que podamos seguir sirviendo a tiempo completo en la obra del Señor.',
      'Your monthly support sustains our family so we can keep serving full time in the Lord’s work.',
      'Seu apoio mensal sustenta nossa família para que possamos continuar servindo em tempo integral na obra do Senhor.',
    ),
  },
};

async function main() {
  const doc = await client.fetch('*[_id == $id][0]{name, whatsapp}', { id: ID });
  if (!doc) throw new Error(`No existe el documento ${ID}`);
  const borrador = token ? await client.fetch('defined(*[_id == $id][0]._id)', { id: `drafts.${ID}` }) : false;
  console.log(`→ ${doc.name}: ${Object.keys(datos).join(', ')}`);
  console.log(`   WhatsApp: ${doc.whatsapp ?? '(vacío)'} → ${datos.whatsapp}`);
  if (borrador) console.warn('⚠ Hay un borrador sin publicar de este perfil en el Studio; al publicarlo podría pisar estos cambios.');
  if (!aplicar) return console.log('\nListo. Ejecuta con --aplicar para escribirlo en Sanity.');

  await client.patch(ID).set(datos).commit();
  console.log('✔ Perfil actualizado. El sitio se actualiza cuando se reconstruya el despliegue (webhook de Sanity → Cloudflare).');
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
