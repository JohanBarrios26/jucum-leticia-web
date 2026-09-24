/**
 * MINISTERIO (especificación §9)
 * ----------------------------------------------------------------------------
 * Cada ministerio genera automáticamente:
 *   - su tarjeta en el inicio y en /ministerios/
 *   - su página propia en /ministerios/<identificador>/
 * El orden se cambia arrastrando en la lista del panel.
 * "Mostrar en el sitio" desactivado = oculto sin borrarlo.
 */
import {HeartIcon} from '@sanity/icons/Heart'
import {orderRankField, orderRankOrdering} from '../../lib/orderRank'
import {defineField, defineType} from 'sanity'
import {featuresField, motifField} from '../objects/features'

export const ministry = defineType({
  name: 'ministry',
  title: 'Ministerio',
  type: 'document',
  icon: HeartIcon,
  orderings: [orderRankOrdering],
  groups: [
    {name: 'main', title: 'General', default: true},
    {name: 'features', title: 'Bloques especiales'},
  ],
  fields: [
    orderRankField({type: 'ministry'}),
    defineField({
      name: 'active',
      group: 'main',
      title: 'Mostrar en el sitio',
      type: 'boolean',
      initialValue: true,
      description: 'Desactívalo para ocultar este ministerio sin borrarlo.',
    }),
    defineField({name: 'name', title: 'Nombre', type: 'localeString', group: 'main', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      group: 'main',
      title: 'Identificador para la dirección web',
      type: 'slug',
      description: 'Se genera a partir del nombre. Ej: comunidades-riberenas → /ministerios/comunidades-riberenas/. Evita cambiarlo una vez publicado.',
      options: {source: 'name.es', maxLength: 60},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      group: 'main',
      title: 'Foto principal',
      type: 'photo',
      description: 'Si no hay foto, el sitio muestra un fondo con textura mientras tanto.',
    }),
    defineField({
      name: 'shortDescription',
      group: 'main',
      title: 'Descripción corta (tarjeta)',
      type: 'localeText',
      description: '1–2 líneas. Aparece en la tarjeta del ministerio.',
    }),
    defineField({
      name: 'fullDescription',
      group: 'main',
      title: 'Descripción completa (página del ministerio)',
      type: 'localeText',
    }),
    defineField({
      name: 'activities',
      group: 'main',
      title: 'Qué hacemos (actividades)',
      type: 'localeStringList',
    }),
    motifField('features'),
    featuresField('features'),
  ],
  preview: {
    select: {title: 'name.es', subtitle: 'shortDescription.es', media: 'image', active: 'active'},
    prepare: ({title, subtitle, media, active}) => ({
      title: active === false ? `${title} (oculto)` : title,
      subtitle,
      media,
    }),
  },
})
