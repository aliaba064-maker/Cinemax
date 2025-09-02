const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  workId: { type: Schema.Types.ObjectId, ref: 'Movie' },
  user: String,
  text: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
