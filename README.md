# JUCUM Leticia — Sitio web

> **Desde el corazón del Amazonas hacia las naciones.**
> Sitio bilingüe (español / inglés) para JUCUM Leticia (Juventud Con Una Misión), una comunidad misionera internacional en Leticia, Amazonas, Colombia.

*Bilingual (Spanish/English) website for YWAM Leticia, a missionary community in the Colombian Amazon. Built with Astro as a fast static site, with editable content so the organization's non-technical staff can manage it.*

---

## El reto

- **Quienes lo van a administrar no programan.** Tienen que poder agregar ministerios, escuelas, fotos y contactos sin tocar código.
- **Buena parte del público entra desde zonas del Amazonas con conexiones móviles lentas.**
- **El sitio debe durar años** con el mínimo mantenimiento.
- **No se inventa nada.** Todo lo que la organización aún no ha confirmado se muestra explícitamente como *pendiente*.

## Cómo se resolvió

| Decisión | Por qué |
|---|---|
| **Astro** con salida estática | Se publica HTML puro: carga muy rápido y se puede alojar en cualquier servicio sin servidor ni base de datos. |
| **Sanity como CMS** (`studio/`) | Panel en español para que JUCUM edite todo sin programar: campos bilingües, orden por arrastre, fotos con punto de interés y autorizaciones de publicación. |
| **Capa de contenido** (`src/lib/content`) | Ninguna página lee Sanity directamente: una sola consulta GROQ por compilación, convertida a tipos propios. |
| **Bilingüe con URLs traducidas** | `/quienes-somos/` ↔ `/en/about/`, con `hreflang`, canónicas y selector de idioma que lleva a la página equivalente. |
| **Animaciones sin librerías** | CSS *scroll-driven animations*, `IntersectionObserver` y unos pocos scripts pequeños. Cero dependencias de animación. |
| **Imágenes optimizadas** | El CDN de Sanity entrega AVIF/WebP en el tamaño justo; el sitio publicado pesa ~1 MB. |
| **Formulario sin servidor** | Web3Forms envía los mensajes al correo de JUCUM sin exponerlo; anti-spam con campo trampa y tiempo mínimo; funciona también sin JavaScript. |
| **Analítica sin cookies** | Umami: mide visitas y los eventos de la especificación (WhatsApp, "Quiero ser parte", formulario, vistas de ministerios…) sin banner de cookies. |
| **SEO** | Títulos y descripciones por página, `hreflang`, Open Graph con la foto de cada página, datos estructurados (ONG y migas de pan), sitemap y robots. |
| **Accesibilidad desde el inicio** | Navegación por teclado, foco visible, textos alternativos, contraste revisado y respeto por "reducir movimiento". |

## Detalles de diseño

- **Hero** a pantalla completa con zoom lento de la foto y el título que entra línea por línea.
- **Línea de río** en SVG que se dibuja con el scroll: el concepto del sitio es *"la misión que conecta mundos"*.
- **Manifiesto** que se ilumina palabra por palabra al hacer scroll.
- **Ministerios** en un recorrido horizontal anclado (escritorio) o deslizable con el dedo (móvil).
- **Escuelas** como lista editorial, con una foto que sigue al cursor.
- **OBT** (traducción bíblica oral) con una onda de audio animada.
- **Cuatro caminos para participar** en paneles que se expanden.
- **Nuestras bases:** una página por base (la ciudad de Leticia y JUCUM El Puente, en medio de la selva) con fotos, videos y una ilustración de **"Cómo llegar"** (a pie por la selva o por el río).
- **Nuestro equipo:** perfil de cada misionero con su historia, petición de oración y botones **"Orar por…"** y **"Apoyar a…"** (enlace de donación personal o WhatsApp; nunca datos bancarios).
- **Un detalle propio por ministerio y escuela:** un motivo SVG animado (río, puente, onda de audio, pulso…) y bloques especiales editables. Entre ellos, **audios de la Palabra en lenguas del Amazonas** (OBT), con un reproductor propio que no descarga nada hasta que se presiona reproducir.

Paleta *Amazon Night · Amazon Green · River Blue · Sand · Cloud*; tipografías **Bebas Neue** e **Inter**, alojadas en el propio sitio.

## Estructura

```
src/
├── pages/            Rutas. Archivos mínimos: solo eligen la vista y el idioma.
│   └── en/           Las mismas páginas en inglés.
├── views/            Diseño de cada página (compartido entre idiomas).
├── components/
│   ├── home/         Secciones de la página de inicio (una por archivo).
│   ├── features/     Bloques especiales: audios, ruta por el río, etapas, video…
│   └── ui/           Piezas reutilizables (imagen optimizada, línea de río…).
├── layouts/          Plantilla base: <head> SEO, encabezado y pie.
├── lib/content/      Capa de contenido: tipos y funciones get* que usan las páginas.
├── lib/sanity/       Conexión con Sanity: configuración y consulta GROQ.
├── i18n/             Rutas por idioma y textos fijos de la interfaz.
├── styles/           Tokens de diseño y estilos globales.
└── scripts/          JavaScript compartido (animaciones de aparición).
studio/               Panel de administración (Sanity Studio, paquete aparte).
docs/                 Manual para los administradores de JUCUM.
```

Cada archivo empieza con un comentario que explica **qué hace y cómo modificarlo**.

## Desarrollo

Requiere Node.js 22.12 o superior.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run check     # revisa tipos y errores
npm run check:links  # busca enlaces rotos (después de build)
npm run preview   # sirve dist/ localmente
```

Variables de entorno opcionales: ver [`.env.example`](.env.example).

### Panel de administración

```bash
cd studio
npm install
npx sanity dev      # http://localhost:3333
npx sanity deploy   # publica el panel (también automático con GitHub Actions al subir cambios en studio/)
npm run backup      # copia de seguridad del contenido
```

Guía para quienes editan el contenido: [docs/MANUAL-ADMINISTRADORES.md](docs/MANUAL-ADMINISTRADORES.md).

### Tareas comunes

| Quiero… | Dónde |
|---|---|
| Cambiar un texto institucional, ministerio, escuela o contacto | El panel de Sanity (no el código) |
| Agregar un campo nuevo al contenido | `studio/schemaTypes/` → `src/lib/content/types.ts` → `src/lib/sanity/fetch.ts` → `src/lib/content/index.ts` |
| Cambiar un texto de botón o menú | `src/i18n/ui.ts` |
| Agregar una página | `src/i18n/routes.ts` + archivos en `src/pages/` y `src/pages/en/` |
| Cambiar colores, tipografías o espacios | `src/styles/tokens.css` |
| Reordenar las secciones del inicio | `src/views/HomeView.astro` |

## Publicación

- **Vista previa para el cliente:** Vercel (`vercel.json` agrega `noindex` para que no aparezca en Google).
- **Producción:** Cloudflare Pages con el dominio de JUCUM (`public/_headers` define los encabezados de seguridad). Pasos completos en [docs/PUBLICACION.md](docs/PUBLICACION.md).

**Resultados Lighthouse (móvil, 4G simulada):** rendimiento 87–100 · accesibilidad 100 · buenas prácticas 100 · sin saltos de diseño (CLS 0).

## Hoja de ruta

- [x] **Fase 1:** base, sistema visual, encabezado, pie y responsive
- [x] **Fase 2:** página de inicio completa y plantillas de ministerio y escuela
- [x] **Fase 3:** panel de administración (Sanity) para el equipo de JUCUM
- [x] **Fase 4:** páginas Quiénes somos, Ministerios, Escuelas, Sé parte y Contacto, y detalle diferencial por ministerio/escuela
- [x] **Fase 5:** formulario de contacto, analítica, SEO final y página "Nuestro equipo" con apoyo personal
- [x] **Fase 6:** pruebas de accesibilidad y rendimiento, enlaces rotos y guía de publicación
- [ ] **Publicación** con el dominio de JUCUM (cuando el cliente lo apruebe)

---

Diseño y desarrollo: **Johan** ([@JohanBarrios26](https://github.com/JohanBarrios26)).
Contenido, marca y fotografías © JUCUM Leticia. Las fotos marcadas como temporales en el panel son provisionales.
