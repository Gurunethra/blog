import type { Request, Response } from 'express';
import prisma from '../utils/prisma.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export const createBlog = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: req.userId!,
      },
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error getting blogs', error });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { author: { select: { name: true } } },
    });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error getting blog', error });
  }
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blog = await prisma.blog.update({
      where: { id, authorId: req.userId },
      data: { title, content },
    });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.blog.delete({
      where: { id, authorId: req.userId },
    });
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};
