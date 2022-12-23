const input = document.querySelector(".chat-input");
const messagesList = document.querySelector(".messages-list");
const messageElement = document.querySelector(".message-content");
var messageListItem;
var contextMenu;
var contextMenuDeleteButton;
var contextMenuEditButton;
var messageId = 0;
var selectedMessage;
var beingEdited;
var editInput;

//test
var editInputWrapper;

const createMessage = () => {
    // MAKE THE BACKGROUND COLOR OF THE MESSAGE CONTINUE HIGHLITED IF THE CONTEXTMENU IS OPEN
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
        beingEdited = selectedMessage.innerText;
        createEditInput();
        selectedMessage.parentNode.replaceChild(editInputWrapper, selectedMessage);
    })
}

const createEditInput = () => {
    //test
    editInputWrapper = document.createElement("div");
    editInputWrapper.classList.add("edit-input-wrapper")



    editInput = document.createElement("input");
    editInput.classList.add("edit-input");
    editInput.value = beingEdited;

    //test
    editInputWrapper.appendChild(editInput);


    editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            createNewEditedMessage();
        }
    })
}

// other functions

const createNewEditedMessage = () => {
    messageListItem = document.createElement("li");
    messageListItem.classList.add("message-content"); 
    messageListItem.innerText = editInput.value;
    editInputWrapper.parentNode.replaceChild(messageListItem, editInputWrapper);
    // ADD THE ID TO THE MESSAGE BACK AGAIN, JUST STORE THE VALUE BEFORE REMOVING IT
}

const createContextMenuDelete = () => {
    contextMenuDeleteButton = document.createElement("div");
    contextMenuDeleteButton.classList.add("context-menu-delete-button");
    contextMenuDeleteButton.innerText = "Delete"
    contextMenu.appendChild(contextMenuDeleteButton);
}

const createContextMenuEdit = () => {
    contextMenuEditButton = document.createElement("div");
    contextMenuEditButton.classList.add("context-menu-edit-button");
    contextMenuEditButton.innerText = "Edit";
    contextMenu.appendChild(contextMenuEditButton);
}

// event listeners

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value !== "") {
        createMessage();
    }
})

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})

document.addEventListener("click", () => {
    contextMenu.remove();
})