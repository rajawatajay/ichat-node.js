const socket = io();
// const prompt = require("prompt-sync")({sigint:true});
let nam;
const textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_arena')
var audio = new Audio('/ding.mp3')

 do {
     nam = prompt("please enter your name: ")
     
 }while(!nam);


 textarea.addEventListener('keyup', (e) => {
   if(e.key === 'Enter') {
      sendMessage(e.target.value)
   }
 });

 function sendMessage(message){
   const msg = {
      user: nam,
      message: message.trim()
   }


   //Append 
   appendMessage(msg, 'outgoing')
   textarea.value = '';
   scrollToBottom();


   //send to server
   socket.emit('message', msg)
 
 }
 function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    const markup = ` 
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
    if (type == 'incoming') {
      audio.play();
  }
}


//Receive messagess

socket.on('message', (msg) => {
  appendMessage(msg, 'incoming');
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
 

