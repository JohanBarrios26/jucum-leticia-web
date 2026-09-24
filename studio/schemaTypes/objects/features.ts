/**
 * BLOQUES ESPECIALES DE MINISTERIOS Y ESCUELAS ("detalle diferencial")
 * ----------------------------------------------------------------------------
 * Cada ministerio o escuela puede tener, además de su descripción, bloques que
 * lo hacen único. El editor los agrega en la pestaña "Bloques especiales" y
 * puede ordenarlos arrastrando. Tipos disponibles:
 *
 *   audioSamples → Audios de la Palabra (ideal para OBT)
 *   riverRoute   → Ruta por el río (comunidades que se visitan)
 *   timeline     → Etapas (ej. fases de una escuela)
 *   verse        → Versículo destacado
 *   video        → Video de YouTube (se carga solo al hacer clic)
 *   checklist    → Lista (ej. "Qué llevar")
 *   stats        → Cifras (solo datos verificados)
 *
 * ¿Agregar un tipo de bloque nuevo? Créalo aquí, súmalo a `featureTypes`, y en
 * el sitio: tipos (types.ts), consulta (sanity/fetch.ts) y un componente en
 * src/components/features/ registrado en FeatureBlocks.astro.
 */
import {defineArrayMember, defineField, defineType} from 'sanity'

const blockTitle = defineField({
  name: 'title',
  title: 'Título del bloque',
  type: 'localeString',
  description: 'Opcional. Si se deja vacío se usa un título por defecto.',
})

const blockIntro = defineField({name: 'intro', title: 'Texto introductorio', type: 'localeText'})

export const audioSamples = defineType({
  name: 'audioSamples',
  title: 'Audios de la Palabra',
  type: 'object',
  fields: [
    blockTitle,
    blockIntro,
    defineField({
      name: 'samples',
      title: 'Audios',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'audioSample',
          title: 'Audio',
          fields: [
            defineField({
              name: 'language',
              title: 'Lengua',
              type: 'string',
              description: 'En qué lengua está el audio. Ej: "Tikuna".',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'community', title: 'Comunidad o región', type: 'string'}),
            defineField({
              name: 'reference',
              title: 'Cita bíblica',
              type: 'string',
              description: 'Ej: "Juan 3:16".',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Qué dice (en español / inglés)',
              type: 'localeText',
              description: 'El texto del pasaje, para que quien escucha entienda lo que oye.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'audio',
              title: 'Archivo de audio',
              type: 'file',
              options: {accept: 'audio/*'},
              description: 'MP3 u OGG, idealmente de menos de 1 MB (voz en mono a 64 kbps es suficiente).',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'authorized',
              title: 'Autorizado para publicar',
              type: 'boolean',
              initialValue: false,
              description: 'Confirma que quienes grabaron y la comunidad autorizan su publicación.',
            }),
          ],
          preview: {
            select: {title: 'reference', subtitle: 'language', authorized: 'authorized'},
            prepare: ({title, subtitle, authorized}) => ({
              title: `${title}${authorized ? '' : ' (no autorizado)'}`,
              subtitle,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Audios de la Palabra'})},
})

export const riverRoute = defineType({
  name: 'riverRoute',
  title: 'Ruta por el río',
  type: 'object',
  fields: [
    blockTitle,
    blockIntro,
    defineField({
      name: 'stops',
      title: 'Paradas',
      type: 'array',
      description: 'Comunidades o lugares, en el orden del recorrido.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'routeStop',
          title: 'Parada',
          fields: [
            defineField({name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'note', title: 'Nota', type: 'localeString', description: 'Ej: "Iglesia plantada en 2019".'}),
          ],
          preview: {select: {title: 'name', subtitle: 'note.es'}},
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Ruta por el río'})},
})

export const timeline = defineType({
  name: 'timeline',
  title: 'Etapas',
  type: 'object',
  fields: [
    blockTitle,
    blockIntro,
    defineField({
      name: 'steps',
      title: 'Etapas',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'timelineStep',
          title: 'Etapa',
          fields: [
            defineField({name: 'label', title: 'Momento', type: 'localeString', description: 'Ej: "Semanas 1–12" o "2015".'}),
            defineField({name: 'title', title: 'Título', type: 'localeString', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'Descripción', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.es', subtitle: 'label.es'}},
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Etapas'})},
})

export const verse = defineType({
  name: 'verse',
  title: 'Versículo destacado',
  type: 'object',
  fields: [
    defineField({name: 'text', title: 'Texto', type: 'localeText', validation: (rule) => rule.required()}),
    defineField({name: 'reference', title: 'Cita', type: 'string', description: 'Ej: "Mateo 28:19".', validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'reference', subtitle: 'text.es'}},
})

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    blockTitle,
    defineField({
      name: 'url',
      title: 'Enlace de YouTube',
      type: 'url',
      description: 'Pega el enlace del video. Solo se carga cuando la persona presiona reproducir.',
      validation: (rule) =>
        rule.required().custom((url) =>
          !url || /youtu\.?be/.test(String(url)) ? true : 'Por ahora solo se admiten videos de YouTube.',
        ),
    }),
  ],
  preview: {select: {title: 'title.es', subtitle: 'url'}, prepare: ({title, subtitle}) => ({title: title ?? 'Video', subtitle})},
})

export const checklist = defineType({
  name: 'checklist',
  title: 'Lista',
  type: 'object',
  fields: [blockTitle, defineField({name: 'items', title: 'Elementos', type: 'localeStringList'})],
  preview: {select: {title: 'title.es'}, prepare: ({title}) => ({title: title ?? 'Lista'})},
})

export const stats = defineType({
  name: 'stats',
  title: 'Cifras',
  type: 'object',
  description: 'Solo datos verificados por JUCUM.',
  fields: [
    blockTitle,
    defineField({
      name: 'items',
      title: 'Cifras',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'statItem',
          title: 'Cifra',
          fields: [
            defineField({name: 'value', title: 'Número', type: 'string', description: 'Ej: "25" o "+300".', validation: (rule) => rule.required()}),
            defineField({name: 'label', title: 'Qué representa', type: 'localeString', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'value', subtitle: 'label.es'}},
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Cifras'})},
})

/** Todos los bloques, para registrarlos en schemaTypes/index.ts. */
export const featureTypes = [audioSamples, riverRoute, timeline, verse, video, checklist, stats]

/** Campo "Bloques especiales" para ministerios y escuelas. */
export const featuresField = (group?: string) =>
  defineField({
    name: 'features',
    title: 'Bloques especiales',
    type: 'array',
    group,
    description: 'Secciones únicas de esta página: audios, ruta por el río, etapas, versículo, video, lista o cifras.',
    of: featureTypes.map((t) => defineArrayMember({type: t.name})),
  })

/** Motivo visual animado que identifica a cada ministerio o escuela. */
export const motifOptions = [
  {title: 'Río con paradas', value: 'river'},
  {title: 'Estallido', value: 'burst'},
  {title: 'Páginas abiertas', value: 'book'},
  {title: 'Corona', value: 'crown'},
  {title: 'Puente', value: 'bridge'},
  {title: 'Onda de audio', value: 'wave'},
  {title: 'Pulso', value: 'pulse'},
  {title: 'Ruta', value: 'path'},
]

export const motifField = (group?: string) =>
  defineField({
    name: 'motif',
    title: 'Motivo visual',
    type: 'string',
    group,
    description: 'Dibujo animado que acompaña el título y la tarjeta. Hace que cada página se sienta distinta.',
    options: {list: motifOptions, layout: 'radio'},
  })
