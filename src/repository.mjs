import { Artist, Song, PopularSong } from './models.mjs';

const ArtistsRepository = {
  create: (artistData) => Artist.create(artistData),
  findById: (artistId) => Artist.findById(artistId),
  findAll: () => Artist.find(),
  update: (artistId, artistData) =>
    Artist.findByIdAndUpdate(artistId, artistData, { new: true }),
  delete: (artistId) => Artist.findByIdAndDelete(artistId),
};

const SongsRepository = {
  create: (songData) => Song.create(songData),
  findById: (songId) => Song.findById(songId).populate('artist'),
  findAll: () => Song.find().populate('artist'),
  update: (songId, songData) =>
    Song.findByIdAndUpdate(songId, songData, { new: true }).populate('artist'),
  delete: (songId) => Song.findByIdAndDelete(songId),
};

const PopularSongsRepository = {
  create: (popularSongData) => PopularSong.create(popularSongData),
  findById: (popularSongId) =>
    PopularSong.findById(popularSongId).populate('song'),
  findAll: () => PopularSong.find().populate('song'),
  update: (popularSongId, popularSongData) =>
    PopularSong.findByIdAndUpdate(popularSongId, popularSongData, { new: true }).populate('song'),
  delete: (popularSongId) => PopularSong.findByIdAndDelete(popularSongId),
};

export { ArtistsRepository, SongsRepository, PopularSongsRepository };
