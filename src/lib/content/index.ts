/**
 * CAPA DE CONTENIDO: la única puerta de entrada a los datos editables
 * ----------------------------------------------------------------------------
 * Páginas y componentes NUNCA leen Sanity ni `seed.ts` directamente: siempre
 * llaman a estas funciones (getHome, getMinistries...).
 *
 * ¿De dónde sale el contenido?
 *   - Sanity (el panel de administración) si está configurado el ID del
 *     proyecto (src/lib/sanity/config.ts).
 *   - Si no, del archivo local `seed.ts` (útil para desarrollar sin conexión).
 *
 * Cada función recibe el idioma y devuelve el contenido ya traducido, filtrado
 * (solo lo activo/publicable/autorizado) y ordenado.
 */
import { joinPathUrl, joinPaths as joinPathOrder, type Locale } from '@/i18n/routes';
import { cmsEnabled } from '@/lib/sanity/config';
import { fetchCmsContent, type CmsContent } from '@/lib/sanity/fetch';
import * as seedData from './seed';
import type {
  GalleryItem,
  Home,
  ImageRawRef,
  ImageRef,
  JoinPathItem,
  Localized,
  Maybe,
  Ministry,
  MinistryRaw,
  School,
  SchoolRaw,
  SiteSettings,
  Story,
} from './types';

export type * from './types';

/* ------------------------------------------------------- Fuente del contenido */

const seedContent: CmsContent = {
  siteSettings: seedData.siteSettings,
  home: seedData.home,
  ministries: seedData.ministries,
  schools: seedData.schools,
  joinPaths: seedData.joinPaths,
  gallery: seedData.gallery,
  stories: seedData.stories,
};

/** Todo el contenido en bruto (sin traducir), desde Sanity o desde el archivo local. */
function source(): Promise<CmsContent> {
  return cmsEnabled ? fetchCmsContent() : Promise.resolve(seedContent);
}

/* ---------------------------------------------------------------- Utilidades */

/** Texto o lista vacíos cuentan como "no traducido". */
const isEmpty = (v: unknown) => v == null || v === '' || (Array.isArray(v) && v.length === 0);

/** Devuelve el texto en el idioma pedido; si falta o está vacío, cae al español. */
export function localize<T>(value: Localized<T>, locale: Locale): T {
  const translated = value[locale];
  return isEmpty(translated) ? value.es : (translated as T);
}

/** Igual que `localize`, pero respeta los campos pendientes (`null`). */
function localizeMaybe<T>(value: Maybe<Localized<T>>, locale: Locale): Maybe<T> {
  return value ? localize(value, locale) : null;
}

function resolveImage(image: ImageRawRef, locale: Locale): ImageRef {
  return {
    src: image.src,
    alt: localize(image.alt, locale),
    temporary: image.temporary ?? false,
    width: image.width,
    height: image.height,
    position: image.position,
  };
}

function resolveImageMaybe(image: Maybe<ImageRawRef>, locale: Locale): Maybe<ImageRef> {
  return image ? resolveImage(image, locale) : null;
}

/** "+57 311 533 2741" → "tel:+573115332741" */
function telHref(number: string): string {
  return `tel:${number.replace(/[^\d+]/g, '')}`;
}

/** Enlace de WhatsApp con mensaje opcional ya escrito. */
export function whatsappUrl(number: string, message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${text}`;
}

const byOrder = (a: { order: number }, b: { order: number }) => a.order - b.order;

/* ------------------------------------------------------ Configuración global */

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  const s = (await source()).siteSettings;
  return {
    organizationName: localize(s.organizationName, locale),
    tagline: localize(s.tagline, locale),
    shortDescription: localize(s.shortDescription, locale),
    email: s.email,
    phones: s.phones.map((p) => ({ label: localize(p.label, locale), number: p.number, href: telHref(p.number) })),
    whatsapp: s.whatsapp,
    location: localizeMaybe(s.location, locale),
    social: s.social,
  };
}

/* ------------------------------------------------------------------- Inicio */

export async function getHome(locale: Locale): Promise<Home> {
  const h = (await source()).home;
  return {
    seo: { title: localize(h.seo.title, locale), description: localize(h.seo.description, locale) },
    hero: {
      eyebrow: localize(h.hero.eyebrow, locale),
      titleLines: localize(h.hero.titleLines, locale),
      description: localize(h.hero.description, locale),
      primaryCta: localize(h.hero.primaryCta, locale),
      secondaryCta: localize(h.hero.secondaryCta, locale),
      image: resolveImage(h.hero.image, locale),
    },
    about: {
      eyebrow: localize(h.about.eyebrow, locale),
      statement: localize(h.about.statement, locale),
      cta: localize(h.about.cta, locale),
    },
    activities: localize(h.activities, locale),
    shortTerm: {
      question: localize(h.shortTerm.question, locale),
      text: localize(h.shortTerm.text, locale),
      cta: localize(h.shortTerm.cta, locale),
      image: resolveImage(h.shortTerm.image, locale),
    },
  };
}

/* --------------------------------------------------------------- Ministerios */

function resolveMinistry(m: MinistryRaw, locale: Locale): Ministry {
  return {
    slug: m.slug,
    name: localize(m.name, locale),
    shortDescription: localizeMaybe(m.shortDescription, locale),
    fullDescription: localizeMaybe(m.fullDescription, locale),
    activities: localize(m.activities, locale),
    image: resolveImageMaybe(m.image, locale),
    order: m.order,
  };
}

/** Ministerios activos, en el orden definido por JUCUM. */
export async function getMinistries(locale: Locale): Promise<Ministry[]> {
  return (await source()).ministries
    .filter((m) => m.active)
    .sort(byOrder)
    .map((m) => resolveMinistry(m, locale));
}

/** Slugs de todos los ministerios activos (para generar sus páginas individuales). */
export async function getMinistrySlugs(): Promise<string[]> {
  return (await source()).ministries.filter((m) => m.active).map((m) => m.slug);
}

export async function getMinistry(slug: string, locale: Locale): Promise<Maybe<Ministry>> {
  const m = (await source()).ministries.find((x) => x.slug === slug && x.active);
  return m ? resolveMinistry(m, locale) : null;
}

/* ------------------------------------------------------------------ Escuelas */

function resolveSchool(s: SchoolRaw, locale: Locale): School {
  return {
    slug: s.slug,
    name: localize(s.name, locale),
    fullName: localizeMaybe(s.fullName, locale),
    description: localizeMaybe(s.description, locale),
    audience: localizeMaybe(s.audience, locale),
    duration: localizeMaybe(s.duration, locale),
    dates: localizeMaybe(s.dates, locale),
    location: localizeMaybe(s.location, locale),
    requirements: localizeMaybe(s.requirements, locale),
    cost: localizeMaybe(s.cost, locale),
    enrollment: localizeMaybe(s.enrollment, locale),
    activities: localize(s.activities, locale),
    // Solo encargados que autorizaron publicar sus datos.
    contacts: s.contacts.filter((c) => c.authorized).map((c) => ({
      name: c.name,
      role: localizeMaybe(c.role, locale),
      email: c.email,
      phone: c.phone,
      whatsapp: c.whatsapp,
      photo: resolveImageMaybe(c.photo, locale),
    })),
    image: resolveImageMaybe(s.image, locale),
    order: s.order,
  };
}

export async function getSchools(locale: Locale): Promise<School[]> {
  return (await source()).schools
    .filter((s) => s.active)
    .sort(byOrder)
    .map((s) => resolveSchool(s, locale));
}

export async function getSchoolSlugs(): Promise<string[]> {
  return (await source()).schools.filter((s) => s.active).map((s) => s.slug);
}

export async function getSchool(slug: string, locale: Locale): Promise<Maybe<School>> {
  const s = (await source()).schools.find((x) => x.slug === slug && x.active);
  return s ? resolveSchool(s, locale) : null;
}

/* ------------------------------------------------------ Caminos para participar */

export async function getJoinPaths(locale: Locale): Promise<JoinPathItem[]> {
  const paths = [...(await source()).joinPaths];
  // Siempre en el orden Orar · Servir · Venir · Apoyar.
  paths.sort((a, b) => joinPathOrder.indexOf(a.key) - joinPathOrder.indexOf(b.key));
  return paths.map((p) => ({
    key: p.key,
    title: localize(p.title, locale),
    text: localize(p.text, locale),
    href: joinPathUrl(p.key, locale),
  }));
}

/* ------------------------------------------------------------------- Galería */

/** Solo elementos marcados como publicables (autorización de publicación). */
export async function getGallery(locale: Locale): Promise<GalleryItem[]> {
  return (await source()).gallery
    .filter((g) => g.publishable)
    .map((g) => ({ image: resolveImage(g.image, locale), title: localizeMaybe(g.title, locale), category: g.category }));
}

/* --------------------------------------------------------- Historias / testimonios */

/** Solo historias con TODAS las autorizaciones (nombre, foto, historia). */
export async function getStories(locale: Locale): Promise<Story[]> {
  return (await source()).stories
    .filter((s) => s.publishable && s.authorization.name && s.authorization.photo && s.authorization.story)
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      title: localize(s.title, locale),
      quote: localize(s.quote, locale),
      story: localize(s.story, locale),
      photo: resolveImageMaybe(s.photo, locale),
      ministrySlug: s.ministrySlug,
    }));
}
