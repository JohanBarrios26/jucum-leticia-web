/**
 * FOTO DE LA GALERÍA (especificación §14)
 * ----------------------------------------------------------------------------
 * Solo se publican las fotos con "Autorizada para publicar" marcado
 * (especificación §32). El orden se cambia arrastrando en la lista.
 */
import {ImagesIcon} from '@sanity/icons/Images'
import {orderRankField, orderRankOrdering} from '../../lib/orderRank'
import {defineField, defineType} from 'sanity'

export const galleryCategories = [
  {title: 'Amazonas / territorio', value: 'territory'},
  {title: 'Personas', value: 'people'},
  {title: 'Comunidades', value: 'communities'},
  {title: 'Biblia / discipulado', value: 'bible'},
  {title: 'Escuelas', value: 'schools'},
  {title: 'Servicio', value: 'service'},
  {title: 'Vida misionera', value: 'missionLife'},
  {title: 'Equipo', value: 'team'},
  {title: 'Viajes / misiones', value: 'trips'},
  {title: 'Historia', value: 'history'},
]

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Foto de la galería',
  type: 'document',
  icon: ImagesIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'galleryItem'}),
    defineField({name: 'image', title: 'Foto', type: 'photo', validation: (rule) => rule.required()}),
    defineField({name: 'title', title: 'Título', type: 'localeString', description: 'Aparece al pasar el mouse.'}),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {list: galleryCategories},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishable',
      title: 'Autorizada para publicar',
      type: 'boolean',
      initialValue: false,
      description: 'Confirma que las personas que aparecen autorizaron la publicación. Si no está marcado, no se muestra.',
    }),
  ],
  preview: {
    select: {title: 'title.es', subtitle: 'category', media: 'image', publishable: 'publishable'},
    prepare: ({title, subtitle, media, publishable}) => ({
      title: `${title ?? 'Sin título'}${publishable ? '' : ' (no autorizada)'}`,
      subtitle: galleryCategories.find((c) => c.value === subtitle)?.title,
      media,
    }),
  },
})
