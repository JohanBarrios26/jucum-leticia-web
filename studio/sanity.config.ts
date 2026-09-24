/**
 * CONFIGURACIÓN DEL PANEL DE ADMINISTRACIÓN (Sanity Studio)
 * ----------------------------------------------------------------------------
 * Aquí el equipo de JUCUM edita el contenido del sitio sin tocar código.
 * Publicado en: https://jucum-leticia.sanity.studio
 *
 * - `esESLocale`: la interfaz del panel en español.
 * - `structure`: el menú lateral (ver structure.ts).
 * - Documentos únicos (Configuración, Inicio) y los 4 caminos no se pueden
 *   crear ni borrar: solo editar.
 * - Al publicar un cambio, un webhook avisa a Vercel/Cloudflare y el sitio se
 *   vuelve a generar solo en 1–2 minutos (se configura en sanity.io/manage).
 */
import {esESLocale} from '@sanity/locale-es-es'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {dataset, projectId} from './env'
import {fixedTypes, schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'jucum-leticia',
  title: 'JUCUM Leticia',
  projectId,
  dataset,

  plugins: [
    structureTool({structure}),
    esESLocale(),
    // Herramienta para programadores: probar consultas GROQ.
    visionTool({defaultApiVersion: '2025-08-01'}),
  ],

  schema: {
    types: schemaTypes,
    // Oculta los tipos fijos del botón "Crear nuevo".
    templates: (templates) => templates.filter(({schemaType}) => !fixedTypes.includes(schemaType)),
  },

  document: {
    // En los tipos fijos solo se permite publicar, descartar cambios y restaurar (no duplicar ni borrar).
    actions: (actions, {schemaType}) =>
      fixedTypes.includes(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
