/**
 * CONEXIÓN CON SANITY (el panel de administración)
 * ----------------------------------------------------------------------------
 * El ID del proyecto no es secreto: el contenido publicado es público y el
 * sitio solo lo LEE. Ningún token ni contraseña vive en el código del sitio.
 *
 * Mientras el ID sea 'pendiente', el sitio usa el contenido local de
 * src/lib/content/seed.ts. Debe coincidir con studio/env.ts.
 */
export const sanityConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'pendiente',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  // Versión fija de la API: garantiza que las respuestas no cambien con el tiempo.
  apiVersion: '2025-08-01',
};

/** true cuando el sitio lee el contenido desde Sanity. */
export const cmsEnabled = sanityConfig.projectId !== 'pendiente';
