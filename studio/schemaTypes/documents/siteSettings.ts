/**
 * CONFIGURACIÓN DEL SITIO (documento único)
 * ----------------------------------------------------------------------------
 * Datos que aparecen en muchas partes a la vez: encabezado, pie de página,
 * sección de contacto... Cambiar un teléfono aquí lo cambia en todo el sitio.
 * Especificación §30.
 */
import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'identity', title: 'Identidad', default: true},
    {name: 'contact', title: 'Contacto'},
    {name: 'social', title: 'Redes sociales'},
  ],
  fields: [
    defineField({
      name: 'organizationName',
      title: 'Nombre de la organización',
      type: 'localeString',
      group: 'identity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Frase principal',
      type: 'localeString',
      group: 'identity',
      description: 'Aparece en el pie de página. Ej: "Desde el corazón del Amazonas hacia las naciones."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción corta',
      type: 'localeText',
      group: 'identity',
      description: 'Se usa en Google y al compartir el sitio en redes/WhatsApp si una página no tiene descripción propia.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Correo de contacto',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email().error('Escribe un correo válido.'),
    }),
    defineField({
      name: 'phones',
      title: 'Teléfonos',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'phone',
          title: 'Teléfono',
          fields: [
            defineField({name: 'label', title: 'Etiqueta', type: 'localeString', description: 'Ej: "Colombia", "Internacional".'}),
            defineField({
              name: 'number',
              title: 'Número',
              type: 'string',
              description: 'Con código de país, como se mostrará. Ej: +57 311 533 2741',
              validation: (rule) => rule.required().regex(/^\+[\d\s()-]+$/, {name: 'teléfono internacional'}),
            }),
          ],
          preview: {select: {title: 'number', subtitle: 'label.es'}},
        }),
      ],
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      group: 'contact',
      description: 'Solo números, con código de país y SIN "+" ni espacios. Ej: 573115332741',
      validation: (rule) => rule.regex(/^\d{8,15}$/, {name: 'número de WhatsApp'}).error('Solo números, sin + ni espacios.'),
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'localeString',
      group: 'contact',
      description: 'Ej: "Leticia, Amazonas, Colombia". Déjalo vacío si aún no se quiere publicar.',
    }),
    defineField({
      name: 'social',
      title: 'Redes sociales',
      type: 'object',
      group: 'social',
      description: 'Pega el enlace completo del perfil oficial. Las que estén vacías no se muestran.',
      fields: ['instagram', 'facebook', 'youtube', 'tiktok'].map((name) =>
        defineField({
          name,
          title: name.charAt(0).toUpperCase() + name.slice(1),
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['https']}),
        }),
      ),
    }),
  ],
  preview: {prepare: () => ({title: 'Configuración del sitio'})},
})
