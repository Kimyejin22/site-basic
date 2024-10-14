import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';
import { hashPassword } from '../../../utils/hash.js';
import Step1_data from '../posts/Steps/One/model.js';  // Step1_data 모델 임포트
import Company from '../company/Model.js';
import Post from '../posts/model.js';
import Estimate from '../estimates/Model.js';
import Comment from '../comments/model.js';

// User 모델 정의

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 25],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'companies', // 외래 키 관계 설정
      key: 'id',
    },
  },
  termsAccepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  briefIntroduction: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  selectedCategory: {
    type: DataTypes.STRING, // 문자열로 상위 카테고리 저장
    allowNull: true,
  },
  availableDays: {
    type: DataTypes.ENUM('월-금', '주말', '공휴일'), // 고정된 값으로 ENUM 사용
    allowNull: true,
  },
  contactTimeStart: {
    type: DataTypes.TIME, // 0시 ~ 24시 사이의 시간
    allowNull: true,
  },
  contactTimeEnd: {
    type: DataTypes.TIME, // 0시 ~ 24시 사이의 시간
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      user.password = await hashPassword(user.password); // 해싱된 비밀번호 사용
    },
  },
});

export default User;