const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
  history: [
    {
      workId: { type: Schema.Types.ObjectId, ref: 'Movie' },
      type: { type: String, enum: ['movie','series'], default: 'movie' },
      watchedAt: { type: Date, default: Date.now },
      progress: { type: Number, default: 0 }
    }
  ],
  downloads: [
    {
      workId: { type: Schema.Types.ObjectId, ref: 'Movie' },
      type: { type: String, enum: ['movie','series'], default: 'movie' },
      downloadedAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
