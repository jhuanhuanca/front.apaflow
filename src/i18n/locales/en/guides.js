export default {
  layout: {
    introFallback:
      'Content written by APA Flow for students and researchers. Based on the 7th edition of the APA manual.',
    ctaTitle: 'Ready to apply APA 7 to your document?',
    ctaText:
      'Upload your Word file and let the generator adjust margins, typography, headings, and references.',
    ctaButton: 'Go to APA Format Generator',
  },
  apa7: {
    seo: {
      title: 'APA 7 Guide',
      description:
        'Learn what APA 7 is, when to use it, and how to structure an academic document: margins, typography, headings, and general rules.',
    },
    header: {
      title: 'APA 7 Guide',
      subtitle: 'Practical manual for students',
      intro:
        'This guide summarizes the essential rules of APA 7th edition: when to apply them, how to organize your manuscript, and what details to review before submitting.',
    },
    sections: {
      queEs: {
        title: 'What is APA 7?',
        content: [
          'APA 7 is a set of presentation standards for academic texts. It does not dictate the content of your research, but how it looks and how sources are identified: typography, margins, numbering, in-text citations, and a reference list at the end.',
          'Its goal is clarity and reproducibility: any reader should be able to locate your sources with the minimum information required by the standard.',
        ],
      },
      cuando: {
        title: 'When to use APA',
        content: [
          'Theses, monographs, essays, and articles when your institution or journal requires it.',
          'Work in psychology, education, nursing, administration, and social sciences.',
          'Reports with methodological sections (introduction, method, results, discussion).',
          'If your faculty publishes its own manual, that document takes precedence over any general guide.',
        ],
      },
      estructura: {
        title: 'Typical document structure',
        content: [
          'Title page — title, author, institutional affiliation, and course details.',
          'Abstract (optional in short papers) — summary of 150–250 words.',
          'Body — introduction, development by sections, conclusions.',
          'References — alphabetical list of cited sources.',
          'Appendices — extensive tables, questionnaires, or supplementary material.',
        ],
      },
      formato: {
        title: 'General formatting rules',
        content: [
          'Letter or A4 paper as your university indicates; margins of 2.54 cm on all four sides.',
          'Legible font: Times New Roman 12 pt or equivalent (Calibri 11 pt if your school allows it).',
          'Double spacing throughout the text, including references.',
          'Left alignment; first-line indent of 1.27 cm in body paragraphs.',
          'Page number in the upper right corner starting on the title page.',
        ],
      },
      titulos: {
        title: 'Heading hierarchy (summary)',
        content: [
          'Level 1 — Centered, bold, all caps',
          'Level 2 — Flush left, bold, title case',
          'Level 3 — Flush left, bold, italic',
          'Level 4 — Indented, bold, ends with a period',
        ],
      },
      academico: {
        title: 'Academic formatting tips',
        content: [
          'Write in active voice when possible, avoid unexplained abbreviations, and keep in-text citations consistent with reference entries. A common mistake is citing a work in the body that does not appear in the final list.',
          'Best practice: Check that every parenthetical (Author, year) has a complete entry in References before printing.',
        ],
      },
    },
  },
  portada: {
    seo: {
      title: 'APA 7 Title Page',
      description:
        'Learn how to create an APA 7 title page for student papers: required elements, examples, and recommendations.',
    },
    header: {
      title: 'APA 7 Title Page',
      subtitle: 'Student papers',
      intro:
        'The title page is the first impression of your work. APA 7 simplified the design for students: fewer decorative elements and more clarity in essential information.',
    },
    sections: {
      componentes: {
        title: 'Title page components',
        content: [
          'Paper title — centered, bold, title case (not all caps).',
          'Author name — below the title, without academic titles unless the institution requires them.',
          'Institutional affiliation — university, department, or study center.',
          'Course number — code or name of the course.',
          'Instructor name — whoever evaluates the work.',
          'Due date — month, day, and year in the format your school specifies.',
        ],
      },
      ejemplo: {
        title: 'Layout example',
        content: [
          'Vertical layout (centered):',
          'Impact of peer tutoring on academic performance',
          'Ana Sofía Mendoza López',
          'Faculty of Education Sciences — Universidad Nacional del Sur',
          'Research Methodology — EDU-402 — Prof. Roberto Castillo',
          'March 15, 2026',
        ],
      },
      recomendaciones: {
        title: 'Recommendations',
        content: [
          'Do not use title pages with background images or decorative fonts; readability is the priority.',
          'The title should not exceed two main lines; if it is long, split it with an optional subtitle.',
          'Include page number 1 in the upper right corner of the title page.',
          'Check whether your faculty requires a title page in Spanish and English or additional data (student ID, city).',
        ],
      },
    },
  },
  citas: {
    seo: {
      title: 'APA 7 Citations',
      description:
        'APA 7 citation guide: narrative, parenthetical, short and block quotes with practical examples for academic work.',
    },
    header: {
      title: 'APA 7 Citations',
      subtitle: 'In the body of the text',
      intro:
        'Citations connect your ideas to the sources you consulted. APA 7 distinguishes narrative citations (the author is part of the sentence) and parenthetical citations (author and year in parentheses at the end).',
    },
    sections: {
      narrativa: {
        title: 'Narrative citation',
        content: [
          'You mention the author within the sentence and indicate the year in parentheses immediately after the name.',
          'Example: Torres (2024) argues that intrinsic motivation improves retention in hybrid courses.',
        ],
      },
      parentetica: {
        title: 'Parenthetical citation',
        content: [
          'At the end of the quoted or paraphrased passage, place author and year in parentheses.',
          'Example: Retention in hybrid environments increases when there is frequent instructor support (Torres, 2024).',
        ],
      },
      corta: {
        title: 'Short direct quote (fewer than 40 words)',
        content: [
          'Integrate the quote in double quotation marks within the paragraph. Indicate page or paragraph if applicable.',
          'Example: Torres (2024) defines hybrid learning as "the planned combination of in-person sessions and guided online activities" (p. 58).',
        ],
      },
      larga: {
        title: 'Long direct quote (40 words or more)',
        content: [
          'Present the quote as a block, without quotation marks, with a 1.27 cm indent from the left margin. Double spacing. Close with the reference in parentheses after the final period.',
          'Block example: The transition to hybrid models requires rethinking formative assessment, since students distribute study across different spaces and schedules. Rubrics must describe observable criteria in digital and in-person deliverables alike. (Torres, 2024, p. 61)',
        ],
      },
      varios: {
        title: 'Multiple authors and sources without a date',
        content: [
          'Two authors: use and in narrative or & in parenthetical — (Luna & Vega, 2023).',
          'Three or more: cite only the first author followed by et al. — (Luna et al., 2023).',
          'No known date: (Organization, n.d.).',
        ],
      },
    },
  },
  referencias: {
    seo: {
      title: 'APA 7 References',
      description:
        'How to build APA 7 references: books, articles, websites, theses, videos, and social media with original examples.',
    },
    header: {
      title: 'APA 7 References',
      subtitle: 'List at the end of the document',
      intro:
        'The References section includes only sources cited in the text, in alphabetical order by author surname. Use a hanging indent: first line at the margin, subsequent lines indented.',
    },
    sections: {
      libro: {
        title: 'Book',
        content: [
          'Herrera, M., & Salinas, P. (2022). Investigación aplicada en ciencias sociales. Editorial Académica del Cono Sur.',
        ],
      },
      articulo: {
        title: 'Journal article',
        content: [
          'Delgado, R. (2025). Competencias digitales docentes en entornos híbridos. Revista Iberoamericana de Educación, 18(2), 45–62. https://doi.org/10.1000/ejemplo.2025.0182',
        ],
      },
      web: {
        title: 'Website',
        content: [
          'Ministerio de Educación Nacional. (2024, June 8). Lineamientos para la evaluación formativa. https://www.ejemplo-gob.edu/lineamientos-evaluacion',
          'Include a retrieval date only if the content may change frequently.',
        ],
      },
      tesis: {
        title: 'Thesis or dissertation',
        content: [
          'Quintero, L. (2023). Resiliencia académica en estudiantes de primer año [Master\'s thesis, Universidad del Pacífico]. Institutional repository. https://repositorio.ejemplo.edu/handle/12345/678',
        ],
      },
      video: {
        title: 'Online video',
        content: [
          'Canal EducaFuturo. (2024, January 14). Cómo estructurar una revisión bibliográfica [Video]. Plataforma Educativa. https://video.ejemplo.com/watch/edu123',
        ],
      },
      redes: {
        title: 'Social media posts',
        content: [
          '@ObservatorioCiencia. (2025, February 3). Hoy publicamos el informe anual sobre becas de investigación [Post]. Red Social Académica. https://social.ejemplo.com/post/987654',
          'Use the author\'s real name if available; otherwise, the username in brackets at the start.',
        ],
      },
    },
  },
  tablas: {
    seo: {
      title: 'APA 7 Tables and Figures',
      description:
        'APA 7 formatting for tables and figures: numbering, titles, notes, and visual presentation best practices.',
    },
    header: {
      title: 'APA 7 Tables and Figures',
      subtitle: 'Visual material in academic work',
      intro:
        'Tables organize numeric data; figures show charts, diagrams, or photographs. APA 7 requires independent numbering for each type and clear titles above tables and below figures.',
    },
    sections: {
      tablas: {
        title: 'Table format',
        content: [
          'Consecutive number in bold: Table 1, Table 2…',
          'Title in italics on the next line, brief and descriptive.',
          'No vertical lines; use minimal horizontal lines (header, closing row).',
          'Footnotes with lowercase superscript letters if you need clarifications.',
          'Table header — Table 1 / Average weekly study hours by modality',
        ],
      },
      figuras: {
        title: 'Figure format',
        content: [
          'Label in bold: Figure 1.',
          'Title in italics below the image or chart.',
          'Copyright or source note if the figure is not your own.',
          'Sufficient resolution for black-and-white printing.',
          'Figure note — Figure 1. Performance comparison between experimental and control groups. Note. Author\'s own work using 2025 survey data.',
        ],
      },
      numeracion: {
        title: 'Numbering',
        content: [
          'Number tables and figures separately in the order they appear in the text. If an appendix contains additional material, restart numbering with a prefix (e.g., Table A1) if your institution requests it.',
        ],
      },
      titulos: {
        title: 'Titles and mentions in the text',
        content: [
          'The first time you cite a table or figure in the body, write the full word and number: "as shown in Table 2". In later mentions you may abbreviate to "Table 2" if there is no ambiguity.',
        ],
      },
    },
  },
  ejemplos: {
    seo: {
      title: 'APA 7 Examples',
      description:
        'Complete APA 7 paper examples: essays, reports, and reference templates for students.',
    },
    header: {
      title: 'APA 7 Examples',
      subtitle: 'Practical cases',
      intro:
        'These fictional scenarios show how to combine title page, body, citations, and references. Use them as a mental template before formatting your own document.',
    },
    sections: {
      ensayo: {
        title: 'Argumentative essay (3–5 pages)',
        content: [
          'Suggested structure: title page → introduction with thesis → two or three development sections → conclusion → references.',
          'Opening paragraph with citation: Student participation in online forums fosters critical thinking when timely feedback is provided (Ramírez, 2023). This essay examines how to design activities that promote respectful debate in university courses.',
        ],
      },
      informe: {
        title: 'Report with IMRD sections',
        content: [
          'Empirical work often includes Introduction, Method, Results, and Discussion (IMRD). Each section has a centered level 1 heading.',
          'Method — participants, instruments, procedure.',
          'Results — tables or figures with data, without deep interpretation.',
          'Discussion — meaning of findings and limitations.',
        ],
      },
      referenciasEjemplo: {
        title: 'Mini reference list',
        content: [
          'Organización Panamericana de la Salud. (2024). Informe regional de bienestar estudiantil. https://www.ejemplo-ops.org/informe-2024',
          'Ramírez, J. (2023). Foros asincrónicos y pensamiento crítico. Educación Digital Hoy, 11(1), 78–92.',
          'Vega, C., & Ortiz, M. (2022). Manual práctico de redacción académica (2nd ed.). Ediciones Campus.',
        ],
      },
      plantillas: {
        title: 'Templates and next steps',
        content: [
          'You can start from a blank Word document applying the rules from our APA 7 Guide or upload your draft to the APA Format Generator to speed up margins, styles, and pagination.',
        ],
      },
    },
  },
};
