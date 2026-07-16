export const cmsDefaults = {
  settings: {
    brandName: 'Abeer Nisar',
    tagline: 'UI/UX designer crafting meaningful digital experiences.',
    heroEyebrow: 'UI/UX DESIGNER • PRODUCT DESIGNER',
    heroTitle: 'Turning Ideas Into Beautiful &\nFunctional Products.',
    heroSubtitle: "I'm Abeer Nisar, a UI/UX Designer passionate about creating intuitive interfaces\nwhile exploring AI-powered products that combine creativity, technology, and\nmeaningful user experiences.",
    heroCtaLabel: 'View My Work',
    heroCtaHref: '/projects',
    heroSecondaryCtaLabel: 'Download Resume',
    resumeUrl: '/resume/abeer-nisar-resume.pdf',
    contactEmail: 'abeernisar11@gmail.com',
    contactPhone: '',
    contactLocation: 'Lahore, Pakistan',
    workingHours: 'Mon - Fri: 9 AM - 6 PM',
    footerGreeting: 'Hi',
    socialLinks: [
      { platform: 'x', url: 'https://x.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'behance', url: 'https://www.behance.net' },
      { platform: 'dribbble', url: 'https://dribbble.com' },
    ],
    navItems: [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: 'About', path: '/about' },
      { name: 'Blog', path: '/blogs' },
      { name: 'Contact', path: '/contact' },
    ],
    footerLinks: [
      { name: 'About', path: '/about' },
      { name: 'Projects', path: '/projects' },
      { name: 'Blogs', path: '/blogs' },
      { name: 'Contact', path: '/contact' },
    ],
  },
  content: {
    'home.about': {
      heading: 'About me',
      bio: "Hi, I'm Abeer — a UI/UX designer passionate about crafting meaningful and impactful digital experiences for ambitious brands and startups.",
      stats: [
        { value: '2+', label: 'Years of Experience' },
        { value: '4', label: 'Completed Projects' },
        { value: '5+', label: 'Clients Worldwide' },
      ],
      portraitImage: '/images/about/portrait.jpg',
      ctaLabel: 'My Story',
      ctaHref: '/about',
    },
    'home.services': {
      heading: 'What I can do for you',
      intro: 'As a digital designer, I am a visual storyteller, crafting experiences that connect deeply and spark creativity.',
      mainImage: '/images/services/main.jpg',
      badgeLeft: 'Design',
      badgeRight: 'Craft',
    },
    'home.featuredProjects': {
      title: 'Featured Projects',
      intro: 'Selected SaaS product design work — dashboards, workflows, and analytics platforms built to solve real user problems.',
      browseAllLabel: 'Browse All Projects',
    },
    'home.testimonials': {
      heading: 'What My Clients Say',
      intro: "Here's what my clients have shared about their experiences working with me.",
      statCard: {
        prefix: "I've worked with",
        suffix: 'happy clients',
        metrics: [
          { value: '100%', label: 'Satisfaction Rate' },
          { value: '2x', label: 'Faster Delivery' },
        ],
      },
    },
    'home.faq': {
      heading: 'Frequently Asked Questions',
      intro: "Common questions about my design process. Don't see yours? Feel free to reach out.",
      items: [],
    },
    'home.contactCta': {
      greeting: 'Hi',
      heading: "Let's work together",
      body: "Let's build something impactful together — whether it's your brand, your website, or your next big idea.",
      ctaLabel: 'Get in touch',
      ctaHref: '/contact',
      backgroundImage: '/images/contact/cta-background.jpg',
    },
  },
};

export type CmsBundle = {
  settings: Record<string, unknown>;
  content: Record<string, unknown>;
  projects: unknown[];
  testimonials: unknown[];
  services: unknown[];
  experiences: unknown[];
  certificates: unknown[];
  skills: unknown[];
  education: unknown[];
};
