import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './handler.mjs';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/music', router);

export default app;
