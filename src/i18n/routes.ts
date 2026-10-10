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
 *   2. Crea los archivos en src/pages/ (español), src/pages/en/ y src/pages/pt/.
 *   3. Si va en el menú, añade su clave a `mainNav` y su etiqueta en ui.ts.
 */

export const locales = ['es', 'en', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/** La URL de una misma página en cada idioma, ej. { es: '/quienes-somos/', en: '/en/about/', pt: '/pt/quem-somos/' }. */
export type Alternates = Record<Locale, string>;

/** Todas las páginas fijas del sitio y su URL en cada idioma. */
export const routes = {
  home: { es: '/', en: '/en/', pt: '/pt/' },
  about: { es: '/quienes-somos/', en: '/en/about/', pt: '/pt/quem-somos/' },
  bases: { es: '/bases/', en: '/en/bases/', pt: '/pt/bases/' },
  ministries: { es: '/ministerios/', en: '/en/ministries/', pt: '/pt/ministerios/' },
  schools: { es: '/escuelas/', en: '/en/schools/', pt: '/pt/escolas/' },
  join: { es: '/se-parte/', en: '/en/get-involved/', pt: '/pt/participe/' },
  people: { es: '/personas/', en: '/en/people/', pt: '/pt/pessoas/' },
  contact: { es: '/contacto/', en: '/en/contact/', pt: '/pt/contato/' },
} satisfies Record<string, Alternates>;

export type RouteKey = keyof typeof routes;

/** Orden del menú principal (definido en la especificación §3). */
// "Bases" se agregó a pedido del cliente (no estaba en la especificación original).
export const mainNav: RouteKey[] = ['home', 'about', 'bases', 'ministries', 'schools', 'join', 'contact'];

/* ------------------------------------------------ Páginas dinámicas (por slug) */
// El slug es el mismo en ambos idiomas (viene del CMS), solo cambia la carpeta.

/** URLs de la página de un ministerio en ambos idiomas. */
export function ministryAlternates(slug: string): Alternates {
  return { es: `${routes.ministries.es}${slug}/`, en: `${routes.ministries.en}${slug}/`, pt: `${routes.ministries.pt}${slug}/` };
}

/** URLs de la página de una base en ambos idiomas. */
export function baseAlternates(slug: string): Alternates {
  return { es: `${routes.bases.es}${slug}/`, en: `${routes.bases.en}${slug}/`, pt: `${routes.bases.pt}${slug}/` };
}

/** URLs de la página de una persona del equipo en ambos idiomas. */
export function personAlternates(slug: string): Alternates {
  return { es: `${routes.people.es}${slug}/`, en: `${routes.people.en}${slug}/`, pt: `${routes.people.pt}${slug}/` };
}

/** URLs de la página de una escuela en ambos idiomas. */
export function schoolAlternates(slug: string): Alternates {
  return { es: `${routes.schools.es}${slug}/`, en: `${routes.schools.en}${slug}/`, pt: `${routes.schools.pt}${slug}/` };
}

/** Página de agradecimiento tras enviar el formulario (no va en el menú ni en Google). */
export const contactThanks: Alternates = {
  es: '/contacto/gracias/',
  en: '/en/contact/thanks/',
  pt: '/pt/contato/obrigado/',
};

/** Página aparte "Vive el Amazonas" (no va en el menú: se destaca en el inicio y en el pie). */
export const amazonRoute: Alternates = {
  es: '/vive-el-amazonas/',
  en: '/en/live-the-amazon/',
  pt: '/pt/viva-a-amazonia/',
};

/* ------------------------------------------------------------ Páginas legales */
// Políticas exigidas por la ley (privacidad, términos, cookies, donaciones).
// Su texto está en src/i18n/legal.ts; aquí solo sus direcciones.
export const legalPages = ['privacy', 'terms', 'cookies', 'refunds'] as const;
export type LegalPage = (typeof legalPages)[number];

export const legalRoutes: Record<LegalPage, Alternates> = {
  privacy: { es: '/privacidad/', en: '/en/privacy/', pt: '/pt/privacidade/' },
  terms: { es: '/terminos/', en: '/en/terms/', pt: '/pt/termos/' },
  cookies: { es: '/cookies/', en: '/en/cookies/', pt: '/pt/cookies/' },
  refunds: { es: '/donaciones-reembolsos/', en: '/en/donations-refunds/', pt: '/pt/doacoes-reembolsos/' },
};

/* ---------------------------------------------- Los 4 caminos para participar */

export const joinPaths = ['pray', 'serve', 'come', 'support'] as const;
export type JoinPath = (typeof joinPaths)[number];

/** Anclas (#id) de cada camino dentro de la página "Sé parte". */
const joinAnchors: Record<JoinPath, Alternates> = {
  pray: { es: 'orando', en: 'praying', pt: 'orando' },
  serve: { es: 'sirviendo', en: 'serving', pt: 'servindo' },
  come: { es: 'viniendo', en: 'coming', pt: 'vindo' },
  support: { es: 'apoyando', en: 'supporting', pt: 'apoiando' },
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
