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
