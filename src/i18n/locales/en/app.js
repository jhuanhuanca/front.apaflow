export default {
  shell: {
    navAriaLabel: 'User panel',
    home: 'Home',
    login: 'Sign in',
    register: 'Sign up',
    logout: 'Sign out',
    badges: {
      pro: 'PRO',
      trial: 'TRIAL',
      free: 'FREE',
    },
  },
  settings: {
    title: 'APA 7 settings',
    description: 'Customize margins, line spacing, typography, and headers. Premium feature of the Pro plan.',
    lockedTitle: 'Advanced settings locked',
    lockedDesc:
      'Free plan users use the default APA 7 configuration. Upgrade to Pro to customize.',
    lockedCta: 'See upgrade options in the converter',
    loading: 'Loading settings…',
    lineSpacing: 'Line spacing',
    lineSpacingHelp: 'Space between lines',
    single: 'Single',
    oneHalf: '1.5 lines',
    double: 'Double (APA 7 standard)',
    margins: 'Margins (inches)',
    marginSides: {
      top: 'top',
      bottom: 'bottom',
      left: 'left',
      right: 'right',
    },
    typography: 'Typography',
    font: 'Font',
    fontSize: 'Size (pt)',
    save: 'Save settings',
    saved: 'Settings saved.',
    loadError: 'Could not load APA settings.',
    saveError: 'Could not save settings.',
  },
  guideArticle: {
    disclaimer:
      'Reference resources based on the 7th edition of the APA Publication Manual.',
  },
  apaGuide: {
    title: 'APA 7 Guide',
    subtitle: 'Manuscript formatting',
    sections: {
      pageSetup: {
        title: 'Page setup',
        content: [
          'Margins of 2.54 cm (1 inch) on all four sides.',
          'Recommended font: Times New Roman 12 pt (or Calibri 11 pt if your institution requires it).',
          'Double spacing throughout the text, including reference pages.',
          'Text alignment: left (avoid full justification in most academic work).',
          'First-line paragraph indent: 1.27 cm (0.5 inches).',
        ],
      },
      headerPagination: {
        title: 'Header and pagination',
        content: [
          'Page number in the upper right corner, starting on the title page.',
          'For student papers, include a shortened title (max. 50 characters) in uppercase in the header.',
          'Do not use the phrase "Running head" in APA 7 (only in earlier editions for professional papers).',
        ],
      },
      headingHierarchy: {
        title: 'Heading hierarchy',
        content: [
          'Level 1 — Centered, bold, title case in all caps. Example: INTRODUCTION',
          'Level 2 — Flush left, bold, title case. Example: Theoretical framework',
          'Level 3 — Flush left, bold, italic. Example: Background of the problem',
          'Level 4 — Indented, bold, ends with a period. Example: Operational definition. Text…',
        ],
      },
    },
    footer: 'Use the APA Format Generator to automatically apply these rules to your .docx.',
    footerLink: 'APA Format Generator',
  },
  referencesGuide: {
    title: 'References guide',
    subtitle: 'Citations and reference list',
    sections: {
      inText: {
        title: 'In-text citations',
        content: [
          'Author-date: (García, 2021) or García (2021) depending on narrative context.',
          'Two authors: (López & Martínez, 2019) — use "&" in parentheses and "and" in the text.',
          'Three or more authors: (Pérez et al., 2020) from the first citation onward.',
          'Short direct quote: include page — (Soto, 2018, p. 45).',
          'Long direct quote (>40 words): block with indent, no quotation marks, page at the end.',
        ],
      },
      referenceList: {
        title: 'Reference list',
        content: [
          'Section title: References, centered and bold.',
          'Alphabetical order by first author\'s surname.',
          'Hanging indent: first line at the margin, subsequent lines indented 1.27 cm.',
          'Double spacing between entries, with no extra blank lines.',
          'Include only sources cited in the text (not a general bibliography).',
        ],
      },
      commonExamples: {
        title: 'Common examples',
        content: [
          'Journal article — Hernández, R., Fernández, C., & Baptista, P. (2014). Metodología de la investigación (6th ed.). McGraw-Hill.',
          'Web page — American Psychological Association. (2020, October 1). Publication manual of the American Psychological Association (7th ed.). https://doi.org/10.1037/0000165-000',
          'Book chapter — Morales, J. (2022). Análisis cualitativo. In L. Vega (Ed.), Manual de métodos (pp. 112–145). Editorial Académica.',
        ],
      },
    },
    footer:
      'The converter normalizes the body of the document; review references manually or consult the APA 7 Guide for citation formatting.',
    footerLink: 'APA 7 Guide',
  },
  tablesGuide: {
    title: 'Tables and figures',
    subtitle: 'Figures, tables, and notes in APA 7',
    sections: {
      tables: {
        title: 'Tables',
        content: [
          'Number and title above the table: "Table 1" in bold, title in italics on the next line.',
          'No vertical lines; use horizontal lines only for headers and totals when needed.',
          'Notes below the table (general, specific, or probability) with indent and explanatory prefixes.',
          'Cite the table in the text before displaying it: "as shown in Table 1…".',
        ],
      },
      figures: {
        title: 'Figures (images, charts, diagrams)',
        content: [
          'Number and title below the figure: "Figure 1." in bold, title in italics.',
          'Legend and notes also below, in regular or italic text as appropriate.',
          'Adequate resolution for printing; avoid pixelated screenshots in final papers.',
          'If the figure is not yours, indicate permission or license in the figure note.',
        ],
      },
      bestPractices: {
        title: 'Best practices',
        content: [
          'Table — Comparable numeric data in rows/columns. Avoid tables used only for running text.',
          'Figure — Visualize trends, processes, or results that the text does not summarize clearly.',
        ],
      },
    },
    footer:
      'Soon you will be able to validate tables and figures from the panel. Meanwhile, use the APA Format Generator for general document formatting.',
    footerLink: 'APA Format Generator',
  },
};
