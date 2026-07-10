import { Router } from 'express';
import { authenticateAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';
import {
  login,
  getProfile,
  updateProfile,
} from '../controllers/authController';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
  deleteComment,
} from '../controllers/blogController';
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getAllCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAllServices,
  createService,
  updateService,
  deleteService,
  getAllMessages,
  createMessage,
  markMessageAsRead,
  deleteMessage,
  getSettings,
  updateSettings,
} from '../controllers/crudControllers';
import {
  getCmsBundle,
  getAllSiteContent,
  upsertSiteContent,
  deleteSiteContent,
  reorderItems,
  getAllEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getAllMedia,
  createMedia,
  deleteMedia,
} from '../controllers/cmsController';
import { prisma } from '../config/db';

const router = Router();

// ==========================================
// AUTHENTICATION
// ==========================================
router.post('/auth/login', login);
router.get('/auth/profile', authenticateAdmin, getProfile);
router.put('/auth/profile', authenticateAdmin, updateProfile);

// ==========================================
// PROJECTS
// ==========================================
router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectById);
router.post('/projects', authenticateAdmin, createProject);
router.put('/projects/:id', authenticateAdmin, updateProject);
router.delete('/projects/:id', authenticateAdmin, deleteProject);

// ==========================================
// BLOGS & COMMENTS
// ==========================================
router.get('/blogs', getAllBlogs);
router.get('/blogs/admin/all', authenticateAdmin, (req, res, next) => {
  req.query.all = 'true';
  return getAllBlogs(req, res).catch(next);
});
router.get('/blogs/:id', getBlogById);
router.post('/blogs', authenticateAdmin, createBlog);
router.put('/blogs/:id', authenticateAdmin, updateBlog);
router.delete('/blogs/:id', authenticateAdmin, deleteBlog);
router.post('/blogs/:id/comments', addComment);
router.delete('/blogs/comments/:commentId', authenticateAdmin, deleteComment);

// ==========================================
// SKILLS
// ==========================================
router.get('/skills', getAllSkills);
router.post('/skills', authenticateAdmin, createSkill);
router.put('/skills/:id', authenticateAdmin, updateSkill);
router.delete('/skills/:id', authenticateAdmin, deleteSkill);

// ==========================================
// EXPERIENCE
// ==========================================
router.get('/experiences', getAllExperiences);
router.post('/experiences', authenticateAdmin, createExperience);
router.put('/experiences/:id', authenticateAdmin, updateExperience);
router.delete('/experiences/:id', authenticateAdmin, deleteExperience);

// ==========================================
// CERTIFICATES
// ==========================================
router.get('/certificates', getAllCertificates);
router.post('/certificates', authenticateAdmin, createCertificate);
router.put('/certificates/:id', authenticateAdmin, updateCertificate);
router.delete('/certificates/:id', authenticateAdmin, deleteCertificate);

// ==========================================
// TESTIMONIALS
// ==========================================
router.get('/testimonials', getAllTestimonials);
router.post('/testimonials', authenticateAdmin, createTestimonial);
router.put('/testimonials/:id', authenticateAdmin, updateTestimonial);
router.delete('/testimonials/:id', authenticateAdmin, deleteTestimonial);

// ==========================================
// SERVICES
// ==========================================
router.get('/services', getAllServices);
router.post('/services', authenticateAdmin, createService);
router.put('/services/:id', authenticateAdmin, updateService);
router.delete('/services/:id', authenticateAdmin, deleteService);

// ==========================================
// MESSAGES
// ==========================================
router.post('/messages', createMessage);
router.get('/messages', authenticateAdmin, getAllMessages);
router.put('/messages/:id/read', authenticateAdmin, markMessageAsRead);
router.delete('/messages/:id', authenticateAdmin, deleteMessage);

// ==========================================
// SETTINGS
// ==========================================
router.get('/settings', getSettings);
router.put('/settings', authenticateAdmin, updateSettings);

// ==========================================
// CMS BUNDLE & SITE CONTENT
// ==========================================
router.get('/cms', getCmsBundle);
router.get('/site-content', authenticateAdmin, getAllSiteContent);
router.put('/site-content', authenticateAdmin, upsertSiteContent);
router.delete('/site-content/:key', authenticateAdmin, deleteSiteContent);
router.put('/reorder', authenticateAdmin, reorderItems);

// ==========================================
// EDUCATION
// ==========================================
router.get('/education', getAllEducation);
router.post('/education', authenticateAdmin, createEducation);
router.put('/education/:id', authenticateAdmin, updateEducation);
router.delete('/education/:id', authenticateAdmin, deleteEducation);

// ==========================================
// MEDIA LIBRARY
// ==========================================
router.get('/media', authenticateAdmin, getAllMedia);
router.delete('/media/:id', authenticateAdmin, deleteMedia);

// ==========================================
// FILE UPLOAD
// ==========================================
router.post('/upload', authenticateAdmin, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;

  try {
    const media = await prisma.mediaAsset.create({
      data: {
        filename: req.file.filename,
        url: fileUrl,
        mimeType: req.file.mimetype,
        size: req.file.size,
        alt: req.file.originalname,
      },
    });

    return res.json({
      message: 'File uploaded successfully',
      url: fileUrl,
      media,
    });
  } catch (error: any) {
    return res.json({
      message: 'File uploaded successfully',
      url: fileUrl,
    });
  }
});

export default router;
