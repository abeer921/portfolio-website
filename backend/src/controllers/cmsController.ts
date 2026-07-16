import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { normalizeHeroSettings } from '../utils/heroContent';

const defaultSiteContent: Record<string, unknown> = {
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
    intro: 'These selected projects reflect my passion for blending strategy with creativity — solving real problems through thoughtful design and impactful storytelling.',
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
    items: [
      { question: 'What services do you offer?', answer: 'I offer UI/UX design, web and mobile interface design, prototyping in Figma, design systems, and branding support for digital products.' },
      { question: 'How does the design process work?', answer: 'We start with discovery and research, move into wireframes and user flows, then create high-fidelity prototypes with revisions before developer handoff.' },
      { question: 'How long does a project usually take?', answer: 'A landing page takes 1–2 weeks. A full application design with research and prototypes typically takes 4–6 weeks depending on scope.' },
      { question: 'What do I need to provide before starting?', answer: 'Share your goals, target audience, brand assets if available, and any reference sites or competitors you admire.' },
      { question: 'Do you offer revisions?', answer: 'Yes. Each project includes structured revision rounds at wireframe and high-fidelity stages to ensure alignment before final delivery.' },
      { question: 'How do I get started?', answer: 'Send a message through the contact form with your project details, timeline, and budget range. I will respond within 24–48 hours.' },
    ],
  },
  'home.contactCta': {
    greeting: 'Hi',
    heading: "Let's work together",
    body: "Let's build something impactful together — whether it's your brand, your website, or your next big idea.",
    ctaLabel: 'Get in touch',
    ctaHref: '/contact',
    backgroundImage: '/images/contact/cta-background.jpg',
  },
  'about.page': {
    heroImage: '/images/about/portrait.jpg',
    heading: 'About me',
    bio: [
      "Hi, I'm Abeer — a UI/UX designer passionate about crafting meaningful and impactful digital experiences for ambitious brands and startups.",
      'I combine research-led thinking with polished visual design to build interfaces that feel natural, premium, and conversion-focused.',
    ],
    stats: [
      { value: '2+', label: 'Years of Experience' },
      { value: '4', label: 'Completed Projects' },
      { value: '2+', label: 'Happy Clients' },
    ],
    experienceHeading: 'Experience',
    experienceIntro: 'A snapshot of the roles and projects that shaped my design practice.',
    educationHeading: 'Education',
    certificatesHeading: 'Certificates & Training',
    ctaLabel: "Let's work together",
  },
  'services.page': {
    eyebrow: 'Services',
    heading: 'What I can do for you',
    intro: 'From research and wireframes to polished UI systems, I help brands translate ideas into premium digital experiences.',
    pricingEyebrow: 'Pricing',
    pricingHeading: 'Flexible packages for every stage',
    pricingTiers: [
      { name: 'Starter', price: '$500+', description: 'Perfect for landing pages and small product screens.', features: ['1–2 screens', 'Wireframes + UI', '2 revision rounds'], cta: 'Get started', featured: false },
      { name: 'Growth', price: '$1,200+', description: 'For startups building a full product experience.', features: ['Up to 8 screens', 'User flows', 'Design system basics', 'Developer handoff'], cta: 'Book a call', featured: true },
      { name: 'Premium', price: 'Custom', description: 'End-to-end design partnership for ambitious brands.', features: ['Full product design', 'Research + testing', 'Ongoing support', 'Priority delivery'], cta: 'Contact me', featured: false },
    ],
    faqEyebrow: 'FAQ',
    faqHeading: 'Common questions',
    faqs: [
      { question: 'What is included in a UI/UX project?', answer: 'Typically wireframes, high-fidelity UI, interactive prototypes, and organized developer handoff assets.' },
      { question: 'Do you work with developers?', answer: 'Yes. I collaborate closely with engineering teams and provide specs, assets, and component documentation.' },
      { question: 'Can you redesign an existing product?', answer: 'Absolutely. I audit the current experience, identify friction points, and rebuild flows with a clearer visual system.' },
      { question: 'How do revisions work?', answer: 'Each milestone includes structured revision rounds so we align before moving to the next phase.' },
    ],
  },
  'contact.page': {
    greeting: 'Hi',
    heading: "Let's work together",
    intro: 'Tell me about your project, timeline, and goals. I typically respond within 24–48 hours.',
    formPlaceholder: 'Tell me about your project...',
    successHeading: 'Message sent',
    successBody: 'Thanks for reaching out. I will get back to you shortly.',
    successCta: 'Send another message',
  },
};

const defaultNavItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

const defaultFooterLinks = [
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

const defaultSocialLinks = [
  { platform: 'x', url: 'https://x.com' },
  { platform: 'instagram', url: 'https://instagram.com' },
  { platform: 'behance', url: 'https://www.behance.net' },
  { platform: 'dribbble', url: 'https://dribbble.com' },
];

async function ensureSiteContentDefaults() {
  for (const [key, content] of Object.entries(defaultSiteContent)) {
    await prisma.siteContent.upsert({
      where: { key },
      update: {},
      create: { key, content: content as object },
    });
  }
}

async function ensureSettingsDefaults() {
  let settings = await prisma.settings.findUnique({ where: { id: 'global' } });
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        id: 'global',
        navItems: defaultNavItems,
        footerLinks: defaultFooterLinks,
        socialLinks: defaultSocialLinks,
      },
    });
    return settings;
  }

  const updates: Record<string, unknown> = {};
  if (!settings.navItems || (Array.isArray(settings.navItems) && settings.navItems.length === 0)) {
    updates.navItems = defaultNavItems;
  }
  if (!settings.footerLinks || (Array.isArray(settings.footerLinks) && settings.footerLinks.length === 0)) {
    updates.footerLinks = defaultFooterLinks;
  }
  if (!settings.socialLinks || (Array.isArray(settings.socialLinks) && settings.socialLinks.length === 0)) {
    updates.socialLinks = defaultSocialLinks;
  }

  if (Object.keys(updates).length > 0) {
    settings = await prisma.settings.update({
      where: { id: 'global' },
      data: updates,
    });
  }

  return settings;
}

export const getCmsBundle = async (_req: Request, res: Response) => {
  try {
    await ensureSiteContentDefaults();
    const settings = await ensureSettingsDefaults();

    const [siteContent, projects, testimonials, services, experiences, certificates, skills, education] =
      await Promise.all([
        prisma.siteContent.findMany(),
        prisma.project.findMany({ orderBy: { position: 'asc' } }),
        prisma.testimonial.findMany({ orderBy: { position: 'asc' } }),
        prisma.service.findMany({ orderBy: { position: 'asc' } }),
        prisma.experience.findMany({ orderBy: { startDate: 'desc' } }),
        prisma.certificate.findMany({ orderBy: { issueDate: 'desc' } }),
        prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { position: 'asc' }] }),
        prisma.education.findMany({ orderBy: { position: 'asc' } }),
      ]);

    const content = siteContent.reduce<Record<string, unknown>>((acc, item) => {
      acc[item.key] = item.content;
      return acc;
    }, {});

    return res.json({
      settings: normalizeHeroSettings(settings as Record<string, unknown>),
      content,
      projects,
      testimonials,
      services,
      experiences,
      certificates,
      skills,
      education,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching CMS bundle', error: error.message });
  }
};

export const getAllSiteContent = async (_req: Request, res: Response) => {
  try {
    await ensureSiteContentDefaults();
    const items = await prisma.siteContent.findMany({ orderBy: { key: 'asc' } });
    return res.json(items);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching site content', error: error.message });
  }
};

export const upsertSiteContent = async (req: Request, res: Response) => {
  const { key, content } = req.body;
  if (!key || content === undefined) {
    return res.status(400).json({ message: 'Key and content are required' });
  }

  try {
    const item = await prisma.siteContent.upsert({
      where: { key },
      update: { content },
      create: { key, content },
    });
    return res.json(item);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error saving site content', error: error.message });
  }
};

export const deleteSiteContent = async (req: Request, res: Response) => {
  const { key } = req.params;
  try {
    await prisma.siteContent.delete({ where: { key } });
    return res.json({ message: 'Site content deleted' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting site content', error: error.message });
  }
};

export const reorderItems = async (req: Request, res: Response) => {
  const { type, items } = req.body as { type: string; items: { id: string; position: number }[] };
  if (!type || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Type and items array are required' });
  }

  const modelMap: Record<string, any> = {
    projects: prisma.project,
    services: prisma.service,
    testimonials: prisma.testimonial,
    skills: prisma.skill,
    education: prisma.education,
  };

  const model = modelMap[type];
  if (!model) {
    return res.status(400).json({ message: 'Invalid reorder type' });
  }

  try {
    await prisma.$transaction(
      items.map((item) =>
        model.update({
          where: { id: item.id },
          data: { position: item.position },
        })
      )
    );
    return res.json({ message: 'Order updated successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error reordering items', error: error.message });
  }
};

// Education CRUD
export const getAllEducation = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.education.findMany({ orderBy: { position: 'asc' } });
    return res.json(items);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching education', error: error.message });
  }
};

export const createEducation = async (req: Request, res: Response) => {
  const { degree, school, duration, position } = req.body;
  if (!degree || !school || !duration) {
    return res.status(400).json({ message: 'Degree, school, and duration are required' });
  }
  try {
    const item = await prisma.education.create({
      data: { degree, school, duration, position: position ?? 0 },
    });
    return res.status(201).json(item);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error creating education', error: error.message });
  }
};

export const updateEducation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await prisma.education.update({ where: { id }, data: req.body });
    return res.json(item);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error updating education', error: error.message });
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.education.delete({ where: { id } });
    return res.json({ message: 'Education deleted' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting education', error: error.message });
  }
};

// Media library
export const getAllMedia = async (_req: Request, res: Response) => {
  try {
    const media = await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json(media);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching media', error: error.message });
  }
};

export const createMedia = async (req: Request, res: Response) => {
  const { filename, url, mimeType, size, alt } = req.body;
  if (!filename || !url || !mimeType || size === undefined) {
    return res.status(400).json({ message: 'filename, url, mimeType, and size are required' });
  }
  try {
    const media = await prisma.mediaAsset.create({
      data: { filename, url, mimeType, size: Number(size), alt },
    });
    return res.status(201).json(media);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error saving media', error: error.message });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.mediaAsset.delete({ where: { id } });
    return res.json({ message: 'Media deleted' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting media', error: error.message });
  }
};
