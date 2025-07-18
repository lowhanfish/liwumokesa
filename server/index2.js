const express = require('express');
const db = require('monk')('localhost:27017/auth-for-noobs');

const notes = db.get('notes')

const app = express();





const server = app.listen(3001, function() {
    console.log('server running on port 3001');
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(socket.id);

    notes.find().then(notes => {
        socket.emit('MESSAGE', notes)
    });
    // socket.on('SEND_MESSAGE', function(data) {
    //     notes.find().then(notes => {
    //         io.emit('MESSAGE', notes)
    //     });
    // });

});

app.get('/tes',(req,res) =>{
    // res.socket.emit("MESSAGE", "usersrrrrrrrrr");
    // res.send('respond with a resource.');
})
