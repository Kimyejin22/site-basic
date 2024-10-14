import { Router } from 'express';
import { createStep3Data, getStep3DataById, getAllStep3Data, deleteStep3Data, updateStep3Data } from './controller.js';

const router = Router();

// Step3 데이터 생성 (POST /api/steps/step3)
router.post('/', createStep3Data);

// 특정 Step3 데이터를 가져오기 (GET /api/steps/step3/:id)
router.get('/:id', getStep3DataById);

// 모든 Step3 데이터 가져오기 (GET /api/steps/step3)
router.get('/', getAllStep3Data);

// Step3 데이터 삭제 (DELETE /api/steps/step3/:id)
router.delete('/:id', deleteStep3Data);

// Step3 데이터 수정 (PUT /api/steps/step3/:id)
router.put('/:id', updateStep3Data);

export default router;