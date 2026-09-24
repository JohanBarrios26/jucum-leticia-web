/**
 * PERSONA DEL EQUIPO (especificación §7.5 y §12)
 * ----------------------------------------------------------------------------
 * Quienes sirven en JUCUM Leticia. Aparecen en "Quiénes somos" y en la página
 * del ministerio al que pertenecen. Solo se publican con autorización.
 */
import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '../../lib/orderRank'

export const person = defineType({
  name: 'person',
  title: 'Persona',
  type: 'document',
  icon: UserIcon,
  orderings: [orderRankOrdering],
  groups: [
    {name: 'main', title: 'General', default: true},
    {name: 'story', title: 'Historia'},
    {name: 'authorization', title: 'Autorización'},
  ],
  fields: [
    orderRankField({type: 'person'}),
    defineField({name: 'name', title: 'Nombre', type: 'string', group: 'main', validation: (rule) => rule.required()}),
    defineField({name: 'photo', title: 'Foto', type: 'photo', group: 'main'}),
    defineField({name: 'role', title: 'Rol', type: 'localeString', group: 'main', description: 'Ej: "Coordinadora de escuelas".'}),
    defineField({name: 'ministry', title: 'Ministerio', type: 'reference', to: [{type: 'ministry'}], group: 'main'}),
    defineField({name: 'since', title: 'Sirviendo desde', type: 'string', group: 'main', description: 'Ej: "2018".'}),
    defineField({name: 'quote', title: 'Frase', type: 'localeText', group: 'story'}),
    defineField({name: 'bio', title: 'Su historia', type: 'localeText', group: 'story', description: 'Por qué llegó, por qué decidió servir, qué hace hoy.'}),
    defineField({name: 'prayerRequest', title: 'Petición de oración', type: 'localeText', group: 'story'}),
    defineField({
      name: 'authorized',
      title: 'Autorizó publicar su nombre, foto e historia',
      type: 'boolean',
      group: 'authorization',
      initialValue: false,
      description: 'Si no está marcado, esta persona NO aparece en el sitio.',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role.es', media: 'photo', authorized: 'authorized'},
    prepare: ({title, subtitle, media, authorized}) => ({
      title: authorized ? title : `${title} (sin autorización)`,
      subtitle,
      media,
    }),
  },
})
