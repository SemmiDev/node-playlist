import dotenv from 'dotenv';
import { MusicServicePopulate } from './service.mjs';

dotenv.config();

const artistsData = [
  {
    name: 'Artist 1',
    dateOfBirth: new Date('1990-01-01'),
    genres: ['Pop', 'Rock'],
  },
  {
    name: 'Artist 2',
    dateOfBirth: new Date('1985-03-15'),
    genres: ['R&B', 'Soul'],
  },
];

const songsData = [
  {
    title: 'Song 1',
    artists: [], // Will be populated with the artist IDs later
    album: 'Album 1',
  },
  {
    title: 'Song 2',
    artists: [], // Will be populated with the artist IDs later
    album: 'Album 2',
  },
  // Add more songs here...
];

const popularSongsData = [
  {
    title: 'Song 1',
    playCount: 100,
    period: '2023-06',
    song: null, // Will be populated with the song ID later
  },
  {
    title: 'Song 2',
    playCount: 50,
    period: '2023-06',
    song: null, // Will be populated with the song ID later
  },
];

export async function deleteAllData() {
  try {
    await MusicServicePopulate.deleteAllPopularSongs();
    await MusicServicePopulate.deleteAllSongs();
    await MusicServicePopulate.deleteAllArtists();
    console.log('Dummy data deleted successfully.');
  } catch (error) {
    console.error('Error deleting dummy data:', error.message);
  }
}

export async function populateData() {
  try {
    // First, delete all existing data
    await deleteAllData();

    // Create artists
    const artists = await MusicServicePopulate.createArtists(artistsData);

    // Update the songsData with the corresponding artist IDs
    const updatedSongsData = songsData.map((song, index) => ({
      ...song,
      artists: [artists[index]._id], // Use an array of artist IDs for multiple artists
    }));

    // Create songs
    const songs = await MusicServicePopulate.createSongs(updatedSongsData);

    // Update the popularSongData with the corresponding song ID
    const updatedPopularSongsData = popularSongsData.map((popularSong, index) => ({
      ...popularSong,
      song: songs[index]._id,
    }));

    // Create popular songs
    await MusicServicePopulate.createPopularSongs(updatedPopularSongsData);

    console.log('Dummy data populated successfully.');
  } catch (error) {
    console.error('Error populating dummy data:', error.message);
  }
}
