import express from 'express';
import {
  getAllUsers,
  createUser,
  login,
  register,
  updateUser,
  deleteUser,
  sendVerificationCode,
  verifyCode,
  resetPassword,
  getUserInfo,
  sendSMSVerificationCode,  // 추가된 핸들러 함수
  verifySMSCode  // 추가된 핸들러 함수
} from './controller.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// JWT 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
};

// 모든 사용자 가져오기 (GET /api/users)
router.get('/', getAllUsers);

// 사용자 생성하기 (POST /api/users)
router.post('/', createUser);

// 사용자 로그인하기 (POST /api/users/login)
router.post('/login', login);

// 사용자 회원가입하기 (POST /api/users/register)
router.post('/register', register);

// 사용자 정보 업데이트하기 (PUT /api/users/:id)
router.put('/:id', updateUser);

// 사용자 삭제하기 (DELETE /api/users/:id)
router.delete('/:id', deleteUser);

// 이메일 인증 코드 보내기 (POST /api/users/send-verification-code)
router.post('/send-verification-code', sendVerificationCode);

// 인증 코드 검증 (POST /api/users/verify-code)
router.post('/verify-code', verifyCode);

router.post('/reset-password', resetPassword); // 비밀번호 재설정 라우트 추가

router.get('/me', authenticateToken, getUserInfo);

router.post('/send-sms-verification-code', sendSMSVerificationCode);  // 추가된 엔드포인트
router.post('/verify-sms-code', verifySMSCode);  // 추가된 엔드포인트

export default router;

 // module.exports 대신 export default 사용

// const express = require('express');
// const router = express.Router();
// const usersController = require('./controller.js');

// // 모든 사용자 가져오기 (GET /api/users)
// router.get('/', usersController.getAllUsers);

// // 사용자 생성하기 (POST /api/users)
// router.post('/', usersController.createUser);

// // 사용자 로그인하기 (POST /api/users/login)
// router.post('/login', usersController.login);

// // 사용자 회원가입하기 (POST /api/users/register)
// router.post('/register', usersController.register);

// module.exports = router; 