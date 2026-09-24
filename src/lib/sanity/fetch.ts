/**
 * LECTURA DEL CONTENIDO DESDE SANITY
 * ----------------------------------------------------------------------------
 * Una sola consulta GROQ trae TODO el contenido publicado del sitio. Se hace
 * una vez por compilación (el resultado se guarda en memoria), así generar
 * las 30+ páginas no hace 30+ peticiones.
 *
 * Después, `toRaw*` convierte cada documento de Sanity a los mismos tipos que
 * usa el resto del sitio (src/lib/content/types.ts). Por eso los componentes
 * no saben ni les importa de dónde viene el contenido.
 */
import { createClient } from '@sanity/client';
import type {
  AboutRaw,
  AccessMode,
  BaseRaw,
  FeatureBlockRaw,
  GalleryCategory,
  GalleryItemRaw,
  HomeRaw,
  ImageRawRef,
  JoinPathRaw,
  Localized,
  MinistryRaw,
  MotifName,
  PageTextsRaw,
  PersonRaw,
  SchoolRaw,
  SiteSettingsRaw,
  StoryRaw,
} from '@/lib/content/types';
import { sanityConfig } from './config';

const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  // Sin CDN: al compilar siempre se lee lo último publicado.
  useCdn: false,
  // Solo contenido publicado (nunca borradores).
  perspective: 'published',
});

/* ------------------------------------------------------------------ Consulta */

// Proyección reutilizable para fotos: URL, tamaño original y punto de interés.
const photo = `{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  hotspot, alt, temporary
}`;

// Bloques especiales: para los audios se trae la URL del archivo.
const features = `features[]{
  ...,
  samples[]{..., "audioUrl": audio.asset->url, "mimeType": audio.asset->mimeType}
}`;

const query = `{
  "siteSettings": *[_id == "siteSettings"][0],
  "home": *[_id == "home"][0]{
    ...,
    hero{..., image${photo}},
    shortTerm{..., image${photo}}
  },
  "ministries": *[_type == "ministry"] | order(orderRank){
    ..., "slug": slug.current, image${photo}, ${features}
  },
  "schools": *[_type == "school"] | order(orderRank){
    ..., "slug": slug.current, image${photo},
    contacts[]{..., photo${photo}}, ${features},
    "baseRef": base->{"slug": slug.current, name, active}
  },
  "bases": *[_type == "base"] | order(orderRank){
    ..., "slug": slug.current, image${photo}, gallery[]${photo},
    "programs": programs[]->{_type, "slug": slug.current, name, active}
  },
  "about": *[_id == "about"][0]{..., image${photo}, history[]{..., image${photo}}},
  "pageTexts": *[_id == "pageTexts"][0],
  "people": *[_type == "person"] | order(orderRank){
    ..., "slug": slug.current, photo${photo}, "ministrySlug": ministry->slug.current
  },
  "joinPaths": *[_type == "joinPath"],
  "gallery": *[_type == "galleryItem"] | order(orderRank){..., image${photo}},
  "stories": *[_type == "story"] | order(orderRank){
    ..., "slug": slug.current, photo${photo}, "ministrySlug": ministry->slug.current
  }
}`;

/* ------------------------------------------------------- Tipos de Sanity */
// Forma aproximada de lo que devuelve la consulta (campos opcionales = el
// editor pudo dejarlos vacíos).

type L<T = string> = Localized<T> | null | undefined;

interface SanityPhoto {
  url: string;
  width?: number;
  height?: number;
  hotspot?: { x: number; y: number } | null;
  alt?: L;
  temporary?: boolean;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Doc = Record<string, any>;

export interface CmsContent {
  siteSettings: SiteSettingsRaw;
  bases: BaseRaw[];
  about: AboutRaw;
  pageTexts: PageTextsRaw;
  people: PersonRaw[];
  home: HomeRaw;
  ministries: MinistryRaw[];
  schools: SchoolRaw[];
  joinPaths: JoinPathRaw[];
  gallery: GalleryItemRaw[];
  stories: StoryRaw[];
}

/* ------------------------------------------------------------- Conversión */

const orEmpty = <T,>(value: L<T>, empty: T): Localized<T> => value ?? { es: empty };

function toImage(p: SanityPhoto | null | undefined): ImageRawRef | null {
  if (!p?.url) return null;
  return {
    src: p.url,
    alt: orEmpty(p.alt, ''),
    temporary: p.temporary ?? false,
    width: p.width,
    height: p.height,
    // El punto de interés marcado por el editor → object-position en CSS.
    position: p.hotspot ? `${Math.round(p.hotspot.x * 100)}% ${Math.round(p.hotspot.y * 100)}%` : undefined,
  };
}

function toRequiredImage(p: SanityPhoto | null | undefined, where: string): ImageRawRef {
  const image = toImage(p);
  if (!image) throw new Error(`Falta la foto obligatoria en Sanity: ${where}`);
  return image;
}

const lx = <T,>(value: L<T>): Localized<T> | null => value ?? null;

function toMotif(value: unknown): MotifName | null {
  const valid = ['river', 'burst', 'book', 'crown', 'bridge', 'wave', 'pulse', 'path'];
  return typeof value === 'string' && valid.includes(value) ? (value as MotifName) : null;
}

/** Convierte los bloques especiales; descarta los que están incompletos. */
function toFeatures(list: Doc[] | null | undefined): FeatureBlockRaw[] {
  const out: FeatureBlockRaw[] = [];
  for (const b of list ?? []) {
    switch (b._type) {
      case 'audioSamples':
        out.push({
          type: 'audioSamples',
          title: lx(b.title),
          intro: lx(b.intro),
          samples: (b.samples ?? [])
            .filter((a: Doc) => a.audioUrl && a.reference && a.text)
            .map((a: Doc) => ({
              language: a.language,
              community: a.community ?? null,
              reference: a.reference,
              text: a.text,
              audioUrl: a.audioUrl,
              mimeType: a.mimeType ?? null,
              authorized: a.authorized === true,
            })),
        });
        break;
      case 'riverRoute':
        out.push({
          type: 'riverRoute',
          title: lx(b.title),
          intro: lx(b.intro),
          stops: (b.stops ?? []).filter((x: Doc) => x.name).map((x: Doc) => ({ name: x.name, note: lx(x.note) })),
        });
        break;
      case 'timeline':
        out.push({
          type: 'timeline',
          title: lx(b.title),
          intro: lx(b.intro),
          steps: (b.steps ?? [])
            .filter((x: Doc) => x.title)
            .map((x: Doc) => ({ label: lx(x.label), title: x.title, text: lx(x.text) })),
        });
        break;
      case 'verse':
        if (b.text && b.reference) out.push({ type: 'verse', text: b.text, reference: b.reference });
        break;
      case 'video':
        if (b.url) out.push({ type: 'video', title: lx(b.title), url: b.url });
        break;
      case 'checklist':
        out.push({ type: 'checklist', title: lx(b.title), items: orEmpty(b.items, []) });
        break;
      case 'stats':
        out.push({
          type: 'stats',
          title: lx(b.title),
          items: (b.items ?? []).filter((x: Doc) => x.value && x.label).map((x: Doc) => ({ value: x.value, label: x.label })),
        });
        break;
    }
  }
  return out;
}

function toAbout(d: Doc | null): AboutRaw {
  if (!d) throw new Error('Falta el documento "Quiénes somos" en Sanity.');
  return {
    image: toImage(d.image),
    intro: d.intro,
    mission: lx(d.mission),
    vision: lx(d.vision),
    values: (d.values ?? []).filter((v: Doc) => v.title).map((v: Doc) => ({ title: v.title, text: lx(v.text) })),
    history: (d.history ?? [])
      .filter((h: Doc) => h.year && h.title)
      .map((h: Doc) => ({ year: h.year, title: h.title, text: lx(h.text), image: toImage(h.image) })),
    teamIntro: lx(d.teamIntro),
  };
}

function toPerson(d: Doc): PersonRaw {
  return {
    slug: d.slug,
    name: d.name,
    members: (d.members ?? [])
      .filter((m: Doc) => m.name)
      .map((m: Doc) => ({ name: m.name, relation: m.relation === 'child' ? 'child' : 'adult' })),
    country: lx(d.country),
    support: {
      enabled: d.support?.enabled === true,
      link: d.support?.link ?? null,
      text: lx(d.support?.text),
    },
    photo: toImage(d.photo),
    role: lx(d.role),
    ministrySlug: d.ministrySlug ?? null,
    since: d.since ?? null,
    quote: lx(d.quote),
    bio: lx(d.bio),
    prayerRequest: lx(d.prayerRequest),
    authorized: d.authorized === true,
  };
}

function toSiteSettings(d: Doc | null): SiteSettingsRaw {
  if (!d) throw new Error('Falta el documento "Configuración del sitio" en Sanity.');
  return {
    organizationName: d.organizationName,
    tagline: d.tagline,
    shortDescription: d.shortDescription,
    email: d.email,
    phones: (d.phones ?? []).map((p: Doc) => ({ label: orEmpty(p.label, ''), number: p.number })),
    whatsapp: d.whatsapp ?? null,
    location: d.location ?? null,
    social: {
      instagram: d.social?.instagram ?? null,
      facebook: d.social?.facebook ?? null,
      youtube: d.social?.youtube ?? null,
      tiktok: d.social?.tiktok ?? null,
    },
  };
}

function toHome(d: Doc | null): HomeRaw {
  if (!d) throw new Error('Falta el documento "Página de inicio" en Sanity.');
  return {
    seo: { title: d.seo.title, description: d.seo.description },
    hero: {
      eyebrow: orEmpty(d.hero?.eyebrow, ''),
      titleLines: orEmpty(d.hero?.titleLines, []),
      description: orEmpty(d.hero?.description, ''),
      primaryCta: orEmpty(d.hero?.primaryCta, ''),
      secondaryCta: orEmpty(d.hero?.secondaryCta, ''),
      image: toRequiredImage(d.hero?.image, 'Inicio → Portada'),
    },
    about: {
      eyebrow: orEmpty(d.about?.eyebrow, ''),
      statement: orEmpty(d.about?.statement, ''),
      cta: orEmpty(d.about?.cta, ''),
    },
    activities: orEmpty(d.activities, []),
    shortTerm: {
      question: orEmpty(d.shortTerm?.question, ''),
      text: orEmpty(d.shortTerm?.text, ''),
      cta: orEmpty(d.shortTerm?.cta, ''),
      image: toRequiredImage(d.shortTerm?.image, 'Inicio → Corto plazo'),
    },
  };
}

function toMinistry(d: Doc, i: number): MinistryRaw {
  return {
    slug: d.slug,
    name: d.name,
    shortDescription: d.shortDescription ?? null,
    fullDescription: d.fullDescription ?? null,
    activities: orEmpty(d.activities, []),
    image: toImage(d.image),
    active: d.active !== false,
    order: i,
    motif: toMotif(d.motif),
    features: toFeatures(d.features),
  };
}

function toSchool(d: Doc, i: number): SchoolRaw {
  return {
    slug: d.slug,
    name: d.name,
    fullName: d.fullName ?? null,
    description: d.description ?? null,
    audience: d.audience ?? null,
    duration: d.duration ?? null,
    dates: d.dates ?? null,
    location: d.location ?? null,
    requirements: d.requirements ?? null,
    cost: d.cost ?? null,
    enrollment: d.enrollment ?? null,
    activities: orEmpty(d.activities, []),
    contacts: (d.contacts ?? []).map((c: Doc) => ({
      name: c.name,
      role: c.role ?? null,
      email: c.email ?? null,
      phone: c.phone ?? null,
      whatsapp: c.whatsapp ?? null,
      photo: toImage(c.photo),
      authorized: c.authorized === true,
    })),
    image: toImage(d.image),
    active: d.active !== false,
    order: i,
    motif: toMotif(d.motif),
    features: toFeatures(d.features),
    base: d.baseRef?.slug && d.baseRef.active !== false ? { slug: d.baseRef.slug, name: d.baseRef.name } : null,
  };
}

function toBase(d: Doc, i: number): BaseRaw {
  const modes = ['walk', 'river', 'road', 'air'];
  return {
    slug: d.slug,
    name: d.name,
    tagline: lx(d.tagline),
    location: lx(d.location),
    description: lx(d.description),
    image: toImage(d.image),
    motif: toMotif(d.motif),
    // Solo programas activos y con identificador.
    programs: (d.programs ?? [])
      .filter((p: Doc) => p?.slug && p.active !== false)
      .map((p: Doc) => ({ kind: p._type === 'ministry' ? 'ministry' : 'school', slug: p.slug, name: p.name })),
    accessFrom: d.accessFrom ?? null,
    accessRoutes: (d.accessRoutes ?? [])
      .filter((r: Doc) => modes.includes(r.mode) && r.duration)
      .map((r: Doc) => ({ mode: r.mode as AccessMode, duration: r.duration, note: lx(r.note) })),
    gallery: (d.gallery ?? []).map(toImage).filter(Boolean) as ImageRawRef[],
    videos: (d.videos ?? []).filter((v: Doc) => v.url).map((v: Doc) => ({ title: lx(v.title), url: v.url })),
    active: d.active !== false,
    order: i,
  };
}

function toStory(d: Doc): StoryRaw {
  return {
    slug: d.slug,
    name: d.name,
    title: orEmpty(d.title, ''),
    quote: d.quote,
    story: orEmpty(d.story, ''),
    photo: toImage(d.photo),
    ministrySlug: d.ministrySlug ?? null,
    authorization: {
      name: d.authorization?.name === true,
      photo: d.authorization?.photo === true,
      story: d.authorization?.story === true,
    },
    publishable: d.publishable === true,
  };
}

/* ------------------------------------------------------------ Punto de entrada */

let cache: Promise<CmsContent> | undefined;

/** Trae y convierte todo el contenido (una sola vez por compilación). */
export function fetchCmsContent(): Promise<CmsContent> {
  cache ??= client.fetch<Record<string, any>>(query).then((r) => ({
    siteSettings: toSiteSettings(r.siteSettings),
    bases: (r.bases ?? []).filter((b: Doc) => b.slug && b.name).map(toBase),
    about: toAbout(r.about),
    pageTexts: {
      basesIntro: lx(r.pageTexts?.basesIntro),
      ministriesIntro: lx(r.pageTexts?.ministriesIntro),
      peopleIntro: lx(r.pageTexts?.peopleIntro),
      schoolsIntro: lx(r.pageTexts?.schoolsIntro),
      joinIntro: lx(r.pageTexts?.joinIntro),
      contactIntro: lx(r.pageTexts?.contactIntro),
    },
    people: (r.people ?? []).filter((x: Doc) => x.name && x.slug).map(toPerson),
    home: toHome(r.home),
    ministries: (r.ministries ?? []).map(toMinistry),
    schools: (r.schools ?? []).map(toSchool),
    joinPaths: (r.joinPaths ?? [])
      .filter((p: Doc) => p.key)
      .map((p: Doc) => ({
        key: p.key,
        title: p.title,
        text: p.text,
        body: lx(p.body),
        details: (p.details ?? [])
          .filter((d: Doc) => d.label)
          .map((d: Doc) => ({ label: d.label, value: lx(d.value) })),
        whatsappMessage: lx(p.whatsappMessage),
      })),
    gallery: (r.gallery ?? [])
      .map((g: Doc) => ({
        image: toImage(g.image),
        title: g.title ?? null,
        category: g.category as GalleryCategory,
        publishable: g.publishable === true,
      }))
      .filter((g: { image: ImageRawRef | null }) => g.image) as GalleryItemRaw[],
    stories: (r.stories ?? []).map(toStory),
  }));
  return cache;
}
