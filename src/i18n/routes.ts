/**
 * MAPA DE RUTAS E IDIOMAS
 * ----------------------------------------------------------------------------
 * El sitio usa URLs traducidas (no solo con prefijo):
 *     /quienes-somos/   ↔   /en/about/
 * Por eso NUNCA se escriben rutas a mano en los componentes: siempre se usan
 * `routes.xxx[locale]` o las funciones de este archivo. Así el selector de
 * idioma y las etiquetas SEO (hreflang) siempre apuntan a la página correcta.
 *
 * ¿Agregar una página nueva?
 *   1. Añádela a `routes` con su URL en cada idioma.
 *   2. Crea los archivos en src/pages/ (español) y src/pages/en/ (inglés).
 *   3. Si va en el menú, añade su clave a `mainNav` y su etiqueta en ui.ts.
 */

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/** La URL de una misma página en cada idioma, ej. { es: '/quienes-somos/', en: '/en/about/' }. */
export type Alternates = Record<Locale, string>;

/** Todas las páginas fijas del sitio y su URL en cada idioma. */
export const routes = {
  home: { es: '/', en: '/en/' },
  about: { es: '/quienes-somos/', en: '/en/about/' },
  ministries: { es: '/ministerios/', en: '/en/ministries/' },
  schools: { es: '/escuelas/', en: '/en/schools/' },
  join: { es: '/se-parte/', en: '/en/get-involved/' },
  people: { es: '/personas/', en: '/en/people/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
} satisfies Record<string, Alternates>;

export type RouteKey = keyof typeof routes;

/** Orden del menú principal (definido en la especificación §3). */
export const mainNav: RouteKey[] = ['home', 'about', 'ministries', 'schools', 'join', 'contact'];

/* ------------------------------------------------ Páginas dinámicas (por slug) */
// El slug es el mismo en ambos idiomas (viene del CMS), solo cambia la carpeta.

/** URLs de la página de un ministerio en ambos idiomas. */
export function ministryAlternates(slug: string): Alternates {
  return { es: `${routes.ministries.es}${slug}/`, en: `${routes.ministries.en}${slug}/` };
}

/** URLs de la página de una persona del equipo en ambos idiomas. */
export function personAlternates(slug: string): Alternates {
  return { es: `${routes.people.es}${slug}/`, en: `${routes.people.en}${slug}/` };
}

/** URLs de la página de una escuela en ambos idiomas. */
export function schoolAlternates(slug: string): Alternates {
  return { es: `${routes.schools.es}${slug}/`, en: `${routes.schools.en}${slug}/` };
}

/** Página de agradecimiento tras enviar el formulario (no va en el menú ni en Google). */
export const contactThanks: Alternates = { es: '/contacto/gracias/', en: '/en/contact/thanks/' };

/* ---------------------------------------------- Los 4 caminos para participar */

export const joinPaths = ['pray', 'serve', 'come', 'support'] as const;
export type JoinPath = (typeof joinPaths)[number];

/** Anclas (#id) de cada camino dentro de la página "Sé parte". */
const joinAnchors: Record<JoinPath, Alternates> = {
  pray: { es: 'orando', en: 'praying' },
  serve: { es: 'sirviendo', en: 'serving' },
  come: { es: 'viniendo', en: 'coming' },
  support: { es: 'apoyando', en: 'supporting' },
};

export function joinAnchorId(path: JoinPath, locale: Locale): string {
  return joinAnchors[path][locale];
}

/** Ej. joinPathUrl('come', 'es') → '/se-parte/#viniendo' */
export function joinPathUrl(path: JoinPath, locale: Locale): string {
  return `${routes.join[locale]}#${joinAnchorId(path, locale)}`;
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}
