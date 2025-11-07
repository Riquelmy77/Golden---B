const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

// GET posts
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1');
    const limit = parseInt(req.query.limit || '10');
    const skip = (page - 1) * limit;
    const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user', 'username');
    const total = await Post.countDocuments();
    res.json({ posts, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    res.status(500).json({ message: 'Server error', error: err.message, stack: err.stack });
  }
});

// GET post by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post id' });
    }
    const post = await Post.findById(id).populate('user', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    res.status(500).json({ message: 'Server error', error: err.message, stack: err.stack });
  }
});

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title || !text) return res.status(400).json({ message: 'title and text required' });
    const post = new Post({ title, text, user: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid post id' });
    }
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
