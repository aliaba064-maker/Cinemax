const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
  movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
  number: Number,
  title: String,
  videoUrl: String,
  duration: Number
});

module.exports = mongoose.model('Episode', EpisodeSchema);
