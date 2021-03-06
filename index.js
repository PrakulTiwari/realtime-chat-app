const express = require('express');
const socket = require('socket.io')
const PORT = process.env.PORT || 3000
const cors = require('cors'); 
const {v4 : uuidv4} = require('uuid');
const mongoose = require('mongoose')
const Name = require('./models/name')
require('dotenv').config()

mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('db connected')
    })
    .catch((err) => { console.log(err) });

const app = express();
//Setting up port
const server = app.listen(PORT,console.log(`Running on ${PORT}`))

app.use(cors({origin:'https://chatting-web-app.netlify.app'}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


//static file
// app.use(express.static('public'));

//Socket setup
const io = socket(server,{
    cors: {
      origin: 'https://chatting-web-app.netlify.app'
    }
  });
io.on('connection',(socket)=>{
    console.log('Made a connection',socket.id)
//
    socket.on('join-room',(room, handle)=>{
        socket.join(room)
        console.log(handle);
        socket.to(room).emit('room-joined', handle,room) //Emiting to all sockets in room except user itself
        socket.emit('room-joined',handle,room) //Emitting to the user itself
    })

    //Listening for data from all connected sockets
    socket.on('chat',(data)=>{
        //Emitting the data to all the sockets as soon as chat(data) is recieved from any client socket
        if (data.room === '') {
            socket.broadcast.emit('chat',data) // Broadcasting to all sockets connected to the server 
            socket.emit('chat',data)
        }
        else {
            socket.to(data.room).emit('chat',data)
            socket.emit('chat',data)
        }
    })

    //Broadcasting  data to all connected sockets
    socket.on('typing',(data,room)=>{
        //Broadcasting the data to all the sockets as soon as chat(data) is recieved from any client socket
        socket.to(room).emit('typing',data)
    })

    socket.on('video-call',(room,handle)=>{
        let videoID = uuidv4();
        socket.to(room).emit('start-video-call',videoID,handle)
        socket.emit('start-video-call',videoID,handle)
    })

    socket.on('video-confirmation', (room,handle,videoID) => {
        console.log('Confirmed')
        socket.to(room).emit('video-confirmation',room,handle,videoID)
    })
})

app.post('/name',(req,res)=>{
        console.log(req.body)
        const user = new Name(req.body)
        user.save()
            .then((result) => {
                res.json({"sucess":true})
            })
            .catch((err) => {
                console.log(err)
            })
    }
)