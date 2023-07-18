import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.MONGO_URI;

async function connectDb() {
    if (!dbUri) {
        dbUri = 'mongodb://localhost:27017/node-playlist';
        console.log('Using default dbUri');
    }

    try {
        await mongoose.connect(dbUri);
    } catch (error) {}
}

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});

export default connectDb;
