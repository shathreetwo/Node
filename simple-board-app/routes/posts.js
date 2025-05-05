// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// 📌 게시글 작성
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: '게시글 생성 실패', details: err.message });
  }
});

// 📌 게시글 전체 조회
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // 최신순 정렬
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: '게시글 조회 실패', details: err.message });
  }
});

// 📌 게시글 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: '게시글 조회 실패', details: err.message });
  }
});

// 📌 게시글 수정
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,              // 수정 후 데이터 반환
      runValidators: true,    // 유효성 검사 실행
    });

    if (!updatedPost) {
      return res.status(404).json({ error: '수정할 게시글이 없습니다.' });
    }

    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: '게시글 수정 실패', details: err.message });
  }
});

// 📌 게시글 삭제
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: '삭제할 게시글이 없습니다.' });
    }

    res.json({ message: '게시글이 성공적으로 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ error: '게시글 삭제 실패', details: err.message });
  }
});

module.exports = router;
