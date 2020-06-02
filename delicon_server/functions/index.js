const functions = require('firebase-functions');
const express = require('express');
const app = express();
const { signup, login } = require('./handlers/users');
const { newres, getres } = require('./handlers/reservations');
const { Authware } = require('./middlewares/Authware');

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/signup', signup);

app.post('/login', login);

app.post('/reservations', Authware, newres);

app.get('/reservations', Authware, getres);

exports.api = functions.https.onRequest(app);

