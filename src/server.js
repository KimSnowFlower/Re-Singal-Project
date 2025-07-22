// server.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // 요청 로깅
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes/authRoutes.js'); // authRoutes.js 파일 불러오기

dotenv.config(); // .env 파일 불러오기

const app = express();
const PORT = process.env.PORT || 3000;

// ======== Middleware ========
app.use(cors()); // CORS 허용
app.use(morgan('dev')); // 개발용 로깅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

// ======== Sample Route ========
app.get('/', (req, res) => {
  res.send('✅ 서버가 정상 작동 중입니다!');
});

// ======== 404 처리 ========
app.use((req, res, next) => {
  res.status(404).json({ error: '404 Not Found' });
});

// ======== 에러 핸들러 ========
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '서버 에러 발생' });
});

/*
const userRouter = require('./routes/user'); // routes/user.js 파일 필요
app.use('/api/users', userRouter);
*/

// ======== 서버 실행 ========
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
});
