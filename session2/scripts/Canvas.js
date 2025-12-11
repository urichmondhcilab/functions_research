// need the allowDrop method for draggables in the script.js
function allowDrop(event) {
    event.preventDefault();
}

// set a "draggedElementState" to keep track of the selection on the dropdown
let draggedElementState = null;
let trashObj = document.getElementById("trash")
let blockRemoveObj = document.getElementById("block-remove")
let instCount = 0;

let curBlock = null;
let Xoffset = 0;
let Yoffset = 0;

// let startX, startY;
// let isDragging = false;
// const DRAGTRESHOLD = 100;

trashObj.addEventListener("dragover", dragOverTrash);
trashObj.addEventListener("dragleave", dragExitTrash);
trashObj.addEventListener("drop", trashDrop);
blockRemoveObj.addEventListener("dragover", dragOverTrash);
blockRemoveObj.addEventListener("drop", trashDrop);




// When the dragging starts, save the move selected to the "draggedElementState"
document.addEventListener('dragstart', (event) => {
    const draggedElement = event.target.closest('.draggable');
    // If the element is a move block, include the selectedValue
    if(!draggedElement){
        return;
    }
    draggedElementState = {
        element: draggedElement,
        move : draggedElement.classList.contains("new-move")
    };

});


// Drop function handles creating a new block in the canvas after a block is dragged there
function drop(event) {
    event.preventDefault();
    if (draggedElementState) {
        const newBlock = createBlockClone(draggedElementState);        
        createNewBlock(newBlock);
        document.getElementById('block-drop').appendChild(newBlock);
        reorderItems(document.getElementById('block-drop'));
        draggedElementState = null;
    }
}

/**
 * Reposition items so they fit like puzzles 
 * @param {Array} parent array of nodes (blocks on the canvas)
 */
function reorderItems(parent){
    let nodeList = parent.childNodes;
    let index = 0;
    let translateValue = 0; 
    let zIndex = 1000;

    for (node of nodeList){
        translateValue = index * -33
        node.style.transform = `translate(${node.classList.contains("new-move") ? 0 : -50}%, ${translateValue}%)`;     
        node.style.zIndex = zIndex--;  
        index++;
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
    deleteBlockbyId(data);
    e.target.style.backgroundColor = "white";
    e.target.style.borderColor = "white";
    reorderItems(document.getElementById('block-drop'));    
}

function deleteBlockbyId(id){
    const delObject = document.getElementById(id);
    if (!delObject){
        return;
    }
    delObject.remove();
    reorderItems(document.getElementById('block-drop'));    
}

function dragStartHandler(e){
    e.dataTransfer.setData("text", e.target.id);
}

//Shared Functions

function createBlockClone(state){
    const {element, move} = state;
    const newBlock = element.cloneNode(true);
    // const dropdown = newBlock.querySelector('select');

        // if it's a move block, make sure the dropdown contains the same value
    if(move){

        newBlock.querySelector(".visible-number").addEventListener('click', displayNumbers);
        // newBlock.querySelector(".visible-number").addEventListener('touchstart', displayNumbers);
        newBlock.querySelector(".visible-number").addEventListener('touchend', displayNumbers);
        // newBlock.querySelector(".visible-number").addEventListener('touchMove', displayNumbers);
        
        
        newBlock.querySelector(".number-list").addEventListener('click', resetDisplayedNumber);

        for (let i in 10){
            newBlock.querySelector(".num" + i).addEventListener('click', resetDisplayedNumber);
            newBlock.querySelector(".num" + i).addEventListener('touchend', resetDisplayedNumber);

        }            

        // console.log(newBlock.querySelector(".visible-move"));
        newBlock.querySelector(".visible-move").addEventListener('click', displayMoves)
        newBlock.querySelector(".move-list").addEventListener('click', resetMove);
        newBlock.querySelector(".move-right").addEventListener('click', resetMove);
        newBlock.querySelector(".move-left").addEventListener('click', resetMove);
        newBlock.querySelector(".move-up").addEventListener('click', resetMove);
        newBlock.querySelector(".move-down").addEventListener('click', resetMove);   

        newBlock.querySelector(".visible-move").addEventListener('touchend', displayMoves)        
        newBlock.querySelector(".move-list").addEventListener('touchend', resetMove);
        newBlock.querySelector(".move-right").addEventListener('touchend', resetMove);
        newBlock.querySelector(".move-left").addEventListener('touchend', resetMove);
        newBlock.querySelector(".move-up").addEventListener('touchend', resetMove);
        newBlock.querySelector(".move-down").addEventListener('touchend', resetMove);           
        
        newBlock.style.width = "100%";
    }else{
        newBlock.style.width = "50%";            
    }

        return newBlock;
}

function createNewBlock(newBlock){     
        instCount++;
        newBlock.id = "instruction" + instCount;

        // Add the new element to the canvas
        newBlock.classList.remove('draggable');
        newBlock.classList.add('block');
        newBlock.setAttribute("draggable", true); // make sure it's draggable
        newBlock.addEventListener("dragstart", dragStartHandler); // allow dragging to trash
        newBlock.style.position = "relative";    

    return newBlock;
}

//For Ipad

//At start of program, for each block, calls function to intialize event listeners
function TouchDrag(){
    const TouchElements = document.querySelectorAll('.draggable');
    TouchElements.forEach(block => addTouchDrag(block));
}

//Adds event listeners
//Touchstart, for when touch begins
//Touchmove for actions while moving and held down
//touch end for actions when block is dropped.
//, { passive: false }
function addTouchDrag(block){
    block.addEventListener('touchstart', e => TouchStart(e, block));
    block.addEventListener('touchmove', TouchMove);
    block.addEventListener('touchend', TouchEnd);
}


//For intial touch
/***
 * e: touch event
 * block: DOM element that is touched (coding block)
 */
function TouchStart(e, block){
    if (e.target.tagName === 'SELECT'|| e.target.tagName === 'INPUT'){
        return;
    }
    e.preventDefault();

    //Cur block is global temporary clone, if one exists from previous
    //delete it
    if(curBlock){
        curBlock.remove();
        curBlock = null;
    }
    //refers to current touches
    //gives current x/y position of that finger
    const touch = e.touches[0];


    if (e.touches.length == 1){
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;        
        isDragging = false;
    }

    //Clones block for visualization of moving
    curBlock = block.cloneNode(true);
    // curBlock.style.pointerEvents = "none";
    curBlock.classList.add('dragging');
    curBlock.style.position = 'absolute';
    const computed = window.getComputedStyle(block);
    curBlock.style.background = computed.background;
    curBlock.style.border = computed.border;
    curBlock.style.color = computed.color;
    curBlock.style.padding = computed.padding;
    curBlock.style.fontFamily = computed.fontFamily;
    curBlock.style.fontSize = computed.fontSize;
    curBlock.style.fontWeight = computed.fontWeight;
    curBlock.style.lineHeight = computed.lineHeight;
    curBlock.style.boxSizing = "border-box";
    curBlock.style.pointerEvents = "none";
    //Right now position at top right of block at finger: Change??
    curBlock.style.left = `${touch.clientX}px`;
    curBlock.style.top = `${touch.clientY}px`;
    //Change
    curBlock.style.width = `${block.offsetWidth}px`;
    curBlock.style.height = `${block.offsetHeight}px`;
    curBlock.style.zIndex = 5;
    //Adds clone block to DOM
    document.body.appendChild(curBlock);

    //Stores the block object the clone is refferencing
    //preserves the state of the block if it has a select value
    if(block.classList.contains('draggable')){
        draggedElementState = {
            element: block,
            // selectedValue: block.querySelector('select')?.value || null,

            // element: draggedElement,
            move : block.classList.contains("new-move"),            
            fromCanvas: false
        };

    }
    else if (block.classList.contains('block')){
        draggedElementState = {
            element: block,
            // selectedValue: block.querySelector('select')?.value || null,
            move : block.classList.contains("new-move"),                 
            fromCanvas: true
        }; 
    }

    //keeps the block following the finger by computing the offset
    Xoffset = touch.clientX - block.getBoundingClientRect().left;
    Yoffset = touch.clientY - block.getBoundingClientRect().top;
}

//Event handler, when the finger (still pressed) moves positions
function TouchMove(e){
    e.preventDefault();

    //refers to current touches
    //gives current x/y position of that finger
    const touch = e.touches[0];

    //makes sure touchmove is reffering to the temporary clone
    if (!curBlock){
        return;
    }


    if (startX && startY){
        const diffX = Math.abs(e.touches[0].pageX - startX);
        const diffY = Math.abs(e.touches[0].pageY - startY);

        if (diffX > DRAGTRESHOLD && diffY > DRAGTRESHOLD){
            //changes the position based on current position - original position from
            //touchStart
            curBlock.style.left = `${touch.clientX - Xoffset}px`;
            curBlock.style.top = `${touch.clientY - Yoffset}px`;
            isDragging = true;
        }
    }


}

//When finger is lifted/end of the touch event
function TouchEnd(e){

    //makes sure touchmove is reffering to the temporary clone
    if (!curBlock){
        return;
    }

    // if (!isDragging) return;

    //refers to current touches
    //gives current x/y position of that finger
    const touch = e.changedTouches[0];

    //Hides block temporaily, so it is not registered as droptarget
    curBlock.style.display = 'none';
    //Finds the element at the current coordinates of the touch
    //if over block-drop, sets that, otherwise null
    let dropTarget = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('#block-drop');
    if (draggedElementState?.fromCanvas){
        dropTarget = null;
    }
    //detects drop over trash
    const trashTarget =  document.elementFromPoint(touch.clientX, touch.clientY)?.closest('#trash, #block-remove');

    //returns clone visibility
    curBlock.style.display = '';

    if (trashTarget){
        if (draggedElementState?.fromCanvas){
            deleteBlockbyId(draggedElementState.element.id);
        }

        curBlock.remove();
        curBlock = null;
        draggedElementState = null;
        return;

    }

    //checks if touch was ended over block drop
    if (dropTarget) {
        //creates temporary block
        const temp = curBlock;
        //Calls touchdrop (to place block in code window)
        TouchDrop(dropTarget);

        //After 30ms, removes clone block from screen
        //allows DOM to add element
        setTimeout(() => {
            temp.remove();
            curBlock = null;
        }, 30);
    //If not over block-drop, simply removes clone
    } else {
        curBlock.remove();
        curBlock = null;
    }
}

//Only called when block is dropped in block-drop
//DropTarget is the DOM Element of Block drop, where block will be placed
function TouchDrop(dropTarget){
    //Gets the original element that was dragged, including its attributes
    //like selected values
    const state = draggedElementState;
    if (!state){
        return;
    }
    const newBlock = createBlockClone(state);
    //Rename    
    createNewBlock(newBlock);
    dropTarget.appendChild(newBlock);

    reorderItems(dropTarget);

    //resets dragged state data
    draggedElementState = null;
    addTouchDrag(newBlock);
}