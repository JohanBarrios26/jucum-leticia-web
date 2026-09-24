/**
 * DATOS DEL PROYECTO EN SANITY
 * ----------------------------------------------------------------------------
 * El ID del proyecto NO es secreto (aparece en las URLs de las imágenes).
 * Lo comparten este panel y el sitio web (ver src/lib/sanity/config.ts).
 * Se puede sobrescribir con la variable de entorno SANITY_STUDIO_PROJECT_ID.
 */
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'dukpncxs'
export const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
