/**
 * currentNumberOfBirds is a counter for the number of birds created at each timeInterval
 * allBirds an array that will hold bird objects as they are created
 * currentAngle I'm placing birds at a radius from a point and incrementing this angle
 *  every time interval
 * radius is the distance of my bird from by choosen center 
 */
let currentNumberOfBirds = 0;
let currNumOfMoms = 0;
let currWater = 0;
let allBirds = [];
let allMothers = [];
let currentAngle = 0;
//let radius = 200;

/**
 * bob [from side to side]
 * runs setInterval 
 * setInterval(fun, ms) is a JavaScript function that receives a function fun
 * and runs fun every ms milliseconds
 * In this case it receives the function birdAction and runs it every 1000 milliseconds
 */
function bob(){
  setInterval(birdAction, 1000);
}

/**
 * In a time interval, if we have not exceeded the maximum number of birds,
 * We create a new bird 
 * and add the bird to the array of existing birds
 * increment the current number of birds
 * write the new number of birds on the screen
 */
function createBird()
{
  if (currentNumberOfBirds < MAX_NUMBER_OF_BIRDS){
    let birdie = new Bird();
      allBirds[currentNumberOfBirds] = birdie;
      currentNumberOfBirds++;
      point_number.textContent = currentNumberOfBirds;
  }
}

function createMother(){
  let mother = new Mother();
  allMothers[currNumOfMoms] = mother;
  currNumOfMoms++;
}

function createWater(){
  if(currWater < MAX_WATER){
    let water = new Water();
    currWater++;
  }
}

/**
 * In every time interval, for all the current birds,
 * we move them left or right by setting the birds left property 
 * Note that the bird is an html image element
 */
function updateBirds(){
  for (let i = 0; (i < currentNumberOfBirds) && (allBirds.length > 0); i++){

    let currentBird = allBirds[i];
    if (currentBird){
      
      //let currentLeft = parseInt(currentBird.birdie.style.left);
      //currentBird.movedLeft = currentBird.movedLeft * -1;
      //currentBird.birdie.style.left = `${currentLeft + currentBird.movedLeft}px`;
    }

    if(currentBird.birdie.currImageFlag == 0){
      currentBird.birdie.src = 'gameenvironmentandrestingpose/chick_resting_1.svg';
      currentBird.birdie.currImageFlag = 1;
    }
    else{
      currentBird.birdie.src = 'gameenvironmentandrestingpose/chick_resting_2.svg';
      currentBird.birdie.currImageFlag = 0;
    }
  }
}

function updateImage(){
  currMom = allMothers[0]; 
  currMomImage = currMom.mother.src;

  if (currMom.mother.currImageFlag == 0){
    currMom.mother.src = 'images/Mother_Hen_2.svg';
    currMom.mother.currImageFlag = 1;
  }

  else{
    currMom.mother.src = 'images/Mother_Hen_1.svg';
    currMom.mother.currImageFlag = 0;
  }

}

/**
 * remove bird receives a bird, reduces its life, determines if the life is <= 0
 * if the life is less than or equal 0, the bird is removed from the body of the html.
 * removeChild is a JavaScript function that removes a child element from a parent element.
 * In this case game_canvas is the parent. bird.birdie is the child to remove
 * @param {Bird} bird 
 * @returns a boolean that indicates whether to keep or remove the bird
 */
function removeBirds(bird){
  if (!bird) return false;
  let keepBird = true;
  bird.lifeSpan = bird.lifeSpan - 1;
  if (bird.lifeSpan <= 0){
    game_canvas.removeChild(bird.birdie);
    keepBird = false;
  }
  return keepBird;
}

/**
 * Every second a bird is created, 
 * birds are moved 
 * and birds that have completed their livespan are removed
 * The filter function runs removeBird on each bird in allBirds.
 * It keeps the birds for which removeBird returns true.
 */
function birdAction(){
  createMother();
  createBird();
  createWater();
  updateImage();
  updateBirds();
  //allBirds = allBirds.filter(removeBirds);
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

  allBirds = [];
}


/**
 * recomputes the position of the bird each time the screen is resized
 * by recomputing the centerLeft, centerTop, and radius 
 * and invoking updateBirdPosition for all the birds
 */
function repositionGameObjects()
{

  //reset the positions of the birds based on new screen size
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  centerX = window.innerWidth / 2;
  centerY = window.innerHeight / 2;
  offsetX = screenWidth * 0.07; // offset is 7% of the screen width
  offsetY = screenWidth * 0.09; // offset is 9% of the screen width
  positionX = centerX - offsetX; // we subtract the X offset to shift the chick left
  positionY = centerY + offsetY; // we add the Y offset to move the chick further down from the center
  radius = screenWidth / 12; // the radius is relative to the width and height of the screen


  for (let i = 0; (i < currentNumberOfBirds) && (allBirds.length > 0); i++){
    let currentBird = allBirds[i];
    if (currentBird)
      currentBird.updateBirdPosition();
  }  
}

/**
 * The program starts here
 * An event listener runs in the background waiting for an event to occur on an element
 * In these two cases load and click
 * Once load occurs the function bob is invoked
 * Once the reset button is clicked the function reset is invoked
 */
window.addEventListener('load', bob);
window.addEventListener('resize', repositionGameObjects);
reset_btn.addEventListener('click', reset);
