const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['movie','series'], default: 'movie' },
  poster: String,
  description: String,
  categories: [String],
  language: String,
  country: String,
  rating: Number,
  externalSourceId: String
});

module.exports = mongoose.model('Movie', MovieSchema);
