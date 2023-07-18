// models.js
import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date },
  genres: { type: [String] },
});

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true }],
  album: { type: String },
});

const popularSongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  playCount: { type: Number, default: 0 },
  period: { type: String },
  song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
});

const Artist = mongoose.model('Artist', artistSchema);
const Song = mongoose.model('Song', songSchema);
const PopularSong = mongoose.model('PopularSong', popularSongSchema);

export { Artist, Song, PopularSong };
