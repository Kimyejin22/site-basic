import jwt from 'jsonwebtoken';

// JWT를 통해 사용자 인증
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // Authorization 헤더가 const token 확인
  console.log("Authorization Header:", authHeader);  

  // Bearer 토큰 추출
  const token = authHeader && authHeader.split(' ')[1]; 
  console.log("Extracted Token:", token);

   // JWT_SECRET_KEY 로그 확인
   console.log("JWT_SECRET_KEY being used:", process.env.JWT_SECRET_KEY);

  // 토큰이 없을 경우
  if (!token) {
    console.error('Token not found, rejecting request.');
    return res.status(401).json({ message: 'Token required' });
  }

  // JWT 검증
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      // JWT 검증 중 오류 발생 시 로그 출력
      console.error('JWT verification failed:', err.message);

      return res.status(403).json({ message: 'Invalid token' });
    }
    
    // 디코딩된 JWT 토큰 정보 로그
    console.log('Decoded JWT:', decoded);
    console.log('User ID:', decoded.id);  // user ID가 제대로 있는지 확인

    // 디코딩된 JWT 정보를 req.user에 저장
    req.user = decoded;

    // 인증 성공 후 다음 미들웨어로 이동
    next();
  });
};
