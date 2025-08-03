import express from 'express';
import { createPost, getAllPosts, getPostsByUser } from '../controllers/postController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protectRoute, createPost);         // Create a post
router.get('/getAllposts', getAllPosts);                        // Public feed
router.get('/user/:userId', getPostsByUser);         // User profile feed

export default router;
