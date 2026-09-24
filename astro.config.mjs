// @ts-check
/**
 * CONFIGURACIÓN DE ASTRO
 * ----------------------------------------------------------------------------
 * - `site`: dominio público del sitio. Se usa para URLs canónicas, sitemap y
 *   Open Graph. Se detecta solo en Vercel y Cloudflare Pages; cuando JUCUM
 *   compre su dominio, define la variable de entorno SITE_URL
 *   (ej. https://jucumleticia.org) en el hosting y listo.
 * - `output: 'static'`: se generan archivos HTML puros. Es lo más rápido para
 *   conexiones lentas (Amazonas) y lo más duradero: se puede alojar en cualquier
 *   servicio sin servidor ni base de datos.
 * - `i18n`: español por defecto (sin prefijo) e inglés bajo /en/.
 */
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site =
  process.env.SITE_URL ??
  // Vercel: dominio de producción del proyecto (ej. jucum-leticia-web.vercel.app).
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ??
  // Cloudflare Pages: URL de la publicación actual.
  process.env.CF_PAGES_URL ??
  'http://localhost:4321';

export default defineConfig({
  site,
  output: 'static',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
});
