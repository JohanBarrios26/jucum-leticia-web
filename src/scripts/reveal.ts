/**
 * ANIMACIONES DE APARICIÓN
 * ----------------------------------------------------------------------------
 * Observa todos los elementos con `data-reveal` y les agrega la clase
 * `is-visible` cuando entran en pantalla. El efecto visual (qué se mueve y
 * cómo) está definido en global.css, sección 5.
 *
 * Se carga una sola vez desde BaseLayout.astro.
 */

const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (!('IntersectionObserver' in window)) {
  // Navegadores muy antiguos: se muestra todo sin animación.
  elements.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Solo se anima una vez.
        }
      }
    },
    // Se activa cuando el elemento ya subió un 10% desde el borde inferior.
    { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
  );

  elements.forEach((el) => observer.observe(el));
}
