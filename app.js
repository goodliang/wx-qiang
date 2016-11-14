
var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

// var path =require('path');

var fs =require('fs')


var s=null;


app.use(express.static('views'));



// app.set('views', path.join(__dirname, 'views'));// 指定视图所在的位置
// app.set('view engine', 'html');

app.get('/', function (req, res) {
  res.render('index',{a:'i am a'});
});


  app.get('/sendMsg', function (req, res) {
  var msg = req.query.word;

     console.log(typeof s);

   s.broadcast.emit('add', {'val':msg})
   console.log('/get')


  res.send(msg);
});



io.on('connection', function(socket){
  s=socket;

    socket.on('connect', function(){
    console.log('user connected');
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('add', function (data) {
  	console.log('data coming',data)
     socket.broadcast.emit('add', data);
  })



  })


var server = http.listen(8080, function () {
	console.log(server.address())
  var host = server.address().ip;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})