import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';
import User from '../users/model.js';  // User 모델을 import
import Post from '../posts/model.js';  // Post 모델을 import


class Estimate extends Model {}

sequelize.authenticate()
  .then(() => {
    console.log('Estimate Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the Post database:', err.message);
  });

Estimate.init({
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  quantities: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prices: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Estimate',
  tableName: 'estimates',
  timestamps: true,
});



export default Estimate;
