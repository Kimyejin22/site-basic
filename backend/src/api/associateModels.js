import User from "./users/model.js";
import Company from "./company/Model.js";
import Post from './posts/model.js';
import Estimate from './estimates/Model.js';
import Step1Data from './posts/Steps/One/model.js';
import Step2Data from './posts/Steps/Two/model.js';
import Step3Data from './posts/Steps/Three/model.js';
import Comment from "./comments/model.js";

const associateModels = () => {
  // User와 Company 간의 관계 설정 (별칭 중복 제거)
  User.belongsTo(Company, { foreignKey: 'companyId', as: 'companyInfo' });
  Company.hasMany(User, { foreignKey: 'companyId', as: 'users' });

  // User와 Post 간의 관계 설정 (한 사용자는 여러 포스트를 가질 수 있음)
  User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
  Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  // Post와 Estimate 간의 관계 설정 (한 포스트는 여러 견적을 가질 수 있음)
  Post.hasMany(Estimate, { foreignKey: 'postId', as: 'estimates' });
  Estimate.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

  // User와 Estimate 간의 관계 설정 (한 사용자는 여러 견적을 제출할 수 있음)
  User.hasMany(Estimate, { foreignKey: 'userId', as: 'estimates' });
  Estimate.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  // Post와 Step1Data, Step2Data, Step3Data 간의 관계 설정 (한 포스트는 한 단계를 가짐)
  Step1Data.hasOne(Post, { foreignKey: 'step1Id', as: 'Step1Data' });
  Step2Data.hasOne(Post, { foreignKey: 'step2Id', as: 'Step2Data' });
  Step3Data.hasOne(Post, { foreignKey: 'step3Id', as: 'Step3Data' });

  Post.belongsTo(Step1Data, { foreignKey: 'step1Id', as: 'Step1Data' });
  Post.belongsTo(Step2Data, { foreignKey: 'step2Id', as: 'Step2Data' });
  Post.belongsTo(Step3Data, { foreignKey: 'step3Id', as: 'Step3Data' });

  // User와 Comment 간의 관계 설정
  User.hasMany(Comment, { foreignKey: 'userId' });
  Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  // Post와 Comment 간의 관계 설정
  Post.hasMany(Comment, { foreignKey: 'targetId', constraints: false, scope: { targetType: 'post' } });
  Comment.belongsTo(Post, { foreignKey: 'targetId', constraints: false });

  // 자기 참조 관계 설정 (부모 댓글)
  Comment.hasMany(Comment, { foreignKey: 'parentCommentId', as: 'replies' });
  Comment.belongsTo(Comment, { foreignKey: 'parentCommentId', as: 'parentComment' });
};

export default associateModels;
