import { Router } from 'express';
import { getAllPosts, createPost, authenticateToken, updatePost, deletePost, getPostById, getPostsByUserId } from './controller.js';

const router = Router();

// 모든 게시글 가져오기 (GET /api/posts)
router.get('/', getAllPosts);

// 로그인한 유저의 게시글 가져오기 (여러 게시글)
router.get('/user', authenticateToken, getPostsByUserId);

// 특정 게시글 가져오기 (GET /api/posts/:id)
router.get('/:id', getPostById);

// 게시글 생성하기 (POST /api/posts)
router.post('/', authenticateToken, createPost);

// 게시글 업데이트하기 (PUT /api/posts/:id)
router.put('/:id', authenticateToken, updatePost);

// 게시글 삭제하기 (DELETE /api/posts/:id)
router.delete('/:id', authenticateToken, deletePost);


export default router;