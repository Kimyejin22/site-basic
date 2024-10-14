import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';
import { hashPassword } from '../../../utils/hash.js';
import User from './model.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Company from '../company/Model.js';
import crypto from 'crypto';
import Step1Data from '../posts/Steps/One/model.js'
import bcrypt from 'bcrypt';  // bcrypt 임포트


dotenv.config();

// AWS SES 설정
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES();
const sns = new AWS.SNS(); // AWS SNS 인스턴스 생성

// 이메일 발송을 위한 nodemailer 설정 (Naver)
const transporter = nodemailer.createTransport({
  host: 'smtp.worksmobile.com', // 네이버 웍스 SMTP 서버
  port: 465, // SSL 포트
  secure: true, // SSL 사용
  auth: {
    user: process.env.EMAIL_USER, // 네이버 웍스 이메일 사용자명
    pass: process.env.EMAIL_PASS, // 네이버 웍스 이메일 비밀번호
  },
});

// hashPassword 함수를 동적으로 불러오는 함수
async function getHashPassword() {
  try {
    const module = await import(`file://${hashPath}`);
    return module.hashPassword;
  } catch (err) {
    console.error('Error loading hashPassword:', err);
    throw new Error('Could not load hashPassword function');
  }
}


// 유저 모두 보기
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 유저 정보 생성
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 유저 회원가입
export const register = async (req, res) => {
  const { email, password, companyType, companyName, businessNumber, ceo, address, termsAccepted } = req.body;


  if (!email || !password || termsAccepted === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    console.log('Received businessNumber:', businessNumber);

    // 이미 존재하는 사용자인지 확인
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' }); 
    }

    console.log('Password before hashing:', password);

    // 회사 정보 저장 또는 검색
    let company = await Company.findOne({ where: { businessNumber } });
    if (!company) {
      company = await Company.create({ companyName, businessNumber, ceo, address });
    }

    console.log("register 함수에서 hashPassword 호출 전");
    console.log(hashPassword); // 함수가 제대로 불러와졌는지 확인

    // hashPassword 함수를 비동기적으로 불러오기
    const hashPassword = await getHashPassword();
    if (!hashPassword) {
      console.error('hashPassword 함수가 아직 로드되지 않았습니다.');
      return res.status(500).json({ error: 'hashPassword 함수가 아직 로드되지 않았습니다.' });
    }
    
    const hashedPassword = await hashPassword(password);
    console.log('해시된 비밀번호:', hashedPassword); // 해시된 비밀번호 로그 추가

    const newUser = await User.create({ 
      email, 
      password: hashedPassword, 
      companyType, 
      companyId: company.id, 
      termsAccepted,
    });

      // 데이터베이스에 저장된 비밀번호 확인
      const userInDb = await User.findOne({ where: { email } });
      console.log('Password stored in DB after registration:', userInDb.password);

    if (!process.env.JWT_SECRET_KEY) {
      console.error('JWT secret key is not defined');
      return res.status(500).json({ error: 'JWT secret key is not defined' });
    }

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: newUser.id, username: newUser.username, email: newUser.email } });
  } catch (err) { 
    console.error("Error during registration:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 유저 로그인
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 저장된 해시된 비밀번호와 입력된 비밀번호를 비교
    console.log('Stored hashed password:', user.password);
    console.log('Entered password:', password);



    // 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('Is password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    console.log('Generated JWT Token:', token);

    // companyType을 서버 콘솔에 출력
    console.log('User companyType:', user.companyType);
    console.log('JWT_SECRET_KEY used for token verification:', process.env.JWT_SECRET_KEY);
    
        // 응답에 companyType을 포함해서 클라이언트로 전달
        res.status(200).json({ 
          token, 
          user: { 
            id: user.id, 
            email: user.email, 
            companyType: user.companyType // companyType 추가
          }
        });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// 유저 정보 업데이트
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    email,
    password,
    profileImage,
    briefIntroduction,
    selectedCategory, // 이 필드는 Step1_data를 통해 관리됩니다
    availableDays, // '월-금', '주말', '공휴일' 중 하나
    contactTimeStart, // 0시~24시 사이의 시간
    contactTimeEnd, // 0시~24시 사이의 시간
    offlineMeetingArea,
    phoneNumber
  } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 새로운 필드들 포함하여 업데이트
    user.username = username || user.username;
    user.email = email || user.email;
    user.profileImage = profileImage || user.profileImage;
    user.briefIntroduction = briefIntroduction || user.briefIntroduction;
    user.availableDays = availableDays || user.availableDays;
    user.contactTimeStart = contactTimeStart || user.contactTimeStart;
    user.contactTimeEnd = contactTimeEnd || user.contactTimeEnd;
    user.offlineMeetingArea = offlineMeetingArea || user.offlineMeetingArea;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    if (password) {
      user.password = await hashPassword(password);
    }

    // selectedCategory 유효성 검증
    if (selectedCategory) {
      const validCategory = await Step1Data.findOne({ where: { selectedCategory } });
      if (!validCategory) {
        return res.status(400).json({ error: 'Invalid category selected' });
      }
      user.selectedCategory = selectedCategory;
    }

    // contactTimeStart, contactTimeEnd 업데이트
    if (contactTimeStart) {
      // 시간 형식 검증
      if (!/^(0[0-9]|1[0-9]|2[0-3]):00$/.test(contactTimeStart)) {
        return res.status(400).json({ error: 'Invalid start time format. Use HH:00 (0시 to 23시)' });
      }
      user.contactTimeStart = contactTimeStart;
    }

    if (contactTimeEnd) {
      // 시간 형식 검증
      if (!/^(0[0-9]|1[0-9]|2[0-3]):00$/.test(contactTimeEnd)) {
        return res.status(400).json({ error: 'Invalid end time format. Use HH:00 (0시 to 23시)' });
      }
      user.contactTimeEnd = contactTimeEnd;
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 유저 삭제
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// 이메일 인증 코드 보내기
export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  const verificationCode = crypto.randomBytes(3).toString('hex'); // 6자리 인증 코드 생성

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    // 세션이 있는지 확인하고 인증 코드 및 이메일 저장
    if (req.session) {
      console.log('Session before setting verification code:', req.session); // 세션 상태 확인
      req.session.verificationCode = verificationCode;  // 세션에 인증 코드 저장
      req.session.email = email; // 세션에 이메일 저장
      console.log('Stored verification code in session:', req.session.verificationCode); // 저장 후 로그 출력
      res.status(200).json({ message: 'Verification code sent' });
    } else {
      console.error('Session not initialized');
      res.status(500).json({ error: 'Session not initialized' });
    }

  } catch (error) {
    console.error("Error sending verification code:", error.message);
    res.status(500).json({ error: 'Failed to send verification code' });
  }
};

// 인증 코드 검증
export const verifyCode = async (req, res) => {
  console.log('Session during verification:', req.session); // 세션 전체를 출력하여 확인
  console.log('Stored verification code in session:', req.session.verificationCode); // 세션에 저장된 인증 코드 출력
  const { code, email } = req.body;

  if (req.session && req.session.verificationCode && req.session.email) {
    if (code === req.session.verificationCode && email === req.session.email) {
      // 이메일이 일치하고 코드가 일치하는 경우
      res.status(200).json({ message: 'Verification successful' });
    } else {
      res.status(400).json({ error: 'Invalid verification code or email' });
    }
  } else {
    res.status(400).json({ error: 'Verification code not found or session expired' });
  }
};

// 비밀번호 재설정 API 핸들러
export const resetPassword = async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  if (!req.session || req.session.verificationCode !== verificationCode || req.session.email !== email) {
    return res.status(400).json({ error: 'Invalid verification code or email' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = await hashPassword(newPassword);
    console.log('Hashed Password during reset:', hashedPassword); // 해시된 비밀번호 로그 추가

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error("Error resetting password:", err.message);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

// 사용자 정보 가져오기
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        'id', 
        'username', 
        'email', 
        'companyType', 
        'companyId', 
        'termsAccepted', 
        'emailVerified', 
        'availableDays', 
        'contactTimeStart', 
        'contactTimeEnd', 
        'offlineMeetingArea', 
        'profileImage',
        'briefIntroduction',
        'selectedCategory',
        'phoneNumber'
      ],
      include: [
        {
          model: Company, // Company 모델을 포함하여 가져오기
          as: 'companyInfo', // 관계에서 설정한 alias 사용
          attributes: ['companyName', 'businessNumber', 'ceo', 'address'], // 가져올 회사 정보 필드
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
        // Step1Data에서 선택한 카테고리에 대한 추가 정보 가져오기
        const categoryData = await Step1Data.findAll({
          where: { selectedCategory: user.selectedCategory }
        });

    // categoryData가 클라이언트로 전달될 필요가 있다면, 응답에 포함
    res.status(200).json({ user, categoryData });
  } catch (err) {
    console.error("Error fetching user info:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// 핸드폰 인증 코드 전송
export const sendSMSVerificationCode = async (req, res) => {
  const { phoneNumber } = req.body;
  const verificationCode = crypto.randomBytes(3).toString('hex'); // 6자리 인증 코드 생성

  // 전화번호가 E.164 형식인지 확인
  if (!/^\+\d{1,15}$/.test(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number format. Must be in E.164 format.' });
  }

  try {
    const params = {
      Message: `Your verification code is: ${verificationCode}`,
      PhoneNumber: phoneNumber,
    };

    // SNS를 통해 SMS 전송
    const result = await sns.publish(params).promise(); // 여기서 result 변수를 선언하여 할당
    console.log('SNS Publish Result:', result); // 추가된 로그

    // 세션이 있는지 확인하고 인증 코드 및 전화번호 저장
    if (req.session) {
      req.session.smsVerificationCode = verificationCode; // 세션에 인증 코드 저장
      req.session.phoneNumber = phoneNumber; // 세션에 전화번호 저장
      res.status(200).json({ message: 'Verification code sent via SMS' });
    } else {
      console.error('Session not initialized');
      res.status(500).json({ error: 'Session not initialized' });
    }

  } catch (error) {
    console.error('Error sending SMS verification code:', error); // 여기서 error 객체를 전체 로그로 출력
    res.status(500).json({ error: 'Failed to send SMS verification code' });
  }
};

// 인증 코드 검증
export const verifySMSCode = async (req, res) => {
  const { code, phoneNumber } = req.body;

  if (req.session && req.session.smsVerificationCode && req.session.phoneNumber) {
    if (code === req.session.smsVerificationCode && phoneNumber === req.session.phoneNumber) {
      // 전화번호가 일치하고 코드가 일치하는 경우
      res.status(200).json({ message: 'SMS verification successful' });
    } else {
      res.status(400).json({ error: 'Invalid verification code or phone number' });
    }
  } else {
    res.status(400).json({ error: 'Verification code not found or session expired' });
  }
};


