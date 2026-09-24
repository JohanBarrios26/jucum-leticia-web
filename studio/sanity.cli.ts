/**
 * CONFIGURACIÓN DE LA LÍNEA DE COMANDOS DE SANITY
 * `studioHost` define la dirección del panel publicado:
 *   https://jucum-leticia.sanity.studio
 */
import {defineCliConfig} from 'sanity/cli'
import {dataset, projectId} from './env'

export default defineCliConfig({
  api: {projectId, dataset},
  studioHost: 'jucum-leticia',
  deployment: {
    // El panel se actualiza solo a la última versión compatible de Sanity.
    autoUpdates: true,
  },
})
