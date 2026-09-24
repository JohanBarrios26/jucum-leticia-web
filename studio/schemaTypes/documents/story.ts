/**
 * HISTORIA / TESTIMONIO (especificación §13 y §32)
 * ----------------------------------------------------------------------------
 * Una historia SOLO se publica si están marcadas las tres autorizaciones
 * (nombre, foto e historia) y además "Publicar". Así nunca sale al aire el
 * testimonio de alguien sin su permiso.
 */
import {CommentIcon} from '@sanity/icons/Comment'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export const story = defineType({
  name: 'story',
  title: 'Historia',
  type: 'document',
  icon: CommentIcon,
  orderings: [orderRankOrdering],
  groups: [
    {name: 'content', title: 'Contenido', default: true},
    {name: 'authorization', title: 'Autorizaciones'},
  ],
  fields: [
    orderRankField({type: 'story'}),
    defineField({name: 'name', title: 'Nombre de la persona', type: 'string', group: 'content', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: 'Identificador',
      type: 'slug',
      group: 'content',
      options: {source: 'name', maxLength: 60},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'photo', title: 'Foto', type: 'photo', group: 'content'}),
    defineField({name: 'title', title: 'Rol o contexto', type: 'localeString', group: 'content', description: 'Ej: "Misionera en comunidades ribereñas".'}),
    defineField({
      name: 'quote',
      title: 'Frase destacada',
      type: 'localeText',
      group: 'content',
      description: 'Una frase corta y significativa. Es lo que se ve en el inicio.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'story', title: 'Historia completa', type: 'localeText', group: 'content'}),
    defineField({
      name: 'ministry',
      title: 'Ministerio relacionado',
      type: 'reference',
      to: [{type: 'ministry'}],
      group: 'content',
    }),
    defineField({
      name: 'authorization',
      title: 'Autorizaciones de la persona',
      type: 'object',
      group: 'authorization',
      description: 'Las tres deben estar marcadas para que la historia se publique.',
      fields: [
        defineField({name: 'name', title: 'Autorizó publicar su nombre', type: 'boolean', initialValue: false}),
        defineField({name: 'photo', title: 'Autorizó publicar su foto', type: 'boolean', initialValue: false}),
        defineField({name: 'story', title: 'Autorizó publicar su historia', type: 'boolean', initialValue: false}),
      ],
    }),
    defineField({
      name: 'publishable',
      title: 'Publicar en el sitio',
      type: 'boolean',
      group: 'authorization',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'title.es', media: 'photo', publishable: 'publishable'},
    prepare: ({title, subtitle, media, publishable}) => ({
      title: publishable ? title : `${title} (no publicada)`,
      subtitle,
      media,
    }),
  },
})
