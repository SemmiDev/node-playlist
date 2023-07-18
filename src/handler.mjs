import express from 'express';
import { MusicService } from './service.mjs';

const router = express.Router();

router.post('/artists', async (req, res) => {
  try {
    const artist = await MusicService.createArtist(req.body);
    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create artist' });
  }
});

router.post('/songs', async (req, res) => {
  try {
    const song = await MusicService.createSong(req.body);
    res.status(201).json(song);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create song' });
  }
});

router.post('/popular-songs', async (req, res) => {
  try {
    const popularSong = await MusicService.createPopularSong(req.body);
    res.status(201).json(popularSong);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create popular song' });
  }
});

router.get('/artists', async (req, res) => {
  try {
    const artists = await MusicService.getAllArtists();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch artists' });
  }
});

router.get('/songs', async (req, res) => {
  try {
    const songs = await MusicService.getAllSongs();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch songs' });
  }
});

router.get('/popular-songs', async (req, res) => {
  try {
    const popularSongs = await MusicService.getAllPopularSongs();
    res.json(popularSongs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch popular songs' });
  }
});

router.post('/play-song/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const song = await MusicService.playSong(id);
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: 'Failed to play the song' });
  }
});

router.get('/artists/genre/:genre', async (req, res) => {
  try {
    const { genre } = req.params;
    const artists = await MusicService.getArtistsByGenre(genre);
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch artists by genre' });
  }
});

router.get('/popular-songs/top/:limit', async (req, res) => {
  try {
    const { limit } = req.params;
    const topSongs = await MusicService.getMostPopularSongs(parseInt(limit));
    res.json(topSongs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch top popular songs' });
  }
});

export default router;
