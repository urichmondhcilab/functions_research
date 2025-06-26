// need the allowDrop method for draggables in the script.js
export function allowDrop(event) {
    event.preventDefault();
}

// set a "draggedElementState" to keep track of the selection on the dropdown
let draggedElementState = null;
let trashObj = document.getElementById("trash")
trashObj.addEventListener("dragover", dragOverTrash);
trashObj.addEventListener("drop", trashDrop);
let blockRemoveObj = document.getElementById("block-remove")
blockRemoveObj.addEventListener("dragover", dragOverTrash);
blockRemoveObj.addEventListener("drop", trashDrop);
let instCount = 0;

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
}
});

// Drop function handles creating a new block in the canvas after a block is dragged there
export function drop(event) {
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
        draggedElementState = null;
    }
}


function dragOverTrash(e){
    e.preventDefault();
}

function trashDrop(e){
    e.preventDefault();
    //gets the id of the object to be deleted (unique)
    let data = e.dataTransfer.getData("text");
    //gets the object to be deleted by unique ID
    let delObject = document.getElementById(data);
    //removes that object
    delObject.remove();
}

function dragStartHandler(e){
    e.dataTransfer.setData("text", e.target.id);
}