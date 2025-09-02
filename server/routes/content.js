const express = require('express');
const Movie = require('../models/Movie');
const Episode = require('../models/Episode');
const Comment = require('../models/Comment');
const router = express.Router();

// Get all movies/series (simplified)
router.get('/movies', async (req, res) => {
  const items = await Movie.find().limit(100);
  res.json(items);
});

// Get one movie/series
router.get('/movies/:id', async (req, res) => {
  const m = await Movie.findById(req.params.id);
  res.json(m);
});

// Get episodes for a series
router.get('/episodes/:movieId', async (req, res) => {
  const eps = await Episode.find({ movieId: req.params.movieId }).sort('number');
  res.json(eps);
});

// Search
router.get('/search', async (req, res) => {
  const q = req.query.q || '';
  const results = await Movie.find({ title: { $regex: q, $options: 'i' } }).limit(50);
  res.json(results);
});

module.exports = router;
