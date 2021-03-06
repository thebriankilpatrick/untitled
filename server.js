const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
var cookieParser = require('cookie-parser');

require("./config/passport")(passport);

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // app.use("*", express.static("client/build"));
}

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',
  resave: false, //required
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


// Define API routes here
require("./routes")(app, passport);

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/card-game");
mongoose.connect(process.env.MONGODB_URI || "mongodb://user:supersmash1@ds117913.mlab.com:17913/heroku_sj8s2smp");

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   console.log("* route in server.js")
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

const server = require('http').Server(app);
require("./socket.js")(server)
// const io = require('socket.io').listen(server);
// io.on("connection", require("./socket.js"));//importing socket.io methods


server.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
