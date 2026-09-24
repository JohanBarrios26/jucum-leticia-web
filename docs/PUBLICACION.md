# Guía de publicación: de la vista previa al dominio de JUCUM

Hoy el sitio vive como **vista previa** en `https://jucum-leticia-web.vercel.app` (con `noindex`: Google no lo muestra).
Cuando el cliente apruebe y compre su dominio, esta es la lista de pasos para publicarlo definitivamente.

> Principio de durabilidad: **todas las cuentas deben quedar a nombre de JUCUM** (correo institucional, p. ej. ywamleticia@gmail.com), con al menos **dos administradores**. Así el sitio no depende de una sola persona.

---

## 1. Dominio

1. Comprar el dominio (ej. `jucumleticia.org`) **a nombre de JUCUM**, con **renovación automática** y, si es posible, pagado por varios años.
2. Recomendado: registrarlo o transferirlo a **Cloudflare Registrar** (precio de costo, sin recargos) para tener dominio y hosting en el mismo lugar.

## 2. Hosting en Cloudflare Pages (gratis, sin límite de visitas)

1. Crear una cuenta de Cloudflare con el correo de JUCUM.
2. **Workers & Pages → Create → Pages → Connect to Git** → elegir el repositorio.
   - Opción A: transferir el repositorio a una cuenta de GitHub de JUCUM (y dejar una copia/fork en el portafolio).
   - Opción B: dar acceso de solo lectura al repositorio actual.
3. Configuración de compilación:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Variables de entorno (Settings → Environment variables):

   | Variable | Valor |
   |---|---|
   | `SITE_URL` | `https://jucumleticia.org` (el dominio final) |
   | `PUBLIC_SHOW_PENDING` | `false` (oculta las marcas "Pendiente de contenido") |
   | `NODE_VERSION` | `24` |

5. **Custom domains** → agregar el dominio y `www`.
6. El archivo `public/_headers` ya define los encabezados de seguridad y caché para Cloudflare (y **no** incluye `noindex`, así Google sí indexará).

## 3. Reconectar los servicios al nuevo dominio

| Servicio | Qué cambiar |
|---|---|
| **Sanity → webhook** | En sanity.io/manage → API → Webhooks: cambiar la URL por el *Deploy Hook* de Cloudflare Pages (Settings → Builds → Deploy hooks). |
| **Sanity → CORS** | Agregar el nuevo dominio si se usará el panel embebido (no es necesario con jucum-leticia.sanity.studio). |
| **Umami** | En cloud.umami.is, editar el sitio y poner el dominio nuevo (el sitio envía datos solo desde su dominio). |
| **Web3Forms** | Actualizar el dominio permitido del formulario. |
| **Google Search Console** | Verificar el dominio y enviar `https://jucumleticia.org/sitemap-index.xml`. |
| **Vercel** | Apagar o borrar el proyecto de vista previa para no tener dos versiones públicas. |

## 4. Panel de administración (Sanity)

1. Invitar como **Administradores**: jucumlc@gmail.com y ywamleticia@gmail.com (sanity.io/manage → Members).
2. Opcional: transferir la organización "JUCUM Leticia" a JUCUM (Settings → Transfer).
3. Entregar el **manual**: `docs/MANUAL-ADMINISTRADORES.md`.

## 5. Contenido antes de publicar (especificación §35–37)

- [ ] Reemplazar las **fotos temporales** (marcadas "Foto temporal" en el panel) por fotos reales con autorización.
- [ ] Misión, visión, valores e historia confirmados.
- [ ] Descripciones completas de ministerios y fichas de escuelas (fechas, costos, requisitos).
- [ ] Encargados de cada escuela (con autorización).
- [ ] Redes sociales oficiales (Instagram ✔, Facebook pendiente).
- [ ] Revisar las traducciones al inglés.
- [ ] Probar el formulario de contacto desde el dominio final.

## 6. Respaldos

- En `studio/`: `npm run backup` genera `studio/backups/production.tar.gz` con TODO el contenido y las fotos. Guardarlo en un lugar seguro (Drive de JUCUM) al menos una vez al mes.
- El código vive en GitHub (historial completo).

## 7. Verificación final

```bash
npm run check          # tipos y errores
npm run build          # genera el sitio
npm run check:links    # enlaces rotos
```

Y en el sitio publicado: Lighthouse (Chrome → DevTools → Lighthouse) en modo móvil. Resultados de referencia en la vista previa: rendimiento 87–100, accesibilidad 100, buenas prácticas 100.
