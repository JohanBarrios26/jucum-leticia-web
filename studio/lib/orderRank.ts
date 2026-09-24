/**
 * CAMPO DE ORDEN (para ordenar arrastrando en el panel)
 * ----------------------------------------------------------------------------
 * Equivalente a `orderRankField` y `orderRankOrdering` de
 * @sanity/orderable-document-list, pero SIN importar ese paquete aquí.
 *
 * ¿Por qué? El paquete depende de `lexorank`, que usa un formato antiguo
 * (CommonJS). Sanity valida los esquemas en Node al publicar el panel y ese
 * formato rompe la validación ("exports is not defined"). Aquí `lexorank` se
 * carga solo en el navegador, cuando alguien crea un documento nuevo.
 *
 * Los valores son compatibles con el complemento: la lista ordenable del menú
 * (structure.ts) los sigue usando igual.
 */
import {defineField} from 'sanity'

const ORDER_FIELD = 'orderRank'

/** Campo oculto que guarda la posición del documento en la lista. */
export function orderRankField({type}: {type: string}) {
  return defineField({
    name: ORDER_FIELD,
    title: 'Orden',
    type: 'string',
    readOnly: true,
    hidden: true,
    // Un documento nuevo se ubica al final de la lista.
    initialValue: async (_value, {getClient}) => {
      const {LexoRank} = await import('lexorank')
      const last: unknown = await getClient({apiVersion: '2025-08-01'}).fetch(
        `*[_type == $type] | order(@[$order] desc)[0][$order]`,
        {type, order: ORDER_FIELD},
      )
      let rank = LexoRank.min()
      if (typeof last === 'string') {
        try {
          rank = LexoRank.parse(last)
        } catch {
          // Valor inválido: se usa el mínimo.
        }
      }
      return rank.genNext().genNext().toString()
    },
  })
}

/** Orden "según la lista" para usar en cualquier vista del panel. */
export const orderRankOrdering = {
  title: 'Orden de la lista',
  name: 'ordered',
  by: [{field: ORDER_FIELD, direction: 'asc' as const}],
}
