import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../config/db';
import { AuthenticatedRequest } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'premium_portfolio_jwt_secret_key_2026';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Remove password before sending user object
    const { password: _, ...userWithoutPassword } = user;

    return res.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error retrieving profile', error: error.message });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  const { name, bio, avatar, githubUrl, linkedinUrl, password, email } = req.body;

  try {
    const updateData: any = {};
    if (name) updateData.name = name;
    if (bio) updateData.bio = bio;
    if (avatar) updateData.avatar = avatar;
    if (githubUrl) updateData.githubUrl = githubUrl;
    if (linkedinUrl) updateData.linkedinUrl = linkedinUrl;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: updateData,
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return res.json({
      message: 'Profile updated successfully',
      user: userWithoutPassword,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error updating profile', error: error.message });
  }
};
