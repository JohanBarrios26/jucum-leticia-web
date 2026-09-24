/**
 * PERSONA DEL EQUIPO (especificación §7.5 y §12)
 * ----------------------------------------------------------------------------
 * Quienes sirven en JUCUM Leticia: una persona o una FAMILIA (en ese caso el
 * nombre es "Familia Apellido" y se llenan los "Integrantes").
 * Cada perfil tiene su página propia en
 * /personas/<identificador>/ y aparece en "Quiénes somos", en "Personas" y en
 * la página de su ministerio. Solo se publican con autorización.
 *
 * Apoyo personal: si la persona tiene un enlace de donación propio (su página
 * en la plataforma de JUCUM, PayPal, etc.), el botón "Apoyar" lleva ahí. Si
 * no, abre WhatsApp de JUCUM con el mensaje "Quiero apoyar a <nombre>".
 * Nunca se escriben números de cuenta bancaria en el sitio (especificación §15.4).
 */
import {UserIcon} from '@sanity/icons/User'
import {defineArrayMember, defineField, defineType} from 'sanity'
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
    {name: 'support', title: 'Apoyo'},
    {name: 'authorization', title: 'Autorización'},
  ],
  fields: [
    orderRankField({type: 'person'}),
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      group: 'main',
      description: 'Una persona (ej. "María Pérez") o una familia (ej. "Familia Rodríguez").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'members',
      title: 'Integrantes (si es una familia)',
      type: 'array',
      group: 'main',
      description:
        'Papás e hijos, en orden. Por seguridad, de los niños escribe SOLO el primer nombre (sin apellidos ni edades). Déjalo vacío si el perfil es de una sola persona.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'member',
          title: 'Integrante',
          fields: [
            defineField({name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'relation',
              title: 'Es…',
              type: 'string',
              options: {
                list: [
                  {title: 'Adulto (papá, mamá, esposo/a)', value: 'adult'},
                  {title: 'Hijo o hija', value: 'child'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'adult',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'name', relation: 'relation'},
            prepare: ({title, relation}) => ({title, subtitle: relation === 'child' ? 'Hijo/a' : 'Adulto'}),
          },
        }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Identificador para la dirección web',
      type: 'slug',
      group: 'main',
      options: {source: 'name', maxLength: 60},
      description: 'Se genera a partir del nombre. Ej: maria-perez → /personas/maria-perez/',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'photo', title: 'Foto', type: 'photo', group: 'main'}),
    defineField({name: 'country', title: 'País de origen', type: 'localeString', group: 'main', description: 'Ej: "Colombia", "Brasil".'}),
    defineField({name: 'role', title: 'Rol', type: 'localeString', group: 'main', description: 'Ej: "Coordinadora de escuelas".'}),
    defineField({name: 'ministry', title: 'Ministerio', type: 'reference', to: [{type: 'ministry'}], group: 'main'}),
    defineField({name: 'since', title: 'Sirviendo desde', type: 'string', group: 'main', description: 'Ej: "2018".'}),
    defineField({name: 'quote', title: 'Frase', type: 'localeText', group: 'story'}),
    defineField({name: 'bio', title: 'Su historia', type: 'localeText', group: 'story', description: 'Por qué llegó, por qué decidió servir, qué hace hoy.'}),
    defineField({name: 'prayerRequest', title: 'Petición de oración', type: 'localeText', group: 'story'}),
    defineField({
      name: 'support',
      title: 'Apoyo personal',
      type: 'object',
      group: 'support',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Mostrar botón "Apoyar"',
          type: 'boolean',
          initialValue: false,
          description: 'Actívalo solo si esta persona recibe apoyo personal y lo autoriza.',
        }),
        defineField({
          name: 'link',
          title: 'Enlace de donación personal',
          type: 'url',
          description: 'Opcional. Página segura donde se puede donar a esta persona. Si se deja vacío, el botón abre WhatsApp de JUCUM.',
          validation: (rule) => rule.uri({scheme: ['https']}),
        }),
        defineField({
          name: 'text',
          title: 'Para qué es el apoyo',
          type: 'localeText',
          description: 'Ej: "Tu apoyo mensual cubre transporte por el río y materiales para las comunidades".',
        }),
      ],
    }),
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
