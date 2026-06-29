import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

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
      heroTitle: 'Designing Interfaces that Feel Natural, Experiences that Matter.',
      heroSubtitle: 'UI/UX Designer & Content Developer crafting premium, pixel-perfect interfaces for web and mobile. Passionate about design systems, visual hierarchy, and intuitive user flows.',
      resumeUrl: 'https://raw.githubusercontent.com/abeernisar/resume/main/resume.pdf',
      contactEmail: 'abeernisar11@gmail.com',
      contactPhone: '+92 302 4115583',
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

  // 8. Seed Projects (Case studies from resume)
  await prisma.project.createMany({
    data: [
      {
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
    ]
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
