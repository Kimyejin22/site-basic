import Comment from './model.js';
import User from '../users/model.js'; // User 모델을 가져옴
import Post from '../posts/model.js'; // Post 모델을 가져옴

export const getAllComments = async (req, res) => {
  try {
    // 모든 댓글과 관련된 사용자 및 게시물 데이터를 함께 가져옴
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'] // 사용자명만 선택
        },
        {
          model: Post,
          attributes: ['title'] // 게시물 제목만 선택
        }
      ]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { content, userId, targetType, targetId, parentCommentId } = req.body;

    // 댓글 생성
    const comment = await Comment.create({ content, userId, targetType, targetId, parentCommentId });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
