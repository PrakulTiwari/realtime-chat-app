//Making a socket connection
const socket = io('https://murmuring-refuge-67686.herokuapp.com/');  
//https://murmuring-refuge-67686.herokuapp.com/
//http://localhost:3000/

//query DOM
const output = document.getElementById('output')
      handle = document.getElementById('handle')
      message = document.getElementById('message')
      send = document.getElementById('send')
      joinRoom = document.getElementById('joinRoom')
      chatWindow = document.getElementById('chat-window')
      mainChat = document.getElementById('main-chat')
      feedback = document.getElementById('feedback') 
      room = document.getElementById('room')
      videoCall = document.getElementById('video-call')

var roomVar = ''

joinRoom.addEventListener('click', async () => {
    roomVar = room.value;
    if (roomVar != '') {
        socket.emit('join-room',room.value, handle.value)
        handle.disabled = true;
    }
    else {
        alert('Please join a room. You can enter anything if you want to create a room.')
    }
    await fetch('https://murmuring-refuge-67686.herokuapp.com/name', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
    },
        body: JSON.stringify({"name":handle.value}),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    // console.log(JSON.stringify(handle.value))
})

//Events
send.addEventListener('click', ()=>{
    //emit is emiting the chat along with the object containg message and the handle
    if (roomVar === '') {
        alert('Please join a room. You can enter anything if you want to create a room.')
    }
    else {
        socket.emit('chat',{
            message: message.value,
            handle:handle.value,
            room:room.value
        })
    }
    message.value=''
})

message.addEventListener('keyup', (event)=>{
    event.preventDefault();
    //emit is emiting the chat along with the object containg message and the handle
    if (event.keyCode === 13) {
        if (roomVar === '') {
            alert('Please join a room. You can enter anything if you want to create a room.')
        }
        else {
            socket.emit('chat',{
                message: message.value,
                handle:handle.value,
                room:room.value
            })
        }
        message.value=''
    }
})

videoCall.addEventListener('click', ()=>{
    if(roomVar === ''){
        alert('Please join a room. You can enter anything if you want to create a room.')
    }
    else{
        socket.emit('video-call',room.value,handle.value)
    }
})

room.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        roomVar = room.value;
        if (roomVar != '') {
            socket.emit('join-room',room.value, handle.value)
            handle.disabled = true;
        }
        else {
            alert('Please join a room. You can enter anything if you want to create a room.')
        }
    }
})

//Event for broadcasting
message.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value,room.value)
})

//listen for events
socket.on('chat',(data)=>{
    feedback.innerHTML = ''
    if(data.handle == handle.value){
        output.innerHTML += `<p style="align-self: flex-end;border-radius: 20px 20px 0px 20px;"><strong>${data.handle} : </strong>${data.message}</p>`
    }
    else{
        output.innerHTML += `<p style="color:black;background:#DEE9EF;"><strong>${data.handle} : </strong>${data.message}</p>`
    }
    chatWindow.scrollTop = chatWindow.scrollHeight;
})

//broadcasting message
socket.on('typing',(data)=>{
    feedback.innerHTML = `<p><em>${data} is typing a message...<em></p>`
    chatWindow.scrollTop = chatWindow.scrollHeight;
})

socket.on('room-joined',(handl,room)=>{
    feedback.innerHTML = ''
    if (handl == handle.value) {
        output.innerHTML += `<p style="align-self: flex-end;border-radius: 20px 20px 0px 20px;"><strong>${handl} joined ${room} !</strong></p>`
    } else {
        output.innerHTML += `<p style="color:black;background:#DEE9EF;"><strong>${handl} joined ${room} !</strong></p>`
    }
})

socket.on('start-video-call', (videoID,handl) => {
    feedback.innerHTML = ''
    if (handl != handle.value) {
        let askvideoCall = confirm(`${handl} wants to start a video call?`)
        if(askvideoCall==true){
            socket.emit('video-confirmation',room.value,handl,videoID)
            window.location.href = 'https://justallcall.herokuapp.com/'+videoID;
        }
    }
    else {
        feedback.innerHTML = `<p><em>Waiting for confirmation of at least one person....<em></p>`
    }
})

socket.on('video-confirmation', (room,handl,videoID) => {
    feedback.innerHTML = ''
    if (handle.value == handl) {
        window.location.href = 'https://justallcall.herokuapp.com/'+videoID;
    }
})