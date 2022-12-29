const input = document.querySelector(".chat-input");
const messagesList = document.querySelector(".messages-list");
const messageElement = document.querySelector(".message-content");
var messageListItem;
var contextMenu;
var contextMenuDeleteButton;
var contextMenuEditButton;
var selectedMessage;
var beingEdited;
var editInput;
var editInputWrapper;
var messageAndTimeWrapper;

// functions

const createContextMenu = () => {
    if (contextMenu !== undefined){
        contextMenu.remove();
    }
    contextMenu = document.createElement("div");
    contextMenu.classList.add("context-menu");
    contextMenu.style.left = event.clientX + "px";
    contextMenu.style.top = event.clientY + "px";
    messagesList.appendChild(contextMenu);
    createContextMenuDelete();
    createContextMenuEdit();

    contextMenuDeleteButton.addEventListener("click", () => {
        console.log(selectedMessage);
        selectedMessage.remove();
    })

    contextMenuEditButton.addEventListener("click", () => {
        if (editInputWrapper == undefined || editInputWrapper == null) {
        createEditInput();
        selectedMessage.parentNode.replaceChild(editInputWrapper, selectedMessage);
        editInput.focus();
    }})
    document.addEventListener("click", () => {
    contextMenu.remove();
})
}

const createEditInput = () => {
    editInputWrapper = document.createElement("div");
    editInputWrapper.classList.add("edit-input-wrapper");

    editInput = document.createElement("input");
    editInput.classList.add("edit-input");
    editInput.value = selectedMessage.querySelector(".message-content").innerText;

    editInputCancelWarn = document.createElement("div");
    editInputCancelWarn.classList.add("edit-input-cancel-warn");
    editInputCancelWarn.innerText = `press escape to cancel`;

    editInputWrapper.appendChild(editInput);
    editInputWrapper.appendChild(editInputCancelWarn);

    editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && editInput.value !== "") {
            createNewEditedMessage(editInput.value);
        }
    })
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            createNewEditedMessage(selectedMessage.querySelector(".message-content").innerText);
        }
    })
}

const createNewEditedMessage = (message) => {
    messageAndTimeWrapper = document.createElement("div");
    messageAndTimeWrapper.classList.add("message-and-time-wrapper");

    messageListItem = document.createElement("li");
    messageListItem.classList.add("message-content");
    messageListItem.innerText = message;

    addMessageTime();

    messageAndTimeWrapper.appendChild(messageListItem);

    messageAndTimeWrapper.addEventListener("contextmenu", (e) => {
        selectedMessage = e.target;
        createContextMenu();
    })

    editInputWrapper.parentNode.replaceChild(messageAndTimeWrapper, editInputWrapper);
    editInputWrapper = undefined;
}

const createMessage = () => {
    messageAndTimeWrapper = document.createElement("div");
    messageAndTimeWrapper.classList.add("message-and-time-wrapper");

    messageListItem = document.createElement("li");
    messageListItem.classList.add("message-content");
    messageListItem.innerText = input.value;

    addMessageTime();

    messageAndTimeWrapper.appendChild(messageListItem);
    messagesList.appendChild(messageAndTimeWrapper);
    input.value = "";

    messageAndTimeWrapper.addEventListener("contextmenu", (e) => {
        selectedMessage = e.target;
        createContextMenu();
    })
}

const createContextMenuDelete = () => {
    contextMenuDeleteButton = document.createElement("div");
    contextMenuDeleteButton.classList.add("context-menu-delete-button");
    contextMenuDeleteButton.innerText = "Delete";
    contextMenu.appendChild(contextMenuDeleteButton);
}

const createContextMenuEdit = () => {
    contextMenuEditButton = document.createElement("div");
    contextMenuEditButton.classList.add("context-menu-edit-button");
    contextMenuEditButton.innerText = "Edit";
    contextMenu.appendChild(contextMenuEditButton);
}

const addMessageTime = () => {
    let messageDate = new Date;
    let messageHours = messageDate.getHours();
    let messageMinutes = messageDate.getMinutes();

    let amOrPm;
    if (messageHours < 12) {
        amOrPm = "AM";
    } else {
        amOrPm = "PM";
    }

    if (messageMinutes < 10) {
        messageMinutes = "0" + messageMinutes;
    }

    let messageTime = document.createElement("span");
    messageTime.classList.add("message-time");
    messageTime.innerText = messageHours + ":" + messageMinutes + " " + amOrPm;
    messageAndTimeWrapper.appendChild(messageTime);
}

// event listeners

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value !== "") {
        createMessage();
    }
})

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})


