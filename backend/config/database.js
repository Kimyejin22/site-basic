import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();  // .env 파일에서 환경 변수를 로드

// 현재 환경을 확인하고, 기본값으로 'development' 사용
const env = process.env.NODE_ENV || 'development';

// .env 파일에서 데이터베이스 설정을 불러옴
const sequelize = new Sequelize(
  process.env.DB_DATABASE,    // 데이터베이스 이름
  process.env.DB_USERNAME,    // 사용자명
  process.env.DB_PASSWORD,    // 비밀번호
  {
    host: process.env.DB_HOST,    // 호스트
    port: 3306,  // 기본 포트가 아니면 이 부분을 수정
    dialect: process.env.DB_DIALECT,   // MySQL 등 데이터베이스 종류
  }
);

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_DIALECT:', process.env.DB_DIALECT);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);  // 전체 오류 출력
  });

export default sequelize;






//import { Sequelize } from 'sequelize';
//import config from './config.json' assert { type: "json" };

// 현재 환경을 확인하고, 기본값으로 'development' 사용
//const env = process.env.NODE_ENV || 'development';
//const dbConfig = config[env];

//const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
//  host: dbConfig.host,
//  dialect: dbConfig.dialect,
//});

//export default sequelize;