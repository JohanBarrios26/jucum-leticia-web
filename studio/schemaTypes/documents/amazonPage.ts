/**
 * PÁGINA "VIVE EL AMAZONAS"
 * ----------------------------------------------------------------------------
 * Página aparte (con su propia tarjeta destacada en el inicio) que muestra, de
 * forma resumida, por qué venir a JUCUM Leticia no es un viaje cualquiera.
 *
 *   - Foto de portada, título, frase y texto introductorio.
 *   - "Por qué no lo hace cualquiera": tarjetas numeradas (cada una con título y
 *     texto corto). Escribe solo hechos reales y confirmados.
 *   - "Cómo llegar": avión, río y hasta la base de la selva.
 * Las cifras (años de servicio, iglesias, países, escuelas) y la galería de fotos
 * salen solas del resto del sitio: no se escriben aquí.
 */
import {ImagesIcon} from '@sanity/icons/Images'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const amazonPage = defineType({
  name: 'amazonPage',
  title: 'Vive el Amazonas',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({name: 'title', title: 'Título', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({name: 'tagline', title: 'Frase bajo el título', type: 'localeString', description: 'Ej: "No es un viaje cualquiera."'}),
    defineField({name: 'lead', title: 'Texto introductorio', type: 'localeText'}),
    defineField({name: 'heroImage', title: 'Foto de portada', type: 'photo'}),
    defineField({
      name: 'reasons',
      title: 'Por qué no lo hace cualquiera',
      type: 'array',
      description: 'De 3 a 6 tarjetas, cada una con un hecho real y confirmado.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'reason',
          title: 'Motivo',
          fields: [
            defineField({name: 'title', title: 'Título corto', type: 'localeString', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'Texto', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.es', subtitle: 'text.es'}},
        }),
      ],
    }),
    defineField({
      name: 'ways',
      title: 'Cómo llegar',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'way',
          title: 'Forma de llegar',
          fields: [
            defineField({
              name: 'mode',
              title: 'Medio',
              type: 'string',
              options: {
                list: [
                  {title: 'Avión', value: 'air'},
                  {title: 'Río (barco)', value: 'river'},
                  {title: 'A pie / hasta la selva', value: 'walk'},
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'title', title: 'Título', type: 'localeString', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'Texto', type: 'localeText', description: 'Tiempos y costos solo si están confirmados.'}),
          ],
          preview: {select: {title: 'title.es', subtitle: 'mode'}},
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Vive el Amazonas'})},
})
