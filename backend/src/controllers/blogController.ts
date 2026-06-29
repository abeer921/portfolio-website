import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getAllBlogs = async (req: Request, res: Response) => {
  const { category, tag, search, status } = req.query;

  try {
    const whereClause: any = {};

    // For clients, only show published posts. Admins can see all.
    if (status) {
      whereClause.status = String(status);
    } else {
      whereClause.status = 'PUBLISHED';
    }

    if (category) {
      whereClause.category = String(category);
    }

    if (tag) {
      whereClause.tags = { has: String(tag) };
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: String(search), mode: 'insensitive' } },
        { content: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where: whereClause,
      include: {
        _count: {
          select: { comments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(blogs);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error retrieving blogs', error: error.message });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Increment view count upon request
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        views: { increment: 1 },
      },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Get related posts (excluding current post, limit 3)
    const relatedBlogs = await prisma.blog.findMany({
      where: {
        category: blog.category,
        status: 'PUBLISHED',
        NOT: { id: blog.id },
      },
      take: 3,
    });

    return res.json({
      ...blog,
      relatedBlogs,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error retrieving blog details', error: error.message });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  const { title, content, category, tags, coverImage, status } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ message: 'Title, content, and category are required' });
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        category,
        tags: Array.isArray(tags) ? tags : [],
        coverImage,
        status: status || 'DRAFT',
      },
    });

    return res.status(201).json(blog);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error creating blog post', error: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    if (data.tags && typeof data.tags === 'string') {
      data.tags = JSON.parse(data.tags);
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data,
    });

    return res.json(updatedBlog);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error updating blog post', error: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.blog.delete({
      where: { id },
    });

    return res.json({ message: 'Blog post deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting blog post', error: error.message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { id: blogId } = req.params;
  const { authorName, authorEmail, content } = req.body;

  if (!authorName || !authorEmail || !content) {
    return res.status(400).json({ message: 'Author name, email, and content are required' });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        authorName,
        authorEmail,
        content,
        blogId,
      },
    });

    return res.status(201).json(comment);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;

  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return res.json({ message: 'Comment deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};
