import Estimate from './Model.js';
import User from '../users/model.js'; // User 모델을 가져옴
import Post from '../posts/model.js';


// 새로운 견적 생성
export const createEstimate = async (req, res) => {
    try {
      const userId = req.user.id;  // JWT 토큰으로부터 가져온 사용자 ID
  
      const newEstimate = await Estimate.create({
        userId,  // 견적을 생성한 사용자 ID 저장
        postId: req.body.postId,
        quantities: req.body.quantities,
        prices: req.body.prices
      });
  
      res.status(201).json(newEstimate);
    } catch (error) {
      console.error("Error creating estimate:", error.message);
      res.status(500).json({ error: "Failed to create estimate" });
    }
  };

// 모든 견적 조회
export const getAllEstimates = async (req, res) => {
    try {
      const estimates = await Estimate.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'email', 'username']  // 필요한 사용자 정보만 가져옴
          },
          {
            model: Post,
            as: 'post',  // Post와의 연관관계
            attributes: ['title', 'content']  // Post의 필요한 필드
          }
        ]
      });
  
      res.status(200).json(estimates);
    } catch (error) {
      console.error("Error fetching estimates:", error.message);
      res.status(500).json({ error: "Failed to fetch estimates" });
    }
  };

// 특정 견적 조회
export const getEstimateById = async (req, res) => {
    const { id } = req.params; // URL에서 견적 ID를 추출
  
    try {
      // 견적을 찾고 관련된 Post와 User 정보를 포함
      const estimate = await Estimate.findByPk(id, {
        include: [
          {
            model: Post,
            as: 'post',  // Post와의 연관관계
            attributes: ['id', 'title', 'content']  // Post의 필요한 필드
          },
          {
            model: User,
            as: 'user',  // User와의 연관관계
            attributes: ['id', 'username', 'email']  // User의 필요한 필드
          }
        ]
      });
  
      // 견적이 없으면 404 에러를 반환
      if (!estimate) {
        return res.status(404).json({ message: 'Estimate not found' });
      }
  
      // 견적을 JSON 형식으로 반환
      res.json(estimate);
    } catch (err) {
      console.error("Error fetching estimate:", err.message);
      res.status(500).json({ error: err.message });
    }
  };

  // 특정 사용자가 보낸 모든 견적 조회
export const getEstimatesByUser = async (req, res) => {
    const userId = req.user.id; // JWT에서 가져온 로그인된 사용자 ID
  
    try {
      const estimates = await Estimate.findAll({
        where: { userId }, // userId를 기준으로 필터링
        include: [
          {
            model: Post,
            as: 'post',
            attributes: ['id', 'title', 'content'],  // Post의 필요한 필드
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'email'],  // User의 필요한 필드
          },
        ],
      });
  
      if (!estimates.length) {
        return res.status(404).json({ message: 'No estimates found for this user' });
      }
  
      res.status(200).json(estimates);
    } catch (error) {
      console.error("Error fetching estimates by user:", error.message);
      res.status(500).json({ error: "Failed to fetch estimates" });
    }
  };

// 견적 수정
export const updateEstimate = async (req, res) => {
  const { id } = req.params;
  const { quantities, prices } = req.body;

  try {
    const estimate = await Estimate.findByPk(id);
    if (!estimate) {
      return res.status(404).json({ message: 'Estimate not found' });
    }

    estimate.quantities = quantities || estimate.quantities;
    estimate.prices = prices || estimate.prices;

    await estimate.save();
    res.json(estimate);
  } catch (err) {
    console.error("Error updating estimate:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 견적 삭제
export const deleteEstimate = async (req, res) => {
  const { id } = req.params;

  try {
    const estimate = await Estimate.findByPk(id);
    if (!estimate) {
      return res.status(404).json({ message: 'Estimate not found' });
    }

    await estimate.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting estimate:", err.message);
    res.status(500).json({ error: err.message });
  }
};
