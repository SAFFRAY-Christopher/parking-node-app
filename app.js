const express = require('express');
const app = express();
const mongoose = require('mongoose');
const parkingRoutes = require('./routes/parking');
const reservationRoutes = require ('./routes/reservation');
const userRoutes = require ('./routes/user');

mongoose.connect('mongodb+srv://Robert:Robert@cluster0.uirnt.mongodb.net/ParkingDataBase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

 
  app.use('/api/parkings', parkingRoutes);
  app.use('/api/reservations', reservationRoutes);
  app.use('/api/users', userRoutes), //...users = url pour cette page


  module.exports = app;

 