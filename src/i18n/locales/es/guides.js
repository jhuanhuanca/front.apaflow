export default {
  layout: {
    introFallback:
      'Contenido redactado por APA Flow para estudiantes e investigadores. Basado en la 7.ª edición del manual APA.',
    ctaTitle: '¿Listo para aplicar APA 7 a tu documento?',
    ctaText:
      'Sube tu archivo Word y deja que el generador ajuste márgenes, tipografía, títulos y referencias.',
    ctaButton: 'Ir al Generador de Formato APA',
  },
  apa7: {
    seo: {
      title: 'Guía APA 7',
      description:
        'Aprende qué es APA 7, cuándo usarlo y cómo estructurar un documento académico: márgenes, tipografía, títulos y reglas generales.',
    },
    header: {
      title: 'Guía APA 7',
      subtitle: 'Manual práctico para estudiantes',
      intro:
        'Esta guía resume las reglas esenciales de la 7.ª edición APA: cuándo aplicarlas, cómo organizar tu manuscrito y qué detalles revisar antes de entregar.',
    },
    sections: {
      queEs: {
        title: '¿Qué es APA 7?',
        content: [
          'APA 7 es un conjunto de normas de presentación para textos académicos. No dicta el contenido de tu investigación, sino cómo se ve y cómo se reconocen las fuentes: tipografía, márgenes, numeración, citas en el cuerpo y lista de referencias al final.',
          'Su objetivo es la claridad y la reproducibilidad: cualquier lector debe localizar tus fuentes con la información mínima que exige la norma.',
        ],
      },
      cuando: {
        title: '¿Cuándo utilizar APA?',
        content: [
          'Tesis, monografías, ensayos y artículos cuando tu institución o revista lo exija.',
          'Trabajos de psicología, educación, enfermería, administración y ciencias sociales.',
          'Informes con secciones metodológicas (introducción, método, resultados, discusión).',
          'Si tu facultad publica un manual propio, ese documento prevalece sobre cualquier guía general.',
        ],
      },
      estructura: {
        title: 'Estructura típica de un documento',
        content: [
          'Portada — título, autor, afiliación institucional y datos del curso.',
          'Resumen (opcional en trabajos cortos) — síntesis de 150–250 palabras.',
          'Cuerpo — introducción, desarrollo por secciones, conclusiones.',
          'Referencias — listado alfabético de fuentes citadas.',
          'Anexos — tablas extensas, cuestionarios o material complementario.',
        ],
      },
      formato: {
        title: 'Reglas generales de formato',
        content: [
          'Papel carta u A4 según indique tu universidad; márgenes de 2,54 cm en los cuatro lados.',
          'Fuente legible: Times New Roman 12 pt o equivalente (Calibri 11 pt si lo autoriza tu escuela).',
          'Interlineado doble en todo el texto, incluidas referencias.',
          'Alineación a la izquierda; sangría de primera línea de 1,27 cm en párrafos del cuerpo.',
          'Número de página en la esquina superior derecha desde la portada.',
        ],
      },
      titulos: {
        title: 'Jerarquía de títulos (resumen)',
        content: [
          'Nivel 1 — Centrado, negrita, mayúsculas',
          'Nivel 2 — Izquierda, negrita, capitalización título',
          'Nivel 3 — Izquierda, negrita, cursiva',
          'Nivel 4 — Con sangría, negrita, termina en punto',
        ],
      },
      academico: {
        title: 'Consejos de formato académico',
        content: [
          'Redacta en voz activa cuando sea posible, evita abreviaturas no explicadas y mantén coherencia entre citas del texto y entradas de referencias. Un error frecuente es citar en el cuerpo una obra que no aparece en la lista final.',
          'Buena práctica: Revisa que cada paréntesis (Autor, año) tenga su entrada completa en Referencias antes de imprimir.',
        ],
      },
    },
  },
  portada: {
    seo: {
      title: 'Portada APA 7',
      description:
        'Aprende a crear una portada APA 7 para trabajos estudiantiles: elementos obligatorios, ejemplos y recomendaciones.',
    },
    header: {
      title: 'Portada APA 7',
      subtitle: 'Trabajos estudiantiles',
      intro:
        'La portada es la primera impresión de tu trabajo. APA 7 simplificó el diseño para estudiantes: menos elementos decorativos y más claridad en la información esencial.',
    },
    sections: {
      componentes: {
        title: 'Componentes de la portada',
        content: [
          'Título del trabajo — centrado, en negrita, capitalización título (no todo en mayúsculas).',
          'Nombre del autor — debajo del título, sin títulos académicos salvo que la institución lo pida.',
          'Afiliación institucional — universidad, departamento o centro de estudios.',
          'Número de curso — código o nombre de la asignatura.',
          'Nombre del docente — quien evalúa el trabajo.',
          'Fecha de entrega — mes, día y año en el formato que indique tu escuela.',
        ],
      },
      ejemplo: {
        title: 'Ejemplo de distribución',
        content: [
          'Esquema vertical (centrado):',
          'Impacto de la tutoría entre pares en el rendimiento académico',
          'Ana Sofía Mendoza López',
          'Facultad de Ciencias de la Educación — Universidad Nacional del Sur',
          'Metodología de la Investigación — EDU-402 — Prof. Roberto Castillo',
          '15 de marzo de 2026',
        ],
      },
      recomendaciones: {
        title: 'Recomendaciones',
        content: [
          'No uses portadas con imágenes de fondo ni fuentes decorativas; la legibilidad es prioritaria.',
          'El título no debe superar las dos líneas principales; si es largo, divide con un subtítulo opcional.',
          'Incluye número de página 1 en la esquina superior derecha de la portada.',
          'Consulta si tu facultad exige portada en español e inglés o datos adicionales (matrícula, ciudad).',
        ],
      },
    },
  },
  citas: {
    seo: {
      title: 'Citas APA 7',
      description:
        'Guía de citas APA 7: narrativas, parentéticas, citas cortas y largas con ejemplos prácticos para trabajos académicos.',
    },
    header: {
      title: 'Citas APA 7',
      subtitle: 'En el cuerpo del texto',
      intro:
        'Las citas conectan tus ideas con las fuentes consultadas. APA 7 distingue citas narrativas (el autor forma parte de la oración) y parentéticas (autor y año entre paréntesis al final).',
    },
    sections: {
      narrativa: {
        title: 'Cita narrativa',
        content: [
          'Mencionas al autor dentro de la frase e indicas el año entre paréntesis inmediatamente después del nombre.',
          'Ejemplo: Torres (2024) sostiene que la motivación intrínseca mejora la retención en cursos híbridos.',
        ],
      },
      parentetica: {
        title: 'Cita parentética',
        content: [
          'Al final del fragmento citado o parafraseado colocas autor y año entre paréntesis.',
          'Ejemplo: La retención en entornos híbridos aumenta cuando hay acompañamiento docente frecuente (Torres, 2024).',
        ],
      },
      corta: {
        title: 'Cita textual corta (menos de 40 palabras)',
        content: [
          'Integra la cita entre comillas dobles dentro del párrafo. Indica página o párrafo si aplica.',
          'Ejemplo: Torres (2024) define el aprendizaje híbrido como "la combinación planificada de sesiones presenciales y actividades guiadas en línea" (p. 58).',
        ],
      },
      larga: {
        title: 'Cita textual larga (40 palabras o más)',
        content: [
          'Presenta la cita en bloque, sin comillas, con sangría de 1,27 cm desde el margen izquierdo. Doble espacio. Cierra con la referencia entre paréntesis después del punto final.',
          'Ejemplo en bloque: La transición hacia modelos híbridos exige repensar la evaluación formativa, ya que los estudiantes distribuyen el estudio en espacios y horarios distintos. Las rúbricas deben describir criterios observables en entregables digitales y presenciales por igual. (Torres, 2024, p. 61)',
        ],
      },
      varios: {
        title: 'Varios autores y fuentes sin fecha',
        content: [
          'Dos autores: usa y en narrativa o & en parentética — (Luna & Vega, 2023).',
          'Tres o más: cita solo el primer autor seguido de et al. — (Luna et al., 2023).',
          'Sin fecha conocida: (Organización, n.d.).',
        ],
      },
    },
  },
  referencias: {
    seo: {
      title: 'Referencias APA 7',
      description:
        'Cómo armar referencias APA 7: libros, artículos, sitios web, tesis, videos y redes sociales con ejemplos originales.',
    },
    header: {
      title: 'Referencias APA 7',
      subtitle: 'Lista al final del documento',
      intro:
        'La sección Referencias incluye únicamente las fuentes citadas en el texto, en orden alfabético por apellido del autor. Usa sangría francesa: primera línea al margen, resto indentado.',
    },
    sections: {
      libro: {
        title: 'Libro',
        content: [
          'Herrera, M., & Salinas, P. (2022). Investigación aplicada en ciencias sociales. Editorial Académica del Cono Sur.',
        ],
      },
      articulo: {
        title: 'Artículo de revista',
        content: [
          'Delgado, R. (2025). Competencias digitales docentes en entornos híbridos. Revista Iberoamericana de Educación, 18(2), 45–62. https://doi.org/10.1000/ejemplo.2025.0182',
        ],
      },
      web: {
        title: 'Sitio web',
        content: [
          'Ministerio de Educación Nacional. (2024, 8 de junio). Lineamientos para la evaluación formativa. https://www.ejemplo-gob.edu/lineamientos-evaluacion',
          'Incluye fecha de recuperación solo si el contenido puede cambiar con frecuencia.',
        ],
      },
      tesis: {
        title: 'Tesis o disertación',
        content: [
          'Quintero, L. (2023). Resiliencia académica en estudiantes de primer año [Tesis de maestría, Universidad del Pacífico]. Repositorio institucional. https://repositorio.ejemplo.edu/handle/12345/678',
        ],
      },
      video: {
        title: 'Video en línea',
        content: [
          'Canal EducaFuturo. (2024, 14 de enero). Cómo estructurar una revisión bibliográfica [Video]. Plataforma Educativa. https://video.ejemplo.com/watch/edu123',
        ],
      },
      redes: {
        title: 'Publicaciones en redes sociales',
        content: [
          '@ObservatorioCiencia. (2025, 3 de febrero). Hoy publicamos el informe anual sobre becas de investigación [Post]. Red Social Académica. https://social.ejemplo.com/post/987654',
          'Usa el nombre real del autor si está disponible; de lo contrario, el usuario entre corchetes al inicio.',
        ],
      },
    },
  },
  tablas: {
    seo: {
      title: 'Tablas y figuras APA 7',
      description:
        'Formato APA 7 para tablas y figuras: numeración, títulos, notas y buenas prácticas de presentación visual.',
    },
    header: {
      title: 'Tablas y figuras APA 7',
      subtitle: 'Material visual en trabajos académicos',
      intro:
        'Las tablas organizan datos numéricos; las figuras muestran gráficos, diagramas o fotografías. APA 7 pide numeración independiente para cada tipo y títulos claros encima de tablas y debajo de figuras.',
    },
    sections: {
      tablas: {
        title: 'Formato de tablas',
        content: [
          'Número consecutivo en negrita: Tabla 1, Tabla 2…',
          'Título en cursiva en la línea siguiente, breve y descriptivo.',
          'Sin líneas verticales; usa líneas horizontales mínimas (encabezado, cierre).',
          'Notas al pie con letras minúsculas superíndices si necesitas aclaraciones.',
          'Encabezado de tabla — Tabla 1 / Promedio de horas de estudio semanal por modalidad',
        ],
      },
      figuras: {
        title: 'Formato de figuras',
        content: [
          'Etiqueta en negrita: Figura 1.',
          'Título en cursiva debajo de la imagen o gráfico.',
          'Nota de copyright o fuente si la figura no es propia.',
          'Resolución suficiente para impresión en blanco y negro.',
          'Pie de figura — Figura 1. Comparación de rendimiento entre grupos experimental y control. Nota. Elaboración propia con datos de encuesta 2025.',
        ],
      },
      numeracion: {
        title: 'Numeración',
        content: [
          'Numera tablas y figuras por separado en el orden en que aparecen en el texto. Si un apéndice contiene material adicional, reinicia la numeración con prefijo (p. ej. Tabla A1) si tu institución lo solicita.',
        ],
      },
      titulos: {
        title: 'Títulos y menciones en el texto',
        content: [
          'La primera vez que cites una tabla o figura en el cuerpo, escribe la palabra completa y el número: "como se observa en la Tabla 2". En menciones posteriores puedes abreviar a "Tabla 2" si no hay ambigüedad.',
        ],
      },
    },
  },
  ejemplos: {
    seo: {
      title: 'Ejemplos APA 7',
      description:
        'Ejemplos completos de trabajos en APA 7: ensayos, informes y plantillas de referencia para estudiantes.',
    },
    header: {
      title: 'Ejemplos APA 7',
      subtitle: 'Casos prácticos',
      intro:
        'Estos escenarios ficticios muestran cómo combinar portada, cuerpo, citas y referencias. Úsalos como plantilla mental antes de formatear tu propio documento.',
    },
    sections: {
      ensayo: {
        title: 'Ensayo argumentativo (3–5 páginas)',
        content: [
          'Estructura sugerida: portada → introducción con tesis → dos o tres secciones de desarrollo → conclusión → referencias.',
          'Párrafo de apertura con cita: La participación estudiantil en foros en línea favorece el pensamiento crítico cuando existe retroalimentación oportuna (Ramírez, 2023). En este ensayo se analiza cómo diseñar actividades que promuevan debate respetuoso en cursos universitarios.',
        ],
      },
      informe: {
        title: 'Informe con secciones IMRD',
        content: [
          'Trabajos empíricos suelen incluir Introducción, Método, Resultados y Discusión (IMRD). Cada sección lleva título de nivel 1 centrado.',
          'Método — participantes, instrumentos, procedimiento.',
          'Resultados — tablas o figuras con datos, sin interpretación profunda.',
          'Discusión — significado de hallazgos y limitaciones.',
        ],
      },
      referenciasEjemplo: {
        title: 'Mini lista de referencias',
        content: [
          'Organización Panamericana de la Salud. (2024). Informe regional de bienestar estudiantil. https://www.ejemplo-ops.org/informe-2024',
          'Ramírez, J. (2023). Foros asincrónicos y pensamiento crítico. Educación Digital Hoy, 11(1), 78–92.',
          'Vega, C., & Ortiz, M. (2022). Manual práctico de redacción académica (2.ª ed.). Ediciones Campus.',
        ],
      },
      plantillas: {
        title: 'Plantillas y siguiente paso',
        content: [
          'Puedes partir de un documento Word en blanco aplicando las reglas de nuestra Guía APA 7 o subir tu borrador al Generador de Formato APA para acelerar márgenes, estilos y paginación.',
        ],
      },
    },
  },
};
