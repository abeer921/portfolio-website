import { Request, Response } from 'express';
import { prisma } from '../config/db';

// ==========================================
// SKILLS
// ==========================================
export const getAllSkills = async (req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { level: 'desc' }],
    });
    return res.json(skills);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  const { name, category, level } = req.body;
  if (!name || !category || level === undefined) {
    return res.status(400).json({ message: 'Name, category, and level are required' });
  }
  try {
    const skill = await prisma.skill.create({
      data: { name, category, level: Number(level) },
    });
    return res.status(201).json(skill);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error creating skill', error: error.message });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, level } = req.body;
  try {
    const data: any = {};
    if (name) data.name = name;
    if (category) data.category = category;
    if (level !== undefined) data.level = Number(level);

    const updated = await prisma.skill.update({
      where: { id },
      data,
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error updating skill', error: error.message });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.skill.delete({ where: { id } });
    return res.json({ message: 'Skill deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting skill', error: error.message });
  }
};

// ==========================================
// EXPERIENCE
// ==========================================
export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: 'desc' },
    });
    return res.json(experiences);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching experiences', error: error.message });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  const { company, role, location, startDate, endDate, responsibilities, achievements, current } = req.body;
  if (!company || !role || !startDate) {
    return res.status(400).json({ message: 'Company, role, and startDate are required' });
  }
  try {
    const experience = await prisma.experience.create({
      data: {
        company,
        role,
        location,
        startDate,
        endDate,
        responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
        achievements: Array.isArray(achievements) ? achievements : [],
        current: current === true || current === 'true',
      },
    });
    return res.status(201).json(experience);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error creating experience', error: error.message });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (data.responsibilities && typeof data.responsibilities === 'string') {
      data.responsibilities = JSON.parse(data.responsibilities);
    }
    if (data.achievements && typeof data.achievements === 'string') {
      data.achievements = JSON.parse(data.achievements);
    }
    if (data.current !== undefined) {
      data.current = data.current === true || data.current === 'true';
    }

    const updated = await prisma.experience.update({
      where: { id },
      data,
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error updating experience', error: error.message });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.experience.delete({ where: { id } });
    return res.json({ message: 'Experience deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting experience', error: error.message });
  }
};

// ==========================================
// CERTIFICATES
// ==========================================
export const getAllCertificates = async (req: Request, res: Response) => {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { issueDate: 'desc' },
    });
    return res.json(certificates);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching certificates', error: error.message });
  }
};

export const createCertificate = async (req: Request, res: Response) => {
  const { title, issuer, issueDate, credentialUrl, image } = req.body;
  if (!title || !issuer || !issueDate) {
    return res.status(400).json({ message: 'Title, issuer, and issueDate are required' });
  }
  try {
    const certificate = await prisma.certificate.create({
      data: { title, issuer, issueDate, credentialUrl, image },
    });
    return res.status(201).json(certificate);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error creating certificate', error: error.message });
  }
};

export const updateCertificate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updated = await prisma.certificate.update({
      where: { id },
      data,
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error updating certificate', error: error.message });
  }
};

export const deleteCertificate = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.certificate.delete({ where: { id } });
    return res.json({ message: 'Certificate deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting certificate', error: error.message });
  }
};

// ==========================================
// TESTIMONIALS
// ==========================================
export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(testimonials);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  const { clientName, clientPhoto, clientRole, company, review, rating } = req.body;
  if (!clientName || !review) {
    return res.status(400).json({ message: 'Client name and review are required' });
  }
  try {
    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        clientPhoto,
        clientRole,
        company,
        review,
        rating: rating !== undefined ? Number(rating) : 5,
      },
    });
    return res.status(201).json(testimonial);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error creating testimonial', error: error.message });
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (data.rating !== undefined) data.rating = Number(data.rating);
    const updated = await prisma.testimonial.update({
      where: { id },
      data,
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error updating testimonial', error: error.message });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.testimonial.delete({ where: { id } });
    return res.json({ message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting testimonial', error: error.message });
  }
};

// ==========================================
// SERVICES
// ==========================================
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return res.json(services);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

export const createService = async (req: Request, res: Response) => {
  const { title, description, icon, price, faqs } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }
  try {
    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon,
        price,
        faqs: faqs ? (typeof faqs === 'string' ? JSON.parse(faqs) : faqs) : [],
      },
    });
    return res.status(201).json(service);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (data.faqs && typeof data.faqs === 'string') {
      data.faqs = JSON.parse(data.faqs);
    }
    const updated = await prisma.service.update({
      where: { id },
      data,
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.service.delete({ where: { id } });
    return res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};

// ==========================================
// MESSAGES
// ==========================================
export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(messages);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }
  try {
    const msg = await prisma.message.create({
      data: { name, email, subject, message },
    });
    return res.status(201).json({ message: 'Message sent successfully', data: msg });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error submitting message', error: error.message });
  }
};

export const markMessageAsRead = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await prisma.message.update({
      where: { id },
      data: { isRead: true },
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error marking message as read', error: error.message });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.message.delete({ where: { id } });
    return res.json({ message: 'Message deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};

// ==========================================
// SETTINGS
// ==========================================
export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: 'global' },
    });

    // Fallback if not seeded
    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: 'global' },
      });
    }

    return res.json(settings);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching settings', error: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    if (data.metaKeywords && typeof data.metaKeywords === 'string') {
      data.metaKeywords = JSON.parse(data.metaKeywords);
    }
    const updated = await prisma.settings.update({
      where: { id: 'global' },
      data,
    });
    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error updating settings', error: error.message });
  }
};
