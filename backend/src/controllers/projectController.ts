import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getAllProjects = async (req: Request, res: Response) => {
  const { category, featured, search } = req.query;

  try {
    const whereClause: any = {};

    if (category && category !== 'All') {
      whereClause.category = String(category);
    }

    if (featured) {
      whereClause.featured = featured === 'true';
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } },
        { techStack: { hasSome: [String(search)] } },
      ];
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: { position: 'asc' },
    });

    return res.json(projects);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error retrieving projects', error: error.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Fetch related projects (same category, excluding current project, limit 3)
    const relatedProjects = await prisma.project.findMany({
      where: {
        category: project.category,
        NOT: { id: project.id },
      },
      take: 3,
    });

    // Fetch next and previous projects for navigation
    const allProjects = await prisma.project.findMany({
      orderBy: { position: 'asc' },
      select: { id: true, title: true },
    });

    const currentIndex = allProjects.findIndex((p) => p.id === project.id);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    return res.json({
      ...project,
      relatedProjects,
      navigation: {
        prev: prevProject,
        next: nextProject,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error retrieving project details', error: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const {
    title,
    category,
    description,
    techStack,
    problem,
    solution,
    caseStudy,
    designProcess,
    images,
    videoUrl,
    liveDemo,
    github,
    figma,
    behance,
    duration,
    client,
    status,
    featured,
    position,
  } = req.body;

  if (!title || !category || !description) {
    return res.status(400).json({ message: 'Title, category, and description are required' });
  }

  try {
    const projectCount = await prisma.project.count();
    const finalPosition = position !== undefined ? Number(position) : projectCount;

    const newProject = await prisma.project.create({
      data: {
        title,
        category,
        description,
        techStack: Array.isArray(techStack) ? techStack : [],
        problem,
        solution,
        caseStudy,
        designProcess,
        images: Array.isArray(images) ? images : [],
        videoUrl,
        liveDemo,
        github,
        figma,
        behance,
        duration,
        client,
        status: status || 'Completed',
        featured: featured === true || featured === 'true',
        position: finalPosition,
      },
    });

    return res.status(201).json(newProject);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    // Sanitize array inputs if sent as strings
    if (data.techStack && typeof data.techStack === 'string') {
      data.techStack = JSON.parse(data.techStack);
    }
    if (data.images && typeof data.images === 'string') {
      data.images = JSON.parse(data.images);
    }

    if (data.featured !== undefined) {
      data.featured = data.featured === true || data.featured === 'true';
    }

    if (data.position !== undefined) {
      data.position = Number(data.position);
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data,
    });

    return res.json(updatedProject);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.project.delete({
      where: { id },
    });

    return res.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};
