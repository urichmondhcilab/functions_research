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
 * @param {Bird} bird 
 * @returns a boolean that indicates whether to keep or remove the bird
 */
function respawnBirds(bird){
  // // point_number.textContent = birdCounter;
  // console.log("not bird: " + !bird)
  // if (!bird) return false;
  let keepBird = true;
  bird.pointDecrement();
  //figure out how to alter this to different animation
  if(bird.curLife == 2){
    bird.birdie.deathImgFlag = 1;
  }

  if (bird.curLife <= 0 /*&& !running*/){
    console.log("life span less than 0");
    bird.die();
    deadBirds++;
    birdCounter--;    
    return false;
    // return keepBird;
  }
  //Checks if bird is on end tile, if so removes bird from allbirds
  if(bird.curTile.state.name === "END"){
    // animate the bird before remove
    bird.gameCompletionAnimation();
    if (bird.animationCount <= 0){
      game_canvas.removeChild(bird.birdie);
      birdCounter--;
      return false;      
    }
  }
  return keepBird;
}


function gameOverCheck(){
  if (birdCounter == 0 || nextGame == true){
    nextGame = false;
    newLevel();
  }
}


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


function newLevelConfig(level){
  const levelconfig = levelAttributes[level];
  if (!levelconfig) return;

  // console.log(`Start Level: ${level}`);

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
 * resets the current number of birds 
 * resets selected birds
 * removes the birds on the screen
 * clears the array of birds
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
  // if (maze) {
  //   maze.mazeRevert();
  // }
  if(motherHen){
    game_canvas.removeChild(motherHen.mother);
    motherHen = null;
  }

  executedBlockCount = 0;

  GameEndElement = document.getElementById("game_end");
  GameEndElement.style.display = 'none';
  
  // remove current points_display
  let chickDisplay = document.getElementById("points_container");
  const staticChickChildrenArray = Array.from(chickDisplay.children);  
  staticChickChildrenArray.forEach(chickPoint => {
    chickPoint.remove();
  });
}


//Probably only either for game over or explicit choice, triggered by reset button at top
//for now to show functionality
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

function removeMazeElements(){
  // remove tiles
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


function ResetLevel(){
  curLevel = curLevel > MAX_LEVEL ? MAX_LEVEL : curLevel;
  // recreates bird and mother
  reset();

  // recreates maze
  resetMaze();

  // clears blocks
  resetBlocks();

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

  motherPosX = centerX - backgroundImageWidth * 0.25;
  motherPosY = centerY - backgroundImageHeight * 0.15;

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

  if (selectedBirds != null && selectedBirds.length > 0 && placedBlocks != null && placedBlocks.length > 0){
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
 * Expands/hides a list associated with a number puzzle
 * It also clears other expanded lists
 * @param {Object} e is a clicked number puzzle
 */
function displayNumbers(e){
  // console.log("displayNumber");
  const targetNumberList = e.target.querySelector('.number-list');
  if (targetNumberList != null){
    if (targetNumberList.style.display == "none"){
      targetNumberList.style.display = "block";
      clearExpandedLists(targetNumberList);    
    }else{
      targetNumberList.style.display = "none";    
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
  const targetVisibleNumber = e.target.parentNode.parentNode;
  let id  = (e.target.className).slice(0,3) + "ber" + (e.target.className).slice(-1);
  console.log(id);

  targetVisibleNumber.style.backgroundImage = `url(${'images/numbers/' + id + '.svg'})`;
  e.target.parentNode.style.display = "none";
}


/**
 * Resets the displayed move to the selected move image
 * hides the list after selection
 * @param {Object} e the object that triggers selection
 */
function resetMove(e){
  const targetVisibleMove = e.target.parentNode.parentNode;

  let className = (e.target.className).slice(5,);

  if (className.trim() != "list")
    targetVisibleMove.style.backgroundImage = `url(${'images/direction/' + className + '.svg'})`;  
  e.target.parentNode.style.display = "none";
}


/**
 * Toggles the list of move directions. If it is visible it hides it and vice versa
 * @param {Object} e is the object that is clicked toggle to list 
 */
function displayMoves(e){
  const targetMoveList = e.target.querySelector('.move-list');
  if (targetMoveList){
    if (targetMoveList.style.display == "none"){
      targetMoveList.style.display = "block";
      clearExpandedLists(targetMoveList);
    }else{     
      targetMoveList.style.display = "none";    
    }
  }
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

  //eventlistners for when a number image is clicked
  for (numObject in numObjects){
    numObject.addEventListener('click', resetDisplayedNumber);
    numObject.addEventListener('touchend', resetDisplayedNumber);

  }

  // event listners for move puzzles
  visibleMove.addEventListener('click', function(e){eventBasedDisplayNumbersOrMoves(e, displayMoves)});
  visibleMove.addEventListener('touchend', function(e){eventBasedDisplayNumbersOrMoves(e, displayMoves)});

  moveList.addEventListener('click', resetMove)
  moveUp.addEventListener('click', resetMove)
  moveDown.addEventListener('click', resetMove)
  moveLeft.addEventListener('click', resetMove)
  moveRight.addEventListener('click', resetMove)


  moveList.addEventListener('touchend', resetMove)
  moveUp.addEventListener('touchend', resetMove)
  moveDown.addEventListener('touchend', resetMove)
  moveLeft.addEventListener('touchend', resetMove)
  moveRight.addEventListener('touchend', resetMove)  
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
      // updateMotherHen();
      motherHen.updateMotherHen();
    }    

    updateBirds();
    allBirds = allBirds.filter(respawnBirds);
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