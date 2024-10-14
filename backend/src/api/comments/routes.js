import { Router } from 'express';
import { getAllComments, createComment } from './controller.js';
import authenticateToken from '../../../middleware/auth.js'; // JWT 인증 미들웨어 추가

const router = Router();

// 모든 댓글 가져오기 (GET /api/comments)
router.get('/', getAllComments);

// 댓글 생성하기 (POST /api/comments) - 인증 필요
router.post('/', authenticateToken, createComment);

export default router;
