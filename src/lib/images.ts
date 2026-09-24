/**
 * URLS DE IMÁGENES DEL CDN DE SANITY
 * ----------------------------------------------------------------------------
 * Arma las URLs con los parámetros del CDN (ancho, calidad, formato automático
 * AVIF/WebP y, si se pide, recorte centrado en el punto de interés).
 * Lo usan SmartImage.astro (para <img srcset>) y BaseLayout.astro (para
 * precargar la foto de portada).
 */
import type { ImageRef } from '@/lib/content';

export const DEFAULT_WIDTHS = [480, 768, 1080, 1440, 1920];

/** Anchos disponibles sin agrandar la foto original. */
export function usableWidths(image: ImageRef, widths = DEFAULT_WIDTHS): number[] {
  const max = image.width ?? Math.max(...widths);
  const list = widths.filter((w) => w <= max);
  return list.length > 0 ? list : [max];
}

/**
 * URL de una foto remota a un ancho dado.
 * `ratio` (alto/ancho) = recortar a esa forma centrando el punto de interés.
 */
export function remoteUrl(image: ImageRef, w: number, ratio?: number): string {
  const base = String(image.src);
  if (!ratio) return `${base}?w=${w}&q=60&auto=format&fit=max`;
  // Punto de interés ("50% 30%") → focal point del CDN (0.5, 0.3).
  const [fx, fy] = (image.position ?? '50% 50%').split(' ').map((v) => Number.parseFloat(v) / 100);
  return `${base}?w=${w}&h=${Math.round(w * ratio)}&fit=crop&crop=focalpoint&fp-x=${fx}&fp-y=${fy}&q=60&auto=format`;
}

/** Valor del atributo srcset ("url 480w, url 768w, …"). */
export function remoteSrcset(image: ImageRef, widths = DEFAULT_WIDTHS, ratio?: number): string {
  return usableWidths(image, widths)
    .map((w) => `${remoteUrl(image, w, ratio)} ${w}w`)
    .join(', ');
}
