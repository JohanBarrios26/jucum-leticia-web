/**
 * CAPA DE CONTENIDO: la única puerta de entrada a los datos editables
 * ----------------------------------------------------------------------------
 * Páginas y componentes NUNCA leen Sanity directamente: siempre
 * llaman a estas funciones (getHome, getMinistries...).
 *
 * Todo el contenido viene de Sanity (el panel de administración), leído una
 * sola vez por compilación en src/lib/sanity/fetch.ts.
 *
 * Cada función recibe el idioma y devuelve el contenido ya traducido, filtrado
 * (solo lo activo/publicable/autorizado) y ordenado.
 */
import { joinPathUrl, joinPaths as joinPathOrder, type Locale } from '@/i18n/routes';
import { fetchCmsContent, type CmsContent } from '@/lib/sanity/fetch';
import type {
  About,
  FeatureBlock,
  FeatureBlockRaw,
  GalleryItem,
  Home,
  ImageRawRef,
  ImageRef,
  JoinPathItem,
  Localized,
  Maybe,
  Ministry,
  MinistryRaw,
  PageTexts,
  Person,
  PersonRaw,
  School,
  SchoolRaw,
  SiteSettings,
  Story,
} from './types';

export type * from './types';

/* ------------------------------------------------------- Fuente del contenido */

/** Todo el contenido en bruto (sin traducir) desde Sanity. */
function source(): Promise<CmsContent> {
  return fetchCmsContent();
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

/**
 * URL de la imagen para compartir en redes (1200×630, recortada) a partir de
 * una foto del panel. Las imágenes locales no aplican (devuelve undefined).
 */
export function ogImageUrl(image: Maybe<ImageRef> | undefined): string | undefined {
  if (!image || typeof image.src !== 'string') return undefined;
  return `${image.src}?w=1200&h=630&fit=crop&auto=format&q=75`;
}

/** Enlace de WhatsApp con mensaje opcional ya escrito. */
export function whatsappUrl(number: string, message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${text}`;
}

const byOrder = (a: { order: number }, b: { order: number }) => a.order - b.order;

/** Extrae el ID de un enlace de YouTube (youtu.be/ID, watch?v=ID, shorts/ID, embed/ID). */
function youtubeId(url: string): Maybe<string> {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/** Resuelve los bloques especiales al idioma pedido. */
function resolveFeatures(list: FeatureBlockRaw[], locale: Locale): FeatureBlock[] {
  return list.map((b): FeatureBlock => {
    switch (b.type) {
      case 'audioSamples':
        return {
          type: b.type,
          title: localizeMaybe(b.title, locale),
          intro: localizeMaybe(b.intro, locale),
          // Solo audios autorizados para publicar.
          samples: b.samples
            .filter((a) => a.authorized)
            .map((a) => ({
              language: a.language,
              community: a.community,
              reference: a.reference,
              text: localize(a.text, locale),
              audioUrl: a.audioUrl,
              mimeType: a.mimeType,
            })),
        };
      case 'riverRoute':
        return {
          type: b.type,
          title: localizeMaybe(b.title, locale),
          intro: localizeMaybe(b.intro, locale),
          stops: b.stops.map((x) => ({ name: x.name, note: localizeMaybe(x.note, locale) })),
        };
      case 'timeline':
        return {
          type: b.type,
          title: localizeMaybe(b.title, locale),
          intro: localizeMaybe(b.intro, locale),
          steps: b.steps.map((x) => ({
            label: localizeMaybe(x.label, locale),
            title: localize(x.title, locale),
            text: localizeMaybe(x.text, locale),
          })),
        };
      case 'verse':
        return { type: b.type, text: localize(b.text, locale), reference: b.reference };
      case 'video':
        return { type: b.type, title: localizeMaybe(b.title, locale), url: b.url, youtubeId: youtubeId(b.url) };
      case 'checklist':
        return { type: b.type, title: localizeMaybe(b.title, locale), items: localize(b.items, locale) };
      case 'stats':
        return {
          type: b.type,
          title: localizeMaybe(b.title, locale),
          items: b.items.map((x) => ({ value: x.value, label: localize(x.label, locale) })),
        };
    }
  });
}

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
    motif: m.motif,
    features: resolveFeatures(m.features, locale),
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
    motif: s.motif,
    features: resolveFeatures(s.features, locale),
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
    body: localizeMaybe(p.body, locale),
    details: p.details.map((d) => ({ label: localize(d.label, locale), value: localizeMaybe(d.value, locale) })),
    whatsappMessage: localizeMaybe(p.whatsappMessage, locale),
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

/* ------------------------------------------------------------ Quiénes somos */

export async function getAbout(locale: Locale): Promise<About> {
  const a = (await source()).about;
  return {
    image: resolveImageMaybe(a.image, locale),
    intro: localize(a.intro, locale),
    mission: localizeMaybe(a.mission, locale),
    vision: localizeMaybe(a.vision, locale),
    values: a.values.map((v) => ({ title: localize(v.title, locale), text: localizeMaybe(v.text, locale) })),
    history: a.history.map((h) => ({
      year: h.year,
      title: localize(h.title, locale),
      text: localizeMaybe(h.text, locale),
      image: resolveImageMaybe(h.image, locale),
    })),
    teamIntro: localizeMaybe(a.teamIntro, locale),
  };
}

/* ----------------------------------------------------------------- Personas */

/**
 * Personas del equipo que autorizaron publicar sus datos, en el orden del panel.
 * Con `ministrySlug` devuelve solo las de ese ministerio.
 */
export async function getPeople(locale: Locale, ministrySlug?: string): Promise<Person[]> {
  return (await source()).people
    .filter((p) => p.authorized && (!ministrySlug || p.ministrySlug === ministrySlug))
    .map((p) => resolvePerson(p, locale));
}

/** Slugs de las personas publicadas (para generar sus páginas). */
export async function getPersonSlugs(): Promise<string[]> {
  return (await source()).people.filter((p) => p.authorized).map((p) => p.slug);
}

export async function getPerson(slug: string, locale: Locale): Promise<Maybe<Person>> {
  const p = (await source()).people.find((x) => x.slug === slug && x.authorized);
  return p ? resolvePerson(p, locale) : null;
}

function resolvePerson(p: PersonRaw, locale: Locale): Person {
  return {
      slug: p.slug,
      name: p.name,
      country: localizeMaybe(p.country, locale),
      support: { enabled: p.support.enabled, link: p.support.link, text: localizeMaybe(p.support.text, locale) },
      photo: resolveImageMaybe(p.photo, locale),
      role: localizeMaybe(p.role, locale),
      ministrySlug: p.ministrySlug,
      since: p.since,
      quote: localizeMaybe(p.quote, locale),
      bio: localizeMaybe(p.bio, locale),
      prayerRequest: localizeMaybe(p.prayerRequest, locale),
  };
}

/* ------------------------------------------------------- Textos de las páginas */

export async function getPageTexts(locale: Locale): Promise<PageTexts> {
  const t = (await source()).pageTexts;
  return {
    ministriesIntro: localizeMaybe(t.ministriesIntro, locale),
    peopleIntro: localizeMaybe(t.peopleIntro, locale),
    schoolsIntro: localizeMaybe(t.schoolsIntro, locale),
    joinIntro: localizeMaybe(t.joinIntro, locale),
    contactIntro: localizeMaybe(t.contactIntro, locale),
  };
}
