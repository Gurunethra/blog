import { Router } from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blog.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/all', getAllBlogs);
router.get('/:id', getBlogById);

// Protected routes
router.use(authenticate);
router.post('/create', createBlog);
router.put('/update/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);

export default router;
