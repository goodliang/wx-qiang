var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

// var path =require('path');

var fs = require('fs')


var s = null;


app.use(express.static('views'));



// app.set('views', path.join(__dirname, 'views'));// 指定视图所在的位置
// app.set('view engine', 'html');


// app.get('/sendMsg', function(req, res) {
//     var msg = req.query.word;
//     var head = req.query.headimgurl;
//     var name = req.query.name;
//     s.broadcast.emit('add', { 'val': msg, 'head': head, 'name': name })
//     res.send(msg);
// });



io.on('connection', function(socket) {
    s = socket;
    socket.on('connect', function() {
        console.log('user connected');
    });
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('add', function(data) {
        console.log('data coming', data)
        socket.broadcast.emit('add', data);
    })
})


var server = http.listen(8080, function() {
    // console.log(server.address())
    var host = server.address().ip;
    var port = server.address().port;
    // console.log('Example app listening at http://%s:%s', host, port);
})


/* 定义模拟接口 */
app.post('/user', function(req, res, next) {
    res.json({
        errorno: 0,
        msg: "接口返回：提交成功",
        data: [{
            jobnumber: '6501',
            name: '大佳',
            headimgurl: 'assets/img/1.jpg'
        }, {
            jobnumber: '6502',
            name: '小佳',
            headimgurl: 'assets/img/2.jpg'
        }, {
            jobnumber: '6503',
            name: '大姚',
            headimgurl: 'assets/img/3.jpg'
        }, {
            jobnumber: '6504',
            name: '小姚',
            headimgurl: 'assets/img/4.jpg'
        }, {
            jobnumber: '6505',
            name: '大欢',
            headimgurl: 'assets/img/5.jpg'
        }, {
            jobnumber: '6506',
            name: '二欢',
            headimgurl: 'assets/img/6.jpg'
        }, {
            jobnumber: '6506',
            name: '大二',
            headimgurl: 'assets/img/7.jpg'
        }, {
            jobnumber: '6506',
            name: '小二',
            headimgurl: 'assets/img/8.jpg'
        }, {
            jobnumber: '6506',
            name: '大飞',
            headimgurl: 'assets/img/9.jpg'
        }, {
            jobnumber: '6506',
            name: '小飞',
            headimgurl: 'assets/img/10.jpg'
        }]
    });
});
