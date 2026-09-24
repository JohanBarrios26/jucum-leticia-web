/**
 * PÁGINA DE INICIO (documento único)
 * ----------------------------------------------------------------------------
 * Textos e imágenes propios del inicio. Los ministerios, escuelas, galería y
 * historias que aparecen en el inicio se editan en sus propias secciones.
 */
import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Página de inicio',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Portada', default: true},
    {name: 'about', title: 'Sobre JUCUM'},
    {name: 'activities', title: 'Qué hacemos'},
    {name: 'shortTerm', title: 'Corto plazo'},
    {name: 'seo', title: 'Google / redes'},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Portada',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'eyebrow', title: 'Texto pequeño superior', type: 'localeString'}),
        defineField({
          name: 'titleLines',
          title: 'Título grande (una línea por elemento)',
          type: 'localeStringList',
          description: 'Cada elemento es una línea del título. La última línea se muestra en azul.',
        }),
        defineField({name: 'description', title: 'Descripción', type: 'localeText'}),
        defineField({name: 'primaryCta', title: 'Botón principal (lleva a "Sé parte")', type: 'localeString'}),
        defineField({name: 'secondaryCta', title: 'Botón secundario (lleva a "Quiénes somos")', type: 'localeString'}),
        defineField({
          name: 'image',
          title: 'Foto de portada',
          type: 'photo',
          description: 'Horizontal y de buena calidad. Marca el punto de interés para que no se recorte.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'Sobre JUCUM Leticia',
      type: 'object',
      group: 'about',
      fields: [
        defineField({name: 'eyebrow', title: 'Título pequeño', type: 'localeString'}),
        defineField({
          name: 'statement',
          title: 'Frase grande',
          type: 'localeText',
          description: 'Se ilumina palabra por palabra al bajar. Mejor si es de 1–3 frases.',
        }),
        defineField({name: 'cta', title: 'Texto del botón', type: 'localeString'}),
      ],
    }),
    defineField({
      name: 'activities',
      title: 'Actividades (cinta animada)',
      type: 'localeStringList',
      group: 'activities',
      description: 'Palabras cortas que pasan en movimiento. Ej: "Evangelización", "Plantación de iglesias".',
    }),
    defineField({
      name: 'shortTerm',
      title: 'Corto plazo misionero',
      type: 'object',
      group: 'shortTerm',
      fields: [
        defineField({name: 'question', title: 'Pregunta', type: 'localeString'}),
        defineField({name: 'text', title: 'Texto', type: 'localeText'}),
        defineField({name: 'cta', title: 'Texto del botón (abre WhatsApp)', type: 'localeString'}),
        defineField({name: 'image', title: 'Foto de fondo', type: 'photo', validation: (rule) => rule.required()}),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Cómo aparece en Google y al compartir',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'localeString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Descripción',
          type: 'localeText',
          description: 'Ideal: entre 120 y 160 caracteres.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Página de inicio'})},
})
