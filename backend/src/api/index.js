import User from "./users/model.js";
import Company from "./company/Model.js";
import sequelize from "../../config/database.js";
import { DataTypes } from 'sequelize'; // DataTypes를 임포트합니다.


// 모델 초기화
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
      defaultValue: false,
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
  
  Company.init({
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ceo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Company',
    tableName: 'companies',
    timestamps: true,
  });
  
  // 모델 관계 설정 함수
  const associateModels = () => {
    User.belongsTo(Company, { foreignKey: 'companyId', as: 'companyInfo' });
    Company.hasMany(User, { foreignKey: 'companyId', as: 'users' });
  };
  
  // 모델 관계 설정 호출
  associateModels();
  
  export { sequelize, User, Company };