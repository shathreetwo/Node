// server.js
const express = require('express');
const app = express();
const postsRouter = require('./routes/posts');
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 라우터 등록
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
  res.send('📌 게시판 서버 메인 페이지입니다!');
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});