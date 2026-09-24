/**
 * QUIÉNES SOMOS (documento único) — especificación §7
 * ----------------------------------------------------------------------------
 * Contenido de la página /quienes-somos/: introducción, misión, visión,
 * valores e historia. El equipo se edita aparte, en "Personas".
 * Lo que JUCUM aún no ha confirmado se deja vacío y el sitio lo muestra
 * como "Pendiente de contenido" (nunca se inventa).
 */
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'Quiénes somos',
  type: 'document',
  icon: InfoOutlineIcon,
  groups: [
    {name: 'intro', title: 'Introducción', default: true},
    {name: 'identity', title: 'Misión, visión y valores'},
    {name: 'history', title: 'Historia'},
    {name: 'team', title: 'Equipo'},
  ],
  fields: [
    defineField({name: 'image', title: 'Foto de portada', type: 'photo', group: 'intro'}),
    defineField({
      name: 'intro',
      title: 'Introducción',
      type: 'localeText',
      group: 'intro',
      description: 'Quiénes son, en 2–3 frases.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'mission', title: 'Misión', type: 'localeText', group: 'identity', description: 'Formulación oficial confirmada por JUCUM.'}),
    defineField({name: 'vision', title: 'Visión', type: 'localeText', group: 'identity'}),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'array',
      group: 'identity',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'value',
          title: 'Valor',
          fields: [
            defineField({name: 'title', title: 'Valor', type: 'localeString', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'Explicación', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.es', subtitle: 'text.es'}},
        }),
      ],
    }),
    defineField({
      name: 'history',
      title: 'Historia (momentos importantes)',
      type: 'array',
      group: 'history',
      description: 'Fechas y hechos reales: fundación, personas clave, acontecimientos. En orden cronológico.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'milestone',
          title: 'Momento',
          fields: [
            defineField({name: 'year', title: 'Año o fecha', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'title', title: 'Qué pasó', type: 'localeString', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'Detalle', type: 'localeText'}),
            defineField({name: 'image', title: 'Foto', type: 'photo'}),
          ],
          preview: {select: {title: 'title.es', subtitle: 'year', media: 'image'}},
        }),
      ],
    }),
    defineField({
      name: 'teamIntro',
      title: 'Texto sobre el equipo',
      type: 'localeText',
      group: 'team',
      description: 'Las personas se agregan en la sección "Personas" del menú.',
    }),
  ],
  preview: {prepare: () => ({title: 'Quiénes somos'})},
})
