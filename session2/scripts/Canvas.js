// need the allowDrop method for draggables in the script.js
function allowDrop(event) {
    event.preventDefault();
}

// set a "draggedElementState" to keep track of the selection on the dropdown
let draggedElementState = null;
let trashObj = document.getElementById("trash")
let blockRemoveObj = document.getElementById("block-remove")
let instCount = 0;

trashObj.addEventListener("dragover", dragOverTrash);
trashObj.addEventListener("dragleave", dragExitTrash);
trashObj.addEventListener("drop", trashDrop);
blockRemoveObj.addEventListener("dragover", dragOverTrash);
blockRemoveObj.addEventListener("drop", trashDrop);


// When the dragging starts, save the move selected to the "draggedElementState"
document.addEventListener('dragstart', (event) => {
    const draggedElement = event.target.closest('.draggable');
    // If the element is a move block, include the selectedValue
    if (draggedElement && draggedElement.classList.contains("move")) {
        draggedElementState = {
            element: draggedElement,
            selectedValue: draggedElement.querySelector('select').value,
        };
    // If the element is a drink block, only include the element
    } else if (draggedElement && draggedElement.classList.contains("drink")) {
        draggedElementState = {
            element: draggedElement,
        };
    } else if (draggedElement && draggedElement.classList.contains("eat")) {
    draggedElementState = {
        element: draggedElement,
    };
    } else if (draggedElement && draggedElement.classList.contains("start")){
        draggedElementState = {
            element: draggedElement,
        };    
    }
});

// Drop function handles creating a new block in the canvas after a block is dragged there
function drop(event) {
    event.preventDefault();
    if (draggedElementState) {
        const draggedElement = draggedElementState.element;
        const selectedValue = draggedElementState.selectedValue;
        const newBlock = draggedElement.cloneNode(true);
        const dropdown = newBlock.querySelector('select');

        // if it's a move block, make sure the dropdown contains the same value
        if (dropdown) {
            dropdown.value = selectedValue;
            newBlock.dataset.move = dropdown.value;

            // Listen to see if it's changed again after it's already in the canvas
            dropdown.addEventListener('change', (e) => {
                newBlock.dataset.move = e.target.value;
            });
        }
        instCount++;
        newBlock.id = "instruction" + instCount;
        // Add the new element to the canvas
        newBlock.classList.remove('draggable');
        newBlock.classList.add('block');
        newBlock.setAttribute("draggable", true); // make sure it's draggable
        newBlock.addEventListener("dragstart", dragStartHandler); // allow dragging to trash
        document.getElementById('block-drop').appendChild(newBlock);
        newBlock.style.width = "90%";
        newBlock.style.position = "relative";



        let translateValue = instCount * -11
        newBlock.style.transform = `translate(0%, ${translateValue}%)`;
        draggedElementState = null;
    }
}


function dragOverTrash(e){
    e.preventDefault();
    e.target.style.backgroundColor = "#FFC940";
    e.target.style.borderColor = "#FFC940";
}

function dragExitTrash(e){
     e.target.style.backgroundColor = "white";   
}

function trashDrop(e){
    e.preventDefault();
    //gets the id of the object to be deleted (unique)
    let data = e.dataTransfer.getData("text");
    //gets the object to be deleted by unique ID
    let delObject = document.getElementById(data);
    //removes that object
    delObject.remove();
    e.target.style.backgroundColor = "white";
    e.target.style.borderColor = "white";
}

function dragStartHandler(e){
    e.dataTransfer.setData("text", e.target.id);
}