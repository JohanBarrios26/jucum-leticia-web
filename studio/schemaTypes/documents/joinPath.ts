/**
 * CAMINO PARA PARTICIPAR (especificación §15)
 * ----------------------------------------------------------------------------
 * Son exactamente cuatro: Orar, Servir, Venir, Apoyar. Ya existen en el panel;
 * solo se editan sus textos (no se crean ni se borran).
 */
import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

export const joinPathKeys = [
  {title: 'Orar', value: 'pray'},
  {title: 'Servir', value: 'serve'},
  {title: 'Venir', value: 'come'},
  {title: 'Apoyar', value: 'support'},
]

export const joinPath = defineType({
  name: 'joinPath',
  title: 'Camino para participar',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'key',
      title: 'Camino',
      type: 'string',
      options: {list: joinPathKeys},
      readOnly: true,
      description: 'Fijo. Define a qué sección de la página "Sé parte" lleva.',
    }),
    defineField({name: 'title', title: 'Título', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({
      name: 'text',
      title: 'Texto',
      type: 'localeText',
      description: 'Una frase corta. Aparece al pasar el mouse sobre el panel.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {select: {title: 'title.es', subtitle: 'text.es'}},
})
