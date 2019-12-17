var express = require('express');
var socket = require('socket.io');


var app = express();


server = app.listen(3000, function () {
    console.log('server is running on port 3000')
});

io = socket(server);

io.on('connection', function (socket) {
    console.log("l\'utilisateur " + socket.id + " vient de se connecter");

    socket.on('disconnect', function () {
        console.log("l\'utilisateur " + socket.id + " vient de partir");
    });
    socket.on('SEND_MESSAGE', function (data) {
        var str = data.message;

        if (str == "/help") {
            io.emit('fils de pute');
        } else {
            console.log(data.author + " : " + data.message)
            io.emit('RECEIVE_MESSAGE', data);
        }

        // console.log(str)
        // switch (str) {
        //     case str.startsWith('/help'):
        //         console.log('hello')
        //         break;

        //     default:
        //         console.log(data.author + " : " + data.message)
        //         io.emit('RECEIVE_MESSAGE', data);
        //         break;
        // }

    })
});
