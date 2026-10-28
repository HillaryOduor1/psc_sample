// src/content/defaultContent.ts
// src/content/defaultContent.ts
// src/content/defaultContent.ts
import type { SiteContent } from './contentTypes';

export const defaultContent: SiteContent = {
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    {
      name: 'Jobs',
      href: '/jobs',
      icon: 'work',
      children: ([
        { name: 'Vacancies', href: '/jobs/vacancies' },
        { name: 'Recruitment Portal', href: '/jobs/recruitment' },
      ] as unknown) as string,
    },
    {
      name: 'Resources',
      href: '/resources',
      icon: 'folder',
      children: ([
        { name: 'Policies', href: '/resources/policies' },
        { name: 'Reports', href: '/resources/reports' },
        { name: 'Publications', href: '/resources/publications' },
        { name: 'Forms', href: '/resources/forms' },
        { name: 'Guidelines', href: '/resources/guidelines' },
        { name: 'Circulars', href: '/resources/circulars' },
        { name: 'Downloads', href: '/resources/downloads' },
        { name: 'FAQs', href: '/resources/faqs' },
      ] as unknown) as string,
    },
    {
      name: 'Media Centre',
      href: '/media',
      icon: 'newspaper',
      children: ([
        { name: 'News', href: '/media/news' },
        { name: 'Events', href: '/media/events' },
        { name: 'Announcements', href: '/media/announcements' },
        { name: 'Gallery', href: '/media/gallery' },
        { name: 'Videos', href: '/media/videos' },
        { name: 'Press Releases', href: '/media/press-releases' },
      ] as unknown) as string,
    },
    { name: 'Tenders', href: '/tenders', icon: 'description' },
    { name: "FAQ's", href: '/faqs', icon: 'help' },
    { name: 'Contact Us', href: '/contact', icon: 'mail' },
  ],

  hero: {
    slides: [
      {
        badge: 'OUR VISION',
        headline: [
          [{ text: "A " }, { text: "Values-Driven", accent: true }],
          [{ text: "Citizen-Centric", accent: true }, { text: " Public Service" }]
        ],
        subtext: 'Join the ranks of success and explore a world of possibilities with our internship and job placement programs.',
        primaryButtonText: 'ABOUT PSC',
        secondaryButtonText: 'VIEW PROGRAMMES',
        primaryLink: '/about',
        secondaryLink: '/jobs',
        image: '/assets/Our Vision-psc image1.webp'
      },
      {
        badge: 'OUR MISSION',
        headline: [
          [{ text: "To Ensure an " }, { text: "Efficient", accent: true }, { text: ", " }],
          [{ text: "Effective", accent: true }, { text: ", " }, { text: "Ethical", accent: true }, { text: " & " }],
          [{ text: "Inclusive", accent: true }, { text: " Public Service" }],
          [{ text: "for Delivery of Quality Services" }]
        ],
        subtext: 'Through continuous improvement, we aim to meet the evolving needs of citizens and uphold the highest standards of public service.',
        primaryButtonText: 'ABOUT PSC',
        secondaryButtonText: 'VIEW PROGRAMMES',
        primaryLink: '/about',
        secondaryLink: '/jobs',
        image: '/assets/Our Mission-psc image2.webp'
      },
      {
        badge: 'CORE VALUES',
        headline: [
          [{ text: "Integrity, Innovation & Agility" }],
          [{ text: "Diversity, Inclusivity & Equity," }],
          [{ text: "Accountability & Transparency" }],
          [{ text: "Responsiveness, Teamwork" }]
        ],
        subtext: 'We place a strong emphasis on understanding and meeting the needs of the public while maintaining the highest standards of integrity and accountability.',
        primaryButtonText: 'ABOUT PSC',
        secondaryButtonText: 'VIEW PROGRAMMES',
        primaryLink: '/about',
        secondaryLink: '/jobs',
        image: '/assets/Core-Values-psc-image3.jpg'
      },
      {
        badge: 'SAY NO TO CORRUPTION',
        headline: [
          [{ text: "Report Any Incident of" }],
          [{ text: "Corruption And Unethical" }],
          [{ text: "Conduct Here !!", accent: true }]
        ],
        subtext: 'The Commission does not charge for any Services, i.e Job Placements, Promotions, Approval of Instruments or Advisory',
        primaryButtonText: 'REPORT NOW',
        primaryLink: '/report-corruption',
        image: '/assets/Say No To Corruption-psc image4.webp'
      },
      {
        badge: 'CAUTION',
        headline: [
          [{ text: "The PSC Provides" }],
          [{ text: "Services Free of Charge", accent: true }]
        ],
        subtext: 'Beware of fraudsters posing as PSC staff and soliciting money in exchange for our services such as shortlisting for advertised jobs, appointment, promotion, and disciplinary matters or appeals. The Commission provides services free of charge',
        image: '/assets/caution-psc image5.webp'
      },
      {
        badge: 'OUR MOTTO',
        headline: [
          [{ text: "Public - Service" }],
          [{ text: "with ", accent: true }, { text: "Integrity" }]
        ],
        subtext: 'Join the ranks of success and explore a world of possibilities with our internship and job placement programs.',
        primaryButtonText: 'ABOUT PSC',
        secondaryButtonText: 'VIEW PROGRAMMES',
        primaryLink: '/about',
        secondaryLink: '/jobs',
        image: '/assets/our motto active-psc image6.webp'
      }
    ]
  },

  about: {
    badge: 'WELCOME TO LIS',
    title: 'Who We Are',
    description1: 'The Public Service Commission is a Constitutional Commission established under Article 233(1) of the Constitution. It consists of a Chairperson, Vice Chairperson and seven Commissioners appointed by the President with the approval of the National Assembly.',
    description2: 'We are committed to ensuring an efficient, effective, and ethical public service that delivers quality services to the citizenry.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format',
    features: [
      { icon: 'verified', title: 'Integrity', description: 'Upholding the highest standards' },
      { icon: 'visibility', title: 'Transparency', description: 'Open and accountable governance' },
      { icon: 'lightbulb', title: 'Innovation', description: 'Driving positive change' },
      { icon: 'groups', title: 'Teamwork', description: 'Collaborative approach' },
    ]
  },

  quickActions: [
    { icon: 'work', title: 'New Jobs', href: '/jobs', bgColor: 'bg-[#e68c00]/10', iconColor: 'text-[#e68c00]' },
    { icon: 'gavel', title: 'Report Incident of Corruption Here', href: '/report-corruption', bgColor: 'bg-[#ba1a1a]/10', iconColor: 'text-[#ba1a1a]' },
    { icon: 'policy', title: 'Policies & Guidelines', href: '/policies', bgColor: 'bg-[#296a46]/10', iconColor: 'text-[#296a46]' },
    { icon: 'help', title: "FAQ's", href: '/faqs', bgColor: 'bg-[#5f5e5e]/10', iconColor: 'text-[#5f5e5e]' },
  ],

  news: [
    {
      title: 'PSC, Development Partners Align Priorities to Advance Disability Inclusion in Public Service',
      excerpt: 'PSC DMC in working meeting with Development partners',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format',
      date: 'Aug 17, 2026',
      href: '/news/1'
    },
    {
      title: 'PSC CEO signs performance contract with the Commission',
      excerpt: 'The Public Service Commission Secretary, Mr. Paul Famba, on 17 August 2026, signed...',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format',
      date: 'Aug 17, 2026',
      href: '/news/2'
    },
    {
      title: 'UPDATE: PSC donates Music Festival trophies to promote national values',
      excerpt: 'President William Ruto and PSC Chairperson Francis Meja awarding trophy to Nzoia Sugar...',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format',
      date: 'Aug 17, 2026',
      href: '/news/3'
    },
  ],

  cta: {
    title: 'EXPLORE EXCITING JOB OPPORTUNITIES!',
    description: 'Your future in public service starts here',
    primaryButtonText: 'APPLY NOW',
  },

  footer: {
    description: 'A Values-Driven Citizen-Centric Public Service',
    quickLinks: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Service Charter', href: '/accessibility' },
    ],
    legalLinks: [
      { name: 'Strategic Plan', href: '/resources/strategic-plan' },
      { name: 'Corruption Reporting', href: '/report-corruption' },
      { name: 'Contact Us', href: '/contact' },
    ],
    copyright: '© 2026 Landscapes Integrity Solutions (LIS). All Rights Reserved.',
  },

  areas: [
    { icon: 'forest', title: 'Climate Policy', description: 'Developing frameworks for climate resilience and adaptation.', link: '/areas/climate-policy' },
    { icon: 'eco', title: 'Land Governance', description: 'Strengthening land tenure and management systems.', link: '/areas/land-governance' },
    { icon: 'water', title: 'Water Resources', description: 'Integrated water resource management strategies.', link: '/areas/water-resources' },
    { icon: 'biodiversity', title: 'Biodiversity', description: 'Conservation and sustainable use of biodiversity.', link: '/areas/biodiversity' },
  ],

  partners: {
    badge: 'Our Partners',
    title: 'Collaborating for Impact',
    description: 'We work with leading organizations to drive landscape integrity.',
    categories: ['Research Institutions', 'Government Agencies', 'NGOs'],
    logos: [
      { icon: 'apartment' },
      { icon: 'forest' },
      { icon: 'eco' },
    ],
  },

  contact: {
    sectionTitle: {
      text1: 'Get in',
      text2: 'touch',
      text3: 'We\'d love to hear from you',
    },
    form: {
      nameLabel: 'Your Name',
      namePlaceholder: 'Enter Your Name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we help?',
      submitText: 'Send Message',
    },
  },

  advisory: [
    { icon: 'analytics', title: 'Research & Analysis', description: 'Evidence-based policy research and data analysis.' },
    { icon: 'handshake', title: 'Strategic Advisory', description: 'Tailored guidance for policy implementation.' },
    { icon: 'school', title: 'Capacity Building', description: 'Training and development programs.' },
    { icon: 'public', title: 'Policy Design', description: 'Frameworks for sustainable governance.' },
  ],

  testimonials: [
    {
      name: 'John Doe',
      role: 'Policy Director',
      content: 'LIS provided exceptional guidance on our climate policy framework.',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Jane Smith',
      role: 'NGO Leader',
      content: 'Their research and advisory services are world-class.',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
  ],

  pricing: [
    {
      name: 'Basic',
      price: 299,
      period: 'month',
      features: ['Research access', 'Quarterly reports', 'Email support'],
      mostPopular: false
    },
    {
      name: 'Pro',
      price: 599,
      period: 'month',
      features: ['All Basic features', 'Monthly reports', 'Priority support', 'Advisory calls'],
      mostPopular: true
    },
    {
      name: 'Enterprise',
      price: 999,
      period: 'month',
      features: ['All Pro features', 'Dedicated advisor', 'Custom research', '24/7 support'],
      mostPopular: false
    },
  ],
};

/*import type { SiteContent } from './contentTypes';

export const defaultContent: SiteContent = {
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Resources', href: '/resources' },
    { name: 'Media Centre', href: '/media' },
    { name: 'Tenders', href: '/tenders' },
    { name: "FAQ's", href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
  ],

  hero: {
    slides: [
      {
        badge: 'OUR VISION',
        headline: [
          [{ text: "A " }, { text: "Values-Driven", accent: true }],
          [{ text: "Citizen-Centric", accent: true }, { text: " Public Service" }]
        ],
        subtext: 'Join the ranks of success and explore a world of possibilities with our internship and job placement programs.',
        primaryButtonText: 'ABOUT PSC',
        secondaryButtonText: 'VIEW PROGRAMMES',
        primaryLink: '/about',
        secondaryLink: '/jobs',
        image: '/assets/Our Vision-psc image1.webp'
      },
      {
        badge: 'OUR MISSION',
        headline: [
          [{ text: "To Ensure an " }, { text: "Efficient", accent: true }, { text: ", " }],
          [{ text: "Effective", accent: true }, { text: ", " }, { text: "Ethical", accent: true }, { text: " & " }],
          [{ text: "Inclusive", accent: true }, { text: " Public Service" }],
          [{ text: "for Delivery of Quality Services" }]
        ],
        subtext: 'Through continuous improvement, we aim to meet the evolving needs of citizens and uphold the highest standards of public service.',
        primaryButtonText: 'ABOUT PSC',
        secondaryButtonText: 'VIEW PROGRAMMES',
        primaryLink: '/about',
        secondaryLink: '/jobs',
        image: '/assets/Our Mission-psc image2.webp'
      },
      {
        badge: 'CORE VALUES',
        headline: [
          [{ text: "Integrity, Innovation & Agility" }],
          [{ text: "Diversity, Inclusivity & Equity," }],
          [{ text: "Accountability & Transparency" }],
          [{ text: "Responsiveness, Teamwork" }]
        ],
        subtext: 'We place a strong emphasis on understanding and meeting the needs of the public while maintaining the highest standards of integrity and accountability.',
        primaryButtonText: 'ABOUT PSC',
        secondaryButtonText: 'VIEW PROGRAMMES',
        primaryLink: '/about',
        secondaryLink: '/jobs',
        image: '/assets/Core Values-psc image3.webp'
      },
      {
        badge: 'SAY NO TO CORRUPTION',
        headline: [
          [{ text: "Report Any Incident of" }],
          [{ text: "Corruption And Unethical" }],
          [{ text: "Conduct Here !!", accent: true }]
        ],
        subtext: 'The Commission does not charge for any Services, i.e Job Placements, Promotions, Approval of Instruments or Advisory',
        primaryButtonText: 'REPORT NOW',
        primaryLink: '/report-corruption',
        image: '/assets/Say No To Corruption-psc image4.webp'
      },
      {
        badge: 'CAUTION',
        headline: [
          [{ text: "The PSC Provides" }],
          [{ text: "Services Free of Charge", accent: true }]
        ],
        subtext: 'Beware of fraudsters posing as PSC staff and soliciting money in exchange for our services such as shortlisting for advertised jobs, appointment, promotion, and disciplinary matters or appeals. The Commission provides services free of charge',
        image: '/assets/caution-psc image5.webp'
      },
      {
        badge: 'OUR MOTTO',
        headline: [
          [{ text: "Public - Service" }],
          [{ text: "with ", accent: true }, { text: "Integrity" }]
        ],
        subtext: 'Join the ranks of success and explore a world of possibilities with our internship and job placement programs.',
        primaryButtonText: 'ABOUT PSC',
        secondaryButtonText: 'VIEW PROGRAMMES',
        primaryLink: '/about',
        secondaryLink: '/jobs',
        image: '/assets/our motto active-psc image6.webp'
      }
    ]
  },

  about: {
    badge: 'WELCOME TO LIS',
    title: 'Who We Are',
    description1: 'The Public Service Commission is a Constitutional Commission established under Article 233(1) of the Constitution. It consists of a Chairperson, Vice Chairperson and seven Commissioners appointed by the President with the approval of the National Assembly.',
    description2: 'We are committed to ensuring an efficient, effective, and ethical public service that delivers quality services to the citizenry.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format',
    features: [
      { icon: 'verified', title: 'Integrity', description: 'Upholding the highest standards' },
      { icon: 'visibility', title: 'Transparency', description: 'Open and accountable governance' },
      { icon: 'lightbulb', title: 'Innovation', description: 'Driving positive change' },
      { icon: 'groups', title: 'Teamwork', description: 'Collaborative approach' },
    ]
  },

  quickActions: [
    { icon: 'work', title: 'New Jobs', href: '/jobs', bgColor: 'bg-[#e68c00]/10', iconColor: 'text-[#e68c00]' },
    { icon: 'gavel', title: 'Report Incident of Corruption Here', href: '/report-corruption', bgColor: 'bg-[#ba1a1a]/10', iconColor: 'text-[#ba1a1a]' },
    { icon: 'policy', title: 'Policies & Guidelines', href: '/policies', bgColor: 'bg-[#296a46]/10', iconColor: 'text-[#296a46]' },
    { icon: 'help', title: "FAQ's", href: '/faq', bgColor: 'bg-[#5f5e5e]/10', iconColor: 'text-[#5f5e5e]' },
  ],

  news: [
    {
      title: 'PSC, Development Partners Align Priorities to Advance Disability Inclusion in Public Service',
      excerpt: 'PSC DMC in working meeting with Development partners',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format',
      date: 'Aug 17, 2026',
      href: '/news/1'
    },
    {
      title: 'PSC CEO signs performance contract with the Commission',
      excerpt: 'The Public Service Commission Secretary, Mr. Paul Famba, on 17 August 2026, signed...',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format',
      date: 'Aug 17, 2026',
      href: '/news/2'
    },
    {
      title: 'UPDATE: PSC donates Music Festival trophies to promote national values',
      excerpt: 'President William Ruto and PSC Chairperson Francis Meja awarding trophy to Nzoia Sugar...',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format',
      date: 'Aug 17, 2026',
      href: '/news/3'
    },
  ],

  cta: {
    title: 'EXPLORE EXCITING JOB OPPORTUNITIES!',
    description: 'Your future in public service starts here',
    primaryButtonText: 'APPLY NOW',
  },

  footer: {
    description: 'A Values-Driven Citizen-Centric Public Service',
    quickLinks: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Service Charter', href: '/accessibility' },
    ],
    legalLinks: [
      { name: 'Strategic Plan', href: '/resources/strategic-plan' },
      { name: 'Corruption Reporting', href: '/report-corruption' },
      { name: 'Contact Us', href: '/contact' },
    ],
    copyright: '© 2026 Landscapes Integrity Solutions (LIS). All Rights Reserved.',
  },

  areas: [
    { icon: 'forest', title: 'Climate Policy', description: 'Developing frameworks for climate resilience and adaptation.', link: '/areas/climate-policy' },
    { icon: 'eco', title: 'Land Governance', description: 'Strengthening land tenure and management systems.', link: '/areas/land-governance' },
    { icon: 'water', title: 'Water Resources', description: 'Integrated water resource management strategies.', link: '/areas/water-resources' },
    { icon: 'biodiversity', title: 'Biodiversity', description: 'Conservation and sustainable use of biodiversity.', link: '/areas/biodiversity' },
  ],

  partners: {
    badge: 'Our Partners',
    title: 'Collaborating for Impact',
    description: 'We work with leading organizations to drive landscape integrity.',
    categories: ['Research Institutions', 'Government Agencies', 'NGOs'],
    logos: [
      { icon: 'apartment' },
      { icon: 'forest' },
      { icon: 'eco' },
    ],
  },

  contact: {
    sectionTitle: {
      text1: 'Get in',
      text2: 'touch',
      text3: 'We\'d love to hear from you',
    },
    form: {
      nameLabel: 'Your Name',
      namePlaceholder: 'Enter Your Name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we help?',
      submitText: 'Send Message',
    },
  },

  advisory: [
    { icon: 'analytics', title: 'Research & Analysis', description: 'Evidence-based policy research and data analysis.' },
    { icon: 'handshake', title: 'Strategic Advisory', description: 'Tailored guidance for policy implementation.' },
    { icon: 'school', title: 'Capacity Building', description: 'Training and development programs.' },
    { icon: 'public', title: 'Policy Design', description: 'Frameworks for sustainable governance.' },
  ],

  testimonials: [
    {
      name: 'John Doe',
      role: 'Policy Director',
      content: 'LIS provided exceptional guidance on our climate policy framework.',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Jane Smith',
      role: 'NGO Leader',
      content: 'Their research and advisory services are world-class.',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
  ],

  pricing: [
    {
      name: 'Basic',
      price: 299,
      period: 'month',
      features: ['Research access', 'Quarterly reports', 'Email support'],
      mostPopular: false
    },
    {
      name: 'Pro',
      price: 599,
      period: 'month',
      features: ['All Basic features', 'Monthly reports', 'Priority support', 'Advisory calls'],
      mostPopular: true
    },
    {
      name: 'Enterprise',
      price: 999,
      period: 'month',
      features: ['All Pro features', 'Dedicated advisor', 'Custom research', '24/7 support'],
      mostPopular: false
    },
  ],
};*/