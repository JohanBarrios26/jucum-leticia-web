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
  GalleryCategory,
  GalleryItemRaw,
  HomeRaw,
  ImageRawRef,
  JoinPathRaw,
  Localized,
  MinistryRaw,
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

const query = `{
  "siteSettings": *[_id == "siteSettings"][0],
  "home": *[_id == "home"][0]{
    ...,
    hero{..., image${photo}},
    shortTerm{..., image${photo}}
  },
  "ministries": *[_type == "ministry"] | order(orderRank){
    ..., "slug": slug.current, image${photo}
  },
  "schools": *[_type == "school"] | order(orderRank){
    ..., "slug": slug.current, image${photo},
    contacts[]{..., photo${photo}}
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
    home: toHome(r.home),
    ministries: (r.ministries ?? []).map(toMinistry),
    schools: (r.schools ?? []).map(toSchool),
    joinPaths: (r.joinPaths ?? [])
      .filter((p: Doc) => p.key)
      .map((p: Doc) => ({ key: p.key, title: p.title, text: p.text })),
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
