module.exports = function (io) {
    // Set socket.io listeners.
    io.on('connection', (socket) => {
        console.log("connection extablished");

        socket.on('send message', function () {
            console.log("message sent");
            socket.broadcast.emit('receive message');

        });
    });
}

//console.log('a user connected');
// On conversation entry, join broadcast channel
//   socket.on('enter conversation', (conversation) => {
//     socket.join(conversation);
//    console.log('joined ' + conversation);
//   });
//
//   socket.on('leave conversation', (conversation) => {
//     socket.leave(conversation);
//     // console.log('left ' + conversation);
//   })
//
//   socket.on('new message', (conversation) => {
//     console.log(conversation);
//     io.sockets.emit('refresh messages', conversation);
//     });
//
//   socket.on('disconnect', () => {
//     //console.log('user disconnected');
//   });
// });

  