/**
 * CAMINO PARA PARTICIPAR (especificación §15)
 * ----------------------------------------------------------------------------
 * Son exactamente cuatro: Orar, Servir, Venir, Apoyar. Ya existen en el panel;
 * solo se editan sus textos (no se crean ni se borran).
 *
 * - Título y texto corto: aparecen en el inicio.
 * - Explicación y "Información" (preguntas y respuestas): aparecen en la
 *   página "Sé parte". Una respuesta vacía se muestra como pendiente.
 */
import {UsersIcon} from '@sanity/icons/Users'
import {defineArrayMember, defineField, defineType} from 'sanity'

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
    defineField({
      name: 'body',
      title: 'Explicación (página "Sé parte")',
      type: 'localeText',
    }),
    defineField({
      name: 'details',
      title: 'Información',
      type: 'array',
      description: 'Preguntas frecuentes de este camino. Ej: "Duración", "Costos". Deja la respuesta vacía si aún no está confirmada.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'detail',
          title: 'Dato',
          fields: [
            defineField({name: 'label', title: 'Pregunta o dato', type: 'localeString', validation: (rule) => rule.required()}),
            defineField({name: 'value', title: 'Respuesta', type: 'localeText'}),
          ],
          preview: {
            select: {title: 'label.es', subtitle: 'value.es'},
            prepare: ({title, subtitle}) => ({title, subtitle: subtitle ?? 'Pendiente'}),
          },
        }),
      ],
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje de WhatsApp',
      type: 'localeString',
      description: 'Texto que se escribe solo al tocar el botón. Ej: "Hola, me gustaría venir a un corto plazo."',
    }),
  ],
  preview: {select: {title: 'title.es', subtitle: 'text.es'}},
})
