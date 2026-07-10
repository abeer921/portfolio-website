export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Fallback Resume Data for Abeer Nisar if Backend API is down/unreachable
export const fallbackData = {
  settings: {
    heroTitle: 'Turning Ideas Into Beautiful &\nFunctional Products.',
    heroSubtitle: "I'm Abeer Nisar, a UI/UX Designer passionate about creating intuitive interfaces\nwhile exploring AI-powered products that combine creativity, technology, and\nmeaningful user experiences.",
    heroEyebrow: 'UI/UX DESIGNER • PRODUCT DESIGNER',
    heroCtaLabel: 'View My Work',
    heroCtaHref: '/projects',
    heroSecondaryCtaLabel: 'Download Resume',
    resumeUrl: '/uploads/Abeer%20nisar%20resume.pdf',
    contactEmail: 'abeernisar11@gmail.com',
    contactPhone: '+92 302 4115583',
    contactLocation: 'Lahore, Pakistan',
    workingHours: 'Mon - Fri: 9 AM - 6 PM PST',
    primaryColor: '#c5a880',
    secondaryColor: '#0a0a0a',
    metaTitle: 'Abeer Nisar | Senior UI/UX Designer Portfolio',
    metaDescription: 'Portfolio of Abeer Nisar, a creative UI/UX designer specializing in Figma, wireframing, high-fidelity prototypes, and user research.',
    metaKeywords: ['UI UX Designer', 'Figma Designer', 'Portfolio', 'Abeer Nisar', 'Product Design', 'Lahore'],
  },
  skills: [
    { id: '1', name: 'Figma', category: 'UI UX', level: 95 },
    { id: '2', name: 'Wireframing', category: 'UI UX', level: 90 },
    { id: '3', name: 'Prototyping', category: 'UI UX', level: 92 },
    { id: '4', name: 'User Flow Mapping', category: 'UI UX', level: 88 },
    { id: '5', name: 'Usability Testing', category: 'UI UX', level: 85 },
    { id: '6', name: 'Information Architecture', category: 'UI UX', level: 87 },
    { id: '7', name: 'Visual Hierarchy', category: 'UI UX', level: 90 },
    { id: '8', name: 'Adobe Photoshop', category: 'Tools', level: 80 },
    { id: '9', name: 'Adobe Illustrator', category: 'Tools', level: 85 },
    { id: '10', name: 'Canva', category: 'Tools', level: 90 },
    { id: '11', name: 'HTML5 / CSS3', category: 'Frontend', level: 90 },
    { id: '12', name: 'JavaScript (ES6+)', category: 'Frontend', level: 85 },
    { id: '13', name: 'Tailwind CSS', category: 'Frontend', level: 88 },
    { id: '14', name: 'React.js', category: 'Frontend', level: 80 },
    { id: '15', name: 'Node.js / Express', category: 'Backend', level: 75 },
    { id: '16', name: 'Critical Thinking', category: 'Soft Skills', level: 90 },
    { id: '17', name: 'Attention to Detail', category: 'Soft Skills', level: 95 },
    { id: '18', name: 'English', category: 'Languages', level: 85 },
    { id: '19', name: 'Urdu', category: 'Languages', level: 100 }
  ],
  experiences: [
    {
      id: 'e1',
      company: 'Techesthete',
      role: 'UI/UX Designer',
      location: 'Lahore, Pakistan',
      startDate: 'Jan 2026',
      endDate: 'Present',
      current: true,
      responsibilities: [
        'Design user interfaces and interactive prototypes using Figma for web and mobile applications.',
        'Conduct usability testing and iterate on designs based on user feedback and data insights.',
        'Collaborate with cross-functional teams to deliver pixel-perfect, responsive UI components.',
        'Apply design system principles to maintain visual consistency across all product interfaces.',
        'Produce wireframes, user flow diagrams, and high-fidelity mockups for client presentations.'
      ],
      achievements: [
        'Standardized design system guidelines, speeding up project design-to-development handoffs by 25%.',
        'Successfully designed and presented high-fidelity mockups for 5+ client product pitches.'
      ]
    },
    {
      id: 'e2',
      company: 'EAS Accounting Software',
      role: 'Video Editor & Content Designer',
      location: 'Lahore, Pakistan',
      startDate: 'Sep 2025',
      endDate: 'Jan 2026',
      current: false,
      responsibilities: [
        'Edited promotional and tutorial video content for software product marketing campaigns.',
        'Designed visual assets, thumbnails, and motion graphics to support digital marketing efforts.',
        'Coordinated with the product team to ensure brand consistency across all creative materials.'
      ],
      achievements: [
        'Produced 15+ tutorial videos which helped reduce customer onboarding friction by 20%.',
        'Redesigned digital marketing banner templates, boosting ad CTRs by 12%.'
      ]
    }
  ],
  projects: [
    {
      id: 'p1',
      title: 'EAS Tailor Management System Dashboard',
      category: 'UI/UX Design',
      description: 'A comprehensive, modern UI/UX dashboard designed for a premium groom shop management system, optimizing workflow, inventory, and client tracking for staff operations.',
      techStack: ['Figma', 'UX Research', 'Information Architecture', 'Design System'],
      problem: 'Shop managers were overwhelmed with physical spreadsheets and manual records. Client orders, measurements, fabric choices, and tailor assignments were frequently mismatched, leading to late orders and poor customer satisfaction.',
      solution: 'Designed a highly clean, dark-mode dashboard focused on staff productivity. Key features include quick measurement entry forms, interactive order statuses, real-time tailor scheduling, and automated low-fabric inventory alerts.',
      caseStudy: 'EAS Tailor Management System was built after speaking directly with tailoring staff in Lahore. I drafted user journey maps and wireframes focusing on high-frequency actions: measuring a client and checking tailor status. In the design system, I selected dark, rich slate tones to align with a luxury tailoring brand while maximizing visibility.',
      designProcess: '1. Research: Interviews with tailor managers. 2. Wireframing: High-contrast layouts for client profile sheets. 3. Visual Identity: Sleek minimalist dark aesthetics with subtle copper highlights. 4. Prototyping: Fully functional micro-interactions for adding client measurements.',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
      ],
      liveDemo: '#',
      figma: 'https://figma.com/file/sample-eas-tailor',
      client: 'EAS Accounting Software',
      duration: '2 Months',
      status: 'Completed',
      featured: true,
      position: 1
    },
    {
      id: 'p2',
      title: 'E-Learning Platform System UI',
      category: 'UI/UX Design',
      description: 'Final Year Project. UI design and system structure for a comprehensive online education portal, featuring student dashboards, course progressions, and admin grading modules.',
      techStack: ['Figma', 'UX Research', 'Wireframing', 'Interactive Prototyping'],
      problem: 'Traditional learning systems are cluttered and confusing for students. Key navigation panels are hidden, leading to low completion rates and course dropouts.',
      solution: 'Created a distraction-free, minimalist study interface. Added persistent side navigation, modular progress indicators, and visual achievement badges that increase student engagement.',
      caseStudy: 'For my final year project, I analyzed popular portals. We designed separate user flows for Students, Instructors, and Administrators. By applying strict visual hierarchy, students can resume a video lesson in a single click from the home screen.',
      designProcess: '1. Competitor Analysis: Studied Coursera and Udemy. 2. User Flows: Built maps for course registration and quiz completion. 3. UI Kits: Reusable cards for courses, notifications, and analytics. 4. Prototyping: Interactive video player panel.',
      images: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80'
      ],
      liveDemo: '#',
      github: 'https://github.com/abeernisar/learning-platform',
      client: 'University of Education',
      duration: '4 Months',
      status: 'Completed',
      featured: true,
      position: 2
    },
    {
      id: 'p3',
      title: 'Gift Shop E-Commerce Website',
      category: 'Web Design',
      description: 'An elegant, clean e-commerce experience designed with warm visual tones, fluid navigation, and a modern checkout process.',
      techStack: ['Figma', 'Visual Hierarchy', 'Responsive Layouts', 'E-commerce UI'],
      problem: 'Local gift shop websites are visually overwhelming, making it hard to find curated gifts or select appropriate packaging option combinations.',
      solution: 'Developed a serene layout with generous whitespace, intuitive filters by recipient/occasion, and an interactive "build a gift box" flow.',
      images: [
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'
      ],
      liveDemo: '#',
      figma: 'https://figma.com/file/giftshop',
      duration: '1 Month',
      status: 'Completed',
      featured: false,
      position: 3
    },
    {
      id: 'p4',
      title: 'Social Media Mobile App Concept',
      category: 'Mobile Design',
      description: 'A mobile user interface focused on content-driven feed layouts, user profiles, and clean typography alignment.',
      techStack: ['Figma', 'Mobile UI Guidelines', 'Interactive Components'],
      problem: 'Mobile feeds are often cluttered with advertisements and complex UI borders, hindering post readability.',
      solution: 'Designed borderless content blocks and context-aware action items that slide out, creating a highly minimalist reading environment.',
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
      ],
      liveDemo: '#',
      figma: 'https://figma.com/file/socialapp',
      duration: '3 Weeks',
      status: 'Completed',
      featured: false,
      position: 4
    }
  ],
  blogs: [
    {
      id: 'b1',
      title: 'The Art of Minimalist UI/UX: Less is More',
      category: 'UI/UX Design',
      tags: ['Design System', 'Minimalism', 'Figma', 'UI Trends'],
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      views: 120,
      createdAt: '2026-06-25T12:00:00.000Z',
      content: 'Minimalism in UI design is not just about reducing elements, it is about magnifying user focus. When we strip away borders, heavy drop shadows, and unnecessary decorations, the core content and primary actions naturally stand out. As designers, we must learn to trust empty space (whitespace). Generous padding and consistent grids make layouts feel premium and luxurious, similar to the packaging of an Apple iPhone. In Figma, we can practice this by utilizing auto-layouts with fixed step paddings (8px, 16px, 24px) and maintaining a strict text hierarchy with Outfit or Inter typeface families.',
      comments: [
        { id: 'c1', authorName: 'Sarah Jenkins', content: 'This is an excellent write-up! Whitespace is indeed one of the most underrated tools in design.', createdAt: '2026-06-26T14:30:00.000Z' },
        { id: 'c2', authorName: 'Alex Mercer', content: 'The tips on Figma auto-layouts were super helpful.', createdAt: '2026-06-27T09:15:00.000Z' }
      ]
    },
    {
      id: 'b2',
      title: 'Building a Design Handoff System Developers Love',
      category: 'Design Systems',
      tags: ['Figma', 'Productivity', 'Handoff', 'UX Guidelines'],
      coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      views: 95,
      createdAt: '2026-06-20T10:00:00.000Z',
      content: 'One of the largest friction points in product development is the handoff from designers to developers. An organized Figma file makes a massive difference. By using local variable libraries for tokens, documenting responsive layouts for mobile/tablet/desktop, and labeling component states (hover, active, disabled), developers can inspect elements and build them exactly as designed.',
      comments: []
    }
  ],
  services: [
    {
      id: 's1',
      title: 'UI/UX Design',
      description: 'Creating stunning and intuitive interfaces for web and mobile applications with user flows, wireframes, and prototypes in Figma.',
      icon: 'Figma',
      price: '$500+',
      faqs: [
        { question: 'What deliverables do you provide?', answer: 'I provide clickable Figma prototypes, style guides, layout grids, design system components, and organized developer handoff assets.' },
        { question: 'Do you conduct user testing?', answer: 'Yes, I run cognitive walkthroughs and usability tests to validate and optimize user flows before final delivery.' }
      ]
    },
    {
      id: 's2',
      title: 'Web & Landing Page Design',
      description: 'High-conversion, beautiful, responsiveness-driven landing page designs with modern layouts, luxury gradients, and clear call-to-actions.',
      icon: 'Globe',
      price: '$400+',
      faqs: [
        { question: 'How long does a landing page take?', answer: 'Typically, it takes about 1-2 weeks depending on complexity, research, and revisions.' }
      ]
    },
    {
      id: 's3',
      title: 'Mobile App Design',
      description: 'iOS & Android mobile layouts adhering to Human Interface Guidelines and Material Design specifications for a smooth interactive experience.',
      icon: 'Smartphone',
      price: '$800+',
      faqs: [
        { question: 'Will you adapt designs for both iOS and Android?', answer: 'Yes, I design responsive structures and detail platforms specific adjustments where needed.' }
      ]
    },
    {
      id: 's4',
      title: 'Branding & Design Systems',
      description: 'Creating comprehensive design systems containing customizable UI kits, consistent typography tokens, cohesive color schemes, and logomarks.',
      icon: 'Layers',
      price: '$600+',
      faqs: [
        { question: 'Why do I need a design system?', answer: 'It speeds up development, ensures visual consistency across multiple pages, and helps align branding elements.' }
      ]
    }
  ],
  testimonials: [
    {
      id: 't1',
      clientName: 'Waseem Khan',
      clientRole: 'CEO',
      company: 'Techesthete',
      review: 'Abeer has an incredible eye for details. Her wireframes and Figma designs solved several customer onboarding problems on our latest dashboards.',
      rating: 5,
      clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 't2',
      clientName: 'Sardar Azam',
      clientRole: 'Product Director',
      company: 'EAS Tailor Systems',
      review: 'Working with Abeer was smooth. She structured our user flows perfectly, and the interactive mockup she built in Figma was a hit at our client presentation.',
      rating: 5,
      clientPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    }
  ],
  certificates: [
    {
      id: 'c1',
      title: 'SEO & Graphic Design – Professional Course',
      issuer: 'PITB / Tech Academy',
      issueDate: '2024',
      image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=500&q=80',
      credentialUrl: '#'
    },
    {
      id: 'c2',
      title: 'MERN Stack with AI – Workshop',
      issuer: 'University of Education',
      issueDate: '2025',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80',
      credentialUrl: '#'
    },
    {
      id: 'c3',
      title: 'Full Stack Software Development – Workshop',
      issuer: 'National IT Board',
      issueDate: '2025',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80',
      credentialUrl: '#'
    },
    {
      id: 'c4',
      title: 'Full Stack Blockchain Technology – Workshop',
      issuer: 'BlockLabs Academy',
      issueDate: '2024',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=500&q=80',
      credentialUrl: '#'
    }
  ]
};

// Generic safe fetch handler with fallback support
async function safeFetch<T>(endpoint: string, fallback: T, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 60 }, // ISR support
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn(`API call failed for ${endpoint}. Using seeded fallback data.`, error);
    return fallback;
  }
}

export const apiService = {
  // Public Client Services
  getSettings: () => safeFetch('/settings', fallbackData.settings),
  getSkills: () => safeFetch('/skills', fallbackData.skills),
  getExperiences: () => safeFetch('/experiences', fallbackData.experiences),
  getCertificates: () => safeFetch('/certificates', fallbackData.certificates),
  getServices: () => safeFetch('/services', fallbackData.services),
  getTestimonials: () => safeFetch('/testimonials', fallbackData.testimonials),
  
  getProjects: (filters?: { category?: string; featured?: boolean }) => {
    let query = '';
    const params = [];
    if (filters?.category) params.push(`category=${filters.category}`);
    if (filters?.featured !== undefined) params.push(`featured=${filters.featured}`);
    if (params.length) query = `?${params.join('&')}`;
    
    return safeFetch('/projects' + query, fallbackData.projects);
  },

  getProject: async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      const project = fallbackData.projects.find((p) => p.id === id) || fallbackData.projects[0];
      const related = fallbackData.projects.filter((p) => p.category === project.category && p.id !== project.id);
      return {
        ...project,
        relatedProjects: related,
        navigation: { prev: null, next: null }
      };
    }
  },

  getBlogs: () => safeFetch('/blogs', fallbackData.blogs),
  
  getBlog: async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      const blog = fallbackData.blogs.find((b) => b.id === id) || fallbackData.blogs[0];
      const related = fallbackData.blogs.filter((b) => b.category === blog.category && b.id !== blog.id);
      return {
        ...blog,
        relatedBlogs: related
      };
    }
  },

  submitContactMessage: async (data: { name: string; email: string; subject?: string; message: string }) => {
    const res = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject?.trim(),
        message: data.message.trim(),
      }),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(payload.message || 'Failed to submit message');
    }

    return payload;
  },

  submitBlogComment: async (blogId: string, data: { authorName: string; authorEmail: string; content: string }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${blogId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      console.warn('API comment submit failed. Simulating local success.', error);
      return { id: `c-${Date.now()}`, ...data, createdAt: new Date().toISOString() };
    }
  }
};
