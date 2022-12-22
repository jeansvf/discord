const input = document.querySelector(".chat-input");
const messagesList = document.querySelector(".messages-list");
const messageElement = document.querySelector(".message-content");
var messageListItem;
var contextMenuDiv;
var contextMenuDivDeleteButton;
var messageId = 0;
var selectedMessage;

const createMessage = () => {
    messageListItem = document.createElement("li");
    messageListItem.classList.add("message-content", messageId + 1);
    messageListItem.innerText = input.value;
    messagesList.appendChild(messageListItem);
    input.value = "";
    messageId++;
    messageListItem.addEventListener("contextmenu", (e) => {
    selectedMessage = e.target;
    createContextMenu();
    })
}

const createContextMenu = () => {
    if (contextMenuDiv !== undefined){
        contextMenuDiv.remove();
    }

    contextMenuDiv = document.createElement("div");
    contextMenuDiv.classList.add("context-menu-div");
    contextMenuDiv.style.left = event.clientX + "px";
    contextMenuDiv.style.top = event.clientY + "px";
    messagesList.appendChild(contextMenuDiv);

    contextMenuDivDeleteButton = document.createElement("div");
    contextMenuDivDeleteButton.classList.add("context-menu-div-delete-button");
    contextMenuDivDeleteButton.innerText = "Delete"
    contextMenuDiv.appendChild(contextMenuDivDeleteButton);

    contextMenuDivDeleteButton.addEventListener("click", () => {
        console.log(selectedMessage);
        selectedMessage.remove();
    })
}


document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value !== "") {
        createMessage();
    }
})

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})

document.addEventListener("click", () => {
    contextMenuDiv.remove();
})
