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
// FILE UPLOAD
// ==========================================
router.post('/upload', authenticateAdmin, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // Return the path relative to the domain (e.g. /uploads/filename.png)
  const fileUrl = `/uploads/${req.file.filename}`;
  return res.json({ 
    message: 'File uploaded successfully', 
    url: fileUrl 
  });
});

export default router;
