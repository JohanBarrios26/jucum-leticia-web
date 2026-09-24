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

export const pageTexts = defineType({
  name: 'pageTexts',
  title: 'Textos de las páginas',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    intro('ministriesIntro', 'Página "Ministerios"'),
    intro('peopleIntro', 'Página "Personas" (el equipo)'),
    intro('schoolsIntro', 'Página "Escuelas"'),
    intro('joinIntro', 'Página "Sé parte"'),
    intro('contactIntro', 'Página "Contacto"'),
  ],
  preview: {prepare: () => ({title: 'Textos de las páginas'})},
})
