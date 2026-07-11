import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { SAAS_PROJECTS } from './saasProjects';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing records to prevent duplicates on rerun
  await prisma.comment.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.service.deleteMany();
  await prisma.message.deleteMany();
  await prisma.settings.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Default Admin User
  const hashedPassword = await bcrypt.hash('Abeer@UX2026', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'abeernisar11@gmail.com',
      password: hashedPassword,
      name: 'Abeer Nisar',
      bio: 'Creative and detail-oriented UI/UX Designer with a Bachelor\'s degree in Information Technology and 6+ months of professional experience. Proficient in Figma, wireframing, prototyping, and user-centered design principles. Passionate about crafting visually compelling, accessible, and responsive experiences.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      githubUrl: 'https://github.com/abeernisar',
      linkedinUrl: 'https://linkedin.com/in/abeer-nisar-a81928323',
    },
  });
  console.log('Admin user seeded:', admin.email);

  // 3. Create Settings
  const settings = await prisma.settings.create({
    data: {
      id: 'global',
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
      workingHours: 'Mon - Fri: 9 AM - 6 PM PST',
      metaTitle: 'Abeer Nisar | Senior UI/UX Designer Portfolio',
      metaDescription: 'Portfolio of Abeer Nisar, a creative UI/UX designer specializing in Figma, wireframing, high-fidelity prototypes, and user research.',
      metaKeywords: ['UI UX Designer', 'Figma Designer', 'Portfolio', 'Abeer Nisar', 'Product Design', 'Lahore'],
      ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      primaryColor: '#c5a880', // Champagne Gold
      secondaryColor: '#0a0a0a', // Rich Black
      themeMode: 'dark',
    },
  });
  console.log('Global settings seeded');

  // 4. Seed Experiences
  await prisma.experience.createMany({
    data: [
      {
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
    ]
  });
  console.log('Experiences seeded');

  // 5. Seed Skills
  await prisma.skill.createMany({
    data: [
      // UI UX Category
      { name: 'Figma', category: 'UI UX', level: 95 },
      { name: 'Wireframing', category: 'UI UX', level: 90 },
      { name: 'Prototyping', category: 'UI UX', level: 92 },
      { name: 'User Flow Mapping', category: 'UI UX', level: 88 },
      { name: 'Usability Testing', category: 'UI UX', level: 85 },
      { name: 'Information Architecture', category: 'UI UX', level: 87 },
      { name: 'Visual Hierarchy', category: 'UI UX', level: 90 },
      // Design Tools
      { name: 'Adobe Photoshop', category: 'Tools', level: 80 },
      { name: 'Adobe Illustrator', category: 'Tools', level: 85 },
      { name: 'Canva', category: 'Tools', level: 90 },
      { name: 'CapCut', category: 'Tools', level: 85 },
      { name: 'Visual Studio Code', category: 'Tools', level: 88 },
      // Frontend
      { name: 'HTML5 / CSS3', category: 'Frontend', level: 90 },
      { name: 'JavaScript (ES6+)', category: 'Frontend', level: 85 },
      { name: 'Tailwind CSS', category: 'Frontend', level: 88 },
      { name: 'React.js', category: 'Frontend', level: 80 },
      { name: 'Bootstrap', category: 'Frontend', level: 85 },
      // Backend
      { name: 'Node.js / Express', category: 'Backend', level: 75 },
      { name: 'PHP', category: 'Backend', level: 60 },
      { name: 'Python', category: 'Backend', level: 65 },
      { name: 'PostgreSQL', category: 'Backend', level: 70 },
      // Soft Skills
      { name: 'Critical Thinking', category: 'Soft Skills', level: 90 },
      { name: 'Problem Solving', category: 'Soft Skills', level: 88 },
      { name: 'Team Collaboration', category: 'Soft Skills', level: 92 },
      { name: 'Attention to Detail', category: 'Soft Skills', level: 95 },
      // Languages
      { name: 'English', category: 'Languages', level: 85 },
      { name: 'Urdu', category: 'Languages', level: 100 }
    ]
  });
  console.log('Skills seeded');

  // 6. Seed Certificates
  await prisma.certificate.createMany({
    data: [
      {
        title: 'SEO & Graphic Design – Professional Course',
        issuer: 'PITB / Tech Academy',
        issueDate: '2024',
        image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=500&q=80',
        credentialUrl: '#'
      },
      {
        title: 'MERN Stack with AI – Workshop',
        issuer: 'University of Education',
        issueDate: '2025',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80',
        credentialUrl: '#'
      },
      {
        title: 'Full Stack Software Development – Workshop',
        issuer: 'National IT Board',
        issueDate: '2025',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80',
        credentialUrl: '#'
      },
      {
        title: 'Full Stack Blockchain Technology – Workshop',
        issuer: 'BlockLabs Academy',
        issueDate: '2024',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=500&q=80',
        credentialUrl: '#'
      }
    ]
  });
  console.log('Certificates seeded');

  // 7. Seed Services
  await prisma.service.createMany({
    data: [
      {
        title: 'UI/UX Design',
        description: 'Creating stunning and intuitive interfaces for web and mobile applications with user flows, wireframes, and prototypes in Figma.',
        icon: 'Figma',
        price: '$500+',
        faqs: JSON.stringify([
          { question: 'What deliverables do you provide?', answer: 'I provide clickable Figma prototypes, style guides, layout grids, design system components, and organized developer handoff assets.' },
          { question: 'Do you conduct user testing?', answer: 'Yes, I run cognitive walkthroughs and usability tests to validate and optimize user flows before final delivery.' }
        ])
      },
      {
        title: 'Web & Landing Page Design',
        description: 'High-conversion, beautiful, responsiveness-driven landing page designs with modern layouts, luxury gradients, and clear call-to-actions.',
        icon: 'Globe',
        price: '$400+',
        faqs: JSON.stringify([
          { question: 'How long does a landing page take?', answer: 'Typically, it takes about 1-2 weeks depending on complexity, research, and revisions.' }
        ])
      },
      {
        title: 'Mobile App Design',
        description: 'iOS & Android mobile layouts adhering to Human Interface Guidelines and Material Design specifications for a smooth interactive experience.',
        icon: 'Smartphone',
        price: '$800+',
        faqs: JSON.stringify([
          { question: 'Will you adapt designs for both iOS and Android?', answer: 'Yes, I design responsive structures and detail platforms specific adjustments where needed.' }
        ])
      },
      {
        title: 'Branding & Design Systems',
        description: 'Creating comprehensive design systems containing customizable UI kits, consistent typography tokens, cohesive color schemes, and logomarks.',
        icon: 'Layers',
        price: '$600+',
        faqs: JSON.stringify([
          { question: 'Why do I need a design system?', answer: 'It speeds up development, ensures visual consistency across multiple pages, and helps align branding elements.' }
        ])
      }
    ]
  });
  console.log('Services seeded');

  // 8. Seed Projects (SaaS portfolio)
  await prisma.project.createMany({
    data: SAAS_PROJECTS,
  });
  console.log('Projects seeded');

  // 9. Seed Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'Waseem Khan',
        clientRole: 'CEO',
        company: 'Techesthete',
        review: 'Abeer has an incredible eye for details. Her wireframes and Figma designs solved several customer onboarding problems on our latest dashboards.',
        rating: 5,
        clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
      },
      {
        clientName: 'Sardar Azam',
        clientRole: 'Product Director',
        company: 'EAS Tailor Systems',
        review: 'Working with Abeer was smooth. She structured our user flows perfectly, and the interactive mockup she built in Figma was a hit at our client presentation.',
        rating: 5,
        clientPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
      }
    ]
  });
  console.log('Testimonials seeded');

  // 10. Seed Blogs
  const blog1 = await prisma.blog.create({
    data: {
      title: 'The Art of Minimalist UI/UX: Less is More',
      category: 'UI/UX Design',
      tags: ['Design System', 'Minimalism', 'Figma', 'UI Trends'],
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      status: 'PUBLISHED',
      views: 120,
      content: 'Minimalism in UI design is not just about reducing elements, it is about magnifying user focus. When we strip away borders, heavy drop shadows, and unnecessary decorations, the core content and primary actions naturally stand out. As designers, we must learn to trust empty space (whitespace). Generous padding and consistent grids make layouts feel premium and luxurious, similar to the packaging of an Apple iPhone. In Figma, we can practice this by utilizing auto-layouts with fixed step paddings (8px, 16px, 24px) and maintaining a strict text hierarchy with Outfit or Inter typeface families.',
    }
  });

  const blog2 = await prisma.blog.create({
    data: {
      title: 'Building a Design Handoff System Developers Love',
      category: 'Design Systems',
      tags: ['Figma', 'Productivity', 'Handoff', 'UX Guidelines'],
      coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      status: 'PUBLISHED',
      views: 95,
      content: 'One of the largest friction points in product development is the handoff from designers to developers. An organized Figma file makes a massive difference. By using local variable libraries for tokens, documenting responsive layouts for mobile/tablet/desktop, and labeling component states (hover, active, disabled), developers can inspect elements and build them exactly as designed. In this article, we outline a step-by-step framework to format Figma files, build component kits, and write design specs that ensure pixel-perfect conversion.',
    }
  });

  // Seed Comments
  await prisma.comment.createMany({
    data: [
      {
        authorName: 'Sarah Jenkins',
        authorEmail: 'sarah@example.com',
        content: 'This is an excellent write-up! Whitespace is indeed one of the most underrated tools in design.',
        blogId: blog1.id
      },
      {
        authorName: 'Alex Mercer',
        authorEmail: 'alex@example.com',
        content: 'The tips on Figma auto-layouts were super helpful. Looking forward to your next post.',
        blogId: blog1.id
      }
    ]
  });
  console.log('Blogs and comments seeded');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
