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
let currWater = 0;
let allBirds = [];
let motherHen = null;
let waterObj = [];
let maze = null;
let speed = 50;
let RUN_SPEED = 200;
let CREATE_BIRD_SPEED = 50;
let NORMAL_SPEED = 800;
let gameInterval = null;
let instructionIndex = 0;


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

    if(currentBird && currentBird.birdie.deathImgFlag == 1){
      currentBird.birdie.firstChild.src = 'images/chicks/squarton_dead.svg';
    }
  }
}


/**
 * To update the mother image, We first set currMom to the mother DOM object. 
 * We use a simple 1-0 switching if-else block to make sure the switch happens every tick (If 0, we are on img2. If 1, we are on img1.)
 * The mother object has the field currImageFlag built into it so that this switching can happen.
 */
function updateMotherHen(){
  let currMom = motherHen.mother;
  let currMomImage = currMom.firstChild;
  let flag = currMom.currImageFlag;

  currMomImage.src = (flag == 1) ? 'images/mother_hen/Mother_Hen_2.svg' : 'images/mother_hen/Mother_Hen_1.svg';
  currMom.currImageFlag = flag * -1;
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
function removeBirds(bird){
  point_number.textContent = birdCounter;
  if (!bird) return false;
  let keepBird = true;
  bird.lifeSpan = bird.lifeSpan - 1;

  if(bird.lifeSpan == 2){
    bird.birdie.deathImgFlag = 1;
  }

  if (bird.lifeSpan <= 0){
    game_canvas.removeChild(bird.birdie);
    keepBird = false;
    birdCounter--;
  }

  return keepBird;
}


/**
 * Every second a bird is created, 
 * birds are moved 
 * and birds that have completed livespan are removed
 * The filter function runs removeBird on each bird in allBirds.
 * It keeps the birds for which removeBird returns true.
 */
async function birdAction(){
  // console.log(maze);
  createMother();
  createBird(maze);
  updateMotherHen();
  updateBirds();
  allBirds = allBirds.filter(removeBirds);
  await runCode();
}


/**
 * resets the current number of birds 
 * removes the birds on the screen
 * clears the array of birds
 */
function reset(){
  currentNumberOfBirds = 0;
  allBirds.forEach((bird, i) => {
    game_canvas.removeChild(bird.birdie);
  });
  resetInterval(CREATE_BIRD_SPEED);
  allBirds = [];
}


/**
 * recomputes the position of the bird each time the screen is resized
 * by recomputing the centerLeft, centerTop, and radius 
 * and invoking updateBirdPosition for all the birds
 */
function repositionGameObjects(){
  //reset the positions of the birds based on new screen size

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  motherOffsetX = (window.innerWidth * 0.6)/ 4;
  motherOffsetY = window.innerHeight / 8; 

  birdStartX =(window.innerWidth * 0.3);
  birdStartY = window.innerHeight * 0.5;
  birdEndX = window.innerWidth * 0.6 - birdStartX;
  birdEndY = window.innerHeight * 0.6 - birdStartY;

  // update maze location variables 
  mazeStartX = 0;
  mazeStartY = (window.innerHeight * 0.7);
  mazeWidth = (window.innerWidth * 0.6);
  mazeHeight = (window.innerHeight  * 0.9);
  
  console.log("maze in reposition: " + maze);
  if (maze) maze.upadateMazePosition(mazeStartX, mazeStartY, mazeWidth, mazeHeight);


  for (let i = 0; (i < currentNumberOfBirds) && (allBirds.length > 0); i++){
    let currentBird = allBirds[i];
    if (currentBird)
      currentBird.updateBirdPosition();
  } 

  if(motherHen != null){
    motherHen.updateMomPosition();
  }  
}


/**
 * retrieve all programming blocks and parse them to an ast
 * Our AST is a list of collapsed blocks.
 */
async function initializeBlockIdentifiers(){
  blockCount = 0;
  placedBlocks = document.querySelectorAll('#canvas .block');
  running = true;
  let parser = new Parser(selectedBirds, placedBlocks, maze);
  if (selectedBirds.length > 0){
    resetInterval(RUN_SPEED);
  }
  ast = parser.parse();
}


/**
 * Executes action in each block of the AST
 * @returns early if block codes are not currently being executed
 */
async function runCode(){
  if (!running) return;
  if (blockCount >= 0 && blockCount < ast.length){
    Interpreter.interpret(ast[blockCount]);
    blockCount++;
  }
  if (blockCount === ast.length){
    running = false;
    resetInterval(NORMAL_SPEED);
  };  
}


/**
 * Remove blocks from canvas
 * @param {Object} e 
 */
function blockResetHandler(e){
  const blocks = blockDrop.querySelectorAll('.block');
  blocks.forEach(block => block.remove());
}


/**
 * The program starts here
 * An event listener runs in the background waiting for an event to occur on an element
 * In these two cases load and click
 * Once load occurs the function animateGameObjects is invoked
 * Once the reset button is clicked the function reset is invoked
 */
function initSession2EventListeners(){
  // window.addEventListener('load', animateGameObjects);
  window.addEventListener('resize', repositionGameObjects);
  reset_btn.addEventListener('click', reset);
  runObject.addEventListener('click', initializeBlockIdentifiers);

  // Add event listeners for drag and drop functionality on the canvas
  canvas.addEventListener('drop', drop);
  canvas.addEventListener('dragover', allowDrop);

  // reset button clears all the blocks from the canvas, but does not reset the chicken
  document.getElementById('block-reset').addEventListener('click', blockResetHandler);
}


/**
 * Start the game
 * initialize the event listeners
 * set up the maze
 * initialize draggable blocks
 */
function startGame(){
  animateGameObjects();
  initSession2EventListeners();
  maze = new Maze(mazeStartX, mazeStartY, mazeWidth, mazeHeight); 
  makeDraggable();    
}


function displayInstructions(){
  if (instructionIndex < instructions.length){
    hintText.firstChild.nodeValue = instructions[instructionIndex].text;
    hintImage.src = instructions[instructionIndex].image_path;
    instructionIndex++;
  }else {
    hintContainer.style.display = "none";
    startGame();
  }
}

// start game
nextButton.addEventListener('click', displayInstructions);


