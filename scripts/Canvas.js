// need the allowDrop method for draggables in the script.js
export function allowDrop(event) {
    event.preventDefault();
}

// set a "draggedElementState" to keep track of the selection on the dropdown
let draggedElementState = null;

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

        // Add the new element to the canvas
        newBlock.classList.remove('draggable');
        newBlock.classList.add('block');
        document.getElementById('block-drop').appendChild(newBlock);
        draggedElementState = null;
    }
}