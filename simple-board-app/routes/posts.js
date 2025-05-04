// routes/posts.js
const express = require('express');
const router = express.Router();

// 예시: 게시글 목록 가져오기
router.get('/', (req, res) => {
  res.send('📄 게시글 목록을 불러왔습니다.');
});

// 예시: 게시글 하나 생성하기
router.post('/', (req, res) => {
  res.send('✅ 게시글이 등록되었습니다.');
});

module.exports = router;