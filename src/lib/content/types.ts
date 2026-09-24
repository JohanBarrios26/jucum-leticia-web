/**
 * TIPOS DEL CONTENIDO EDITABLE
 * ----------------------------------------------------------------------------
 * Describen la forma de todo lo que JUCUM edita desde el panel (Sanity).
 * Hay dos versiones de cada tipo:
 *   - `XxxRaw`: como se guarda (textos en ambos idiomas: { es, en }).
 *   - `Xxx`:    como lo reciben los componentes (ya resuelto a un idioma).
 *
 * ¿Agregar un campo nuevo?
 *   1. Agrégalo al esquema del panel (studio/schemaTypes/...).
 *   2. Añádelo aquí en ambos tipos.
 *   3. Conviértelo en src/lib/sanity/fetch.ts y resuélvelo en index.ts.
 */
import type { ImageMetadata } from 'astro';
import type { Locale } from '@/i18n/routes';

/**
 * Campo traducible. El español es obligatorio; el inglés es opcional y, si falta,
 * se muestra el español (así nunca queda un hueco si alguien no ha traducido).
 */
export type Localized<T = string> = { es: T } & Partial<Record<Exclude<Locale, 'es'>, T>>;

/** `null` = "JUCUM aún no lo ha confirmado": se muestra como pendiente, nunca se inventa. */
export type Maybe<T> = T | null;

/* ---------------------------------------------------------------- Imágenes */

/**
 * Una imagen. `src` es la URL del CDN de Sanity (o un archivo local importado).
 * `temporary` marca fotos provisionales que deben reemplazarse por fotos reales
 * de JUCUM con autorización de publicación (especificación §21 y §32).
 */
export interface ImageRawRef {
  src: ImageMetadata | string;
  alt: Localized;
  temporary?: boolean;
  /** Tamaño original (solo imágenes del CMS; las locales ya lo traen en `src`). */
  width?: number;
  height?: number;
  /** Punto de interés marcado en el panel, como CSS object-position (ej. "50% 30%"). */
  position?: string;
}

export interface ImageRef {
  src: ImageMetadata | string;
  alt: string;
  temporary: boolean;
  width?: number;
  height?: number;
  position?: string;
}

/* ------------------------------------------------------ Configuración global */

export interface PhoneRaw {
  label: Localized;
  /** Formato para mostrar, ej. "+57 311 533 2741". El enlace tel: se genera solo. */
  number: string;
}

export interface SocialLinks {
  instagram: Maybe<string>;
  facebook: Maybe<string>;
  youtube: Maybe<string>;
  tiktok: Maybe<string>;
}

/** Datos que aparecen en varias partes (encabezado, pie, contacto). Especificación §30. */
export interface SiteSettingsRaw {
  organizationName: Localized;
  tagline: Localized;
  shortDescription: Localized;
  email: string;
  phones: PhoneRaw[];
  /** Formato internacional sin espacios ni "+", como lo pide wa.me. Ej. "573115332741". */
  whatsapp: Maybe<string>;
  location: Maybe<Localized>;
  social: SocialLinks;
}

export interface Phone {
  label: string;
  number: string;
  href: string;
}

export interface SiteSettings {
  organizationName: string;
  tagline: string;
  shortDescription: string;
  email: string;
  phones: Phone[];
  whatsapp: Maybe<string>;
  location: Maybe<string>;
  social: SocialLinks;
}

/* ------------------------------------------------------------------- Inicio */

export interface HomeRaw {
  seo: { title: Localized; description: Localized };
  hero: {
    eyebrow: Localized;
    /** Cada elemento es una línea del título grande (se anima línea por línea). */
    titleLines: Localized<string[]>;
    description: Localized;
    primaryCta: Localized;
    secondaryCta: Localized;
    image: ImageRawRef;
  };
  about: {
    eyebrow: Localized;
    /** Frase grande que se ilumina palabra por palabra al hacer scroll. */
    statement: Localized;
    cta: Localized;
  };
  /** Actividades confirmadas que se muestran en la cinta animada "Qué hacemos". */
  activities: Localized<string[]>;
  shortTerm: {
    question: Localized;
    text: Localized;
    cta: Localized;
    image: ImageRawRef;
  };
}

export interface Home {
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    titleLines: string[];
    description: string;
    primaryCta: string;
    secondaryCta: string;
    image: ImageRef;
  };
  about: { eyebrow: string; statement: string; cta: string };
  activities: string[];
  shortTerm: { question: string; text: string; cta: string; image: ImageRef };
}

/* --------------------------------------------------------------- Ministerios */

/** Modelo de ministerio (especificación §9, campos mínimos + los que ya tenemos). */
export interface MinistryRaw {
  slug: string;
  name: Localized;
  /** Resumen de 1–2 líneas para tarjetas. */
  shortDescription: Maybe<Localized>;
  fullDescription: Maybe<Localized>;
  activities: Localized<string[]>;
  image: Maybe<ImageRawRef>;
  /** Si es `false`, el ministerio no se muestra en ninguna parte (ocultar sin borrar). */
  active: boolean;
  /** Posición en las listas (1, 2, 3…). */
  order: number;
}

export interface Ministry {
  slug: string;
  name: string;
  shortDescription: Maybe<string>;
  fullDescription: Maybe<string>;
  activities: string[];
  image: Maybe<ImageRef>;
  order: number;
}

/* ------------------------------------------------------------------ Escuelas */

/** Persona encargada de una escuela específica (pedido del cliente). */
export interface SchoolContactRaw {
  name: string;
  role: Maybe<Localized>;
  email: Maybe<string>;
  phone: Maybe<string>;
  /** Formato wa.me, ej. "573001234567". */
  whatsapp: Maybe<string>;
  photo: Maybe<ImageRawRef>;
  /** La persona autorizó publicar sus datos. Si es false, no se muestra. */
  authorized: boolean;
}

export interface SchoolContact {
  name: string;
  role: Maybe<string>;
  email: Maybe<string>;
  phone: Maybe<string>;
  whatsapp: Maybe<string>;
  photo: Maybe<ImageRef>;
}

/** Escuela / programa (especificación §11). Los campos `null` se muestran como pendientes. */
export interface SchoolRaw {
  slug: string;
  /** Nombre corto o sigla, ej. "EDE". */
  name: Localized;
  /** Nombre completo, ej. "Escuela de Discipulado y Entrenamiento". */
  fullName: Maybe<Localized>;
  description: Maybe<Localized>;
  audience: Maybe<Localized>;
  duration: Maybe<Localized>;
  dates: Maybe<Localized>;
  location: Maybe<Localized>;
  requirements: Maybe<Localized>;
  cost: Maybe<Localized>;
  enrollment: Maybe<Localized>;
  activities: Localized<string[]>;
  contacts: SchoolContactRaw[];
  image: Maybe<ImageRawRef>;
  active: boolean;
  order: number;
}

export interface School {
  slug: string;
  name: string;
  fullName: Maybe<string>;
  description: Maybe<string>;
  audience: Maybe<string>;
  duration: Maybe<string>;
  dates: Maybe<string>;
  location: Maybe<string>;
  requirements: Maybe<string>;
  cost: Maybe<string>;
  enrollment: Maybe<string>;
  activities: string[];
  contacts: SchoolContact[];
  image: Maybe<ImageRef>;
  order: number;
}

/* ------------------------------------------------------ Caminos para participar */

export interface JoinPathRaw {
  /** Clave fija: define el ancla en la página "Sé parte" (ver src/i18n/routes.ts). */
  key: 'pray' | 'serve' | 'come' | 'support';
  title: Localized;
  text: Localized;
}

export interface JoinPathItem {
  key: JoinPathRaw['key'];
  title: string;
  text: string;
  href: string;
}

/* ------------------------------------------------------------------- Galería */

export const galleryCategories = [
  'territory',
  'people',
  'communities',
  'bible',
  'schools',
  'service',
  'missionLife',
  'team',
  'trips',
  'history',
] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryItemRaw {
  image: ImageRawRef;
  title: Maybe<Localized>;
  category: GalleryCategory;
  /** Solo se publica si es `true` (especificación §32: autorización de publicación). */
  publishable: boolean;
}

export interface GalleryItem {
  image: ImageRef;
  title: Maybe<string>;
  category: GalleryCategory;
}

/* --------------------------------------------------------- Historias / testimonios */

export interface StoryRaw {
  slug: string;
  name: string;
  title: Localized;
  quote: Localized;
  story: Localized;
  photo: Maybe<ImageRawRef>;
  ministrySlug: Maybe<string>;
  /** Todas las autorizaciones deben ser `true` para que la historia se publique. */
  authorization: { name: boolean; photo: boolean; story: boolean };
  publishable: boolean;
}

export interface Story {
  slug: string;
  name: string;
  title: string;
  quote: string;
  story: string;
  photo: Maybe<ImageRef>;
  ministrySlug: Maybe<string>;
}
