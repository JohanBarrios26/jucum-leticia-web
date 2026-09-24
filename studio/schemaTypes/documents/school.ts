/**
 * ESCUELA / PROGRAMA (especificación §11)
 * ----------------------------------------------------------------------------
 * Cada escuela genera su fila en el inicio y su página propia en
 * /escuelas/<identificador>/, con la ficha (fechas, costos, requisitos...) y
 * las PERSONAS ENCARGADAS de esa escuela, cada una con su contacto.
 * Los campos vacíos se muestran como "Pendiente de contenido".
 */
import {BookIcon} from '@sanity/icons/Book'
import {orderRankField, orderRankOrdering} from '../../lib/orderRank'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const school = defineType({
  name: 'school',
  title: 'Escuela',
  type: 'document',
  icon: BookIcon,
  orderings: [orderRankOrdering],
  groups: [
    {name: 'main', title: 'General', default: true},
    {name: 'details', title: 'Ficha'},
    {name: 'contacts', title: 'Encargados'},
  ],
  fields: [
    orderRankField({type: 'school'}),
    defineField({
      name: 'active',
      title: 'Mostrar en el sitio',
      type: 'boolean',
      group: 'main',
      initialValue: true,
      description: 'Desactívalo para ocultar esta escuela sin borrarla.',
    }),
    defineField({
      name: 'name',
      title: 'Nombre corto o sigla',
      type: 'localeString',
      group: 'main',
      description: 'Ej: "EDE". Se muestra en tamaño grande.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Nombre completo',
      type: 'localeString',
      group: 'main',
      description: 'Ej: "Escuela de Discipulado y Entrenamiento".',
    }),
    defineField({
      name: 'slug',
      title: 'Identificador para la dirección web',
      type: 'slug',
      group: 'main',
      options: {source: 'name.es', maxLength: 60},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'image', title: 'Foto principal', type: 'photo', group: 'main'}),
    defineField({name: 'description', title: 'Descripción', type: 'localeText', group: 'main'}),
    defineField({name: 'activities', title: 'Actividades', type: 'localeStringList', group: 'main'}),

    // Ficha de la escuela
    defineField({name: 'duration', title: 'Duración', type: 'localeString', group: 'details'}),
    defineField({name: 'dates', title: 'Fechas', type: 'localeString', group: 'details', description: 'Ej: "Enero – junio 2027".'}),
    defineField({name: 'location', title: 'Lugar', type: 'localeString', group: 'details'}),
    defineField({name: 'audience', title: 'Para quién es', type: 'localeText', group: 'details'}),
    defineField({name: 'requirements', title: 'Requisitos', type: 'localeText', group: 'details'}),
    defineField({name: 'cost', title: 'Costo', type: 'localeString', group: 'details'}),
    defineField({name: 'enrollment', title: 'Proceso de inscripción', type: 'localeText', group: 'details'}),

    // Personas encargadas de ESTA escuela
    defineField({
      name: 'contacts',
      title: 'Personas encargadas',
      type: 'array',
      group: 'contacts',
      description: 'Quienes responden por esta escuela. Publica sus datos solo con su autorización.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'schoolContact',
          title: 'Encargado',
          fields: [
            defineField({name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'role', title: 'Rol', type: 'localeString', description: 'Ej: "Líder de escuela".'}),
            defineField({name: 'photo', title: 'Foto', type: 'photo'}),
            defineField({name: 'email', title: 'Correo', type: 'string', validation: (rule) => rule.email()}),
            defineField({
              name: 'phone',
              title: 'Teléfono',
              type: 'string',
              description: 'Con código de país. Ej: +57 300 123 4567',
            }),
            defineField({
              name: 'whatsapp',
              title: 'WhatsApp',
              type: 'string',
              description: 'Solo números, sin + ni espacios. Ej: 573001234567',
              validation: (rule) => rule.regex(/^\d{8,15}$/, {name: 'número de WhatsApp'}),
            }),
            defineField({
              name: 'authorized',
              title: 'Autorizó publicar sus datos',
              type: 'boolean',
              initialValue: false,
              description: 'Si no está marcado, esta persona NO aparece en el sitio.',
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'role.es', media: 'photo', authorized: 'authorized'},
            prepare: ({title, subtitle, media, authorized}) => ({
              title: authorized ? title : `${title} (sin autorización: no se muestra)`,
              subtitle,
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'name.es', subtitle: 'fullName.es', media: 'image', active: 'active'},
    prepare: ({title, subtitle, media, active}) => ({
      title: active === false ? `${title} (oculta)` : title,
      subtitle,
      media,
    }),
  },
})
