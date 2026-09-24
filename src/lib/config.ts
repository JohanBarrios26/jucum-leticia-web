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
 * Formulario "Sitio web JUCUM Leticia" en web3forms.com (envía a ywamleticia).
 * Se puede cambiar con la variable de entorno PUBLIC_WEB3FORMS_KEY.
 * Sin clave, el formulario muestra un aviso y los canales directos.
 */
export const web3formsKey = import.meta.env.PUBLIC_WEB3FORMS_KEY || '356dbef5-1478-49c2-87c5-b1175f7423be';

/**
 * ID del sitio en Umami (analítica sin cookies). Público por diseño.
 * Se obtiene en https://cloud.umami.is y se define como PUBLIC_UMAMI_WEBSITE_ID.
 * Sin ID, no se carga ningún script de analítica.
 */
export const umamiWebsiteId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID ?? '';
