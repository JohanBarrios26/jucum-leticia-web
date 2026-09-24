/**
 * CONTENIDO LOCAL TEMPORAL
 * ----------------------------------------------------------------------------
 * Este archivo hace de "base de datos" hasta que el panel de administración
 * (Sanity, fase 3) esté conectado. Después, este archivo desaparece y el mismo
 * contenido vivirá en el CMS.
 *
 * Reglas (especificación §35 y §36):
 *   - Solo se escribe información CONFIRMADA en la especificación.
 *   - Lo que no está confirmado va como `null` → se muestra "Pendiente de contenido".
 *   - Los textos en inglés son traducciones y deben ser revisados por JUCUM.
 *   - Las fotos en `src/assets/temporal/` son provisionales (`temporary: true`).
 */
import heroRiver from '@/assets/temporal/rio.jpg';
import aerialRiver from '@/assets/temporal/amazon-hero.jpg';
import community from '@/assets/temporal/comunidad.jpg';
import discipleship from '@/assets/temporal/discipulado.jpg';
import culture from '@/assets/temporal/misiones.jpg';
import translation from '@/assets/temporal/traduccion.jpg';

import type {
  GalleryItemRaw,
  HomeRaw,
  JoinPathRaw,
  MinistryRaw,
  SchoolRaw,
  SiteSettingsRaw,
  StoryRaw,
} from './types';

/* ----------------------------------------------------------------- Imágenes */
// Fotos provisionales tomadas de la versión anterior del sitio. Reemplazar por
// fotos reales de JUCUM Leticia con autorización.
const photos = {
  heroRiver: {
    src: heroRiver,
    alt: {
      es: 'Un grupo de personas navega en bote por el río Amazonas al atardecer',
      en: 'A group of people travels by boat on the Amazon River at sunset',
    },
    temporary: true,
  },
  aerialRiver: {
    src: aerialRiver,
    alt: {
      es: 'Vista aérea del río Amazonas rodeado de selva',
      en: 'Aerial view of the Amazon River surrounded by rainforest',
    },
    temporary: true,
  },
  community: {
    src: community,
    alt: {
      es: 'Casa de madera de una iglesia ribereña con el letrero "Casa Fe em Deus"',
      en: 'Wooden riverside church building with a "Casa Fe em Deus" sign',
    },
    temporary: true,
  },
  discipleship: {
    src: discipleship,
    alt: {
      es: 'Personas conversando frente al mar, en blanco y negro',
      en: 'People talking by the sea, in black and white',
    },
    temporary: true,
  },
  culture: {
    src: culture,
    alt: {
      es: 'Jóvenes indígenas con trajes tradicionales durante una danza',
      en: 'Indigenous young people in traditional dress during a dance',
    },
    temporary: true,
  },
  translation: {
    src: translation,
    alt: {
      es: 'Un anciano sentado junto a su hamaca frente a una cámara de grabación',
      en: 'An elderly man sitting by his hammock in front of a recording camera',
    },
    temporary: true,
  },
} as const;

/* ------------------------------------------------------ Configuración global */

export const siteSettings: SiteSettingsRaw = {
  organizationName: { es: 'JUCUM Leticia', en: 'YWAM Leticia' },
  tagline: {
    es: 'Desde el corazón del Amazonas hacia las naciones.',
    en: 'From the heart of the Amazon to the nations.',
  },
  shortDescription: {
    es: 'Una comunidad misionera internacional comprometida en conocer a Dios y darlo a conocer, sirviendo desde el corazón del Amazonas hacia las naciones.',
    en: 'An international missionary community committed to knowing God and making Him known, serving from the heart of the Amazon to the nations.',
  },
  email: 'ywamleticia@gmail.com',
  phones: [
    { label: { es: 'Colombia', en: 'Colombia' }, number: '+57 311 533 2741' },
    { label: { es: 'Internacional', en: 'International' }, number: '+1 479 283 4356' },
  ],
  whatsapp: '573115332741',
  location: { es: 'Leticia, Amazonas, Colombia', en: 'Leticia, Amazonas, Colombia' },
  // Redes oficiales: pendientes (especificación §26). No inventar URLs.
  social: { instagram: null, facebook: null, youtube: null, tiktok: null },
};

/* ------------------------------------------------------------------- Inicio */

export const home: HomeRaw = {
  seo: {
    title: {
      es: 'JUCUM Leticia | Misión desde el corazón del Amazonas',
      en: 'YWAM Leticia | Mission from the heart of the Amazon',
    },
    description: {
      es: 'Conoce JUCUM Leticia, una comunidad misionera internacional que sirve desde el corazón del Amazonas hacia las naciones.',
      en: 'Meet YWAM Leticia, an international missionary community serving from the heart of the Amazon to the nations.',
    },
  },
  hero: {
    eyebrow: { es: 'JUCUM Leticia · Amazonas', en: 'YWAM Leticia · Amazon' },
    titleLines: {
      es: ['Desde el corazón', 'del Amazonas', 'hacia las naciones'],
      en: ['From the heart', 'of the Amazon', 'to the nations'],
    },
    description: {
      es: 'Una comunidad misionera internacional comprometida en conocer a Dios y darlo a conocer.',
      en: 'An international missionary community committed to knowing God and making Him known.',
    },
    primaryCta: { es: 'Quiero ser parte', en: 'I want to be part' },
    secondaryCta: { es: 'Conoce la misión', en: 'Discover the mission' },
    image: photos.heroRiver,
  },
  about: {
    eyebrow: { es: 'Sobre JUCUM Leticia', en: 'About YWAM Leticia' },
    statement: {
      es: 'Somos una comunidad misionera internacional comprometida en conocer a Dios y darlo a conocer, sirviendo desde el corazón del Amazonas hacia las naciones.',
      en: 'We are an international missionary community committed to knowing God and making Him known, serving from the heart of the Amazon to the nations.',
    },
    cta: { es: 'Conoce quiénes somos', en: 'Get to know us' },
  },
  // Actividades documentadas en la especificación §8.
  activities: {
    es: [
      'Evangelización',
      'Plantación de iglesias',
      'Discipulado integral',
      'Distribución de Biblias',
      'Conferencias para pastores',
      'Ministerios infantiles',
      'Escuela para pastores',
      'Traducción bíblica oral',
      'Brigadas médicas',
    ],
    en: [
      'Evangelism',
      'Church planting',
      'Holistic discipleship',
      'Bible distribution',
      'Pastors conferences',
      'Children’s ministries',
      'School for pastors',
      'Oral Bible translation',
      'Medical brigades',
    ],
  },
  shortTerm: {
    // Pregunta textual de la documentación institucional (especificación §2.2).
    question: {
      es: '¿Te gustaría venir a un corto plazo de misiones?',
      en: 'Would you like to come on a short-term mission?',
    },
    text: {
      es: 'Todo puede comenzar con una conversación. Escríbenos y te contamos cómo dar el siguiente paso.',
      en: 'It can all begin with a conversation. Write to us and we’ll tell you how to take the next step.',
    },
    cta: { es: 'Comienza una conversación', en: 'Start a conversation' },
    image: photos.culture,
  },
};

/* --------------------------------------------------------------- Ministerios */
// Especificación §8. Las descripciones cortas resumen SOLO las actividades
// documentadas. EDE se muestra en Escuelas (es un programa de formación).

export const ministries: MinistryRaw[] = [
  {
    slug: 'comunidades-riberenas',
    name: { es: 'Comunidades ribereñas', en: 'Riverside communities' },
    shortDescription: {
      es: 'Evangelización, plantación y construcción de iglesias y discipulado integral en las comunidades a orillas del río.',
      en: 'Evangelism, church planting and building, and holistic discipleship in communities along the river.',
    },
    fullDescription: null,
    activities: {
      es: ['Evangelización de comunidades', 'Plantación de iglesias', 'Construcción de iglesias', 'Discipulado integral'],
      en: ['Community evangelism', 'Church planting', 'Church building', 'Holistic discipleship'],
    },
    image: photos.community,
    active: true,
    order: 1,
  },
  {
    slug: 'ministerio-explosion',
    name: { es: 'Ministerio Explosión', en: 'Explosion Ministry' },
    shortDescription: {
      es: 'Conferencias para pastores, cruzadas evangelísticas, distribución de Biblias y ministerios infantiles.',
      en: 'Pastors conferences, evangelistic crusades, Bible distribution and children’s ministries.',
    },
    fullDescription: null,
    activities: {
      es: [
        'Conferencias para pastores',
        'Cruzadas evangelísticas',
        'Distribución de Biblias',
        'Ministerios infantiles',
        'Materiales de apoyo para pastores regionales',
      ],
      en: [
        'Pastors conferences',
        'Evangelistic crusades',
        'Bible distribution',
        'Children’s ministries',
        'Support materials for regional pastors',
      ],
    },
    image: photos.culture,
    active: true,
    order: 2,
  },
  {
    slug: 'erradicando-pobreza-biblica',
    name: { es: 'Erradicando la pobreza bíblica', en: 'Eradicating Bible poverty' },
    shortDescription: {
      es: 'Distribución de Biblias, discipulado y programas educativos sobre la Biblia.',
      en: 'Bible distribution, discipleship and Bible education programs.',
    },
    fullDescription: null,
    activities: {
      es: ['Distribución de Biblias', 'Discipulado', 'Programas educativos sobre la Biblia'],
      en: ['Bible distribution', 'Discipleship', 'Bible education programs'],
    },
    image: photos.discipleship,
    active: true,
    order: 3,
  },
  {
    slug: 'kings-kids',
    name: { es: 'Kings Kids', en: 'Kings Kids' },
    shortDescription: { es: 'Ministerio Hijos del Rey.', en: 'Children of the King ministry.' },
    fullDescription: null,
    activities: { es: [], en: [] },
    image: null,
    active: true,
    order: 4,
  },
  {
    slug: 'jucum-el-puente',
    name: { es: 'JUCUM El Puente', en: 'YWAM El Puente' },
    shortDescription: {
      es: 'Escuela para pastores y escuela de misiones para indígenas.',
      en: 'A school for pastors and a missions school for Indigenous people.',
    },
    fullDescription: null,
    activities: {
      es: ['Escuela para pastores', 'Escuela de misiones para indígenas'],
      en: ['School for pastors', 'Missions school for Indigenous people'],
    },
    image: null,
    active: true,
    order: 5,
  },
  {
    slug: 'obt',
    name: { es: 'OBT', en: 'OBT' },
    shortDescription: {
      es: 'Traducción bíblica oral.',
      en: 'Oral Bible translation.',
    },
    fullDescription: null,
    activities: { es: [], en: [] },
    image: photos.translation,
    active: true,
    order: 6,
  },
  {
    slug: 'brigadas-medicas',
    name: { es: 'Brigadas médicas', en: 'Medical brigades' },
    shortDescription: null,
    fullDescription: null,
    activities: { es: [], en: [] },
    image: null,
    active: true,
    order: 7,
  },
];

/* ------------------------------------------------------------------ Escuelas */
// Especificación §11. Casi todo está pendiente: fechas, costos, requisitos y
// encargados deben venir de JUCUM. `contacts` = personas encargadas de cada escuela.

const pendingSchool = {
  description: null,
  audience: null,
  duration: null,
  dates: null,
  location: null,
  requirements: null,
  cost: null,
  enrollment: null,
  contacts: [],
  active: true,
} satisfies Partial<SchoolRaw>;

export const schools: SchoolRaw[] = [
  {
    ...pendingSchool,
    slug: 'ede',
    name: { es: 'EDE', en: 'DTS' },
    fullName: { es: 'Escuela de Discipulado y Entrenamiento', en: 'Discipleship Training School' },
    activities: { es: [], en: [] },
    image: photos.discipleship,
    order: 1,
  },
  {
    ...pendingSchool,
    slug: 'emi',
    name: { es: 'EMI', en: 'EMI' },
    fullName: null,
    activities: { es: [], en: [] },
    image: photos.aerialRiver,
    order: 2,
  },
  {
    ...pendingSchool,
    slug: 'jucum-el-puente',
    name: { es: 'JUCUM El Puente', en: 'YWAM El Puente' },
    fullName: null,
    description: {
      es: 'Escuela para pastores y escuela de misiones para indígenas.',
      en: 'A school for pastors and a missions school for Indigenous people.',
    },
    activities: {
      es: ['Escuela para pastores', 'Escuela de misiones para indígenas'],
      en: ['School for pastors', 'Missions school for Indigenous people'],
    },
    image: photos.community,
    order: 3,
  },
];

/* ------------------------------------------------------ Caminos para participar */
// Los cuatro caminos de la especificación §15. Textos breves y editables.

export const joinPaths: JoinPathRaw[] = [
  {
    key: 'pray',
    title: { es: 'Orar', en: 'Pray' },
    text: { es: 'Acompaña la misión en oración desde donde estés.', en: 'Stand with the mission in prayer wherever you are.' },
  },
  {
    key: 'serve',
    title: { es: 'Servir', en: 'Serve' },
    text: { es: 'Pon tus dones y habilidades al servicio de otros.', en: 'Put your gifts and skills at the service of others.' },
  },
  {
    key: 'come',
    title: { es: 'Venir', en: 'Come' },
    text: { es: 'Vive la misión en el Amazonas junto al equipo.', en: 'Live the mission in the Amazon alongside the team.' },
  },
  {
    key: 'support',
    title: { es: 'Apoyar', en: 'Support' },
    text: { es: 'Ayuda a que la misión continúe y llegue más lejos.', en: 'Help the mission continue and reach further.' },
  },
];

/* ------------------------------------------------------------------- Galería */

export const gallery: GalleryItemRaw[] = [
  { image: photos.aerialRiver, title: { es: 'El territorio', en: 'The territory' }, category: 'territory', publishable: true },
  { image: photos.culture, title: { es: 'Culturas', en: 'Cultures' }, category: 'communities', publishable: true },
  { image: photos.community, title: { es: 'Iglesias ribereñas', en: 'Riverside churches' }, category: 'communities', publishable: true },
  { image: photos.translation, title: { es: 'Traducción oral', en: 'Oral translation' }, category: 'bible', publishable: true },
  { image: photos.heroRiver, title: { es: 'Viajes por el río', en: 'River journeys' }, category: 'trips', publishable: true },
  { image: photos.discipleship, title: { es: 'Discipulado', en: 'Discipleship' }, category: 'people', publishable: true },
];

/* --------------------------------------------------------- Historias / testimonios */
// Vacío a propósito: no hay testimonios autorizados todavía (especificación §13 y §32).
export const stories: StoryRaw[] = [];
