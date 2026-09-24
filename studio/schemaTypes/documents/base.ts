/**
 * BASE (lugar físico donde vive y sirve JUCUM Leticia)
 * ----------------------------------------------------------------------------
 * Pedido del cliente: poder "conocer las bases". Ej.: la base de Leticia (en
 * la ciudad) y JUCUM El Puente (en la comunidad de Ronda, en la selva).
 *
 * Cada base genera su página en /bases/<identificador>/ con: foto de portada,
 * descripción, "Cómo llegar" (ilustración con cada ruta y su duración),
 * los programas que se realizan allí, galería de fotos y videos.
 */
import {PinIcon} from '@sanity/icons/Pin'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '../../lib/orderRank'
import {motifField} from '../objects/features'

export const accessModes = [
  {title: 'A pie', value: 'walk'},
  {title: 'Por río (lancha / bote)', value: 'river'},
  {title: 'Por carretera', value: 'road'},
  {title: 'En avión', value: 'air'},
]

export const base = defineType({
  name: 'base',
  title: 'Base',
  type: 'document',
  icon: PinIcon,
  orderings: [orderRankOrdering],
  groups: [
    {name: 'main', title: 'General', default: true},
    {name: 'access', title: 'Cómo llegar'},
    {name: 'media', title: 'Fotos y videos'},
  ],
  fields: [
    orderRankField({type: 'base'}),
    defineField({
      name: 'active',
      title: 'Mostrar en el sitio',
      type: 'boolean',
      group: 'main',
      initialValue: true,
    }),
    defineField({name: 'name', title: 'Nombre', type: 'localeString', group: 'main', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: 'Identificador para la dirección web',
      type: 'slug',
      group: 'main',
      options: {source: 'name.es', maxLength: 60},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Frase corta',
      type: 'localeString',
      group: 'main',
      description: 'Ej: "La base de la selva".',
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'localeString',
      group: 'main',
      description: 'Ej: "Comunidad de Ronda, Amazonas, Colombia".',
    }),
    defineField({name: 'image', title: 'Foto de portada', type: 'photo', group: 'main'}),
    defineField({name: 'description', title: 'Descripción', type: 'localeText', group: 'main'}),
    defineField({
      name: 'programs',
      title: 'Qué se realiza en esta base',
      type: 'array',
      group: 'main',
      description: 'Escuelas y ministerios que funcionan aquí.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'school'}, {type: 'ministry'}]})],
    }),
    motifField('main'),

    // Cómo llegar
    defineField({
      name: 'accessFrom',
      title: 'Punto de partida',
      type: 'string',
      group: 'access',
      description: 'Desde dónde se miden los trayectos. Ej: "Leticia". Déjalo vacío si la base está en la ciudad.',
    }),
    defineField({
      name: 'accessRoutes',
      title: 'Rutas',
      type: 'array',
      group: 'access',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'accessRoute',
          title: 'Ruta',
          fields: [
            defineField({
              name: 'mode',
              title: 'Medio',
              type: 'string',
              options: {list: accessModes, layout: 'radio'},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'duration',
              title: 'Duración aproximada',
              type: 'localeString',
              description: 'Ej: "4 horas".',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'note', title: 'Detalle', type: 'localeText', description: 'Ej: "Caminando a través de la selva".'}),
          ],
          preview: {
            select: {mode: 'mode', duration: 'duration.es'},
            prepare: ({mode, duration}) => ({
              title: accessModes.find((m) => m.value === mode)?.title ?? mode,
              subtitle: duration,
            }),
          },
        }),
      ],
    }),

    // Fotos y videos
    defineField({
      name: 'gallery',
      title: 'Fotos',
      type: 'array',
      group: 'media',
      description: 'Solo fotos con autorización de las personas que aparecen.',
      of: [defineArrayMember({type: 'photo'})],
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'videos',
      title: 'Videos (YouTube)',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'baseVideo',
          title: 'Video',
          fields: [
            defineField({name: 'title', title: 'Título', type: 'localeString'}),
            defineField({
              name: 'url',
              title: 'Enlace de YouTube',
              type: 'url',
              validation: (rule) =>
                rule.required().custom((url) =>
                  !url || /youtu\.?be/.test(String(url)) ? true : 'Por ahora solo se admiten videos de YouTube.',
                ),
            }),
          ],
          preview: {select: {title: 'title.es', subtitle: 'url'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'name.es', subtitle: 'location.es', media: 'image', active: 'active'},
    prepare: ({title, subtitle, media, active}) => ({
      title: active === false ? `${title} (oculta)` : title,
      subtitle,
      media,
    }),
  },
})
