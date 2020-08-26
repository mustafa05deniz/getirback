const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); 
const record = require('./src/routes/record');
const config = require('./config/default');
var cors = require("cors");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())
app.set('secretKey', 'getirback'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


app.get('/', function (req, res) {
  res.json({ "name": "getir case","date":"26.08.2020","author":"mustafa05deniz@gmail.com","github":"https://github.com/mustafa05deniz/getirback" });
});

app.use('/records', cors(), record);


app.get('/favicon.ico', function (req, res) {
  res.sendStatus(204);
});

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle general  errors
app.use(function (err, req, res, next) {
  if (err.status === 404)
    res.status(404).json({ status: 404, message: "link is not found",data:null });
  else
    res.status(500).json({ status: 500, message: "server error" ,data:null});

});
app.listen(config.PORT, function () {
  console.info("server is running "+config.PORT)
});

module.exports = app;