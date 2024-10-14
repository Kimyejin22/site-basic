import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

class Company extends Model {}

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
;


export default Company;