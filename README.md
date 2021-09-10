# Documentation

## Project Description

A two-way interactive communication session between the user's browser and a node.js server using sockets and event driven REST APIs. Socket.io is the library used here for broadcasting,emiting and listening of different socket events. MongoDB database connection is given using REST API post request from the api. Frontend is deployed on netlify and backend API on heroku.<br>

### Project Demo: https://chatting-web-app.netlify.app/
![chat-app](https://user-images.githubusercontent.com/70375457/127663716-9f753275-d998-4941-9431-932ddabc2c5c.png)

<br><hr><br>

![socket.io](https://img.shields.io/badge/socket.io%20-%23148.svg?&style=for-the-badge&logo=socket.io&logoColor=black)
![js](https://img.shields.io/badge/javascipt%20-%2314677.svg?&style=for-the-badge&logo=javascript&logoColor=default)
![mongodb](https://img.shields.io/badge/mongodb%20-%2314677.svg?&style=for-the-badge&logo=mongodb&logoColor=red)
![heroku](https://img.shields.io/badge/heroku%20-%23679.svg?&style=for-the-badge&logo=heroku&logoColor=black)
![netlify](https://img.shields.io/badge/netlify%20-%23143.svg?&style=for-the-badge&logo=netlify&logoColor=pink)
![html](https://img.shields.io/badge/html%20-%231437.svg?&style=for-the-badge&logo=HTML5&logoColor=red)
![Express](https://img.shields.io/badge/express%20-%2314354C.svg?&style=for-the-badge&logo=express&logoColor=white) 
![node.js](https://img.shields.io/badge/node.js%20-%2314.svg?&style=for-the-badge&logo=node.js&logoColor=white)


<br><br><hr>

## Installation
![rooms](https://user-images.githubusercontent.com/70375457/127663807-dad8ecc8-a625-4a67-bdaf-4f5ea11e98a5.png)


Step 1: Setting up project in your system:<br>
`git clone https://github.com/PrakulTiwari/realtime-chat-app.git`
<br>
Step 2: Installing all the required packages:<br>
`npm install`<br>
Step 3: Changing few lines in the index.js:<br>
Replace :<br> `origin : * `
<br>In cors everywhere<br>
Step 4: Start the server:<br>
`nodemon index.js`
<br>
Step 5: Change url in public/script.js:<br>
Replace this:<br>
`https://murmuring-refuge-67686.herokuapp.com/` <br>
By this:<br>
`http://localhost:3000/`<br>
<br>
Now your project must be up and running !!

<hr>

## Working

When user clicks on the button in frontend it emits a socket with parameters:<br>

```
//client side
socket.emit('chat',{
            message: message.value,
            handle:handle.value,
            room:room.value
        })
```

<br>
 which is then listened by the server sockets:<br>

 ```
 socket.on('chat',(data)=>{
        //Emitting the data to all the sockets as soon as chat(data) is recieved from any client socket
        if (data.room === ) {
```


and as soon as server socket listens to that event it return another socket with parameters:<br>

```
  socket.broadcast.emit('chat',data) // Broadcasting to all sockets connected to the server 
            socket.emit('chat',data)
```


then the frontend listens to the socket returned from the server:<br>
```
socket.on('chat',(data)=>{
})
```
<hr>


