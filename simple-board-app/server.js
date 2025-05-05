// server.js
require('dotenv').config(); // 가장 먼저 불러오기!
const express = require('express');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB 연결 성공!'))
.catch((err) => console.error('❌ MongoDB 연결 실패:', err));

// 미들웨어
app.use(express.json());
app.use(express.static('public'));

// 라우터 등록
app.use('/posts', postsRouter);

// 기본 라우터
app.get('/', (req, res) => {
  res.send('📌 게시판 서버 메인 페이지입니다!');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
