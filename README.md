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
| **Capa de contenido** (`src/lib/content`) | Ninguna página lee datos directamente. En la fase 3 se conecta el CMS (Sanity) cambiando solo esa capa. |
| **Bilingüe con URLs traducidas** | `/quienes-somos/` ↔ `/en/about/`, con `hreflang`, canónicas y selector de idioma que lleva a la página equivalente. |
| **Animaciones sin librerías** | CSS *scroll-driven animations*, `IntersectionObserver` y unos pocos scripts pequeños. Cero dependencias de animación. |
| **Imágenes optimizadas** | Astro genera AVIF/WebP en varios tamaños; el navegador descarga solo el que necesita. |
| **Accesibilidad desde el inicio** | Navegación por teclado, foco visible, textos alternativos, contraste revisado y respeto por "reducir movimiento". |

## Detalles de diseño

- **Hero** a pantalla completa con zoom lento de la foto y el título que entra línea por línea.
- **Línea de río** en SVG que se dibuja con el scroll: el concepto del sitio es *"la misión que conecta mundos"*.
- **Manifiesto** que se ilumina palabra por palabra al hacer scroll.
- **Ministerios** en un recorrido horizontal anclado (escritorio) o deslizable con el dedo (móvil).
- **Escuelas** como lista editorial, con una foto que sigue al cursor.
- **OBT** (traducción bíblica oral) con una onda de audio animada.
- **Cuatro caminos para participar** en paneles que se expanden.

Paleta *Amazon Night · Amazon Green · River Blue · Sand · Cloud*; tipografías **Bebas Neue** e **Inter**, alojadas en el propio sitio.

## Estructura

```
src/
├── pages/            Rutas. Archivos mínimos: solo eligen la vista y el idioma.
│   └── en/           Las mismas páginas en inglés.
├── views/            Diseño de cada página (compartido entre idiomas).
├── components/
│   ├── home/         Secciones de la página de inicio (una por archivo).
│   └── ui/           Piezas reutilizables (imagen optimizada, línea de río…).
├── layouts/          Plantilla base: <head> SEO, encabezado y pie.
├── lib/content/      Capa de contenido: tipos, datos temporales y funciones get*.
├── i18n/             Rutas por idioma y textos fijos de la interfaz.
├── styles/           Tokens de diseño y estilos globales.
└── scripts/          JavaScript compartido (animaciones de aparición).
```

Cada archivo empieza con un comentario que explica **qué hace y cómo modificarlo**.

## Desarrollo

Requiere Node.js 22.12 o superior.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run check     # revisa tipos y errores
npm run preview   # sirve dist/ localmente
```

Variables de entorno opcionales: ver [`.env.example`](.env.example).

### Tareas comunes

| Quiero… | Dónde |
|---|---|
| Cambiar un texto institucional, ministerio, escuela o contacto | `src/lib/content/seed.ts` (luego será el panel del CMS) |
| Cambiar un texto de botón o menú | `src/i18n/ui.ts` |
| Agregar una página | `src/i18n/routes.ts` + archivos en `src/pages/` y `src/pages/en/` |
| Cambiar colores, tipografías o espacios | `src/styles/tokens.css` |
| Reordenar las secciones del inicio | `src/views/HomeView.astro` |

## Publicación

- **Vista previa para el cliente:** Vercel (`vercel.json` agrega `noindex` para que no aparezca en Google).
- **Producción:** Cloudflare Pages con el dominio de JUCUM (`public/_headers` define los encabezados de seguridad).

## Hoja de ruta

- [x] **Fase 1:** base, sistema visual, encabezado, pie y responsive
- [x] **Fase 2:** página de inicio completa y plantillas de ministerio y escuela
- [ ] **Fase 3:** panel de administración (Sanity) para el equipo de JUCUM
- [ ] **Fase 4:** páginas Quiénes somos, Ministerios, Escuelas y Sé parte
- [ ] **Fase 5:** formulario de contacto, analítica y SEO final
- [ ] **Fase 6:** pruebas de accesibilidad y rendimiento, y publicación

---

Diseño y desarrollo: **Johan** ([@JohanBarrios26](https://github.com/JohanBarrios26)).
Contenido, marca y fotografías © JUCUM Leticia. Las fotos de `src/assets/temporal/` son provisionales.
