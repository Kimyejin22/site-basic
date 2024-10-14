import express from 'express';
import {
  createEstimate,
  getAllEstimates,
  getEstimateById,
  getEstimatesByUser, 
  updateEstimate,
  deleteEstimate
} from './Controller.js';
import { authenticateToken } from '../../../middleware/authenticateToken.js';

const router = express.Router();

// 새로운 견적 생성
router.post('/', authenticateToken, createEstimate);

// 모든 견적 조회
router.get('/', getAllEstimates);

// 특정 견적 조회
router.get('/:id', getEstimateById);

// 로그인한 사용자의 모든 견적 조회
router.get('/user/me', authenticateToken, getEstimatesByUser);  // 새로운 라우트 추가

// 특정 견적 수정
router.put('/:id', authenticateToken, updateEstimate);

// 특정 견적 삭제
router.delete('/:id', authenticateToken, deleteEstimate);



export default router;
