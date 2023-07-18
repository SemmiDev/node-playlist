// service.mjs
import { Artist, Song, PopularSong } from './models.mjs';

export const MusicServicePopulate = {
    async createArtists(artistData) {
        return Artist.create(artistData);
    },

    async createSongs(songData) {
        return Song.create(songData);
    },

    async createPopularSongs(popularSongData) {
        return PopularSong.create(popularSongData);
    },

    async deleteAllSongs() {
        return Song.deleteMany();
    },

    async deleteAllArtists() {
        return Artist.deleteMany();
    },

    async deleteAllPopularSongs() {
        return PopularSong.deleteMany();
    },
};

export const MusicService = {
    async createArtist(artistData) {
        // Add validation before creating an artist
        if (!artistData.name || !artistData.dateOfBirth || !artistData.genres) {
            throw new Error(
                'Name, date of birth, and genres are required to create an artist.'
            );
        }

        return Artist.create(artistData);
    },

    async createSong(songData) {
        console.log(songData);
        // Add validation before creating a song
        if (!songData.title || !songData.artists || !songData.album) {
            throw new Error(
                'Title, artist, and album are required to create a song.'
            );
        }

        return Song.create(songData);
    },

    async createPopularSong(popularSongData) {
        // Add validation before creating a popular song
        if (!popularSongData.title || !popularSongData.song) {
            throw new Error(
                'Title and song are required to create a popular song.'
            );
        }

        return PopularSong.create(popularSongData);
    },

    async getAllArtists() {
        return Artist.find();
    },

    async getAllSongs() {
        return Song.find().populate('artists'); // populate means to get the artist data
    },

    async playSong(songId) {
        // Increment play count for the given song
        try {
            const song = await Song.findByIdAndUpdate(
                songId,
                { $inc: { playCount: 1 } },
                { new: true } // that means return the updated song
            );

            return song;
        } catch (error) {
            throw new Error('Failed to update play count for the song.');
        }
    },

    async getArtistsByGenre(genre) {
        // Get artists by genre using aggregation
        return Artist.find({ genres: genre });
    },


    async getAllPopularSongs() {
        return PopularSong.find().populate('song');
    },

    async getMostPopularSongs(limit) {
        // Get the most popular songs by play count using aggregation
        return Song.aggregate([
            {
                $lookup: {
                    from: 'popularsongs',
                    localField: '_id',
                    foreignField: 'song',
                    as: 'popularSongs',
                },
            },
            { $unwind: '$popularSongs' }, // that means flatten the popularSongs array
            { $sort: { 'popularSongs.playCount': -1 } }, // that means descending order
            { $limit: limit }, // that means limit the number of results
        ]);
    },
};
