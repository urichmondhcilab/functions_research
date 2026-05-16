// need the allowDrop method for draggables in the script.js
function allowDrop(event) {
    event.preventDefault();
}

// set a "draggedElementState" to keep track of the selection on the dropdown
let draggedElementState = null;
let trashObj = document.getElementById("trash");
let trashContainer = document.getElementById("trash-container");
let blockRemoveObj = document.getElementById("block-remove");
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

trashContainer.addEventListener("dragover", dragOverTrash);
trashContainer.addEventListener("dragleave", dragExitTrash);
trashContainer.addEventListener("drop", trashDrop);

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

    if (running || isPaused) {
        event.preventDefault();
        draggedElementState = null;
        return;
    }

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
        translateValue = index * -25
        node.style.transform = `translate(${node.classList.contains("new-move") ? 0 : -50}%, ${translateValue}%)`;     
        node.style.zIndex = zIndex--;  
        index++;
    }
}


/**
 * Changes the background color of the trash, when block is hovered over it.
 * @param {*} e is the event object
 */
function dragOverTrash(e){
    e.preventDefault();
    trashObj.style.backgroundColor = "#FFC940";
    trashObj.style.borderColor = "#FFC940";
}

function dragExitTrash(e){
     trashObj.style.backgroundColor = "white";   
}

/**
 * gets the id of the object to be deleted (unique), then deletes the block from the id, and reoders remaining blocks of canvas
 * @param {*} e is the event object
 */
function trashDrop(e){
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    deleteBlockbyId(data);
    trashObj.style.backgroundColor = "white";
    trashObj.style.borderColor = "white";
    reorderItems(document.getElementById('block-drop'));
    const trashMP3 = new Audio("sound_mp3/trash2.mp3");
    trashMP3.play();
}

/**
 * removes block from the canvas.
 * @param {*} id is the unique DOM id of the block to be deleted
 * @returns 
 */
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

/**
 * 
 * @param {*} state 
 * @returns 
 */
function createBlockClone(state){
    const {element, move} = state;
    const newBlock = element.cloneNode(true);
    // const dropdown = newBlock.querySelector('select');

        // if it's a move block, make sure the dropdown contains the same value
    if(move){

        //not selected after drop
        newBlock.style.backgroundColor = "";

        newBlock.querySelector(".visible-number").addEventListener('click', displayNumbers);
        newBlock.querySelector(".visible-number").addEventListener('touchend', displayNumbers);

        
        newBlock.querySelector(".number-list").addEventListener('click', resetDisplayedNumber);

        for (let i in 10){
            newBlock.querySelector(".num" + i).addEventListener('click', resetDisplayedNumber);
            newBlock.querySelector(".num" + i).addEventListener('touchend', resetDisplayedNumber);

        }            

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

    //Stores the block object the clone is referencing
    //preserves the state of the block if it has a select value
    if(block.classList.contains('draggable')){ // any dragable block includ
        draggedElementState = {
            element: block,
            move : block.classList.contains("new-move"),            
            fromCanvas: false
        };

    }
    // a dropped element has its draggable class removed and a block class added
    // we are detecting elements from the canvas using this block class
    else if (block.classList.contains('block')){
        draggedElementState = {
            element: block,
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

    //detects drag over trash
    const trashTarget =  document.elementFromPoint(touch.clientX, touch.clientY)?.closest('#trash-container, #trash, #block-remove');   
    
    if (trashTarget){
        trashObj.style.backgroundColor = "#FFC940";
    }else{
        trashObj.style.backgroundColor = "white";        
    }  
}

//When finger is lifted/end of the touch event
function TouchEnd(e){

    //makes sure touchmove is reffering to the temporary clone
    if (!curBlock){
        return;
    }

    if (running || isPaused){
        if (curBlock){
            curBlock.remove();
            curBlock = null;
        }
        draggedElementState = null;
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

    //detects drop over trash
    const trashTarget =  document.elementFromPoint(touch.clientX, touch.clientY)?.closest('#trash-container, #trash, #block-remove');

    
    //returns clone visibility
    curBlock.style.display = '';

    if(trashTarget){
        if (draggedElementState?.fromCanvas){
            deleteBlockbyId(draggedElementState.element.id);
        }

        trashObj.style.backgroundColor = "white";
        curBlock.remove();
        curBlock = null;
        draggedElementState = null;
        return;
    }

    if(dropTarget && draggedElementState?.fromCanvas){
        // source: canvas
        // target: canvas
        // remove the feedback block
        curBlock.remove();
        curBlock = null;

    }else if(dropTarget){
        // source: other
        // target: canvas
        // the block is from the list of blocks and the target is the canvas
        // TouchDroup creates/clones a new block for the canvas
        // remove the feedback block

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

    }else if(draggedElementState?.fromCanvas){ // element from canvas but target is not canvas (i.e. every other element apart from the canvas is a trash)
        // source: canvas
        // target: other
        // delete the block (i.e. any other area serves as trash)
        // remove the feedback block

        deleteBlockbyId(draggedElementState.element.id);
        trashObj.style.backgroundColor = "white";
        // document.getElementById("testDiv").innerHTML = Math.random() * 100;
        // document.getElementById("testDiv").innerHTML = draggedElementState.element.id;
        curBlock.remove();
        curBlock = null;
        draggedElementState = null;        
    }
    else{ // any other drop area and 
        // source : other 
        // target : other 
        // other is the list of posible blocks below the canvas 
        // remove the feedback block
        curBlock.remove();
        curBlock = null;        
    }
}

/**
 * Only called when block is dropped in block-drop.
 * Gets the original element that was dragged, including its attributes
 * clones dragged element, creates new element and adds it to the drop target
 * allows new element to be in correct order and allows to be dragged
 * @param {*} dropTarget, the DOM Element of Block drop, where block will be placed
 * @returns if there is not a current dragged element registered (nothing to drop)
 */
function TouchDrop(dropTarget){
    const state = draggedElementState;

    if (!state){
        return;
    }

    const newBlock = createBlockClone(state);
    createNewBlock(newBlock);
    dropTarget.appendChild(newBlock);

    reorderItems(dropTarget);
    draggedElementState = null;
    addTouchDrag(newBlock);
}