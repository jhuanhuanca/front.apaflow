const PUBLISHED = 'June 10, 2026';
const EMAIL = 'apaflow@gmail.com';
const WEBSITE = 'apaflow.shop';
const OWNER = 'Juan Huanca Ninachoque';
const COMPANY = 'SynkaiSoft';

const contactLines = [
  `Owner: ${OWNER}`,
  `Trade name: ${COMPANY}`,
  `Website: ${WEBSITE}`,
  `Email: ${EMAIL}`,
];

export default {
  common: {
    badge: 'Legal information',
    lastUpdated: 'Last updated',
  },
  privacy: {
    seo: {
      title: 'Privacy Policy',
      description: 'How APAFlow collects, uses, and protects user information on apaflow.shop.',
    },
    title: 'APAFlow Privacy Policy',
    lastUpdated: PUBLISHED,
    intro: 'Welcome to APAFlow. This Privacy Policy describes how we collect, use, store, and protect information from users of apaflow.shop.',
    sections: [
      {
        title: '1. Service Provider',
        paragraphs: ['APAFlow is operated by:'],
        list: [
          `Owner: ${OWNER}`,
          `Trade name: ${COMPANY}`,
          `Website: ${WEBSITE}`,
          `Contact email: ${EMAIL}`,
        ],
      },
      {
        title: '2. Information We Collect',
        paragraphs: ['We may collect the following information:'],
        list: [
          'User name.',
          'Email address.',
          'IP address.',
          'Device and browser technical information.',
          'Word documents (.docx) uploaded for processing.',
          'Conversion history and generated documents.',
          'Information related to plans and subscriptions.',
        ],
      },
      {
        title: '3. Purpose of Data Processing',
        paragraphs: ['We use collected information to:'],
        list: [
          'Provide document conversion and APA formatting services.',
          'Manage user accounts.',
          'Process subscriptions and payments.',
          'Improve service quality.',
          'Detect fraudulent or abusive activity.',
          'Comply with legal obligations.',
        ],
      },
      {
        title: '4. Document Storage',
        paragraphs: [
          'Uploaded documents may be stored within the user account to allow access to conversion history.',
          'Documents, generated files, and associated information may be retained while membership or the account remains active.',
          'When an account is deleted or the retention period defined by APAFlow expires, documents and associated data may be permanently removed from our systems.',
        ],
      },
      {
        title: '5. Payments and Subscriptions',
        paragraphs: [
          'Payments may be processed through authorized third-party providers.',
          'APAFlow does not store full credit card numbers or user financial credentials.',
          'Payment providers are responsible for secure processing of financial information.',
        ],
      },
      {
        title: '6. Cookies and Similar Technologies',
        paragraphs: ['We may use cookies and similar technologies to:'],
        list: [
          'Maintain user sessions.',
          'Remember preferences.',
          'Analyze site usage.',
          'Display relevant content and advertising.',
        ],
        paragraphsAfterList: ['Users can manage cookies through their browser settings.'],
      },
      {
        title: '7. Advertising',
        paragraphs: [
          'Free and Guest versions may display advertisements.',
          'Users with an active PRO subscription may use the service without ads.',
          'Advertising providers may use their own technologies subject to their respective privacy policies.',
        ],
      },
      {
        title: '8. Security',
        paragraphs: ['We implement reasonable technical and organizational measures to protect information against:'],
        list: [
          'Unauthorized access.',
          'Alteration.',
          'Disclosure.',
          'Accidental loss or destruction.',
        ],
        paragraphsAfterList: [
          'However, no electronic transmission or storage system can guarantee absolute security.',
        ],
      },
      {
        title: '9. User Rights',
        paragraphs: ['Users may request:'],
        list: [
          'Access to their data.',
          'Correction of inaccurate information.',
          'Account deletion when applicable.',
          'Information about how their data is processed.',
        ],
        paragraphsAfterList: ['Requests may be submitted through official contact channels.'],
      },
      {
        title: '10. Minors',
        paragraphs: [
          'APAFlow is primarily intended for students, researchers, and professionals. Minors must use the service under supervision of their legal representatives when required by applicable law.',
        ],
      },
      {
        title: '11. Changes to This Policy',
        paragraphs: [
          'APAFlow may modify this Privacy Policy at any time.',
          'Changes will be published on this page with the corresponding update date.',
        ],
      },
      {
        title: '12. Contact',
        paragraphs: ['For privacy and data protection inquiries:'],
        list: contactLines,
      },
    ],
  },
  terms: {
    seo: {
      title: 'Terms and Conditions',
      description: 'Terms of use for the APAFlow platform at apaflow.shop.',
    },
    title: 'APAFlow Terms and Conditions',
    lastUpdated: PUBLISHED,
    intro: '',
    sections: [
      {
        title: '1. Acceptance of Terms',
        paragraphs: [
          'By accessing and using APAFlow (apaflow.shop), you agree to these Terms and Conditions. If you do not agree with any provision, you must refrain from using the service.',
        ],
      },
      {
        title: '2. Service Description',
        paragraphs: [
          'APAFlow is a platform developed by SynkaiSoft for converting, formatting, and generating academic documents based on APA 7 guidelines.',
          'Available features may vary depending on the selected plan.',
        ],
      },
      {
        title: '3. User Registration',
        paragraphs: [
          'To access certain features, users must create an account with accurate and up-to-date information.',
          'Users are responsible for keeping their login credentials confidential.',
        ],
      },
      {
        title: '4. Plans and Subscriptions',
        paragraphs: ['APAFlow may offer:'],
        list: ['Guest plan.', 'Free plan.', 'PRO plan.', 'Pay-per-document services.'],
        paragraphsAfterList: ['Features and limitations of each plan may change at any time.'],
      },
      {
        title: '5. Payments',
        paragraphs: [
          'Payments are processed through authorized third-party providers.',
          'Premium features are enabled only after payment is confirmed by the corresponding provider.',
        ],
      },
      {
        title: '6. Refund Policy',
        paragraphs: [
          'Currently, APAFlow does not offer refunds for purchases, subscriptions, or services already used.',
          'Before making any payment, users should carefully review service features.',
        ],
      },
      {
        title: '7. Permitted Use',
        paragraphs: ['Users agree not to:'],
        list: [
          'Use the service for unlawful activities.',
          'Attempt to compromise platform security.',
          'Distribute malware.',
          'Interfere with system operation.',
        ],
      },
      {
        title: '8. Intellectual Property',
        paragraphs: [
          'All software, design, logos, text, and APAFlow elements belong to SynkaiSoft or their respective owners.',
        ],
      },
      {
        title: '9. Account Suspension',
        paragraphs: [
          'APAFlow may suspend or cancel accounts that violate these terms or pose a risk to the platform.',
        ],
      },
      {
        title: '10. Limitation of Liability',
        paragraphs: [
          'APAFlow is provided "as is" and does not guarantee that generated results are completely error-free.',
          'Users are responsible for reviewing and validating generated documents before academic or professional submission.',
        ],
      },
      {
        title: '11. Modifications',
        paragraphs: [
          'APAFlow may modify these terms at any time by publishing them on the website.',
        ],
      },
      {
        title: '12. Contact',
        list: contactLines,
      },
    ],
  },
  subscriptions: {
    seo: {
      title: 'Subscriptions and Payments Policy',
      description: 'Plans, billing, renewals, and payment policy for APAFlow.',
    },
    title: 'Subscriptions and Payments Policy',
    lastUpdated: PUBLISHED,
    intro: '',
    sections: [
      {
        title: '1. Available Plans',
        paragraphs: ['APAFlow offers different access options:'],
        subsections: [
          {
            title: 'Guest',
            list: ['Limited access.', 'May display advertising.'],
          },
          {
            title: 'Free',
            list: [
              'Limited free features.',
              'Visible advertising.',
              'Initial free conversion according to current promotions.',
            ],
          },
          {
            title: 'PRO',
            list: [
              'Unlimited generations.',
              'Advanced APA configuration options.',
              'Ad-free experience.',
              'Additional premium features.',
            ],
          },
        ],
      },
      {
        title: '2. Billing',
        paragraphs: [
          'PRO subscriptions are billed periodically according to the selected plan.',
          'Payments are processed by specialized third-party providers.',
        ],
      },
      {
        title: '3. Service Activation',
        paragraphs: [
          'PRO plan activation occurs only after payment confirmation by the payment provider.',
        ],
      },
      {
        title: '4. Renewals',
        paragraphs: [
          'Subscriptions may renew automatically if the payment method remains active.',
        ],
      },
      {
        title: '5. Expiration',
        paragraphs: ['When a PRO subscription expires or cannot be renewed:'],
        list: [
          'The user automatically returns to the Free plan.',
          'Premium features are disabled.',
          'Advertising may be displayed again.',
        ],
      },
      {
        title: '6. History and Storage',
        paragraphs: [
          'Documents and conversions may be retained during active membership.',
          'APAFlow may delete historical data from inactive or expired accounts according to internal policies.',
        ],
      },
      {
        title: '7. Refunds',
        paragraphs: ['Currently, no refunds are offered for:'],
        list: ['Subscriptions.', 'Pay-per-document payments.', 'Consumed digital services.'],
      },
      {
        title: '8. Modifications',
        paragraphs: [
          'APAFlow may modify prices, plans, or future features without affecting obligations already fulfilled.',
        ],
      },
    ],
  },
  cookies: {
    seo: {
      title: 'Cookie Policy and Academic Disclaimer',
      description: 'Cookie usage, advertising, and academic disclaimer for APAFlow.',
    },
    title: 'Cookie Policy and Academic Disclaimer',
    lastUpdated: PUBLISHED,
    intro: '',
    sections: [
      {
        title: 'Cookie Policy',
        paragraphs: ['APAFlow uses cookies and similar technologies to:'],
        list: [
          'Keep active sessions.',
          'Remember user preferences.',
          'Improve browsing experience.',
          'Analyze usage statistics.',
          'Display advertising when applicable.',
        ],
        paragraphsAfterList: [
          'Users can configure their browser to reject or delete cookies, although some site features may be affected.',
        ],
      },
      {
        title: 'Advertising',
        paragraphs: [
          'Guest and Free versions may display ads provided by third parties.',
          'Users with an active PRO subscription will not see advertising within the platform.',
        ],
      },
      {
        title: 'Academic Disclaimer',
        paragraphs: [
          'APAFlow is an academic support tool.',
          'It does not guarantee automatic acceptance of academic work by universities, educational institutions, or scientific publications.',
          'The user is responsible for:',
        ],
        list: [
          'Reviewing generated content.',
          'Verifying citations and references.',
          'Confirming compliance with their institution\'s specific requirements.',
        ],
        paragraphsAfterList: [
          'APAFlow does not replace academic, editorial, or professional review.',
        ],
      },
      {
        title: 'Service Availability',
        paragraphs: [
          'Although reasonable efforts are made to maintain platform availability, APAFlow does not guarantee uninterrupted or error-free access.',
        ],
      },
      {
        title: 'Contact',
        list: contactLines,
      },
    ],
  },
};
