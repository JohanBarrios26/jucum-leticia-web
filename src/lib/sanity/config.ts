/**
 * CONEXIÓN CON SANITY (el panel de administración)
 * ----------------------------------------------------------------------------
 * El ID del proyecto no es secreto: el contenido publicado es público y el
 * sitio solo lo LEE. Ningún token ni contraseña vive en el código del sitio.
 *
 * Debe coincidir con studio/env.ts. Se puede sobrescribir con las variables
 * de entorno PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET.
 */
export const sanityConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'dukpncxs',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  // Versión fija de la API: garantiza que las respuestas no cambien con el tiempo.
  apiVersion: '2025-08-01',
};
