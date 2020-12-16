const socket = io(); 

let name;

let textarea = document.querySelector('#textarea');
let msgArea = document.querySelector('.message-area');

do {
    name = prompt('Join the DevTalk Forum. Enter Your Name : ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter')
    {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    };

    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();
    socket.emit('message', msg);
}

function appendMessage(msg, typeOfMessage) {
    let mainDiv = document.createElement('div');
    let msgClass = typeOfMessage;
    mainDiv.classList.add(msgClass, 'message');

    let markUp = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markUp;
    msgArea.appendChild(mainDiv);
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom() {
    msgArea.scrollTop = msgArea.scrollHeight
}