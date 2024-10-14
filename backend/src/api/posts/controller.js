import multer from 'multer';
import path from 'path';
import Post from './model.js';
import User from '../users/model.js'; // User 모델을 가져옴
import Step1Data from '../posts/Steps/One/model.js';
import Step2Data from '../posts/Steps/Two/model.js';
import Step3Data from '../posts/Steps/Three/model.js';
import jwt from 'jsonwebtoken'; // JWT 토큰을 사용하여 userId를 가져오기


// 파일 업로드 설정 (경로가 없으면 생성)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads/');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // 디렉토리가 없으면 생성
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, and PDF files are allowed'), false);
    }
    cb(null, true);
  }
}).single('file');

// JWT를 통해 사용자 인증
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header:", authHeader);  // 서버에서 받은 Authorization 헤더 로그
  
  const token = authHeader && authHeader.split(' ')[1]; // Bearer 토큰 추출

  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    
    // 디코딩된 JWT 토큰에서 user 정보를 req.user에 저장
    req.user = decoded;
    
    // 디코딩된 토큰에 userId가 있는지 확인
    console.log('Decoded JWT:', decoded);
    console.log('User ID:', decoded.id);  // user ID가 제대로 있는지 확인

    next();
  });
};



// 모든 게시글을 가져오는 함수
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['email', 'username'],
          as: 'user',  // 'as'를 명시
        },
        {
          model: Step1Data,
          attributes: ['selectedCategory', 'selectedSubcategory'],
          as: 'Step1Data'
        },
        {
          model: Step2Data,
          attributes: ['selectedCategory', 'selectedSubcategory'],
          as: 'Step2Data'
        },
        {
          model: Step3Data,
          attributes: ['quantity', 'price', 'sampleNeeded', 'deliveryDate', 'preferredCommunication', 'recruitmentPeriod'],
          as: 'Step3Data'
        }
      ]
    });
    res.status(200).json(posts); // JSON 형식으로 응답
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createPost = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      return res.status(500).json({ error: err.message });
    }

    try {
      // JWT 토큰을 통해 userId 가져오기
      const userId = req.user?.id;  // req.user가 제대로 설정되었는지 확인

      console.log("JWT User ID:", req.user?.id);  // 디버깅용 로그 추가

      if (!userId) {
        return res.status(401).json({ error: 'User ID not found in the request' });
      }

      console.log('Request body:', req.body);
      console.log('Uploaded file:', req.file);

      const { title, content, step1Id, step2Id, step3Id } = req.body;
      const filePath = req.file ? req.file.path : null;

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      // Step 데이터 유효성 검사
      const step1Data = step1Id ? await Step1Data.findByPk(step1Id) : null;
      const step2Data = step2Id ? await Step2Data.findByPk(step2Id) : null;
      const step3Data = step3Id ? await Step3Data.findByPk(step3Id) : null;

      if (!step1Data || !step2Data || !step3Data) {
        return res.status(400).json({ error: 'Invalid Step data provided' });
      }

      // Post 생성
      const post = await Post.create({
        title,
        content,
        userId, // JWT로부터 가져온 userId 사용
        filePath,
        step1Id,
        step2Id,
        step3Id,
      });
      
      

      console.log('Post created:', post);
      res.status(201).json(post);
    } catch (err) {
      console.error('Error during post creation:', err);
      res.status(500).json({ error: err.message });
    }
  });
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, step1Id, step2Id, step3Id } = req.body;

  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.step1Id = step1Id || post.step1Id;
    post.step2Id = step2Id || post.step2Id;
    post.step3Id = step3Id || post.step3Id;

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id, {
      include: [
        { model: User, attributes: ['username'], as: 'user' },  // 'as' 명시
        { model: Step1Data, attributes: ['selectedCategory', 'selectedSubcategory'], as: 'Step1Data' },
        { model: Step2Data, attributes: ['selectedCategory', 'selectedSubcategory'], as: 'Step2Data' },
        { model: Step3Data, attributes: ['quantity', 'price', 'sampleNeeded', 'deliveryDate', 'preferredCommunication', 'recruitmentPeriod'], as: 'Step3Data' },
      ],
    });


    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostsByUserId = async (req, res) => {
  const userId = req.user.id; // JWT에서 디코딩된 유저 ID

  console.log('Fetching posts for user ID:', userId);  // 로그 추가

  try {
    const posts = await Post.findAll({
      where: { userId }, // 유저 ID로 게시글 조회
      include: [
        { model: User, attributes: ['username', 'email'], as: 'user' }, 
        { model: Step1Data, attributes: ['selectedCategory', 'selectedSubcategory'], as: 'Step1Data' },
        { model: Step2Data, attributes: ['selectedCategory', 'selectedSubcategory'], as: 'Step2Data' },
        { model: Step3Data, attributes: ['quantity', 'price', 'sampleNeeded', 'deliveryDate', 'preferredCommunication', 'recruitmentPeriod'], as: 'Step3Data' },
      ],
    });

    if (!posts.length) {
      return res.status(404).json({ message: '작성된 게시글이 없습니다.' });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts for user:', error);
    res.status(500).json({ error: '서버 오류로 게시글을 가져올 수 없습니다.' });
  }
};