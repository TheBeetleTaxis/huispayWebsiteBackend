import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
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
import testimonialRoutes from './routes/testimonialRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import { createMerchantValidator } from './utils/validators/merchantValidator.js';




const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: false,
    
}));

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.header('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.use(helmet());

app.use(cookieParser());

app.use('/api/users', userRoutes);

// Become a merchant
app.use('/api/merchants', merchantRoutes);

// Become an Agent
app.use('/api/agent', agentRoutes);
// Training
app.use('/api/training', trainingRoutes);

// Contact route
app.use('/api/contact-us', contactRoutes);


// create Testimonial 
app.use('/api/testimonials', testimonialRoutes);





app.get('/', (req, res) => res.send('API is running too fast...'));


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
