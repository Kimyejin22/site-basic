import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();  // .env 파일에서 환경 변수 로드

// 현재 환경을 확인하고, 기본값으로 'development' 사용
const env = process.env.NODE_ENV || 'development';

// Sequelize 인스턴스 생성 (환경 변수에서 값 불러오기)
const sequelize = new Sequelize(
  process.env.DB_DATABASE,    // 데이터베이스 이름
  process.env.DB_USERNAME,    // 사용자명
  process.env.DB_PASSWORD,    // 비밀번호
  {
    host: process.env.DB_HOST,    // 호스트 (예: localhost 또는 원격 서버 IP)
    dialect: process.env.DB_DIALECT,   // MySQL 등 데이터베이스 종류
  }
);

// 데이터베이스 연결 테스트
sequelize.authenticate()
  .then(() => {
    console.log('Request Step1 Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the Request Step1 database:', err.message);
  });

const Step1Data = sequelize.define('Step1Data', {
  selectedCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedSubcategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'step1_data'
});



export default Step1Data;