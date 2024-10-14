// server.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import session from 'express-session';
import associateModels from './src/api/associateModels.js';
import sequelize from './config/database.js';

// API 라우트 설정
import productsRoutes from './src/api/products/routes.js';
import usersRoutes from './src/api/users/routes.js';
import postsRoutes from './src/api/posts/routes.js';
import commentsRoutes from './src/api/comments/routes.js';
import step1Routes from './src/api/posts/Steps/One/routes.js';
import step2Routes from './src/api/posts/Steps/Two/routes.js';
import step3Routes from './src/api/posts/Steps/Three/routes.js';
import companiesRoutes from './src/api/company/Routes.js';
import estimateRoutes from './src/api/estimates/Routes.js';

const app = express();
const PORT = process.env.PORT || 80;  // 기본 HTTP 포트 80 사용

// // Redis 클라이언트 생성
// const redisClient = createClient({
//   url: 'redis://localhost:6380'  // Redis 서버 주소
// });

// // Redis 클라이언트 연결
// redisClient.connect().catch(console.error);

// // RedisStore 설정
// const store = new RedisStore({
//   client: redisClient,
//   logErrors: true
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);

// 데이터베이스 연결 확인 및 모델 간 관계 설정 호출
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    associateModels();  // 모델 간 관계 설정
    return sequelize.sync();  // 데이터베이스와 동기화
  })
  .then(() => {
    console.log('Database & tables created!');
    // 서버 시작
    app.listen(PORT, () => {
      console.log(`API server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
  });

// CORS 설정
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:5001',  'http://localhost:3000'],  // 프론트엔드와 관리자 페이지 허용
  credentials: true // 세션 및 쿠키 공유 설정
}));

app.options('*', cors({
  origin: ['http://localhost:5000', 'http://localhost:5001', 'http://localhost:3000'],
  credentials: true
}));

// JSON 본문을 파싱하는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionMiddleware = session({
  // store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'Lax'
  }
});

app.use(sessionMiddleware);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Internal server error' });
});

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/steps/step1', step1Routes);
app.use('/api/steps/step2', step2Routes);
app.use('/api/steps/step3', step3Routes);
app.use('/api/companies', companiesRoutes);
app.use('/api/estimates', estimateRoutes);

// 백엔드 관리 페이지 서빙
app.get('/admin', (req, res) => {
  console.log('Serving admin page.');
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/', (req, res) => {
  res.send('API server is running!');
});
