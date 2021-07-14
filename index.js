/* eslint-disable */
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const cors = require('cors');
const ENV = require('dotenv').config({ path: `${__dirname}/.env` });

const app = express();
const cookieParser = require('cookie-parser');
const UserHandle = require('./Server/Routes/UserHandle');
// init and middlewares
const dev = process.env.NODE_ENV !== 'production';
const { DB_KEY } = process.env;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 80;
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
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
    app.get('*', (req, res) => handle(req, res));
    app.listen(port, () => {
      console.log(`Listening to the port ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
