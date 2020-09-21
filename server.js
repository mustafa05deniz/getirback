const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const users = require('./src/routes/users');
const ticket = require('./src/routes/ticket');
const config = require('./config/default');
const jwt = require('jsonwebtoken');
var cors = require("cors");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())
app.set('secretKey', 'sadads'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));



app.get('/', function (req, res) {
  res.json({ "name": "kimooo test server", "releases": new Date(), "author": "mustafa05deniz@gmail.com", });
});

app.use('/users', cors(), users);
app.use('/ticket', cors(),validateUser, ticket);

app.get('/favicon.ico', function (req, res) {
  res.sendStatus(204);
});


function validateUser(req, res, next) {
  jwt.verify(req.headers['token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({ status: 999, message: err.message, data: null });
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
}


app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle general  errors
app.use(function (err, req, res, next) {
  if (err.status === 404)
    res.status(404).json({ status: 404, message: "link is not found", data: null });
  else
    res.status(500).json({ status: 500, message: "server error", data: null });

});
app.listen(config.PORT, function () {
  console.info("server is running " + config.PORT)
});

module.exports = app;