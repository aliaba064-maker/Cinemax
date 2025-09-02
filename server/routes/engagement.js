const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Comment = require('../models/Comment');
const router = express.Router();

// Comments
router.post('/comments/:workId', auth, async (req, res) => {
  const { text } = req.body;
  const user = await User.findById(req.user.id);
  const c = await Comment.create({ workId: req.params.workId, user: user.username, text, date: new Date() });
  res.json(c);
});

router.get('/comments/:workId', async (req, res) => {
  const cs = await Comment.find({ workId: req.params.workId }).sort('-date');
  res.json(cs);
});

// Favorites
router.post('/favorites', auth, async (req, res) => {
  const { workId } = req.body;
  const user = await User.findById(req.user.id);
  if (!user.favorites.includes(workId)) user.favorites.push(workId);
  await user.save();
  res.json({ favorites: user.favorites });
});

// History
router.get('/history', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.history);
});
router.post('/history', auth, async (req, res) => {
  const { workId, type, progress } = req.body;
  const user = await User.findById(req.user.id);
  user.history.push({ workId, type, progress, watchedAt: new Date() });
  await user.save();
  res.json(user.history);
});

// Downloads
router.get('/downloads', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.downloads);
});
router.post('/downloads', auth, async (req, res) => {
  const { workId, type } = req.body;
  const user = await User.findById(req.user.id);
  user.downloads.push({ workId, type, downloadedAt: new Date() });
  await user.save();
  res.json(user.downloads);
});

module.exports = router;
