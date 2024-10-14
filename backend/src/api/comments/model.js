import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';  // sequelize 인스턴스를 가져옴

const Comment = sequelize.define('Comment', {
  targetType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  targetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  parentCommentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'comments',  // 자기 자신을 참조함
      key: 'id',
    },
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'comments',
});

export default Comment;
