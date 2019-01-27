const url = 'ws://localhost:8080/';
const connection = new WebSocket(url)
const btn = document.querySelector("#sendBtn");
const msgList = document.querySelector("#message-list");
const msgInput = document.querySelector("#message-input");
function appendToList(msg) {
  let node = document.createElement("li");                 // Create a <li> node
  let textnode = document.createTextNode(msg);         // Create a text node
  node.classList.add("message");
  node.appendChild(textnode);
  msgList.appendChild(node);
}

connection.onopen = () => {
  console.log("Polaczone");

};
connection.onerror = error => {
  console.log(`WebSocket error: ${error}`);
};
connection.onmessage = e => {

  let messageList = JSON.parse(e.data);
  for(let i=0; i<messageList.length; i++){
        let msg = messageList[i];
  
  appendToList(msg.nickname + " powiedział : " + msg.message);
  }


};
function logout() {
 localStorage.removeItem("username");
 window.location = "/";
}
function getUserNameFromCookie() {
 return localStorage.getItem("username");
}
function sendMessage() {

  connection.send(JSON.stringify({
    nickname: getUserNameFromCookie(),
    content: msgInput.value
  }));

}
sendBtn.addEventListener("click", sendMessage);
document.querySelector("#logoutBtn").addEventListener('click', logout);