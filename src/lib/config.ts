/**
 * CONFIGURACIÓN GENERAL
 * ----------------------------------------------------------------------------
 * Interruptores que cambian el comportamiento del sitio sin tocar componentes.
 * Se controlan con variables de entorno (en Vercel/Cloudflare: Settings →
 * Environment Variables; en local: archivo .env).
 */

/**
 * Mostrar las marcas "Pendiente de contenido" donde falta información.
 * Útil mientras el cliente revisa. En producción: PUBLIC_SHOW_PENDING=false.
 */
export const showPending = import.meta.env.PUBLIC_SHOW_PENDING !== 'false';
