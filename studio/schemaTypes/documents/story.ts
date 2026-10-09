/**
 * HISTORIA / TESTIMONIO (especificación §13 y §32)
 * ----------------------------------------------------------------------------
 * Una historia SOLO se publica si están marcadas las tres autorizaciones
 * (nombre, foto e historia) y además "Publicar". Así nunca sale al aire el
 * testimonio de alguien sin su permiso.
 *
 * Si la historia es de alguien del equipo, elígelo en "Persona del equipo": el
 * nombre, la foto y el rol se toman de su perfil (sin cargarlos otra vez). Con
 * "Video" la tarjeta muestra un botón para verlo (se carga solo al pulsar).
 * En el inicio se muestran 3 historias al azar y un botón para ver otras 3.
 */
import {CommentIcon} from '@sanity/icons/Comment'
import {orderRankField, orderRankOrdering} from '../../lib/orderRank'
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
    defineField({
      name: 'person',
      title: 'Persona del equipo (opcional)',
      type: 'reference',
      to: [{type: 'person'}],
      group: 'content',
      description:
        'Si la historia es de alguien del equipo, elígelo aquí y no tendrás que escribir su nombre, foto ni rol. Esa persona debe estar autorizada en "Personas".',
    }),
    defineField({
      name: 'name',
      title: 'Nombre de la persona',
      type: 'string',
      group: 'content',
      description: 'Solo si no elegiste una persona del equipo.',
      validation: (rule) =>
        rule.custom((value, context) => (value || (context.document as {person?: unknown})?.person ? true : 'Escribe el nombre o elige una persona del equipo.')),
    }),
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
      name: 'videoUrl',
      title: 'Video (opcional)',
      type: 'url',
      group: 'content',
      description: 'Enlace de YouTube (youtu.be/… o youtube.com/watch?v=…). Solo se carga cuando alguien pulsa reproducir.',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
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
    select: {name: 'name', person: 'person.name', subtitle: 'title.es', media: 'photo', publishable: 'publishable'},
    prepare: ({name, person, subtitle, media, publishable}) => ({
      title: publishable ? name || person : `${name || person} (no publicada)`,
      subtitle,
      media,
    }),
  },
})
