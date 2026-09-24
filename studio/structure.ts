/**
 * MENÚ LATERAL DEL PANEL
 * ----------------------------------------------------------------------------
 * Define qué ve el equipo de JUCUM al entrar al panel y en qué orden:
 *   Configuración · Página de inicio · Ministerios · Escuelas · Cómo participar
 *   · Galería · Historias
 * Las listas "ordenables" permiten cambiar el orden arrastrando los elementos.
 */
import {CogIcon} from '@sanity/icons/Cog'
import {HomeIcon} from '@sanity/icons/Home'
import {UsersIcon} from '@sanity/icons/Users'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Contenido del sitio')
    .items([
      S.listItem()
        .title('Configuración del sitio')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Configuración del sitio')),
      S.listItem()
        .title('Página de inicio')
        .icon(HomeIcon)
        .child(S.document().schemaType('home').documentId('home').title('Página de inicio')),
      S.divider(),
      orderableDocumentListDeskItem({type: 'ministry', title: 'Ministerios', S, context}),
      orderableDocumentListDeskItem({type: 'school', title: 'Escuelas', S, context}),
      S.listItem()
        .title('Cómo participar')
        .icon(UsersIcon)
        .child(S.documentTypeList('joinPath').title('Cómo participar').canHandleIntent(() => false)),
      S.divider(),
      orderableDocumentListDeskItem({type: 'galleryItem', title: 'Galería', S, context}),
      orderableDocumentListDeskItem({type: 'story', title: 'Historias', S, context}),
    ])
