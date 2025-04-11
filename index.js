import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './connection/db_connect.js';
import fileUpload from 'express-fileupload';
import imageUploader from './routes/imageUploader.js';
import cors from 'cors';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/wall/'
}));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', imageUploader);

app.listen(PORT, (err) => {
    try {
        if (err) {
            console.error('Failed to start the server:', err);
        } else {
            console.log(`Server is running on http://localhost:${PORT}`);
        }
        connectDB();
    }
    catch (error) {
        console.error('Server not responding:', error);
    }
});