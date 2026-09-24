/**
 * LISTA DE TODOS LOS TIPOS DE CONTENIDO DEL PANEL
 * Para agregar un tipo nuevo: créalo en documents/ u objects/ e inclúyelo aquí.
 */
import {about} from './documents/about'
import {galleryItem} from './documents/galleryItem'
import {home} from './documents/home'
import {joinPath} from './documents/joinPath'
import {ministry} from './documents/ministry'
import {pageTexts} from './documents/pageTexts'
import {person} from './documents/person'
import {school} from './documents/school'
import {siteSettings} from './documents/siteSettings'
import {story} from './documents/story'
import {featureTypes} from './objects/features'
import {localeString, localeStringList, localeText} from './objects/localized'
import {photo} from './objects/photo'

export const schemaTypes = [
  // Objetos reutilizables
  localeString,
  localeText,
  localeStringList,
  photo,
  ...featureTypes,
  // Documentos
  siteSettings,
  home,
  about,
  pageTexts,
  person,
  ministry,
  school,
  joinPath,
  galleryItem,
  story,
]

/** Documentos únicos: existe uno solo de cada uno (no se crean ni se borran). */
export const singletonIds: Record<string, string> = {
  siteSettings: 'siteSettings',
  home: 'home',
  about: 'about',
  pageTexts: 'pageTexts',
}

/** Tipos que no se pueden crear ni borrar desde el panel. */
export const fixedTypes = ['siteSettings', 'home', 'about', 'pageTexts', 'joinPath']
