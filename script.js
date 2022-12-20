var input = document.querySelector(".chat-input");
const list = document.querySelector(".messages-list");
var messageElement = document.querySelector(".message-content");
var messageId = 0;

const createMessage = () => {
    let messageLi = document.createElement("li");
    messageLi.classList.add("message-content", messageId + 1);
    messageLi.innerText = input.value;
    list.appendChild(messageLi);
    input.value = "";
    messageId++;
    messageLi.addEventListener("contextmenu", () => {
        messageLi.remove();
    })
}

document.addEventListener( "keydown", () => {
    if (event.key === "Enter" && input.value !== "") {
        createMessage();
    }
})

document.addEventListener("contextmenu", () => {
    event.preventDefault();
})
