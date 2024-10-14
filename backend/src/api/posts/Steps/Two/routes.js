import { Router } from 'express';
import { createStep2Data, getStep2DataById, getAllStep2Data, deleteStep2Data, updateStep2Data } from './controller.js';

const router = Router();

// Step1 데이터 생성 (POST /api/steps/step1)
router.post('/', createStep2Data);

// 특정 Step1 데이터를 가져오기 (GET /api/steps/step1/:id)
router.get('/:id', getStep2DataById);

// 모든 Step1 데이터 가져오기 (GET /api/steps/step1)
router.get('/', getAllStep2Data);

// Step1 데이터 수정 (PUT /api/steps/step1/:id)
router.put('/:id', updateStep2Data);  // 수정 라우트 추가

// Step1 데이터 삭제 (DELETE /api/steps/step1/:id)
router.delete('/:id', deleteStep2Data);

export default router;