import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import redis from 'redis';
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import merchantRoutes from './routes/merchantRoutes.js';
import trainingRoutes from './routes/trainingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';




const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: false,
  })
);
app.use(helmet());

app.use(cookieParser());

app.use('/api/users', userRoutes);

// Become a merchant
app.use('/api/merchants', merchantRoutes);
// Training
app.use('/api/training', trainingRoutes);

// Contact route
app.use('/api/contact-us', contactRoutes);


// Testimonial route
// app.use('/api/testimonials', );

// to start redis server 
let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();




app.get('/', (req, res) => res.send('API is running too fast...'));


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
