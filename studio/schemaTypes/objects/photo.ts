/**
 * FOTO CON TEXTO ALTERNATIVO
 * ----------------------------------------------------------------------------
 * Todas las fotos del sitio usan este tipo. Incluye:
 *   - Punto de interés (hotspot): el editor marca qué parte de la foto nunca
 *     debe recortarse (ej. la cara de una persona). El sitio lo respeta.
 *   - Texto alternativo: descripción para personas ciegas y para Google.
 *   - Marca de "foto temporal": para reemplazarla luego por una foto real.
 */
import {defineField, defineType} from 'sanity'

export const photo = defineType({
  name: 'photo',
  title: 'Foto',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Descripción de la foto',
      type: 'localeString',
      description:
        'Describe lo que se ve, como si se lo contaras a alguien por teléfono. Ej: "Jóvenes navegando en bote por el río al atardecer".',
      validation: (rule) => rule.required().error('La descripción es necesaria para la accesibilidad y Google.'),
    }),
    defineField({
      name: 'temporary',
      title: 'Foto temporal',
      type: 'boolean',
      description: 'Márcalo si es una foto provisional que debe reemplazarse por una foto real de JUCUM.',
      initialValue: false,
    }),
  ],
})
