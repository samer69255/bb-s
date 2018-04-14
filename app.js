var express = require('express');
var path = require('path');

var Req = require('request');

var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req,res,next) {
  if(!req.query.hash || req.query.hash !== "1111991")
  {
    res.status(403);
    res.end('your are banned');
    console.log(req.query);
    return;
  }

  console.log(req.body);

  next();
});

app.post('/attack',function (req,res) {
  var time = req.body.time - getNow();

  setTimeout(attack,time);
  console.log('starting');
  res.end('started');
});



app.use('/', function (req,res) {
  res.end('hi');
});

app.use(function (req,res) {
  res.status(404);
  res.end('Not Found');
});

function attack() {
  console.log(new Date(getNow()));
}


function getNow() {
  var iraq = new Date(Date.now() + (new Date).getTimezoneOffset() *60000+ 10800000).getTime();
  return iraq;
}

console.log(new Date(getNow()).getTime());


module.exports = app;
