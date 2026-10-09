/**
 * COMUNIDAD DEL MAPA (iglesias plantadas)
 * ----------------------------------------------------------------------------
 * Cada comunidad es un punto del mapa interactivo del inicio y de la página del
 * ministerio "Comunidades ribereñas". Para agregar una nueva:
 *   1. Crea una comunidad con su nombre.
 *   2. Elige su país y su fase (opcionales; si faltan, el punto igual aparece).
 *   3. Ubícala en el mapa con "Posición horizontal" e "Posición vertical"
 *      (0 a 100; 0,0 es la esquina superior izquierda). Las posiciones son
 *      referenciales: el mapa es una ilustración, no un mapa geográfico exacto.
 * "Mostrar en el mapa" desactivado = oculta sin borrar.
 */
import {PinIcon} from '@sanity/icons/Pin'
import {defineField, defineType} from 'sanity'

export const community = defineType({
  name: 'community',
  title: 'Comunidad del mapa',
  type: 'document',
  icon: PinIcon,
  orderings: [{title: 'Nombre (A–Z)', name: 'name', by: [{field: 'name', direction: 'asc'}]}],
  fields: [
    defineField({
      name: 'active',
      title: 'Mostrar en el mapa',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({name: 'name', title: 'Nombre de la comunidad', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'kind',
      title: 'Tipo',
      type: 'string',
      initialValue: 'church',
      options: {
        list: [
          {title: 'Iglesia plantada', value: 'church'},
          {title: 'Base de JUCUM', value: 'base'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'País',
      type: 'string',
      description: 'Opcional. Si se deja vacío, el punto aparece igual pero no entra en el filtro por país.',
      options: {
        list: [
          {title: 'Colombia', value: 'co'},
          {title: 'Perú', value: 'pe'},
          {title: 'Brasil', value: 'br'},
        ],
      },
    }),
    defineField({
      name: 'phase',
      title: 'Fase del plan',
      type: 'string',
      description: 'Opcional. Las 4 fases del trabajo en el Amazonas (Hechos 1:8).',
      options: {
        list: [
          {title: 'Jerusalén (Leticia)', value: 'jerusalem'},
          {title: 'Judea (comunidades por carretera)', value: 'judea'},
          {title: 'Samaria (comunidades ribereñas)', value: 'samaria'},
          {title: 'Lo último de la tierra (fronteras)', value: 'frontier'},
        ],
      },
    }),
    defineField({
      name: 'x',
      title: 'Posición horizontal (0 a 100)',
      type: 'number',
      description: '0 = borde izquierdo del mapa, 100 = borde derecho.',
      validation: (rule) => rule.required().min(0).max(100),
    }),
    defineField({
      name: 'y',
      title: 'Posición vertical (0 a 100)',
      type: 'number',
      description: '0 = arriba, 100 = abajo.',
      validation: (rule) => rule.required().min(0).max(100),
    }),
  ],
  preview: {
    select: {title: 'name', kind: 'kind', country: 'country', active: 'active'},
    prepare: ({title, kind, country, active}) => ({
      title: active === false ? `${title} (oculta)` : title,
      subtitle: [kind === 'base' ? 'Base' : 'Iglesia', country?.toUpperCase()].filter(Boolean).join(' · '),
    }),
  },
})
