// src/content/contentTypes.ts

// Hero headline part for accent coloring (e.g., orange text)
export interface HeroHeadlinePart {
  text: string;
  accent?: boolean; // If true, renders in orange (#e68c00)
}

// Individual slide in the hero carousel
export interface HeroSlide {
  badge?: string; // e.g., "OUR VISION"
  headline?: HeroHeadlinePart[][]; // 2D array: [line1 parts, line2 parts, ...]
  subtext?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryLink?: string;
  secondaryLink?: string;
  image?: string; // Path to image in public folder
}

export interface SiteContent {
  // Navigation
  navigation?: Array<{ 
    name: string; 
    href: string; 
    icon?: string; 
    children?: string 
  }>;

  // Hero Section - Updated to support slides
  hero?: {
    slides?: HeroSlide[];
    // Legacy fields for backward compatibility (if needed)
    badge?: string;
    headline?: string;
    subtext?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    backgroundImage?: string;
  };

  // About Section
  about?: {
    badge?: string;
    title?: string;
    description1?: string;
    description2?: string;
    image?: string;
    features?: Array<{ 
      icon: string; 
      title: string; 
      description: string 
    }>;
  };

  // Quick Actions Grid
  quickActions?: Array<{
    icon: string;
    title: string;
    href: string;
    bgColor: string;
    iconColor: string;
  }>;

  // News Section
  news?: Array<{
    title: string;
    excerpt: string;
    image: string;
    date: string;
    href: string;
  }>;

  // Call to Action
  cta?: {
    title?: string;
    description?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
  };

  // Footer
  footer?: {
    description?: string;
    quickLinks?: Array<{ name: string; href: string }>;
    legalLinks?: Array<{ name: string; href: string }>;
    copyright?: string;
  };

  // Core Areas / Features
  areas?: Array<{
    icon: string;
    title: string;
    description: string;
    link: string;
  }>;

  // Partners
  partners?: {
    badge?: string;
    title?: string;
    description?: string;
    categories?: string[];
    logos?: Array<{ icon: string; name?: string }>;
  };

  // Contact
  contact?: {
    sectionTitle?: {
      text1?: string;
      text2?: string;
      text3?: string;
    };
    form?: {
      nameLabel?: string;
      namePlaceholder?: string;
      emailLabel?: string;
      emailPlaceholder?: string;
      messageLabel?: string;
      messagePlaceholder?: string;
      submitText?: string;
    };
  };

  // Advisory Services
  advisory?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  // Testimonials
  testimonials?: Array<{
    name: string;
    role: string;
    content: string;
    avatar?: string;
  }>;

  // Pricing
  pricing?: Array<{
    name: string;
    price: number;
    period: string;
    features: string[];
    mostPopular?: boolean;
  }>;

  // Theme configuration (if using ThemeManager)
  theme?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
    typography?: {
      fontFamily?: string;
      headingWeight?: string;
      bodyWeight?: string;
      textScale?: number;
      textAlign?: string;
    };
    spacing?: {
      spacingUnit?: string;
      radius?: string;
      shadowIntensity?: string;
    };
  };
}