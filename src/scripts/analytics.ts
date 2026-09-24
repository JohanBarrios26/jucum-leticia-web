/**
 * ANALÍTICA (eventos de la especificación §33)
 * ----------------------------------------------------------------------------
 * Proveedor: Umami (sin cookies → no requiere banner de consentimiento).
 * El script de Umami solo se carga si existe PUBLIC_UMAMI_WEBSITE_ID
 * (ver BaseLayout.astro). Sin él, este archivo no envía nada.
 *
 * Cómo se registran los eventos, sin tocar este archivo:
 *   1. Clics: cualquier elemento con `data-event="nombre"` (ej. whatsapp_click).
 *   2. Vistas de página especiales: `pageEvent` en BaseLayout (ej. ministry_view).
 *   3. Desde otro script: window.dispatchEvent(new CustomEvent('analytics',
 *      { detail: { name: 'contact_form_submit', data: {...} } }))
 *
 * ¿Cambiar de proveedor (Plausible, GA4…)? Solo cambia la función `send`.
 */

type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (name: string, data?: EventData) => void };
  }
}

// Eventos ocurridos antes de que cargue el script de Umami.
const queue: [string, EventData][] = [];

function send(name: string, data: EventData) {
  if (window.umami) window.umami.track(name, data);
  else queue.push([name, data]);
}

function flush() {
  while (window.umami && queue.length) {
    const [name, data] = queue.shift()!;
    window.umami.track(name, data);
  }
}

export function track(name: string, data: EventData = {}) {
  send(name, { page: location.pathname, ...data });
}

// Se vacía la cola cuando termina de cargar el script de Umami.
document.querySelector('script[data-umami]')?.addEventListener('load', flush);
window.addEventListener('load', flush);

// 1. Clics en elementos con data-event.
document.addEventListener('click', (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-event]');
  if (!el?.dataset.event) return;
  const label = (el.getAttribute('aria-label') ?? el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 80);
  track(el.dataset.event, { label });
});

// 2. Evento de vista de página (ej. visitar un ministerio).
const pageEvent = document.body.dataset.pageEvent;
if (pageEvent) track(pageEvent, { item: document.body.dataset.pageItem ?? '' });

// 3. Eventos disparados por otros scripts.
window.addEventListener('analytics', (e) => {
  const { name, data } = (e as CustomEvent<{ name: string; data?: EventData }>).detail;
  track(name, data);
});
