/**
 * MENÚ LATERAL DEL PANEL
 * ----------------------------------------------------------------------------
 * Define qué ve el equipo de JUCUM al entrar al panel y en qué orden:
 *   Configuración · Textos de páginas · Inicio · Quiénes somos · Ministerios ·
 *   Escuelas · Cómo participar · Personas · Galería · Historias
 *
 * Las listas "ordenables" permiten cambiar el orden arrastrando los elementos.
 * El complemento que lo hace (@sanity/orderable-document-list) se carga recién
 * al abrir la lista (import dinámico), porque no puede cargarse en Node al
 * validar los esquemas (ver lib/orderRank.ts).
 */
import {CogIcon} from '@sanity/icons/Cog'
import {HomeIcon} from '@sanity/icons/Home'
import {UsersIcon} from '@sanity/icons/Users'
import {HeartIcon} from '@sanity/icons/Heart'
import {BookIcon} from '@sanity/icons/Book'
import {ImagesIcon} from '@sanity/icons/Images'
import {CommentIcon} from '@sanity/icons/Comment'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {UserIcon} from '@sanity/icons/User'
import type {ComponentType} from 'react'
import type {ConfigContext} from 'sanity'
import type {ItemChild, StructureBuilder, StructureResolver} from 'sanity/structure'

/** Lista ordenable por arrastre, cargada bajo demanda. */
function orderableList(
  S: StructureBuilder,
  context: ConfigContext,
  type: string,
  title: string,
  icon: ComponentType,
) {
  return S.listItem()
    .id(`orderable-${type}`)
    .title(title)
    .icon(icon)
    .child(async () => {
      const {orderableDocumentListDeskItem} = await import('@sanity/orderable-document-list')
      const item = orderableDocumentListDeskItem({type, title, icon, S, context})
      // El complemento devuelve la vista ya armada (un panel de lista ordenable).
      return item.child as unknown as ItemChild
    })
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Contenido del sitio')
    .items([
      S.listItem()
        .title('Configuración del sitio')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Configuración del sitio')),
      S.listItem()
        .title('Textos de las páginas')
        .icon(DocumentTextIcon)
        .child(S.document().schemaType('pageTexts').documentId('pageTexts').title('Textos de las páginas')),
      S.divider(),
      S.listItem()
        .title('Página de inicio')
        .icon(HomeIcon)
        .child(S.document().schemaType('home').documentId('home').title('Página de inicio')),
      S.listItem()
        .title('Quiénes somos')
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType('about').documentId('about').title('Quiénes somos')),
      S.divider(),
      orderableList(S, context, 'ministry', 'Ministerios', HeartIcon),
      orderableList(S, context, 'school', 'Escuelas', BookIcon),
      S.listItem()
        .title('Cómo participar')
        .icon(UsersIcon)
        .child(S.documentTypeList('joinPath').title('Cómo participar')),
      orderableList(S, context, 'person', 'Personas', UserIcon),
      S.divider(),
      orderableList(S, context, 'galleryItem', 'Galería', ImagesIcon),
      orderableList(S, context, 'story', 'Historias', CommentIcon),
    ])
