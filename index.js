const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const cors = require("cors");
const ENV = require("dotenv").config({ path: __dirname + "/.env" });
const app = express();
const UserHandle = require("./Posting Apps/Routes/UserHandle");
const cookieParser = require("cookie-parser");
//init and middlewares
//
//
//
app.enable('trust proxy');
const dev = process.env.NODE_ENV !== "production";

const DB_KEY = process.env["DB_KEY"];
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
//
//
//
app.use(function(request, response, next) {

    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
});
nextApp
  .prepare()
  .then(() => {
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    app.use(cookieParser());
    // app.use(csurf({ cookie: true }));
    app.use("/uh", UserHandle);
    app.use("/index", express.static(`./static`));
    //connection to database

    mongoose
      .connect(DB_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("Connected");
      })
      .catch((err) => {
        console.log(err);
      });
    //routes

    //routes
    app.get("*", (req, res) => {
      return handle(req, res);
    });

    //start server
    //start server

    app.listen(process.env.PORT, () => {
      console.log("Listening to the port 80");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
