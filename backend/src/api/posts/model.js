import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  step1Id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  step2Id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  step3Id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'posts'
});

export default Post;
