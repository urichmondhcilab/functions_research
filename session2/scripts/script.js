// import { makeDraggable } from './BlockLib.js';
// import { allowDrop, drop } from './Canvas.js';

/**
 * currentNumberOfBirds is a counter for the number of birds created at each timeInterval
 * allBirds an array that will hold bird objects as they are created
 * motherHen is the mother hen object, once created.
 * currWater is the amount of Water objects present. 
 * waterObj stores the references to Mother objects. 
 */
let currentNumberOfBirds = 0;
let birdCounter = 0;
let deadBirds = 0;
let currWater = 0;
let allBirds = [];
let motherHen = null;
let waterObj = [];
let maze = null;
let speed = 50;
let RUN_SPEED = 200;
let CREATE_BIRD_SPEED = 50;
let NORMAL_SPEED = 200;
let gameInterval = null;
let instructionIndex = 0;
let executedBlockCount = 0;
let isTransition = false;
let isStart = true;
let transitionWidth = 0;
let transitionHeight = 0;
let transitionMessage = "";

let nextGame = false;
let curLevel = 0;
let mazeElements = 3;

let startX, startY;
let isDragging = false;
const DRAGTRESHOLD = 5;
let isPaused = false;

/**
 * Sets the speed variable to a new value, clears existing game interval.
 * @param {*} newSpeed: Number - the new speed for the gane interval
 */
function resetInterval(newSpeed){
  speed = newSpeed;
  clearInterval(gameInterval);
  gameInterval = setInterval(birdAction, speed);  
}


/**
 * In a time interval, if we have not exceeded the maximum number of birds,
 * We create a new bird and add the bird to the array of existing birds
 * increment the current number of birds
 * write the new number of birds on the screen
 * adds event listener, when clicked, sets that bird object to selectedBird.
 * to allow coding.
 * Remove event listener, remove redundance
 */
function createBird(maze){
  if (!maze) return;
  if (currentNumberOfBirds < MAX_NUMBER_OF_BIRDS){
    let birdie = new Bird(currentNumberOfBirds, maze);
    allBirds[currentNumberOfBirds] = birdie;
    currentNumberOfBirds++;
    birdCounter++;
    
  }else if (speed === CREATE_BIRD_SPEED){
    resetInterval(NORMAL_SPEED);
  }
}


/**
 * Checks that the motherHen has not already been created
 * We create a new Mom
 * set motherCreated to true
 * add event listener, to HTML DOM mother element
 */
function createMother(){
  if(motherHen == null){
    motherHen = new Mother();
  }
}


/**
 * In every time interval, for all the current birds,
 * we move them left or right by setting the birds left property
 * We also switch between the two chick resting poses by checking for either a 1 or 0 value
 * Checks if currently eating/drinking, if so, skips resting image change until finished
 * Note that the bird is an html image element
 * Instead, of moving, we update the images. We use the same idea as we used updating the mother image, instead we go through all the birds
 * present within the array. 
 */
function updateBirds(){
  for (let i = 0; (i < currentNumberOfBirds) && (allBirds.length > 0); i++){

    let currentBird = allBirds[i];

    if (currentBird?.isDrinking || currentBird?.isEating) {
      continue;
    }

    if(currentBird && currentBird.lifeSpan > 1){
      currentBird.updateBird();
    }
  }
}


/**
 * remove bird receives a bird, reduces its life, determines if the life is <= 0
 * if the life is less than or equal 0, the bird is removed from the body of the html.
 * removeChild is a JavaScript function that removes a child element from a parent element.
 * In this case game_canvas is the parent. bird.birdie is the child to remove
 * Each bird has a .deathImgFlag. If this flag is 1, it tells the UpdateBird() function to replace the img of the squarton with a death img,
 * instead of the normal animation. Here, we check to see if the life span is close to death. If we are, we set this flag to 1. To adjust the
 * length the death img shows up, we can increase the number on if(bird.lifeSpan == 2). The larger the number, the longer this image stays. 
 * 
 * @param {Bird} bird 
 * @returns a boolean that indicates whether to keep or remove the bird
 */
function respawnBirds(bird){
  // if (!bird) return false;
  let keepBird = true;
  bird.pointDecrement();
  //figure out how to alter this to different animation
  if(bird.curLife == 2){
    bird.birdie.deathImgFlag = 1;
  }

  if (bird.curLife <= 0 /*&& !running*/){
    // bird.fly() replace with die for now
    bird.die();
    deadBirds++;
    birdCounter--;    
    return false;
  }
  if(bird.curTile.state.name === "END"){
    bird.gameCompletionAnimation();

    if (bird.animationCount <= 0){
      game_canvas.removeChild(bird.birdie);
      birdCounter--;
      return false;      
    }
  }
  return keepBird;
}


/**
 * if all birds have been removed (either completed maze or timed out), or nextGame flag is true
 * reset nextGame flag to false, and begin new level
 */
function gameOverCheck(){
  if (birdCounter == 0 || nextGame == true){
    nextGame = false;
    newLevel();
  }
}

/**
 * REVIEW FUNCTION
 */
function newLevel(){
  // console.log("moves for level " + curLevel + ":" + executedBlockCount)
  // increase level if all birds were saved
  transitionMessage = "Try Again!";
  if (deadBirds == 0){  
  // if (deadBirds < Math.ceil(levelAttributes[curLevel].max_Birds / 2)){
    curLevel++;
    transitionMessage = "Level " + (curLevel + 1);
  }

  if (curLevel > MAX_LEVEL){
    // reset curLevel for reset
    GameEndElement = document.getElementById("game_end");
    GameEndElement.style.display = 'flex';
    return;
  }
  //INSERT: Display transistion/instructions
    removeCurrentGameElements();
    transitionBeforeNewLevel();   
    // newLevelConfig(curLevel);
}


function transitionBeforeNewLevel(){
  transitionImageContainer.style.display = "flex";
  transitionImage.firstChild.nodeValue = transitionMessage;
  transitionWidth = 0;
  transitionHeight = 0;
  isTransition = true;
}

/**
 * gets the levels attributes from constant object, uses the attributes to:
 * sets the number of birds to spawn, wether to include the mother, the background image, wether to display food and water
 * resets the level to update and add the new elements to the screen
 * 
 * @param {*} level: Int - the level number to set up
 * @returns 
 */
function newLevelConfig(level){
  const levelconfig = levelAttributes[level];
  if (!levelconfig) return;

  //Gets the level set number of birds (int), include mother (bool) and range of states (int)
  MAX_NUMBER_OF_BIRDS = levelconfig.max_Birds;
  createMom = levelconfig.mother_include;
  mazeElements = levelconfig.state_range;
  game_canvas.style.backgroundImage = levelconfig.background_image_path;

  const drinkBlock = document.getElementById("drink");
  const eatBlock = document.getElementById("eat");
    if (level >= 1){
      drinkBlock.classList.remove('hidden');
      eatBlock.classList.remove('hidden');
    }
    else{
      drinkBlock.classList.add('hidden');
      eatBlock.classList.add('hidden');
    }

  //Resets birds, maze, blocks
  ResetLevel();
}


/**
 * resets the current number of birds, and mother
 * resets selected birds
 * removes the birds on the screen
 * clears the array of birds, and the blocks to be executed
 */
function reset(){
  birdCounter = 0;
  deadBirds = 0;
  selectedBirds = null;
  currentNumberOfBirds = birdCounter;
  allBirds.forEach((bird, i) => {
    game_canvas.removeChild(bird.birdie);
  });
  resetInterval(CREATE_BIRD_SPEED);
  allBirds = [];

  if(motherHen){
    game_canvas.removeChild(motherHen.mother);
    motherHen = null;
  }

  executedBlockCount = 0;
  resumeGame();
  GameEndElement = document.getElementById("game_end");
  GameEndElement.style.display = 'none';
  
  // remove current points_display
  let chickDisplay = document.getElementById("points_container");
  const staticChickChildrenArray = Array.from(chickDisplay.children);  
  staticChickChildrenArray.forEach(chickPoint => {
    chickPoint.remove();
  });
}


/**
 * calls reset() to reset birds and revert maze attributes (not needed)
 * iterates through current maze and removes the DOM elements from the screen
 * creates a new Maze
 */
function resetMaze(){
  removeMazeElements();
  maze = new Maze(mazeStartX, mazeStartY, mazeWidth, mazeHeight, mazeElements); 
}

function nextLevel(){
  nextGame = true;
}

/**
 * removes all tiles from DOM, and sets maze to null
 */
function removeMazeElements(){
  let tiles = game_canvas.querySelectorAll(".tile");
  tiles.forEach(tile => {
    game_canvas.removeChild(tile);
  });
  maze = null;
}

/**
 * Remove blocks from canvas
 * @param {Object} e 
 */
function resetBlocks(e){
  const blocks = blockDrop.querySelectorAll('.block');
  blocks.forEach(block => block.remove());
}

/**
 * resets attibutes, maze and blocks. If mother is included in the level, creates mother.
 * clears the mobile menu - removes it from the scene
 */
function ResetLevel(){
  curLevel = curLevel > MAX_LEVEL ? MAX_LEVEL : curLevel;
  // recreates bird and mother
  reset();

  // recreates maze
  resetMaze();

  // clears blocks
  resetBlocks();

  //clear mobile menu
  clearMobileMoveMenu();
  clearMobileNumberMenu();

  //clear selected blocks in mobile device
  clearSelectedBlocksMobile();

  //clear hint
  clearHint();

  // include mother
  if (levelAttributes[curLevel].mother_include){
    motherHen = null;
    createMother();
  }
}


/**
 * remove game elements before next level
 * remove tiles, clear the maze, the console, and birds
 */
function removeCurrentGameElements(){
  // clear birds and points
  reset();

  // remove tiles
  removeMazeElements()

  // resetCodeBlocks
  resetBlocks();

  // reset the time interval
  resetInterval(NORMAL_SPEED);  


  // clear mobile menu
  clearMobileMoveMenu();
  clearMobileNumberMenu()

  // clear hints
  clearHint();

  //clear selected blocks in mobile menu
  clearSelectedBlocksMobile()  
}


/**
 * recomputes the position of the bird each time the screen is resized
 * by recomputing the centerLeft, centerTop, and radius 
 * and invoking updateBirdPosition for all the birds
 */
function repositionGameObjects(){
  //reset the positions of the birds based on new screen size
  backgroundImageWidth = window.innerWidth;
  backgroundImageHeight = window.innerWidth * 0.56; // keep the aspect ratio of the background image

  centerX = (backgroundImageWidth) / 2;
  centerY = window.innerHeight / 2;

  motherPosX = centerX - backgroundImageWidth * 0.35;
  motherPosY = centerY - backgroundImageHeight * 0.06;

  mazeStartX = (backgroundImageWidth * 0.20);
  mazeStartY = centerY + backgroundImageHeight * 0.15 ;
  mazeWidth = (backgroundImageWidth * 0.7);
  mazeHeight = centerY + backgroundImageHeight * 0.4;
  
  console.log("maze in reposition: " + maze);
  if (maze) maze.upadateMazePosition(mazeStartX, mazeStartY, mazeWidth, mazeHeight);


  for (let i = 0; (i < currentNumberOfBirds) && (allBirds.length > 0); i++){
    let currentBird = allBirds[i];
    if (currentBird)
      currentBird.updateBirdPosition();
  } 

  if(motherHen != null){
    console.log("updating mom position");
    motherHen.updateMomPosition();
  }  
}


/**
 * retrieve all programming blocks and parse them to an ast
 * Our AST is a list of collapsed blocks.
 */
async function initializeBlockIdentifiers(){
  if (running) return;

  blockCount = 0;
  placedBlocks = document.querySelectorAll('#canvas .block');

  // help debug program
  checkHint();
  if (selectedBirds != null && selectedBirds.length > 0 && placedBlocks != null && placedBlocks.length > 0){
    clearHint();
    running = true;    
    resetInterval(RUN_SPEED);
    let parser = new Parser(selectedBirds, placedBlocks, maze);    
    ast = parser.parse(); 
  }
}


/**
 * Executes action in each block of the AST
 * records number of moves executed
 * @returns early if block codes are not currently being executed
 */
async function runCode(){
  if (!running) return;

  if (selectedBirds != null && selectedBirds.length > 0 && blockCount >= 0 && ast!= null && blockCount < ast.length){
    // disable run button
    // console.log("selected birds: " + selectedBirds.length);
    executedBlockCount += 1;
    Interpreter.interpret(ast[blockCount]);
    blockCount++;
  }

  if (selectedBirds != null && selectedBirds.length > 0 && ast != null && blockCount === ast.length){
    // enable run button
    running = false;
    resetInterval(NORMAL_SPEED);
  };  
}

/**
 * Compares two divs with ids
 * @param {Object} obj1 
 * @param {Object} obj2 
 */
function isSameBlock(obj1, obj2){
  if (obj1 == undefined || obj2 == undefined)
    return false;

  return obj1.parentNode.parentNode.id == obj2.parentNode.parentNode.id;
}

/**
 * Expands/hides a list associated with a number puzzle
 * It also clears other expanded lists
 * @param {Object} e is a clicked number puzzle
 */
function displayNumbers(e){
  // check is tablet and has multitouch support
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1;  
  const targetNumberList = e.target.querySelector('.number-list');
  if (isMobile){
      clearSelectedBlocksMobile();
      clearMobileMoveMenu();
      if (isSameBlock(e.target, blockNumberTriggerObj)){
        mobileGameNumberMenu.style.display = mobileGameNumberMenu.style.display == "flex" ? "none" : "flex";        
      }else{
        blockNumberTriggerObj = e.target;
        mobileGameNumberMenu.style.display = "flex";
        console.log("in here too");
      }
      mobileGameNumberMenu.getTriggeringBlock = function(){return e.target};
      e.target.parentNode.parentNode.style.backgroundColor = "white";      

  }else{
    if (targetNumberList != null){
      if (targetNumberList.style.display == "none"){
        targetNumberList.style.display = "block";
        clearExpandedLists(targetNumberList);    
      }else{
        targetNumberList.style.display = "none";    
      }
    }    
  }

}

/**
 * Toggles the list of move directions. If it is visible it hides it and vice versa
 * @param {Object} e is the object that is clicked toggle to list 
 */
function displayMoves(e){
  // check is tablet and has multitouch support
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
  const targetMoveList = e.target.querySelector('.move-list');

  if (isMobile) {
      clearSelectedBlocksMobile();
      clearMobileNumberMenu();
      if (isSameBlock(e.target, blockDirectionTriggerObj)){
        mobileGameMoveMenu.style.display = mobileGameMoveMenu.style.display == "flex" ? "none" : "flex";        
      }else{
        // update the blockDirectionTriggerObj
        blockDirectionTriggerObj = e.target;
        mobileGameMoveMenu.style.display = "flex";
      }
      mobileGameMoveMenu.getTriggeringBlock = function(){return e.target};
      e.target.parentNode.parentNode.style.backgroundColor = "#FFC940";

  }else{
    if (targetMoveList != null){
      if (targetMoveList.style.display == "none"){
        targetMoveList.style.display = "block";
        clearExpandedLists(targetMoveList);
      }else{     
        targetMoveList.style.display = "none";    
      }
    }
  }

}


function eventBasedDisplayNumbersOrMoves(e, displayOrResetAction){
  switch (e.type){
    case 'click':
      displayOrResetAction(e);
      break;

    case 'tocuhstart':
      if (e.touches.length == 1){
          startX = e.touches[0].pageX;
          startY = e.touches[0].pageY;        
          isDragging = false;
      }
      break;

    case 'touchmove':
      if (startX && startY){
          const diffX = Math.abs(e.touches[0].pageX - startX);
          const diffY = Math.abs(e.touches[0].pageY - startY);

          if (diffX > DRAGTRESHOLD && diffY > DRAGTRESHOLD){
              //changes the position based on current position - original position from
              //touchStart
              isDragging = true;
          }
      }    
      break;

    case 'touchend':
      if (!isDragging)  displayOrResetAction(e);      
      break
  }  
}


/**
 * After a number is selected from the list of numbers, the main displayed puzzle image is updated
 * @param {Object} e a number object from a list of numbers
 */
function resetDisplayedNumber(e){

  let targetVisibleNumber;
  let id;

  console.log("in resetDisplayedNumber");

  if(e.target.classList.contains("mobile"))
  {
    console.log("in visible number");
    targetVisibleNumber = mobileGameNumberMenu.getTriggeringBlock();
    console.log(targetVisibleNumber);
    id = e.target.className.slice(7,10) + "ber" + (e.target.className).slice(-1);
  }
  else{
    targetVisibleNumber = e.target.parentNode.parentNode;
    id  = (e.target.className).slice(0,3) + "ber" + (e.target.className).slice(-1);  
    e.target.parentNode.style.display = "none";      
  }


  console.log(id);

  targetVisibleNumber.style.backgroundImage = `url(${'images/numbers/' + id + '.png'})`;

}


/**
 * Resets the displayed move to the selected move image
 * hides the list after selection
 * @param {Object} e the object that triggers selection
 */
function resetMove(e){

let targetVisibleMove;
let className; 

if (e.target.classList.contains("mobile")){
    targetVisibleMove = mobileGameMoveMenu.getTriggeringBlock();
    className = e.target.className.slice(12,);
  }
  else{
    targetVisibleMove = e.target.parentNode.parentNode;
    className = e.target.className.slice(5,);
  }

      let test_element = document.getElementById("test-id");

  if (className.trim() != "list"){

    test_element.style.backgroundImage = "none";
    targetVisibleMove.style.backgroundImage = `url(${'images/direction/' + className + '.png'})`;

  }  
  // e.target.parentNode.style.display = "none";  
}


/**
 * Ensures that only one puzzle list is displayed at a time 
 * @param {*} currList holds all the currently expanded list 
 */
function clearExpandedLists(currList){
  let allLists = document.getElementById('block-drop');
  let moveLists = allLists.querySelectorAll('.move-list');
  let numberLists = allLists.querySelectorAll('.number-list');

  for (const lst of moveLists){
    if (currList != lst){
      lst.style.display = 'none';
    }
  }

  for (const numberList of numberLists){
    if (currList != numberList){
      numberList.style.display = 'none';
    }    
  }
}

function clearSelectedBlocksMobile()
{
  // mobileGameMoveMenu.style.display = "none";

  // clear selection block background color
  let allBlocks = document.querySelectorAll(".new-move");
  // console.log("number of visible moves: " + allBlocks.length);
  allBlocks.forEach(block => {
    block.style.backgroundColor = "";
  });
  
}

function clearMobileMoveMenu(){
  mobileGameMoveMenu.style.display = "none";  
}

function clearMobileNumberMenu(){
  mobileGameNumberMenu.style.display = "none";  
}


/**
 * An event listener runs in the background waiting for an event to occur on an element
 * In these two cases load and click
 * Once load occurs the function animateGameObjects is invoked
 * Once the reset button is clicked the function reset is invoked
 */
function initSession2EventListeners(){
  window.addEventListener('resize', repositionGameObjects);
  reset_btn.addEventListener('click', ResetLevel);
  game_end_text.addEventListener('click', function(e){window.location.reload();});
  runObject.addEventListener('click', initializeBlockIdentifiers);

  // Add event listeners for drag and drop functionality on the canvas
  canvas.addEventListener('drop', drop);
  canvas.addEventListener('dragover', allowDrop);

  // reset button clears all the blocks from the canvas, but does not reset the chicken
  document.getElementById('block-reset').addEventListener('click', resetBlocks);

  //Monitor activity that leads to points

  //Allows to skip to next level of game
  document.getElementById('nextLevel').addEventListener('click', nextLevel);

  // currently selected number can be clicked on to display the list of numbers
  visibleNumber.addEventListener('click', function(e){ eventBasedDisplayNumbersOrMoves(e, displayNumbers)});
  visibleNumber.addEventListener('touchend', function(e){ eventBasedDisplayNumbersOrMoves(e, displayNumbers)});  

  // A number in the list of numbers may be selected by clicking on it 
  numberList.addEventListener('click', resetDisplayedNumber);
  numberList.addEventListener('touchend', resetDisplayedNumber);

  //eventlisteners for when a number image is clicked
    // console.log(numObjects)  
  numObjects.forEach(numObject => {
    console.log("printing numObjects");    
    numObject.addEventListener('click', resetDisplayedNumber);
    numObject.addEventListener('touchend', resetDisplayedNumber);    
    
  });

  // for (numObject in numObjects){
  //   console.log("printing numObjects");

  //   numObject.addEventListener('click', resetDisplayedNumber);
  //   numObject.addEventListener('touchend', resetDisplayedNumber);

  // }

  // event listeners for move puzzles
  visibleMove.addEventListener('click', function(e){eventBasedDisplayNumbersOrMoves(e, displayMoves)});
  visibleMove.addEventListener('touchend', function(e){eventBasedDisplayNumbersOrMoves(e, displayMoves)});

  moveList.addEventListener('click', resetMove);
  moveUp.addEventListener('click', resetMove);
  moveDown.addEventListener('click', resetMove);
  moveLeft.addEventListener('click', resetMove);
  moveRight.addEventListener('click', resetMove);


  moveList.addEventListener('touchend', resetMove);
  moveUp.addEventListener('touchend', resetMove);
  moveDown.addEventListener('touchend', resetMove);
  moveLeft.addEventListener('touchend', resetMove);
  moveRight.addEventListener('touchend', resetMove);

}



/**
 * Every second a bird is created, 
 * birds are moved 
 * and birds that have completed livespan are removed
 * The filter function runs removeBird on each bird in allBirds.
 * It keeps the birds for which removeBird returns true.
 */
async function birdAction(){
  if (isTransition || isStart){ 
    pulsatingStart();
  }else{

    if (!running && currentNumberOfBirds < MAX_NUMBER_OF_BIRDS){
      createBird(maze);
    }
    resetInterval(NORMAL_SPEED);

    if(motherHen){
      motherHen.updateMotherHen();
    }    

    updateBirds();
    allBirds = allBirds.filter(respawnBirds);

    pulsatingHint();
    //Checks if GameOver Conditions are met
    gameOverCheck(); 
    runCode() ;
  }
}


/**
 * animateGameObjects by changing sprites
 * runs setInterval 
 * setInterval(fun, ms) is a JavaScript function that receives a function fun
 * and runs fun every ms milliseconds
 * In this case it receives the function birdAction and runs it every 1000 milliseconds
 */
function animateGameObjects(){
  gameInterval = setInterval(birdAction, speed);
}


/**
 * Start the game
 * initialize the event listeners
 * set up the maze
 * initialize draggable blocks, and enables touch (ipad)
 */
function startGame(){
  initSession2EventListeners();  
  animateGameObjects();
  maze = new Maze(mazeStartX, mazeStartY, mazeWidth, mazeHeight); 
  makeDraggable();
  TouchDrag();
}


/**
 * Hides the transition display 
 * clear the gameinterval started for the pulsating start button
 * updates the current mode of play
 */
function chooseStartOrTransition(){
  transitionImageContainer.style.display = "none";  

  if (isStart){
    clearInterval(gameInterval);    
    startGame();
    isStart = false;
  }
  if (isTransition){
    newLevelConfig(curLevel);
    isTransition = false;
  }
  if (isPaused){
    resumeGame();
  }
}

document.getElementById("pause").addEventListener('click', pauseGame);
//document.getElementById("pause").addEventListener('click', resumeGame);

function pauseGame(){
  if(isPaused){
    return
  }
  isPaused = true;
  clearInterval(gameInterval);
  transitionMessage = "Paused";
  transitionImage.firstChild.nodeValue = transitionMessage;
  transitionWidth = 0;
  transitionHeight = 0;

  transitionImageContainer.style.display = "flex";
  //document.getElementById("pause").textContent = 'play'
  gameInterval = setInterval(pulsatingStart, speed);
}

function resumeGame(){
  if(!isPaused){
    return
  }
  isPaused = false;
  transitionImageContainer.style.display = "none";

  clearInterval(gameInterval);
  gameInterval = setInterval(birdAction, speed);
}

/**
 * increases/decreases the transition play button by 5%
 */
function pulsatingStart(){
  if (parseInt(transitionWidth) < 50){
    transitionWidth += 5;
    transitionHeight += 5;
    transitionImage.style.width = transitionWidth + "%";
    transitionImage.style.height = transitionHeight + "%";
  }else{
    transitionImage.style.width = transitionImage.style.width == "50%" ? "49%" : "50%";
  }
}

// click the transition button to start the game
transitionImageContainer.addEventListener('click', chooseStartOrTransition);

// pulsating play button onload
window.addEventListener('load', function (e){
  speed = NORMAL_SPEED;
  gameInterval = this.setInterval(pulsatingStart, speed)
});


function checkHint(){
  console.log("checking hint ...")
    hintObj.style.display = "block";
  if (selectedBirds == null || selectedBirds.length == 0){
    hintObj.style.backgroundImage = `url('images/game_buttons/hint.webp')`;    
    console.log("no selected birds");
    let top = allBirds[0].birdie.style.top;
    let height = window.getComputedStyle(allBirds[0].birdie).height;
    console.log("height: " +height);
    top = top.slice(0,-2);
    height = top.slice(0,-2);
    top = (top - 6 * height) + "px";
    console.log
    hintObj.style.top = top;
    hintObj.style.left = allBirds[0].birdie.style.left;
  }
  else if(placedBlocks == null || placedBlocks.length == 0){
    console.log("move block on to console");
    console.log(window.getComputedStyle(gameOperationsObj).top);

    let gameOperationsHeight = window.getComputedStyle(gameOperationsObj).top;
    gameOperationsHeight = screenHeight * 0.35;  
    console.log("gameOperationsHeight" + gameOperationsHeight) ;
    hintObj.style.top = gameOperationsHeight + "px";

    hintObj.style.left = window.getComputedStyle(gameOperationsObj).left;
    hintObj.style.backgroundImage = `url('images/game_buttons/hint_right.png')`;
  }
}



function clearHint(){
  hintObj.style.display = "none";
}

function pulsatingHint(){
  if (hintObj.style.display == "block")
    hintObj.style.width = hintObj.style.width == "5%" ? "5.5%" : "5%";
    hintObj.style.height = hintObj.style.height == "5%" ? "5.5%" : "5%";  
}