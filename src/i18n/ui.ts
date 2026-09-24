/**
 * TEXTOS FIJOS DE LA INTERFAZ (español / inglés)
 * ----------------------------------------------------------------------------
 * Aquí van etiquetas de menús, botones, títulos de secciones y mensajes del
 * sistema: cosas que forman parte del diseño y cambian muy rara vez.
 *
 * Lo que JUCUM debe poder editar sin programador (textos institucionales,
 * ministerios, escuelas, contactos...) NO va aquí: va en `src/lib/content`.
 *
 * ¿Agregar un texto? Añádelo en `es` y TypeScript te obligará a añadirlo en `en`.
 * Uso en un componente:  const ui = t(locale);  →  {ui.nav.home}
 */
import type { JoinPath, Locale, RouteKey } from './routes';

const es = {
  languageName: 'Español',
  skipToContent: 'Saltar al contenido',
  homeLinkLabel: 'ir al inicio',
  mainNavLabel: 'Navegación principal',
  openMenu: 'Abrir menú',
  closeMenu: 'Cerrar menú',
  switchLanguage: 'Cambiar idioma',
  nav: {
    home: 'Inicio',
    about: 'Quiénes somos',
    ministries: 'Ministerios',
    schools: 'Escuelas',
    join: 'Sé parte',
    contact: 'Contacto',
  } satisfies Record<RouteKey, string>,
  joinPaths: {
    pray: 'Orando',
    serve: 'Sirviendo',
    come: 'Viniendo',
    support: 'Apoyando',
  } satisfies Record<JoinPath, string>,

  /* Secciones de la página de inicio */
  home: {
    scroll: 'Desliza',
    coordinates: 'Leticia · Colombia · Perú · Brasil',
    whatWeDo: 'Qué hacemos',
    ministriesEyebrow: 'Ministerios',
    ministriesTitle: 'Donde servimos',
    ministriesHint: 'Desplázate para explorar',
    allMinistries: 'Ver todos los ministerios',
    schoolsEyebrow: 'Escuelas y formación',
    schoolsTitle: 'Formación para ir',
    allSchools: 'Ver todas las escuelas',
    obtEyebrow: 'OBT',
    obtTitle: 'La Palabra en cada lengua',
    obtText:
      'Un área de trabajo dedicada a la traducción bíblica oral: llevar las Escrituras a comunidades que se comunican principalmente de forma hablada.',
    obtCta: 'Conocer OBT',
    obtPending: 'comunidades, idiomas y proyectos',
    storiesEyebrow: 'Historias',
    // Frases de la documentación original (especificación §13).
    storiesTitle: 'Historias que nacen en el Amazonas',
    storiesSubtitle: 'Personas que se comprometieron a ir.',
    galleryEyebrow: 'Galería',
    galleryTitle: 'La misión en imágenes',
    joinEyebrow: 'Cómo participar',
    joinTitle: '¿Y tú? ¿Te gustaría dar el siguiente paso?',
    contactEyebrow: 'Contacto',
    contactTitle: 'Comienza una conversación',
    contactText: '¿Quieres conocer más, estudiar, servir, venir o apoyar? Escríbenos por el canal que prefieras.',
  },

  /* Plantillas de ministerio y escuela */
  detail: {
    activities: 'Qué hacemos',
    participate: '¿Cómo puedes participar?',
    participateText: 'Escríbenos y te contamos cómo sumarte a este trabajo.',
    about: 'Descripción',
    info: 'Información',
    duration: 'Duración',
    dates: 'Fechas',
    location: 'Lugar',
    audience: 'Para quién es',
    requirements: 'Requisitos',
    cost: 'Costo',
    enrollment: 'Inscripción',
    contacts: 'Encargados de la escuela',
    otherMinistries: 'Otros ministerios',
    back: 'Volver',
  },

  footer: {
    navigation: 'Navegación',
    participate: 'Participa',
    contact: 'Contacto',
    social: 'Redes sociales',
    rights: 'Todos los derechos reservados.',
  },
  contact: {
    email: 'Correo',
    phone: 'Teléfono',
    whatsapp: 'WhatsApp',
    writeWhatsapp: 'Escríbenos por WhatsApp',
    location: 'Ubicación',
    whatsappMessage: 'Hola JUCUM Leticia, me gustaría recibir más información.',
  },
  pending: 'Pendiente de contenido',
  temporaryPhoto: 'Foto temporal',
  underConstruction: 'Esta página se construirá en la siguiente fase del proyecto.',
  notFound: {
    title: 'Página no encontrada',
    text: 'La página que buscas no existe o fue movida.',
    back: 'Volver al inicio',
  },
};

export type UIStrings = typeof es;

const en: UIStrings = {
  languageName: 'English',
  skipToContent: 'Skip to content',
  homeLinkLabel: 'go to home page',
  mainNavLabel: 'Main navigation',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  switchLanguage: 'Change language',
  nav: {
    home: 'Home',
    about: 'About us',
    ministries: 'Ministries',
    schools: 'Schools',
    join: 'Get involved',
    contact: 'Contact',
  },
  joinPaths: {
    pray: 'Praying',
    serve: 'Serving',
    come: 'Coming',
    support: 'Supporting',
  },
  home: {
    scroll: 'Scroll',
    coordinates: 'Leticia · Colombia · Peru · Brazil',
    whatWeDo: 'What we do',
    ministriesEyebrow: 'Ministries',
    ministriesTitle: 'Where we serve',
    ministriesHint: 'Scroll to explore',
    allMinistries: 'See all ministries',
    schoolsEyebrow: 'Schools & training',
    schoolsTitle: 'Trained to go',
    allSchools: 'See all schools',
    obtEyebrow: 'OBT',
    obtTitle: 'The Word in every language',
    obtText:
      'An area of work devoted to oral Bible translation: bringing the Scriptures to communities that communicate mainly through the spoken word.',
    obtCta: 'Learn about OBT',
    obtPending: 'communities, languages and projects',
    storiesEyebrow: 'Stories',
    storiesTitle: 'Stories born in the Amazon',
    storiesSubtitle: 'People who committed to go.',
    galleryEyebrow: 'Gallery',
    galleryTitle: 'The mission in pictures',
    joinEyebrow: 'Get involved',
    joinTitle: 'What about you? Would you take the next step?',
    contactEyebrow: 'Contact',
    contactTitle: 'Start a conversation',
    contactText: 'Want to learn more, study, serve, come or support? Write to us through the channel you prefer.',
  },
  detail: {
    activities: 'What we do',
    participate: 'How can you take part?',
    participateText: 'Write to us and we’ll tell you how to join this work.',
    about: 'Description',
    info: 'Information',
    duration: 'Duration',
    dates: 'Dates',
    location: 'Location',
    audience: 'Who it’s for',
    requirements: 'Requirements',
    cost: 'Cost',
    enrollment: 'Enrollment',
    contacts: 'School leaders',
    otherMinistries: 'Other ministries',
    back: 'Back',
  },
  footer: {
    navigation: 'Navigation',
    participate: 'Take part',
    contact: 'Contact',
    social: 'Social media',
    rights: 'All rights reserved.',
  },
  contact: {
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    writeWhatsapp: 'Message us on WhatsApp',
    location: 'Location',
    whatsappMessage: 'Hello YWAM Leticia, I would like to receive more information.',
  },
  pending: 'Content pending',
  temporaryPhoto: 'Temporary photo',
  underConstruction: 'This page will be built in the next phase of the project.',
  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has moved.',
    back: 'Back to home',
  },
};

const ui: Record<Locale, UIStrings> = { es, en };

/** Devuelve todos los textos de la interfaz en el idioma pedido. */
export function t(locale: Locale): UIStrings {
  return ui[locale];
}
