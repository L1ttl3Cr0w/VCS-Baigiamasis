import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import toolsRoutes from "./api/routes/product.js"
import reservationRoutes from './api/routes/reservations.js';

import authRoutes from './api/routes/auth.js';
dotenv.config();


const app = express();

//mongoose DB connection
await mongoose
  .connect(process.env.MONGO_URI, {
    //MONGO_URI pasikeiskite is MongoDB: <COPY_STRING_FROM_MONGODB>?authSource=admin

    tlsCAFile: process.env.TLSCAFILE,
    tls: true,
    tlsCertificateKeyFile: process.env.TLSCERTFILE
  })
  .then(() => console.log('Connected to MongoDB with SSL'))
  .catch((err) => console.error('MongoDB connection error:', err));

//middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/auth', authRoutes);

//cors config
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

//routes

app.use('/tools', toolsRoutes)
app.use('/reservations', reservationRoutes)


app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

//server port listen
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));