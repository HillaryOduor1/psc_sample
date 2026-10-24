// src/data/navlinks.ts
export interface NavLink {
  name: string;
  href: string;
  icon?: string;
  description?: string;
  external?: boolean;
  children?: NavLink[];
}

export const navlinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
    icon: "home",
  },
  {
    name: "About Us",
    href: "/about",
    icon: "info",
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: "work",
    children: [
      { name: "Vacancies", href: "/jobs/vacancies" },
      { name: "Recruitment Portal", href: "/jobs/recruitment" },
    ],
  },
  {
    name: "Resources",
    href: "/resources",
    icon: "folder",
    children: [
      { name: "Policies", href: "/resources/policies" },
      { name: "Reports", href: "/resources/reports" },
      { name: "Publications", href: "/resources/publications" },
      { name: "Forms", href: "/resources/forms" },
      { name: "Guidelines", href: "/resources/guidelines" },
      { name: "Circulars", href: "/resources/circulars" },
      { name: "Downloads", href: "/resources/downloads" },
      { name: "FAQs", href: "/resources/faqs" },
    ],
  },
  {
    name: "Media Centre",
    href: "/media",
    icon: "newspaper",
    children: [
      { name: "News", href: "/media/news" },
      { name: "Events", href: "/media/events" },
      { name: "Announcements", href: "/media/announcements" },
      { name: "Gallery", href: "/media/gallery" },
      { name: "Videos", href: "/media/videos" },
      { name: "Press Releases", href: "/media/press-releases" },
    ],
  },
  {
    name: "Tenders",
    href: "/tenders",
    icon: "description",
  },
  {
    name: "FAQ's",
    href: "/faqs",
    icon: "help",
  },
  {
    name: "Contact Us",
    href: "/contact",
    icon: "mail",
  },
];

/*// src/data/navlinks.ts
export interface NavLink {
  name: string;
  href: string;
  icon?: string;
  children?: NavLink[];
}

export const navlinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  {
    name: "Jobs",
    href: "/jobs",
    children: [
      { name: "Vacancies", href: "/jobs/vacancies" },
      { name: "Recruitment Portal", href: "/jobs/recruitment" }
    ]
  },
  //{ name: "Resources", href: "/resources" },
  {
    name: "Resources",
    href: "/resources",
    children: [
      { name: "Policies", href: "/resources/policies" },
      { name: "Reports", href: "/resources/reports" },
      { name: "Publications", href: "/resources/publications" },
      { name: "Forms", href: "/resources/forms" },
      { name: "Guidelines", href: "/resources/guidelines" },
      { name: "Circulars", href: "/resources/circulars" },
      { name: "Downloads", href: "/resources/downloads" },
      { name: "FAQs", href: "/resources/faqs" }
    ]
  },
  //{ name: "Media Centre", href: "/media" },
   {
    name: "Media Center",
    href: "/media",
    children: [
      { name: "News", href: "/media/news" },
      { name: "Events", href: "/media/events" },
      { name: "Announcements", href: "/media/announcements" },
      { name: "Gallery", href: "/media/gallery" },
      { name: "Videos", href: "/media/videos" },
      { name: "Press Releases", href: "/media/press-releases" }
    ]
  },
  
  { name: "Tenders", href: "/tenders" },
  { name: "FAQ's", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
];*/


/*
// src/data/navlinks.tsx
export interface NavLink {
  name: string;
  href: string;
  icon?: string;
}

export const navlinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Jobs', href: '/jobs' },
  { name: 'Vacancies', href: '/vacancies' },
  { name: 'Policies', href: '/policies' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
];

export const footerNavLinks = {
  quickLinks: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Service Charter', href: '/accessibility' },
  ],
  resources: [
    { name: 'Strategic Plan', href: '/resources/strategic-plan' },
    { name: 'Corruption Reporting', href: '/report-corruption' },
    { name: 'Contact Us', href: '/contact' },
  ]
};*/