
const express = require('express');
const nedb = require('nedb');
const app = express();
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 8080 });
const path = require('path');
const port = 3000;
app.use('/js', express.static('public/js'));
app.use('/css', express.static("public/css"));
//Routes
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
  })

//Database
const database = new nedb({filename:"data/messages.db"});
database.loadDatabase((err)=>{
    if(err != undefined){
        console.log(err.message);
    }
});

function getAllMessages(){
    database.find({}).exec((error,messages)=>{
        if(error != undefined){
            console.log(error);
        }else{
            return messages;
        }
    })
}
function addMessage(nickname,message){
database.insert({nickname,message},(error)=>{
    if(error != undefined){
        console.log(error);
    }
})
}