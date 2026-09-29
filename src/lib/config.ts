/**
 * CONFIGURACIÓN GENERAL
 * ----------------------------------------------------------------------------
 * Interruptores que cambian el comportamiento del sitio sin tocar componentes.
 * Se controlan con variables de entorno (en Vercel/Cloudflare: Settings →
 * Environment Variables; en local: archivo .env).
 */

/**
 * Mostrar las marcas "Pendiente de contenido" donde falta información.
 * Útil mientras el cliente revisa. En producción: PUBLIC_SHOW_PENDING=false.
 */
export const showPending = import.meta.env.PUBLIC_SHOW_PENDING !== 'false';

/**
 * Clave pública de Web3Forms (servicio que envía el formulario de contacto al
 * correo de JUCUM). Es pública por diseño: NO revela el correo de destino.
 * Formulario "JUCUM Leticia" en web3forms.com. El correo de destino se
 * configura allí, no en el código.
 * Se puede cambiar con la variable de entorno PUBLIC_WEB3FORMS_KEY.
 * Sin clave, el formulario muestra un aviso y los canales directos.
 */
export const web3formsKey = import.meta.env.PUBLIC_WEB3FORMS_KEY || '6bfc95d4-4391-49f4-b917-2c6fa4626b3b';

/**
 * ID del sitio en Umami (analítica sin cookies). Público por diseño.
 * Sitio registrado en https://cloud.umami.is. Se puede cambiar con la variable
 * de entorno PUBLIC_UMAMI_WEBSITE_ID. Sin ID, no se carga ningún script de analítica.
 */
export const umamiWebsiteId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || '6d24ce5c-e732-4292-aaf3-ee12a1c91a04';
