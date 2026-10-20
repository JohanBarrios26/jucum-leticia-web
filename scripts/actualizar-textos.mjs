/**
 * ACTUALIZACIÓN DE TEXTOS EN SANITY (script de una sola vez)
 * ----------------------------------------------------------------------------
 * Aplica la revisión de textos pedida por el cliente (portada, quiénes somos,
 * equipo, bases, ministerios, escuelas y la palabra "bote" → "transporte
 * fluvial"), en español, inglés y portugués.
 *
 * Seguridad: cada cambio solo se aplica si el texto actual en español es el
 * esperado (o ya es el nuevo), así no pisa ediciones hechas después en el panel.
 *
 * Uso (PowerShell, desde la raíz del proyecto):
 *   node scripts/actualizar-textos.mjs                 -> solo muestra qué cambiaría
 *   $env:SANITY_WRITE_TOKEN = '<token con permiso Editor>'
 *   node scripts/actualizar-textos.mjs --aplicar       -> escribe en Sanity
 *
 * El token se crea en https://www.sanity.io/manage → proyecto dukpncxs → API →
 * Tokens (rol Editor). No se guarda en ningún archivo: bórralo al terminar.
 *
 * Para añadir otro cambio: agrega un objeto a `cambios` con el documento, la
 * ruta del campo, el texto esperado (es) y los textos nuevos (es/en/pt).
 */
import { createClient } from '@sanity/client';

const aplicar = process.argv.includes('--aplicar');
const token = process.env.SANITY_WRITE_TOKEN;

if (aplicar && !token) {
  console.error('Falta la variable SANITY_WRITE_TOKEN. Ejecuta sin --aplicar para ver los cambios.');
  process.exit(1);
}

const client = createClient({
  projectId: 'dukpncxs',
  dataset: 'production',
  apiVersion: '2025-08-01',
  useCdn: false,
  token,
});

/** Foto de portada nueva de «Bases»: el equipo en la pasarela de El Puente (ya existe en Sanity). */
const FOTO_BASES = {
  asset: 'image-dd83a9031deb0e47143e160d820777b5787356b2-2048x1536-jpg',
  alt: {
    es: 'Equipo de voluntarios posa en una pasarela de concreto entre palmas y selva',
    en: 'A team of volunteers poses on a concrete walkway among palms and jungle',
    pt: 'Equipe de voluntários posa em uma passarela de concreto entre palmeiras e selva',
  },
};

const ERRADICAR = 'ministry-erradicando-pobreza-biblica';

/**
 * Cada cambio: documento, ruta del campo, texto actual esperado (es; null si el
 * campo todavía no existe) y el texto nuevo en los tres idiomas.
 */
const cambios = [
  // ---------- Inicio ----------
  {
    doc: 'home',
    ruta: 'hero.description',
    antes: 'Una familia misionera de muchas naciones que vive y sirve en la frontera del Amazonas para conocer a Dios y darlo a conocer.',
    es: 'Familias misioneras de muchas naciones que viven y sirven en la frontera del Amazonas para conocer a Dios y darlo a conocer.',
    en: 'Missionary families from many nations who live and serve on the Amazon frontier to know God and make Him known.',
    pt: 'Famílias missionárias de muitas nações que vivem e servem na fronteira da Amazônia para conhecer a Deus e dá-lo a conhecer.',
  },

  // ---------- Quiénes somos ----------
  {
    doc: 'about',
    ruta: 'global',
    antes:
      'JUCUM Leticia forma parte de JUCUM (Juventud Con Una Misión), un movimiento mundial de jóvenes que envía misioneros a las naciones desde 1960. Nuestros programas cuentan con el respaldo de la Universidad de las Naciones. Y, como cada base de JUCUM, en Leticia creamos escuelas y metodologías nuevas para responder a las necesidades del Amazonas.',
    es: 'JUCUM Leticia forma parte de Juventud Con Una Misión, un movimiento mundial de jóvenes que envía misioneros a las naciones desde 1960. Nuestros programas cuentan con el respaldo de la Universidad de las Naciones. Y, como cada una de sus bases, en Leticia creamos escuelas y metodologías nuevas para responder a las necesidades de las personas en el Amazonas.',
    en: 'YWAM Leticia is part of Youth With A Mission, a worldwide movement of young people that has sent missionaries to the nations since 1960. Our programs are backed by the University of the Nations. And, like each of its bases, in Leticia we create new schools and methods to respond to the needs of the people of the Amazon.',
    pt: 'A JOCUM Letícia faz parte da Jovens Com Uma Missão, um movimento mundial de jovens que envia missionários às nações desde 1960. Nossos programas contam com o respaldo da Universidade das Nações. E, como cada uma de suas bases, em Letícia criamos escolas e metodologias novas para responder às necessidades das pessoas na Amazônia.',
  },

  // ---------- Nuestro equipo ----------
  {
    doc: 'pageTexts',
    ruta: 'peopleIntro',
    antes: null,
    es: 'Todo el personal de JUCUM Leticia son misioneros voluntarios que viven día a día viendo la provisión de Dios para permanecer en el campo misionero. Son personas comprometidas con lo que hacen y no tanto con lo que reciben: están 100 % dedicadas al trabajo misionero, pero necesitan continuamente apoyo financiero. ¿Te gustaría ser parte del apoyo a estas familias para que continúen su trabajo misionero en el Amazonas?',
    en: 'All of the staff at YWAM Leticia are volunteer missionaries who live day by day seeing God’s provision so they can remain on the mission field. They are committed to what they do, not so much to what they receive: they are 100% dedicated to missionary work, yet they continually need financial support. Would you like to be part of the support for these families so they can continue their missionary work in the Amazon?',
    pt: 'Toda a equipe da JOCUM Letícia é formada por missionários voluntários que vivem dia a dia vendo a provisão de Deus para permanecer no campo missionário. São pessoas comprometidas com o que fazem e não tanto com o que recebem: estão 100% dedicadas ao trabalho missionário, mas precisam continuamente de apoio financeiro. Você gostaria de fazer parte do apoio a essas famílias para que continuem seu trabalho missionário na Amazônia?',
  },

  // ---------- Bases ----------
  {
    doc: 'pageTexts',
    ruta: 'basesIntro',
    antes: 'Dos bases, un mismo corazón: una en la ciudad de las tres fronteras y otra en plena selva, desde donde salimos a servir.',
    es: 'Dos bases con un mismo corazón: una en la ciudad de las tres fronteras y otra en plena selva, desde donde salimos a servir.',
    en: 'Two bases with one heart: one in the city of the three borders and the other deep in the jungle, from where we go out to serve.',
    pt: 'Duas bases com um mesmo coração: uma na cidade das três fronteiras e outra em plena selva, de onde saímos para servir.',
  },

  // ---------- Ministerios ----------
  {
    doc: 'pageTexts',
    ruta: 'ministriesIntro',
    antes: 'Brigadas médicas, cruzadas, Biblias, traducción oral e iglesias a la orilla del río: así se ve el evangelio en acción en el Amazonas y más allá.',
    es: 'JUCUM Leticia desarrolla varios ministerios, todos con el fin de dar cumplimiento a la Gran Comisión, tanto dentro como fuera de la Amazonia.',
    en: 'YWAM Leticia carries out several ministries, all with the aim of fulfilling the Great Commission, both inside and outside the Amazon.',
    pt: 'A JOCUM Letícia desenvolve vários ministérios, todos com o objetivo de cumprir a Grande Comissão, tanto dentro como fora da Amazônia.',
  },
  {
    doc: ERRADICAR,
    ruta: 'fullDescription',
    antes:
      'Es nuestro pacto para que haya una Biblia en cada hogar del Amazonas: que todas las familias tengan acceso a la Palabra de Dios en el idioma de su corazón y en un medio que puedan comprender. Para lograrlo trabajamos en seis frentes: oración, traducción, publicación, distribución, educación y motivación.',
    es: 'Una de las misiones principales de JUCUM Leticia es erradicar la pobreza bíblica en la región y fuera de ella. Nuestra visión es que cada familia tenga una Biblia en su casa y en su idioma, y que pueda ser transformada por el poder de la Palabra al conocer a Jesús. Lo hacemos a través de un espíritu de oración, traducción, publicación, distribución, educación y motivación de la Palabra.',
    en: 'One of the main missions of YWAM Leticia is to eradicate Bible poverty in the region and beyond. Our vision is that every family has a Bible in their home and in their own language, and that they may be transformed by the power of the Word as they come to know Jesus. We do this through a spirit of prayer, translation, publishing, distribution, education and motivation around the Word.',
    pt: 'Uma das principais missões da JOCUM Letícia é erradicar a pobreza bíblica na região e fora dela. Nossa visão é que cada família tenha uma Bíblia em sua casa e em seu idioma, e que possa ser transformada pelo poder da Palavra ao conhecer Jesus. Fazemos isso por meio de um espírito de oração, tradução, publicação, distribuição, educação e motivação da Palavra.',
  },
  {
    doc: ERRADICAR,
    ruta: 'features[1].title',
    antes: 'Seis frentes, un mismo pacto',
    es: 'Comprometidos a erradicar la pobreza bíblica',
    en: 'Committed to eradicating Bible poverty',
    pt: 'Comprometidos a erradicar a pobreza bíblica',
  },
  {
    doc: ERRADICAR,
    ruta: 'features[1].intro',
    antes: 'Una Biblia en cada hogar del Amazonas no se logra con una sola acción.',
    es: 'Una Biblia transformando cada hogar en el Amazonas no se logra con una sola acción.',
    en: 'A Bible transforming every home in the Amazon is not achieved with a single action.',
    pt: 'Uma Bíblia transformando cada lar na Amazônia não se alcança com uma única ação.',
  },
  {
    doc: ERRADICAR,
    ruta: 'features[2].intro',
    antes: 'Para llegar a un territorio tan grande hace falta un plan. Siguiendo Hechos 1:8 y bajo la dirección de Dios, el trabajo avanza en cuatro fases.',
    es: 'Desde hace 26 años, JUCUM Leticia trabaja arduamente en las comunidades de la región, llevando la Palabra como medio de transformación espiritual a quienes no conocen el evangelio. Llevamos esta verdad con base en Hechos 1:8.',
    en: 'For 26 years, YWAM Leticia has worked tirelessly in the communities of the region, bringing the Word as a means of spiritual transformation to those who do not know the gospel. We carry this truth based on Acts 1:8.',
    pt: 'Há 26 anos, a JOCUM Letícia trabalha arduamente nas comunidades da região, levando a Palavra como meio de transformação espiritual a quem não conhece o evangelho. Levamos esta verdade com base em Atos 1:8.',
  },
  {
    doc: ERRADICAR,
    ruta: 'calling',
    antes: 'Una Biblia en cada hogar del Amazonas',
    es: 'Una Biblia transformando cada hogar en el Amazonas',
    en: 'A Bible transforming every home in the Amazon',
    pt: 'Uma Bíblia transformando cada lar na Amazônia',
  },
  // «bote» → «transporte fluvial»
  {
    doc: ERRADICAR,
    ruta: 'features[2].steps[2].text',
    antes:
      'En el Amazonas se llama «comunidades ribereñas» a las que viven junto al río y solo se alcanzan en bote. Esta fase va desde Puerto Nariño hasta San Juan de Atacuari.',
    es: 'En el Amazonas se llama «comunidades ribereñas» a las que viven junto al río y solo se alcanzan en transporte fluvial. Esta fase va desde Puerto Nariño hasta San Juan de Atacuari.',
    en: 'In the Amazon, “riverside communities” are those living beside the river and reachable only by river transport. This phase runs from Puerto Nariño to San Juan de Atacuari.',
    pt: 'Na Amazônia chamam-se «comunidades ribeirinhas» as que vivem junto ao rio e só se alcançam por transporte fluvial. Esta fase vai de Puerto Nariño até San Juan de Atacuari.',
  },

  // ---------- Escuelas ----------
  {
    doc: 'pageTexts',
    ruta: 'schoolsIntro',
    antes: 'Escuelas para conocer a Dios, descubrir tu llamado y salir a servir. Cada una combina enseñanza, vida en comunidad y práctica real en el campo misionero.',
    es: 'Juventud Con Una Misión Leticia ofrece, por medio de la Universidad de las Naciones, escuelas de capacitación misionera que llevan a quien participa a encontrar su llamado o su vocación para el campo misionero a tiempo completo.',
    en: 'Youth With A Mission Leticia offers, through the University of the Nations, missionary training schools that lead each participant to find their calling or vocation for full-time mission work.',
    pt: 'A Jovens Com Uma Missão Letícia oferece, por meio da Universidade das Nações, escolas de capacitação missionária que levam quem participa a encontrar seu chamado ou sua vocação para o campo missionário em tempo integral.',
  },
  {
    doc: 'school-ede',
    ruta: 'description',
    antes:
      'La Escuela de Discipulado y Entrenamiento (EDE) es una experiencia intensiva de 5 a 6 meses que une enseñanza, comunidad y misión. No es solo una escuela: es un tiempo para conocer a fondo a Dios, ser transformado en tu identidad, descubrir tu llamado y vivir tu fe de verdad. Se realiza en Leticia, ciudad de frontera con Brasil y Perú, con diversidad cultural (indígenas, naciones, idiomas), experiencia misionera, artes, evangelismo y trabajo con comunidades, y con una vida en familia, no solo de estudiantes. En JUCUM, un camino posible es empezar con la EDE y luego servir dos años o más en una comunidad de servicio.',
    es: 'La Escuela de Discipulado y Entrenamiento (EDE) ofrece una experiencia desafiante e intensiva de 5 a 6 meses, con enseñanzas que revolucionan a los estudiantes dentro de sus aulas de clase. No es solamente una escuela de formación: es una escuela para descubrir el valor del llamado a servir a Dios en el campo misionero. Se realiza en la sede de JUCUM Leticia y presenta una gran diversidad cultural, gracias al trabajo que se hace en las comunidades indígenas, con artes, evangelismo, trabajos de misericordia y discipulado, entre otros. Cuando el estudiante termina su escuela, puede tener la posibilidad de ser parte del equipo de trabajo por 2 años o más.',
    en: 'The Discipleship Training School (DTS) offers a challenging, intensive experience of 5 to 6 months, with teaching that revolutionizes students inside their classrooms. It is not just a training school: it is a school for discovering the value of the call to serve God on the mission field. It takes place at the YWAM Leticia headquarters and offers great cultural diversity, thanks to the work done in Indigenous communities, with the arts, evangelism, works of mercy and discipleship, among other things. When students finish their school, they may have the opportunity to join the work team for 2 years or more.',
    pt: 'A Escola de Discipulado e Treinamento (EDE) oferece uma experiência desafiadora e intensiva de 5 a 6 meses, com ensinamentos que revolucionam os estudantes dentro de suas salas de aula. Não é somente uma escola de formação: é uma escola para descobrir o valor do chamado a servir a Deus no campo missionário. Realiza-se na sede da JOCUM Letícia e apresenta uma grande diversidade cultural, graças ao trabalho feito nas comunidades indígenas, com artes, evangelismo, trabalhos de misericórdia e discipulado, entre outros. Quando o estudante termina sua escola, pode ter a possibilidade de fazer parte da equipe de trabalho por 2 anos ou mais.',
  },
];

/** Convierte una ruta con índices (features[1].title) en una ruta que Sanity entiende. */
const rutaCompleta = (ruta, idioma) => `${ruta}.${idioma}`;

/** Lee el valor en una ruta con puntos e índices, ej. features[1].title.es */
function leer(obj, ruta) {
  return ruta
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .reduce((acc, clave) => (acc == null ? undefined : acc[clave]), obj);
}

async function main() {
  const ids = [...new Set(cambios.map((c) => c.doc)), 'pageTexts'];
  const docs = Object.fromEntries((await client.fetch('*[_id in $ids]', { ids })).map((d) => [d._id, d]));

  const transaccion = client.transaction();
  let pendientes = 0;

  for (const c of cambios) {
    const doc = docs[c.doc];
    if (!doc) {
      console.warn(`⚠ No existe el documento ${c.doc}; se omite ${c.ruta}`);
      continue;
    }
    const actual = leer(doc, rutaCompleta(c.ruta, 'es')) ?? null;
    if (actual === c.es) {
      console.log(`= ${c.doc} · ${c.ruta}: ya está actualizado`);
      continue;
    }
    if (actual !== c.antes) {
      console.warn(`⚠ ${c.doc} · ${c.ruta}: el texto actual no es el esperado (alguien lo editó). Se omite.\n   Actual: ${actual}`);
      continue;
    }
    console.log(`→ ${c.doc} · ${c.ruta}\n   antes: ${actual}\n   ahora: ${c.es}`);
    const valores = {};
    for (const idioma of ['es', 'en', 'pt']) valores[rutaCompleta(c.ruta, idioma)] = c[idioma];
    // Si el campo aún no existe (ej. peopleIntro), se crea con su tipo.
    if (c.antes === null) {
      transaccion.patch(c.doc, (p) => p.set({ [c.ruta]: { _type: 'localeText', ...Object.fromEntries(['es', 'en', 'pt'].map((i) => [i, c[i]])) } }));
    } else {
      transaccion.patch(c.doc, (p) => p.set(valores));
    }
    pendientes++;
  }

  // Foto de portada de Bases: solo si sigue siendo la anterior.
  const fotoActual = docs.pageTexts?.basesImage?.asset?._ref;
  if (fotoActual === FOTO_BASES.asset) {
    console.log('= pageTexts · basesImage: ya está actualizada');
  } else {
    console.log(`→ pageTexts · basesImage\n   antes: ${fotoActual}\n   ahora: ${FOTO_BASES.asset}`);
    transaccion.patch('pageTexts', (p) =>
      p.set({
        basesImage: {
          _type: 'photo',
          asset: { _type: 'reference', _ref: FOTO_BASES.asset },
          alt: { _type: 'localeString', ...FOTO_BASES.alt },
          temporary: false,
        },
      }),
    );
    pendientes++;
  }

  if (!pendientes) return console.log('\nNada que cambiar.');
  if (!aplicar) return console.log(`\n${pendientes} cambio(s) listos. Ejecuta con --aplicar para escribirlos en Sanity.`);

  await transaccion.commit();
  console.log(`\n✔ ${pendientes} cambio(s) aplicados en Sanity. El sitio se actualiza cuando se reconstruya el despliegue (webhook de Sanity → Cloudflare).`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
