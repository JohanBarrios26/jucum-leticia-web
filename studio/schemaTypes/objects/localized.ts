/**
 * CAMPOS BILINGÜES (español / inglés)
 * ----------------------------------------------------------------------------
 * Cada texto del sitio se guarda en ambos idiomas dentro del mismo campo.
 * El español es obligatorio; el inglés es opcional: si se deja vacío, el sitio
 * en inglés muestra el texto en español (nunca queda un hueco).
 *
 * Tipos:
 *   localeString      → texto corto (títulos, nombres, botones)
 *   localeText        → párrafo
 *   localeStringList  → lista de textos cortos (ej. actividades)
 */
import {defineField, defineType} from 'sanity'

const languages = [
  {id: 'es', title: 'Español', required: true},
  {id: 'en', title: 'English (opcional: si se deja vacío se usa el español)', required: false},
]

export const localeString = defineType({
  name: 'localeString',
  title: 'Texto bilingüe',
  type: 'object',
  options: {columns: 1},
  fields: languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'string',
      validation: (rule) => (lang.required ? rule.required().error('El texto en español es obligatorio.') : rule),
    }),
  ),
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Párrafo bilingüe',
  type: 'object',
  fields: languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'text',
      rows: 3,
      validation: (rule) => (lang.required ? rule.required().error('El texto en español es obligatorio.') : rule),
    }),
  ),
})

export const localeStringList = defineType({
  name: 'localeStringList',
  title: 'Lista bilingüe',
  type: 'object',
  fields: languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'array',
      of: [{type: 'string'}],
      description: lang.required ? 'Un elemento por línea. Usa el botón "Add item" para agregar.' : undefined,
    }),
  ),
})
