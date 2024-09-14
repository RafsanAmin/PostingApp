/* eslint-disable */
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: `${__dirname}/.env` });
const postHandle = require('./server/Routes/PostHandle');
const UserHandle = require('./server/Routes/UserHandle');
const GroupHandle = require('./server/Routes/GroupHandle');
const cloudinary = require('cloudinary').v2;
const { SocketInstance, cH } = require('./server/Routes/ChatHandle');
const cookieParser = require('cookie-parser');

// init and middlewares
const dev = process.env.NODE_ENV !== 'production';
const { DB_KEY } = process.env;
const port = process.env.PORT || 80;

const app = express();
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
//https redirection
app.enable('trust proxy');
app.use((request, response, next) => {
  if (process.env.NODE_ENV != 'development' && !request.secure) {
    return response.redirect(`https://${request.headers.host}${request.url}`);
  }
  next();
});
nextApp
  .prepare()
  .then(() => {
    app.use('/uh', UserHandle);
    app.use('/pH', postHandle);
    app.use('/cH', cH);
    app.use('/gh', GroupHandle);
    //database
    mongoose
      .connect(DB_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log('Connected');
      })
      .catch((err) => {
        console.log(err);
      });
    //remote fileserver
    cloudinary.config({
      cloud_name: process.env['CLOUD_NAME'],
      api_key: process.env['API_KEY'],
      api_secret: process.env['API_SECRET'],
      secure: true,
    });
    //routes
    app.get('/log', (req, res) => {
      console.log(req.query.msg);
      res.status(200).json({ done: true });
    });
    app.get('*', (req, res) => handle(req, res));
    app.use((err, next, req, res) => {
      if (!err.massage) {
        console.log(err);
        res.status(500).json({ done: false, massage: 'A Server Side Error' });
      }
    });
    SocketInstance.makeSocketServer(
      app.listen(port, () => {
        console.log(`Listening to the port ${port}`);
      })
    );
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
