/**
 * TEXTOS LEGALES (privacidad, términos, cookies, donaciones y reembolsos)
 * ----------------------------------------------------------------------------
 * Contenido de las 4 páginas legales en español, inglés y portugués. Se muestra
 * con src/views/LegalView.astro. Para cambiar un texto, edítalo aquí en los 3
 * idiomas; el resto del sitio no cambia.
 *
 * Marcadores que se reemplazan al mostrar la página:
 *   {org}    → nombre de la organización (Sanity → Configuración del sitio)
 *   {email}  → correo de contacto (Sanity → Configuración del sitio)
 *
 * IMPORTANTE: son textos base redactados para una organización sin ánimo de
 * lucro que NO vende productos ni cobra en línea. Antes de publicar el sitio con
 * dominio propio, conviene que un abogado en Colombia los revise y que se
 * agregue la razón social / NIT de la entidad responsable.
 * Cambia `legalUpdated` cada vez que se modifique algún texto.
 */
import type { LegalPage, Locale } from './routes';

export const legalUpdated = '2026-10-07';

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalDoc {
  title: string;
  description: string;
  sections: LegalSection[];
}

type LegalSet = Record<LegalPage, LegalDoc>;

const es: LegalSet = {
  privacy: {
    title: 'Política de privacidad',
    description: 'Qué datos personales recolectamos en este sitio, para qué los usamos y cómo ejercer tus derechos.',
    sections: [
      {
        heading: '1. Responsable del tratamiento',
        paragraphs: [
          '{org} (en adelante, “nosotros”), con sede en Leticia, Amazonas, Colombia, es responsable del tratamiento de los datos personales recolectados en este sitio web. Puedes escribirnos a {email}.',
          'Esta política se rige por la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia (protección de datos personales). Si nos visitas desde otro país, también respetamos las normas que te protejan, como la LGPD de Brasil, la Ley 29733 de Perú o el RGPD de la Unión Europea.',
        ],
      },
      {
        heading: '2. Qué datos recolectamos',
        paragraphs: ['Solo recolectamos lo estrictamente necesario:'],
        items: [
          'Formulario de contacto: nombre, correo electrónico y mensaje (obligatorios); teléfono o WhatsApp y país (opcionales); el motivo por el que nos escribes y la constancia de que aceptaste esta política.',
          'Estadísticas de visita: datos anónimos y agregados (página visitada, tipo de dispositivo, navegador, país aproximado y clics en botones como WhatsApp). No guardamos tu dirección IP completa, no usamos cookies ni te identificamos.',
          'Si nos escribes por WhatsApp, correo o redes sociales, esos servicios tratan tus datos según sus propias políticas.',
        ],
      },
      {
        heading: '3. Para qué usamos tus datos',
        items: [
          'Responder tu mensaje y contarte cómo orar, servir, venir, estudiar o apoyar.',
          'Mejorar el sitio con estadísticas anónimas.',
          'Cumplir obligaciones legales.',
        ],
        paragraphs: ['No vendemos, alquilamos ni compartimos tus datos con fines comerciales ni publicitarios.'],
      },
      {
        heading: '4. Base legal y autorización',
        paragraphs: [
          'Tratamos los datos del formulario con tu autorización previa, expresa e informada: la casilla del formulario debe marcarse para poder enviarlo. Puedes revocarla en cualquier momento escribiéndonos. Las estadísticas anónimas no identifican a ninguna persona.',
        ],
      },
      {
        heading: '5. Quién más interviene (encargados y terceros)',
        items: [
          'Web3Forms (Estados Unidos): recibe el contenido del formulario y lo envía a nuestro correo.',
          'Gmail / Google: recibe y guarda los correos que nos llegan.',
          'Umami Cloud: estadísticas de visitas sin cookies.',
          'Vercel (Estados Unidos): aloja el sitio y puede registrar temporalmente la dirección IP por seguridad.',
          'Sanity (cdn.sanity.io): sirve las imágenes y administra los textos del sitio.',
          'YouTube / Google: la vista previa de un video se descarga de i.ytimg.com; el video solo se carga si pulsas reproducir, desde youtube-nocookie.com.',
          'WhatsApp (Meta), PayPal u otras plataformas: si pulsas un enlace hacia ellas, sales de este sitio y aplican sus propias políticas.',
        ],
        paragraphs: [
          'Algunos de estos servicios están en otros países, por lo que tus datos pueden transferirse internacionalmente con las medidas de seguridad propias de cada proveedor.',
        ],
      },
      {
        heading: '6. Cuánto tiempo conservamos tus datos',
        paragraphs: [
          'Los mensajes del formulario se conservan mientras sea necesario para atender tu solicitud y, como máximo, 2 años después del último contacto, salvo que la ley exija más tiempo. Luego se eliminan.',
        ],
      },
      {
        heading: '7. Tus derechos',
        items: [
          'Conocer, actualizar y rectificar tus datos.',
          'Solicitar prueba de tu autorización y revocarla.',
          'Pedir que eliminemos tus datos.',
          'Ser informado sobre el uso que les damos.',
          'Presentar una queja ante la Superintendencia de Industria y Comercio (Colombia) o ante la autoridad de tu país (ANPD en Brasil, Autoridad Nacional de Protección de Datos Personales en Perú, autoridad de tu país en la Unión Europea).',
        ],
        paragraphs: ['Para ejercerlos escríbenos a {email}. Respondemos en un máximo de 15 días hábiles.'],
      },
      {
        heading: '8. Menores de edad',
        paragraphs: [
          'Este sitio no está dirigido a menores de 14 años y no recolectamos sus datos a propósito. Si eres madre, padre o tutor y crees que un menor nos escribió, avísanos y lo eliminaremos. De los niños de las familias del equipo solo publicamos el primer nombre, con autorización de sus padres.',
        ],
      },
      {
        heading: '9. Personas del equipo',
        paragraphs: [
          'Los nombres, fotos e historias de las personas del equipo se publican únicamente con su autorización, que pueden retirar cuando quieran escribiéndonos.',
        ],
      },
      {
        heading: '10. Seguridad y cambios',
        paragraphs: [
          'Usamos conexión cifrada (HTTPS) y limitamos el acceso a la información. Podemos actualizar esta política; la fecha de la última actualización aparece al inicio de la página.',
        ],
      },
    ],
  },
  terms: {
    title: 'Términos y condiciones',
    description: 'Reglas de uso de este sitio web.',
    sections: [
      {
        heading: '1. Aceptación',
        paragraphs: [
          'Al usar este sitio web de {org} aceptas estos términos. Si no estás de acuerdo, por favor no lo uses.',
        ],
      },
      {
        heading: '2. Qué es este sitio',
        paragraphs: [
          'Es un sitio informativo sobre la misión, las bases, los ministerios, las escuelas y el equipo de {org}. No vendemos productos ni cobramos pagos en línea a través de este sitio.',
        ],
      },
      {
        heading: '3. Información publicada',
        paragraphs: [
          'Hacemos lo posible por mantener la información correcta y actualizada, pero fechas, costos, requisitos y programas pueden cambiar. Antes de tomar una decisión (viajar, inscribirte, donar), confírmala escribiéndonos. El sitio se ofrece “tal como está”, sin garantías de disponibilidad continua.',
        ],
      },
      {
        heading: '4. Uso adecuado',
        items: [
          'No uses el sitio para enviar spam, contenido ofensivo o ilegal, ni para suplantar a otras personas.',
          'No intentes dañar, sobrecargar ni acceder sin permiso a los sistemas del sitio.',
          'Los datos que nos envíes deben ser verdaderos y tuyos.',
        ],
      },
      {
        heading: '5. Propiedad intelectual',
        paragraphs: [
          'Los textos, fotos, logotipos y diseños son de {org} o se usan con autorización de sus autores. Puedes compartir los enlaces del sitio. Para reutilizar fotos o textos, pídenos permiso por escrito. Las fotos de personas se publican con su autorización.',
        ],
      },
      {
        heading: '6. Enlaces y servicios de terceros',
        paragraphs: [
          'El sitio enlaza a WhatsApp, redes sociales, YouTube, PayPal y otros servicios. No controlamos su contenido ni sus políticas, y no somos responsables por ellos.',
        ],
      },
      {
        heading: '7. Donaciones y apoyo',
        paragraphs: ['Las donaciones se rigen por la página de “Donaciones y reembolsos”.'],
      },
      {
        heading: '8. Limitación de responsabilidad',
        paragraphs: [
          'En la medida permitida por la ley, {org} no responde por daños derivados del uso del sitio, de errores involuntarios en su contenido o de fallas de servicios de terceros. Esto no limita derechos que la ley te reconoce como consumidor o titular de datos.',
        ],
      },
      {
        heading: '9. Ley aplicable',
        paragraphs: [
          'Estos términos se rigen por las leyes de la República de Colombia. Para cualquier controversia serán competentes los jueces de Leticia, Amazonas, sin perjuicio de los derechos que la ley de tu país te otorgue.',
        ],
      },
      {
        heading: '10. Cambios y contacto',
        paragraphs: [
          'Podemos modificar estos términos; la versión vigente es la publicada aquí, con su fecha de actualización. Dudas: {email}.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Política de cookies',
    description: 'Qué cookies y tecnologías similares usa este sitio.',
    sections: [
      {
        heading: '1. Qué son las cookies',
        paragraphs: [
          'Son pequeños archivos que un sitio guarda en tu dispositivo para recordarte o para hacerte seguimiento.',
        ],
      },
      {
        heading: '2. Qué usamos en este sitio',
        paragraphs: [
          'Este sitio NO instala cookies propias ni de terceros para publicidad, seguimiento o perfiles. Por eso no te mostramos un aviso de cookies que aceptar.',
        ],
        items: [
          'Estadísticas: usamos Umami, una herramienta que mide visitas de forma anónima, sin cookies y sin guardar tu dirección IP completa. Respeta la señal “No rastrear” (Do Not Track) de tu navegador.',
          'Funcionamiento: no guardamos datos en tu navegador, salvo lo estrictamente técnico para que las páginas funcionen.',
        ],
      },
      {
        heading: '3. Contenido de terceros',
        paragraphs: [
          'Algunas páginas incluyen videos de YouTube. La imagen de vista previa se descarga de los servidores de Google, que reciben tu dirección IP. El video solo se carga si pulsas reproducir, usando el dominio youtube-nocookie.com; en ese momento Google puede aplicar sus propias cookies y políticas. Las imágenes del sitio se sirven desde cdn.sanity.io.',
          'Si pulsas un enlace hacia WhatsApp, PayPal o una red social, sales de este sitio y aplican las cookies y políticas de ese servicio.',
        ],
      },
      {
        heading: '4. Cómo controlar las cookies',
        paragraphs: [
          'Desde la configuración de tu navegador puedes borrar o bloquear cookies en cualquier momento. Si en el futuro agregamos herramientas que usen cookies no esenciales, pediremos primero tu consentimiento y actualizaremos esta política.',
        ],
      },
      {
        heading: '5. Más información',
        paragraphs: ['Consulta la política de privacidad o escríbenos a {email}.'],
      },
    ],
  },
  refunds: {
    title: 'Donaciones y reembolsos',
    description: 'Cómo funcionan las donaciones y qué hacer si necesitas pedir una devolución.',
    sections: [
      {
        heading: '1. Este sitio no procesa pagos',
        paragraphs: [
          'Aquí no se paga ni se dona directamente. Los botones de “Apoyar” llevan a un enlace de donación externo (por ejemplo PayPal) o a WhatsApp para coordinar con el equipo. El pago lo procesa esa plataforma, con sus propios términos y comisiones. Nunca publicamos números de cuenta bancaria en el sitio.',
        ],
      },
      {
        heading: '2. Las donaciones son voluntarias',
        paragraphs: [
          'Una donación es un regalo voluntario para apoyar la misión o a una persona del equipo. En general no es reembolsable una vez que se ha usado para su propósito.',
        ],
      },
      {
        heading: '3. Errores y cobros duplicados',
        paragraphs: [
          'Si donaste por error, con un monto equivocado o se te cobró dos veces, escríbenos a {email} dentro de los 30 días siguientes, con tu nombre, fecha, monto y comprobante. Revisaremos tu caso y, si procede, gestionaremos la devolución por el mismo medio de pago. El tiempo de acreditación depende de la plataforma y de tu banco.',
        ],
      },
      {
        heading: '4. Escuelas, cursos y viajes',
        paragraphs: [
          'Los costos, fechas y condiciones de cancelación de cada escuela o programa se informan antes de inscribirte y los acuerdas directamente con {org}. Si en el futuro se habilitan pagos en línea, se respetará el derecho de retracto que la Ley 1480 de 2011 (Estatuto del Consumidor de Colombia) reconozca en cada caso.',
        ],
      },
      {
        heading: '5. Contacto',
        paragraphs: ['Para cualquier reclamo o duda sobre donaciones: {email}.'],
      },
    ],
  },
};

const en: LegalSet = {
  privacy: {
    title: 'Privacy policy',
    description: 'What personal data we collect on this site, why, and how to exercise your rights.',
    sections: [
      {
        heading: '1. Data controller',
        paragraphs: [
          '{org} (“we”), based in Leticia, Amazonas, Colombia, is responsible for the personal data collected on this website. You can write to us at {email}.',
          'This policy follows Colombian Law 1581 of 2012 and Decree 1377 of 2013 (personal data protection). If you visit from another country, we also respect the rules that protect you, such as Brazil’s LGPD, Peru’s Law 29733 or the EU GDPR.',
        ],
      },
      {
        heading: '2. What data we collect',
        paragraphs: ['We only collect what is strictly necessary:'],
        items: [
          'Contact form: name, email and message (required); phone or WhatsApp and country (optional); the reason you write to us and a record that you accepted this policy.',
          'Visit statistics: anonymous, aggregated data (page visited, device type, browser, approximate country and clicks on buttons such as WhatsApp). We do not store your full IP address, use cookies or identify you.',
          'If you contact us through WhatsApp, email or social media, those services process your data under their own policies.',
        ],
      },
      {
        heading: '3. How we use your data',
        items: [
          'To reply to your message and tell you how to pray, serve, come, study or support.',
          'To improve the site using anonymous statistics.',
          'To comply with legal obligations.',
        ],
        paragraphs: ['We do not sell, rent or share your data for commercial or advertising purposes.'],
      },
      {
        heading: '4. Legal basis and consent',
        paragraphs: [
          'We process form data with your prior, express and informed consent: the form checkbox must be ticked to send it. You may withdraw consent at any time by writing to us. Anonymous statistics do not identify anyone.',
        ],
      },
      {
        heading: '5. Who else is involved (processors and third parties)',
        items: [
          'Web3Forms (United States): receives the form content and forwards it to our email.',
          'Gmail / Google: receives and stores the emails sent to us.',
          'Umami Cloud: cookie-free visit statistics.',
          'Vercel (United States): hosts the site and may temporarily log IP addresses for security.',
          'Sanity (cdn.sanity.io): serves the images and manages the site texts.',
          'YouTube / Google: a video’s preview image is downloaded from i.ytimg.com; the video itself only loads if you press play, from youtube-nocookie.com.',
          'WhatsApp (Meta), PayPal or other platforms: if you click a link to them you leave this site and their own policies apply.',
        ],
        paragraphs: [
          'Some of these services are located in other countries, so your data may be transferred internationally with each provider’s own security measures.',
        ],
      },
      {
        heading: '6. How long we keep your data',
        paragraphs: [
          'Form messages are kept for as long as needed to handle your request and, at most, 2 years after the last contact, unless the law requires longer. They are then deleted.',
        ],
      },
      {
        heading: '7. Your rights',
        items: [
          'To know, update and correct your data.',
          'To request proof of your consent and to withdraw it.',
          'To ask us to delete your data.',
          'To be informed about how we use it.',
          'To complain to the Superintendence of Industry and Commerce (Colombia) or to the authority in your country (ANPD in Brazil, the National Authority for Personal Data Protection in Peru, your national authority in the EU).',
        ],
        paragraphs: ['To exercise them, write to {email}. We reply within 15 business days.'],
      },
      {
        heading: '8. Children',
        paragraphs: [
          'This site is not aimed at children under 14 and we do not knowingly collect their data. If you are a parent or guardian and believe a child wrote to us, tell us and we will delete it. For the children of team families we only publish a first name, with their parents’ consent.',
        ],
      },
      {
        heading: '9. Team members',
        paragraphs: [
          'Names, photos and stories of team members are published only with their consent, which they can withdraw at any time by writing to us.',
        ],
      },
      {
        heading: '10. Security and changes',
        paragraphs: [
          'We use an encrypted connection (HTTPS) and limit access to information. We may update this policy; the date of the last update appears at the top of the page.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms and conditions',
    description: 'Rules for using this website.',
    sections: [
      {
        heading: '1. Acceptance',
        paragraphs: ['By using this {org} website you accept these terms. If you disagree, please do not use it.'],
      },
      {
        heading: '2. What this site is',
        paragraphs: [
          'It is an informational website about the mission, bases, ministries, schools and team of {org}. We do not sell products or take online payments through this site.',
        ],
      },
      {
        heading: '3. Published information',
        paragraphs: [
          'We do our best to keep information accurate and current, but dates, costs, requirements and programs may change. Before making a decision (travelling, enrolling, donating), confirm it by writing to us. The site is provided “as is”, with no guarantee of continuous availability.',
        ],
      },
      {
        heading: '4. Proper use',
        items: [
          'Do not use the site to send spam, offensive or illegal content, or to impersonate others.',
          'Do not try to damage, overload or gain unauthorized access to the site’s systems.',
          'The data you send us must be truthful and your own.',
        ],
      },
      {
        heading: '5. Intellectual property',
        paragraphs: [
          'Texts, photos, logos and designs belong to {org} or are used with their authors’ permission. You may share links to the site. To reuse photos or texts, ask for written permission. Photos of people are published with their consent.',
        ],
      },
      {
        heading: '6. Third-party links and services',
        paragraphs: [
          'The site links to WhatsApp, social networks, YouTube, PayPal and other services. We do not control their content or policies and are not responsible for them.',
        ],
      },
      {
        heading: '7. Donations and support',
        paragraphs: ['Donations are governed by the “Donations and refunds” page.'],
      },
      {
        heading: '8. Limitation of liability',
        paragraphs: [
          'To the extent permitted by law, {org} is not liable for damages arising from use of the site, unintentional errors in its content or failures of third-party services. This does not limit rights the law gives you as a consumer or data subject.',
        ],
      },
      {
        heading: '9. Governing law',
        paragraphs: [
          'These terms are governed by the laws of the Republic of Colombia. Any dispute falls under the courts of Leticia, Amazonas, without prejudice to the rights your own country’s law grants you.',
        ],
      },
      {
        heading: '10. Changes and contact',
        paragraphs: [
          'We may modify these terms; the current version is the one published here, with its update date. Questions: {email}.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Cookie policy',
    description: 'Which cookies and similar technologies this site uses.',
    sections: [
      {
        heading: '1. What cookies are',
        paragraphs: ['Small files that a site stores on your device to remember you or to track you.'],
      },
      {
        heading: '2. What we use on this site',
        paragraphs: [
          'This site does NOT set its own or third-party cookies for advertising, tracking or profiling. That is why we do not show a cookie banner to accept.',
        ],
        items: [
          'Statistics: we use Umami, a tool that measures visits anonymously, without cookies and without storing your full IP address. It respects your browser’s “Do Not Track” signal.',
          'Operation: we do not store data in your browser beyond what is strictly technical for pages to work.',
        ],
      },
      {
        heading: '3. Third-party content',
        paragraphs: [
          'Some pages include YouTube videos. The preview image is downloaded from Google’s servers, which receive your IP address. The video only loads if you press play, using the youtube-nocookie.com domain; at that point Google may apply its own cookies and policies. Site images are served from cdn.sanity.io.',
          'If you click a link to WhatsApp, PayPal or a social network, you leave this site and that service’s cookies and policies apply.',
        ],
      },
      {
        heading: '4. How to control cookies',
        paragraphs: [
          'You can delete or block cookies at any time in your browser settings. If we later add tools that use non-essential cookies, we will ask for your consent first and update this policy.',
        ],
      },
      {
        heading: '5. More information',
        paragraphs: ['See the privacy policy or write to us at {email}.'],
      },
    ],
  },
  refunds: {
    title: 'Donations and refunds',
    description: 'How donations work and what to do if you need to request a refund.',
    sections: [
      {
        heading: '1. This site does not process payments',
        paragraphs: [
          'You do not pay or donate directly here. The “Support” buttons lead to an external donation link (for example PayPal) or to WhatsApp to coordinate with the team. That platform processes the payment under its own terms and fees. We never publish bank account numbers on the site.',
        ],
      },
      {
        heading: '2. Donations are voluntary',
        paragraphs: [
          'A donation is a voluntary gift to support the mission or a team member. In general it is not refundable once it has been used for its purpose.',
        ],
      },
      {
        heading: '3. Mistakes and duplicate charges',
        paragraphs: [
          'If you donated by mistake, with the wrong amount, or were charged twice, write to {email} within 30 days with your name, date, amount and receipt. We will review your case and, where appropriate, arrange the refund through the same payment method. Processing time depends on the platform and your bank.',
        ],
      },
      {
        heading: '4. Schools, courses and trips',
        paragraphs: [
          'Costs, dates and cancellation terms for each school or program are given before you enroll and agreed directly with {org}. If online payments are enabled in the future, any right of withdrawal under Colombia’s Law 1480 of 2011 (Consumer Statute) will be respected where it applies.',
        ],
      },
      {
        heading: '5. Contact',
        paragraphs: ['For any claim or question about donations: {email}.'],
      },
    ],
  },
};

const pt: LegalSet = {
  privacy: {
    title: 'Política de privacidade',
    description: 'Quais dados pessoais coletamos neste site, para que os usamos e como exercer seus direitos.',
    sections: [
      {
        heading: '1. Responsável pelo tratamento',
        paragraphs: [
          'A {org} (“nós”), com sede em Letícia, Amazonas, Colômbia, é responsável pelos dados pessoais coletados neste site. Você pode escrever para {email}.',
          'Esta política segue a Lei 1581 de 2012 e o Decreto 1377 de 2013 da Colômbia (proteção de dados pessoais). Se você nos visita de outro país, também respeitamos as normas que o protegem, como a LGPD do Brasil, a Lei 29733 do Peru ou o RGPD da União Europeia.',
        ],
      },
      {
        heading: '2. Quais dados coletamos',
        paragraphs: ['Coletamos apenas o estritamente necessário:'],
        items: [
          'Formulário de contato: nome, e-mail e mensagem (obrigatórios); telefone ou WhatsApp e país (opcionais); o motivo do contato e o registro de que você aceitou esta política.',
          'Estatísticas de visita: dados anônimos e agregados (página visitada, tipo de dispositivo, navegador, país aproximado e cliques em botões como o do WhatsApp). Não guardamos seu endereço IP completo, não usamos cookies nem identificamos você.',
          'Se você nos escreve por WhatsApp, e-mail ou redes sociais, esses serviços tratam seus dados conforme suas próprias políticas.',
        ],
      },
      {
        heading: '3. Para que usamos seus dados',
        items: [
          'Responder à sua mensagem e contar como orar, servir, vir, estudar ou apoiar.',
          'Melhorar o site com estatísticas anônimas.',
          'Cumprir obrigações legais.',
        ],
        paragraphs: ['Não vendemos, alugamos nem compartilhamos seus dados para fins comerciais ou publicitários.'],
      },
      {
        heading: '4. Base legal e consentimento',
        paragraphs: [
          'Tratamos os dados do formulário com seu consentimento prévio, expresso e informado: a caixa de seleção do formulário deve ser marcada para enviá-lo. Você pode revogá-lo a qualquer momento escrevendo para nós. As estatísticas anônimas não identificam ninguém.',
        ],
      },
      {
        heading: '5. Quem mais participa (operadores e terceiros)',
        items: [
          'Web3Forms (Estados Unidos): recebe o conteúdo do formulário e o envia ao nosso e-mail.',
          'Gmail / Google: recebe e guarda os e-mails que chegam até nós.',
          'Umami Cloud: estatísticas de visitas sem cookies.',
          'Vercel (Estados Unidos): hospeda o site e pode registrar temporariamente o endereço IP por segurança.',
          'Sanity (cdn.sanity.io): fornece as imagens e administra os textos do site.',
          'YouTube / Google: a imagem de prévia de um vídeo é baixada de i.ytimg.com; o vídeo só é carregado se você apertar reproduzir, a partir de youtube-nocookie.com.',
          'WhatsApp (Meta), PayPal ou outras plataformas: se você clicar em um link para elas, sai deste site e aplicam-se as políticas delas.',
        ],
        paragraphs: [
          'Alguns desses serviços estão em outros países, portanto seus dados podem ser transferidos internacionalmente com as medidas de segurança de cada provedor.',
        ],
      },
      {
        heading: '6. Por quanto tempo guardamos seus dados',
        paragraphs: [
          'As mensagens do formulário são guardadas pelo tempo necessário para atender ao seu pedido e, no máximo, 2 anos após o último contato, salvo se a lei exigir mais tempo. Depois são eliminadas.',
        ],
      },
      {
        heading: '7. Seus direitos',
        items: [
          'Conhecer, atualizar e corrigir seus dados.',
          'Solicitar prova do seu consentimento e revogá-lo.',
          'Pedir que eliminemos seus dados.',
          'Ser informado sobre o uso que fazemos deles.',
          'Apresentar reclamação à Superintendência de Indústria e Comércio (Colômbia) ou à autoridade do seu país (ANPD no Brasil, Autoridade Nacional de Proteção de Dados Pessoais no Peru, autoridade nacional na União Europeia).',
        ],
        paragraphs: ['Para exercê-los, escreva para {email}. Respondemos em até 15 dias úteis.'],
      },
      {
        heading: '8. Menores de idade',
        paragraphs: [
          'Este site não é dirigido a menores de 14 anos e não coletamos seus dados propositalmente. Se você é pai, mãe ou responsável e acredita que um menor nos escreveu, avise-nos e eliminaremos. Das crianças das famílias da equipe publicamos somente o primeiro nome, com autorização dos pais.',
        ],
      },
      {
        heading: '9. Pessoas da equipe',
        paragraphs: [
          'Nomes, fotos e histórias das pessoas da equipe são publicados somente com a autorização delas, que podem retirar quando quiserem escrevendo para nós.',
        ],
      },
      {
        heading: '10. Segurança e alterações',
        paragraphs: [
          'Usamos conexão criptografada (HTTPS) e limitamos o acesso às informações. Podemos atualizar esta política; a data da última atualização aparece no início da página.',
        ],
      },
    ],
  },
  terms: {
    title: 'Termos e condições',
    description: 'Regras de uso deste site.',
    sections: [
      {
        heading: '1. Aceitação',
        paragraphs: ['Ao usar este site da {org} você aceita estes termos. Se não concordar, por favor não o use.'],
      },
      {
        heading: '2. O que é este site',
        paragraphs: [
          'É um site informativo sobre a missão, as bases, os ministérios, as escolas e a equipe da {org}. Não vendemos produtos nem cobramos pagamentos on-line por este site.',
        ],
      },
      {
        heading: '3. Informações publicadas',
        paragraphs: [
          'Fazemos o possível para manter as informações corretas e atualizadas, mas datas, custos, requisitos e programas podem mudar. Antes de tomar uma decisão (viajar, se inscrever, doar), confirme escrevendo para nós. O site é oferecido “como está”, sem garantia de disponibilidade contínua.',
        ],
      },
      {
        heading: '4. Uso adequado',
        items: [
          'Não use o site para enviar spam, conteúdo ofensivo ou ilegal, nem para se passar por outras pessoas.',
          'Não tente danificar, sobrecarregar nem acessar sem permissão os sistemas do site.',
          'Os dados que você nos enviar devem ser verdadeiros e seus.',
        ],
      },
      {
        heading: '5. Propriedade intelectual',
        paragraphs: [
          'Os textos, fotos, logotipos e designs pertencem à {org} ou são usados com autorização de seus autores. Você pode compartilhar os links do site. Para reutilizar fotos ou textos, peça permissão por escrito. As fotos de pessoas são publicadas com autorização delas.',
        ],
      },
      {
        heading: '6. Links e serviços de terceiros',
        paragraphs: [
          'O site tem links para WhatsApp, redes sociais, YouTube, PayPal e outros serviços. Não controlamos seu conteúdo nem suas políticas, e não somos responsáveis por eles.',
        ],
      },
      {
        heading: '7. Doações e apoio',
        paragraphs: ['As doações são regidas pela página “Doações e reembolsos”.'],
      },
      {
        heading: '8. Limitação de responsabilidade',
        paragraphs: [
          'Na medida permitida por lei, a {org} não responde por danos decorrentes do uso do site, de erros involuntários em seu conteúdo ou de falhas de serviços de terceiros. Isso não limita os direitos que a lei lhe reconhece como consumidor ou titular de dados.',
        ],
      },
      {
        heading: '9. Lei aplicável',
        paragraphs: [
          'Estes termos são regidos pelas leis da República da Colômbia. Qualquer controvérsia será de competência dos juízes de Letícia, Amazonas, sem prejuízo dos direitos que a lei do seu país lhe conceda.',
        ],
      },
      {
        heading: '10. Alterações e contato',
        paragraphs: [
          'Podemos modificar estes termos; a versão vigente é a publicada aqui, com sua data de atualização. Dúvidas: {email}.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Política de cookies',
    description: 'Quais cookies e tecnologias semelhantes este site usa.',
    sections: [
      {
        heading: '1. O que são cookies',
        paragraphs: ['São pequenos arquivos que um site guarda no seu dispositivo para lembrar de você ou para rastreá-lo.'],
      },
      {
        heading: '2. O que usamos neste site',
        paragraphs: [
          'Este site NÃO instala cookies próprios nem de terceiros para publicidade, rastreamento ou perfis. Por isso não mostramos um aviso de cookies para aceitar.',
        ],
        items: [
          'Estatísticas: usamos o Umami, uma ferramenta que mede visitas de forma anônima, sem cookies e sem guardar seu endereço IP completo. Ele respeita o sinal “Não rastrear” (Do Not Track) do seu navegador.',
          'Funcionamento: não guardamos dados no seu navegador, exceto o estritamente técnico para que as páginas funcionem.',
        ],
      },
      {
        heading: '3. Conteúdo de terceiros',
        paragraphs: [
          'Algumas páginas incluem vídeos do YouTube. A imagem de prévia é baixada dos servidores do Google, que recebem seu endereço IP. O vídeo só é carregado se você apertar reproduzir, usando o domínio youtube-nocookie.com; nesse momento o Google pode aplicar seus próprios cookies e políticas. As imagens do site são fornecidas por cdn.sanity.io.',
          'Se você clicar em um link para WhatsApp, PayPal ou uma rede social, sai deste site e aplicam-se os cookies e políticas desse serviço.',
        ],
      },
      {
        heading: '4. Como controlar os cookies',
        paragraphs: [
          'Nas configurações do seu navegador você pode apagar ou bloquear cookies a qualquer momento. Se no futuro adicionarmos ferramentas que usem cookies não essenciais, pediremos antes o seu consentimento e atualizaremos esta política.',
        ],
      },
      {
        heading: '5. Mais informações',
        paragraphs: ['Consulte a política de privacidade ou escreva para {email}.'],
      },
    ],
  },
  refunds: {
    title: 'Doações e reembolsos',
    description: 'Como funcionam as doações e o que fazer se precisar pedir uma devolução.',
    sections: [
      {
        heading: '1. Este site não processa pagamentos',
        paragraphs: [
          'Aqui não se paga nem se doa diretamente. Os botões “Apoiar” levam a um link de doação externo (por exemplo, PayPal) ou ao WhatsApp para combinar com a equipe. O pagamento é processado por essa plataforma, com seus próprios termos e taxas. Nunca publicamos números de conta bancária no site.',
        ],
      },
      {
        heading: '2. As doações são voluntárias',
        paragraphs: [
          'Uma doação é um presente voluntário para apoiar a missão ou uma pessoa da equipe. Em geral, não é reembolsável depois de usada para a sua finalidade.',
        ],
      },
      {
        heading: '3. Erros e cobranças duplicadas',
        paragraphs: [
          'Se você doou por engano, com valor errado ou foi cobrado duas vezes, escreva para {email} em até 30 dias, com seu nome, data, valor e comprovante. Analisaremos seu caso e, se couber, providenciaremos a devolução pelo mesmo meio de pagamento. O prazo de crédito depende da plataforma e do seu banco.',
        ],
      },
      {
        heading: '4. Escolas, cursos e viagens',
        paragraphs: [
          'Os custos, datas e condições de cancelamento de cada escola ou programa são informados antes da inscrição e combinados diretamente com a {org}. Se no futuro forem habilitados pagamentos on-line, será respeitado o direito de arrependimento previsto na Lei 1480 de 2011 (Estatuto do Consumidor da Colômbia) ou na legislação aplicável, quando couber.',
        ],
      },
      {
        heading: '5. Contato',
        paragraphs: ['Para qualquer reclamação ou dúvida sobre doações: {email}.'],
      },
    ],
  },
};

const docs: Record<Locale, LegalSet> = { es, en, pt };

export function getLegal(locale: Locale, page: LegalPage): LegalDoc {
  return docs[locale][page];
}
