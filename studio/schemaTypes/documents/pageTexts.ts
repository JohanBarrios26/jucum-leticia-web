/**
 * TEXTOS DE LAS PÁGINAS (documento único)
 * ----------------------------------------------------------------------------
 * La frase de introducción que aparece bajo el título de cada página interna.
 * Los títulos (Ministerios, Escuelas…) son fijos porque forman parte del menú.
 */
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

const intro = (name: string, title: string) =>
  defineField({name, title, type: 'localeText', description: 'Una o dos frases bajo el título de la página.'})

const cover = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'photo',
    description: 'Foto grande que acompaña el título de la página. Horizontal y de buena calidad.',
  })

export const pageTexts = defineType({
  name: 'pageTexts',
  title: 'Textos de las páginas',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    intro('basesIntro', 'Página "Bases"'),
    intro('ministriesIntro', 'Página "Ministerios"'),
    intro('peopleIntro', 'Página "Personas" (el equipo)'),
    intro('schoolsIntro', 'Página "Escuelas"'),
    intro('joinIntro', 'Página "Sé parte"'),
    intro('contactIntro', 'Página "Contacto"'),
    cover('basesImage', 'Foto de portada: Bases'),
    cover('ministriesImage', 'Foto de portada: Ministerios'),
    cover('peopleImage', 'Foto de portada: Personas (el equipo)'),
    cover('schoolsImage', 'Foto de portada: Escuelas'),
    cover('joinImage', 'Foto de portada: Sé parte'),
    cover('contactImage', 'Foto de portada: Contacto'),
  ],
  preview: {prepare: () => ({title: 'Textos de las páginas'})},
})
