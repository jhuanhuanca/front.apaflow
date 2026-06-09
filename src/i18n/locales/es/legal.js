const PUBLISHED = '10 de junio de 2026';
const EMAIL = 'apaflow@gmail.com';
const WEBSITE = 'apaflow.shop';
const OWNER = 'Juan Huanca Ninachoque';
const COMPANY = 'SynkaiSoft';

const contactLines = [
  `Propietario: ${OWNER}`,
  `Nombre comercial: ${COMPANY}`,
  `Sitio web: ${WEBSITE}`,
  `Correo electrónico: ${EMAIL}`,
];

export default {
  common: {
    badge: 'Información legal',
    lastUpdated: 'Última actualización',
  },
  privacy: {
    seo: {
      title: 'Política de Privacidad',
      description: 'Cómo APAFlow recopila, utiliza y protege la información de los usuarios en apaflow.shop.',
    },
    title: 'Política de Privacidad de APAFlow',
    lastUpdated: PUBLISHED,
    intro: 'Bienvenido a APAFlow. La presente Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos la información de los usuarios que utilizan el sitio web apaflow.shop.',
    sections: [
      {
        title: '1. Responsable del Servicio',
        paragraphs: ['APAFlow es operado por:'],
        list: [
          `Propietario: ${OWNER}`,
          `Nombre comercial: ${COMPANY}`,
          `Sitio web: ${WEBSITE}`,
          `Correo de contacto: ${EMAIL}`,
        ],
      },
      {
        title: '2. Información que recopilamos',
        paragraphs: ['Podemos recopilar la siguiente información:'],
        list: [
          'Nombre del usuario.',
          'Dirección de correo electrónico.',
          'Dirección IP.',
          'Información técnica del dispositivo y navegador.',
          'Documentos Word (.docx) cargados por el usuario para su procesamiento.',
          'Historial de conversiones y documentos generados.',
          'Información relacionada con planes y suscripciones.',
        ],
      },
      {
        title: '3. Finalidad del tratamiento de datos',
        paragraphs: ['Utilizamos la información recopilada para:'],
        list: [
          'Proporcionar el servicio de conversión y generación de documentos en formato APA.',
          'Gestionar cuentas de usuario.',
          'Procesar suscripciones y pagos.',
          'Mejorar la calidad del servicio.',
          'Detectar actividades fraudulentas o abusivas.',
          'Cumplir obligaciones legales.',
        ],
      },
      {
        title: '4. Almacenamiento de documentos',
        paragraphs: [
          'Los documentos cargados por los usuarios podrán almacenarse dentro de la cuenta del usuario para permitir el acceso al historial de conversiones.',
          'Los documentos, archivos generados e información asociada podrán conservarse mientras la membresía o cuenta permanezca activa.',
          'Cuando una cuenta sea eliminada o expire el período de conservación definido por APAFlow, los documentos y datos asociados podrán ser eliminados de forma permanente de nuestros sistemas.',
        ],
      },
      {
        title: '5. Pagos y suscripciones',
        paragraphs: [
          'Los pagos podrán ser procesados mediante proveedores externos autorizados.',
          'APAFlow no almacena números completos de tarjetas bancarias ni credenciales financieras de los usuarios.',
          'Los proveedores de pago son responsables del procesamiento seguro de la información financiera.',
        ],
      },
      {
        title: '6. Cookies y tecnologías similares',
        paragraphs: ['Podemos utilizar cookies y tecnologías similares para:'],
        list: [
          'Mantener sesiones de usuario.',
          'Recordar preferencias.',
          'Analizar el uso del sitio.',
          'Mostrar contenido y publicidad relevante.',
        ],
        paragraphsAfterList: ['El usuario puede administrar las cookies desde la configuración de su navegador.'],
      },
      {
        title: '7. Publicidad',
        paragraphs: [
          'Las versiones Gratuita (Free) e Invitado (Guest) podrán mostrar anuncios publicitarios.',
          'Los usuarios con una suscripción PRO activa podrán utilizar el servicio sin publicidad.',
          'Los proveedores publicitarios pueden utilizar tecnologías propias sujetas a sus respectivas políticas de privacidad.',
        ],
      },
      {
        title: '8. Seguridad',
        paragraphs: ['Implementamos medidas técnicas y organizativas razonables para proteger la información contra:'],
        list: [
          'Acceso no autorizado.',
          'Alteración.',
          'Divulgación.',
          'Pérdida o destrucción accidental.',
        ],
        paragraphsAfterList: [
          'Sin embargo, ningún sistema de transmisión o almacenamiento electrónico puede garantizar seguridad absoluta.',
        ],
      },
      {
        title: '9. Derechos del usuario',
        paragraphs: ['Los usuarios pueden solicitar:'],
        list: [
          'Acceso a sus datos.',
          'Corrección de información incorrecta.',
          'Eliminación de su cuenta cuando corresponda.',
          'Información sobre el tratamiento de sus datos.',
        ],
        paragraphsAfterList: ['Las solicitudes podrán realizarse mediante los canales de contacto oficiales.'],
      },
      {
        title: '10. Menores de edad',
        paragraphs: [
          'APAFlow está dirigido principalmente a estudiantes, investigadores y profesionales. Los menores de edad deberán utilizar el servicio bajo la supervisión de sus representantes legales cuando así lo requiera la legislación aplicable.',
        ],
      },
      {
        title: '11. Cambios en esta política',
        paragraphs: [
          'APAFlow podrá modificar esta Política de Privacidad en cualquier momento.',
          'Las modificaciones serán publicadas en esta página junto con la fecha de actualización correspondiente.',
        ],
      },
      {
        title: '12. Contacto',
        paragraphs: ['Para consultas relacionadas con privacidad y protección de datos:'],
        list: contactLines,
      },
    ],
  },
  terms: {
    seo: {
      title: 'Términos y Condiciones de Uso',
      description: 'Condiciones de uso de la plataforma APAFlow en apaflow.shop.',
    },
    title: 'Términos y Condiciones de Uso de APAFlow',
    lastUpdated: PUBLISHED,
    intro: '',
    sections: [
      {
        title: '1. Aceptación de los términos',
        paragraphs: [
          'Al acceder y utilizar APAFlow (apaflow.shop), el usuario acepta cumplir estos Términos y Condiciones. Si no está de acuerdo con alguna disposición, deberá abstenerse de utilizar el servicio.',
        ],
      },
      {
        title: '2. Descripción del servicio',
        paragraphs: [
          'APAFlow es una plataforma desarrollada por SynkaiSoft que permite la conversión, formateo y generación de documentos académicos basados en las directrices de APA 7.',
          'Las funcionalidades disponibles pueden variar según el plan contratado.',
        ],
      },
      {
        title: '3. Registro de usuarios',
        paragraphs: [
          'Para acceder a determinadas funciones, el usuario deberá crear una cuenta proporcionando información veraz y actualizada.',
          'El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso.',
        ],
      },
      {
        title: '4. Planes y suscripciones',
        paragraphs: ['APAFlow podrá ofrecer:'],
        list: ['Plan Invitado.', 'Plan Free.', 'Plan PRO.', 'Servicios de pago por documento.'],
        paragraphsAfterList: ['Las características y limitaciones de cada plan podrán modificarse en cualquier momento.'],
      },
      {
        title: '5. Pagos',
        paragraphs: [
          'Los pagos se procesan mediante proveedores externos autorizados.',
          'El acceso a funcionalidades premium solo se habilitará cuando el pago sea confirmado por el proveedor correspondiente.',
        ],
      },
      {
        title: '6. Política de reembolsos',
        paragraphs: [
          'Actualmente, APAFlow no ofrece reembolsos por compras, suscripciones o servicios utilizados.',
          'Antes de realizar cualquier pago, el usuario deberá verificar cuidadosamente las características del servicio.',
        ],
      },
      {
        title: '7. Uso permitido',
        paragraphs: ['El usuario se compromete a no:'],
        list: [
          'Utilizar el servicio para actividades ilícitas.',
          'Intentar vulnerar la seguridad de la plataforma.',
          'Distribuir malware.',
          'Interferir con el funcionamiento del sistema.',
        ],
      },
      {
        title: '8. Propiedad intelectual',
        paragraphs: [
          'Todo el software, diseño, logotipos, textos y elementos de APAFlow pertenecen a SynkaiSoft o a sus respectivos titulares.',
        ],
      },
      {
        title: '9. Suspensión de cuentas',
        paragraphs: [
          'APAFlow podrá suspender o cancelar cuentas que incumplan estos términos o representen un riesgo para la plataforma.',
        ],
      },
      {
        title: '10. Limitación de responsabilidad',
        paragraphs: [
          'APAFlow se proporciona "tal cual" y no garantiza que los resultados generados sean completamente libres de errores.',
          'El usuario es responsable de revisar y validar los documentos generados antes de su presentación académica o profesional.',
        ],
      },
      {
        title: '11. Modificaciones',
        paragraphs: [
          'APAFlow podrá modificar estos términos en cualquier momento mediante su publicación en el sitio web.',
        ],
      },
      {
        title: '12. Contacto',
        list: contactLines,
      },
    ],
  },
  subscriptions: {
    seo: {
      title: 'Política de Suscripciones y Pagos',
      description: 'Planes, facturación, renovaciones y política de pagos de APAFlow.',
    },
    title: 'Política de Suscripciones y Pagos',
    lastUpdated: PUBLISHED,
    intro: '',
    sections: [
      {
        title: '1. Planes disponibles',
        paragraphs: ['APAFlow ofrece diferentes modalidades de acceso:'],
        subsections: [
          {
            title: 'Invitado',
            list: ['Acceso limitado.', 'Puede visualizar publicidad.'],
          },
          {
            title: 'Free',
            list: [
              'Funcionalidades gratuitas limitadas.',
              'Publicidad visible.',
              'Conversión gratuita inicial según promociones vigentes.',
            ],
          },
          {
            title: 'PRO',
            list: [
              'Generaciones ilimitadas.',
              'Opciones avanzadas de configuración APA.',
              'Experiencia sin anuncios.',
              'Funciones premium adicionales.',
            ],
          },
        ],
      },
      {
        title: '2. Facturación',
        paragraphs: [
          'Las suscripciones PRO se cobran de forma periódica según el plan contratado.',
          'Los pagos son procesados por proveedores externos especializados.',
        ],
      },
      {
        title: '3. Activación de servicios',
        paragraphs: [
          'La activación del plan PRO se realiza únicamente después de la confirmación del pago por parte del proveedor de pagos.',
        ],
      },
      {
        title: '4. Renovaciones',
        paragraphs: [
          'Las suscripciones podrán renovarse automáticamente si el método de pago permanece activo.',
        ],
      },
      {
        title: '5. Vencimiento',
        paragraphs: ['Cuando una suscripción PRO expire o no pueda renovarse correctamente:'],
        list: [
          'El usuario volverá automáticamente al plan Free.',
          'Las funciones premium quedarán deshabilitadas.',
          'Los anuncios podrán volver a mostrarse.',
        ],
      },
      {
        title: '6. Historial y almacenamiento',
        paragraphs: [
          'Los documentos y conversiones podrán conservarse durante la vigencia de la membresía.',
          'APAFlow podrá eliminar datos históricos de cuentas inactivas o vencidas de acuerdo con sus políticas internas.',
        ],
      },
      {
        title: '7. Reembolsos',
        paragraphs: ['Actualmente no se ofrecen reembolsos por:'],
        list: ['Suscripciones.', 'Pagos por documento.', 'Servicios digitales consumidos.'],
      },
      {
        title: '8. Modificaciones',
        paragraphs: [
          'APAFlow podrá modificar precios, planes o características futuras sin afectar obligaciones ya cumplidas.',
        ],
      },
    ],
  },
  cookies: {
    seo: {
      title: 'Política de Cookies y Descargo Académico',
      description: 'Uso de cookies, publicidad y descargo de responsabilidad académica de APAFlow.',
    },
    title: 'Política de Cookies y Descargo de Responsabilidad Académica',
    lastUpdated: PUBLISHED,
    intro: '',
    sections: [
      {
        title: 'Política de Cookies',
        paragraphs: ['APAFlow utiliza cookies y tecnologías similares para:'],
        list: [
          'Mantener sesiones activas.',
          'Recordar preferencias de usuario.',
          'Mejorar la experiencia de navegación.',
          'Analizar estadísticas de uso.',
          'Mostrar publicidad cuando corresponda.',
        ],
        paragraphsAfterList: [
          'El usuario puede configurar su navegador para rechazar o eliminar cookies, aunque algunas funciones del sitio podrían verse afectadas.',
        ],
      },
      {
        title: 'Publicidad',
        paragraphs: [
          'Las versiones Invitado y Free pueden mostrar anuncios publicitarios proporcionados por terceros.',
          'Los usuarios con una suscripción PRO activa no visualizarán publicidad dentro de la plataforma.',
        ],
      },
      {
        title: 'Descargo de Responsabilidad Académica',
        paragraphs: [
          'APAFlow es una herramienta de apoyo académico.',
          'No garantiza la aceptación automática de trabajos académicos por universidades, instituciones educativas o publicaciones científicas.',
          'El usuario es responsable de:',
        ],
        list: [
          'Revisar el contenido generado.',
          'Verificar citas y referencias.',
          'Confirmar el cumplimiento de los requisitos específicos de su institución.',
        ],
        paragraphsAfterList: [
          'APAFlow no reemplaza la revisión académica, editorial o profesional.',
        ],
      },
      {
        title: 'Disponibilidad del servicio',
        paragraphs: [
          'Aunque se realizan esfuerzos razonables para mantener la disponibilidad de la plataforma, APAFlow no garantiza acceso ininterrumpido ni libre de errores.',
        ],
      },
      {
        title: 'Contacto',
        list: contactLines,
      },
    ],
  },
};
