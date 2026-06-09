export default {
  shell: {
    navAriaLabel: 'Panel de usuario',
    home: 'Inicio',
    login: 'Entrar',
    register: 'Registro',
    logout: 'Salir',
    badges: {
      pro: 'PRO',
      trial: 'TRIAL',
      free: 'FREE',
    },
  },
  settings: {
    title: 'Configuración APA 7',
    description: 'Personaliza márgenes, interlineado, tipografía y encabezados. Función premium del plan Pro.',
    lockedTitle: 'Configuración avanzada bloqueada',
    lockedDesc:
      'Los usuarios del plan gratuito usan la configuración APA 7 por defecto. Actualiza a Pro para personalizar.',
    lockedCta: 'Ver opciones de upgrade en el conversor',
    loading: 'Cargando configuración…',
    lineSpacing: 'Interlineado',
    lineSpacingHelp: 'Espaciado entre líneas',
    single: 'Sencillo',
    oneHalf: '1.5 líneas',
    double: 'Doble (APA 7 estándar)',
    margins: 'Márgenes (pulgadas)',
    marginSides: {
      top: 'top',
      bottom: 'bottom',
      left: 'left',
      right: 'right',
    },
    typography: 'Tipografía',
    font: 'Fuente',
    fontSize: 'Tamaño (pt)',
    save: 'Guardar configuración',
    saved: 'Configuración guardada.',
    loadError: 'No se pudo cargar la configuración APA.',
    saveError: 'No se pudo guardar la configuración.',
  },
  guideArticle: {
    disclaimer:
      'Recursos de consulta basados en la 7.ª edición del Manual de Publicaciones de la APA.',
  },
  apaGuide: {
    title: 'Guía APA 7',
    subtitle: 'Formato del manuscrito',
    sections: {
      pageSetup: {
        title: 'Configuración de página',
        content: [
          'Márgenes de 2.54 cm (1 pulgada) en los cuatro lados.',
          'Fuente recomendada: Times New Roman 12 pt (o Calibri 11 pt si lo exige tu institución).',
          'Interlineado doble en todo el texto, incluidas las páginas de referencias.',
          'Alineación del texto: izquierda (sin justificar en la mayoría de casos académicos).',
          'Sangría de primera línea en párrafos: 1.27 cm (0.5 pulgadas).',
        ],
      },
      headerPagination: {
        title: 'Encabezado y paginación',
        content: [
          'Número de página en la esquina superior derecha, desde la portada.',
          'En trabajos estudiantiles, incluye título abreviado (máx. 50 caracteres) en mayúsculas en el encabezado.',
          'No uses la palabra "Running head" en APA 7 (solo en ediciones anteriores para profesionales).',
        ],
      },
      headingHierarchy: {
        title: 'Jerarquía de títulos',
        content: [
          'Nivel 1 — Centrado, negrita, título en mayúsculas. Ejemplo: INTRODUCCIÓN',
          'Nivel 2 — Alineado a la izquierda, negrita, mayúsculas/minúsculas. Ejemplo: Marco teórico',
          'Nivel 3 — Alineado a la izquierda, negrita, cursiva. Ejemplo: Antecedentes del problema',
          'Nivel 4 — Con sangría, negrita, termina con punto. Ejemplo: Definición operacional. Texto…',
        ],
      },
    },
    footer:
      'Usa el Generador de Formato APA para aplicar automáticamente estas reglas a tu .docx.',
    footerLink: 'Generador de Formato APA',
  },
  referencesGuide: {
    title: 'Guía de referencias',
    subtitle: 'Citas y lista de referencias',
    sections: {
      inText: {
        title: 'Citas en el texto',
        content: [
          'Autor-fecha: (García, 2021) o García (2021) según el contexto narrativo.',
          'Dos autores: (López & Martínez, 2019) — usa "&" entre paréntesis y "y" en el texto.',
          'Tres o más autores: (Pérez et al., 2020) desde la primera cita.',
          'Cita directa corta: incluye página — (Soto, 2018, p. 45).',
          'Cita directa larga (>40 palabras): bloque con sangría, sin comillas, con página al final.',
        ],
      },
      referenceList: {
        title: 'Lista de referencias',
        content: [
          'Título de la sección: Referencias, centrado y en negrita.',
          'Orden alfabético por apellido del primer autor.',
          'Sangría francesa: primera línea al margen, resto indentado 1.27 cm.',
          'Interlineado doble entre entradas, sin líneas en blanco extra.',
          'Incluye solo fuentes citadas en el texto (no bibliografía general).',
        ],
      },
      commonExamples: {
        title: 'Ejemplos frecuentes',
        content: [
          'Artículo de revista — Hernández, R., Fernández, C., & Baptista, P. (2014). Metodología de la investigación (6.ª ed.). McGraw-Hill.',
          'Página web — American Psychological Association. (2020, 1 de octubre). Publication manual of the American Psychological Association (7.ª ed.). https://doi.org/10.1037/0000165-000',
          'Capítulo de libro — Morales, J. (2022). Análisis cualitativo. En L. Vega (Ed.), Manual de métodos (pp. 112–145). Editorial Académica.',
        ],
      },
    },
    footer:
      'El conversor normaliza el cuerpo del documento; revisa manualmente las referencias o consulta la Guía APA 7 para el formato de citas.',
    footerLink: 'Guía APA 7',
  },
  tablesGuide: {
    title: 'Tablas e imágenes',
    subtitle: 'Figuras, tablas y notas en APA 7',
    sections: {
      tables: {
        title: 'Tablas',
        content: [
          'Número y título sobre la tabla: "Tabla 1" en negrita, título en cursiva en la línea siguiente.',
          'Sin líneas verticales; usa solo horizontales para encabezados y totales si aplica.',
          'Notas bajo la tabla (general, específica o de probabilidad) con sangría y prefijos explicativos.',
          'Cita la tabla en el texto antes de mostrarla: "como se observa en la Tabla 1…".',
        ],
      },
      figures: {
        title: 'Figuras (imágenes, gráficos, diagramas)',
        content: [
          'Número y título bajo la figura: "Figura 1." en negrita, título en cursiva.',
          'Leyenda y notas también debajo, en texto normal o cursiva según corresponda.',
          'Resolución adecuada para impresión; evita capturas pixeladas en trabajos finales.',
          'Si la figura no es tuya, indica permiso o licencia en la nota de la figura.',
        ],
      },
      bestPractices: {
        title: 'Buenas prácticas',
        content: [
          'Tabla — Datos numéricos comparables en filas/columnas. Evita tablas solo para texto corrido.',
          'Figura — Visualiza tendencias, procesos o resultados que el texto no resume con claridad.',
        ],
      },
    },
    footer:
      'Próximamente podrás validar tablas e imágenes desde el panel. Mientras tanto, usa el Generador de Formato APA para el formato general del documento.',
    footerLink: 'Generador de Formato APA',
  },
};
