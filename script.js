/**
 * currentNumberOfBirds is a counter for the number of birds created at each timeInterval
 * allBirds an array that will hold bird objects as they are created
 * currentAngle I'm placing birds at a radius from a point and incrementing this angle
 *  every time interval
 * radius is the distance of my bird from by choosen center 
 */
let currentNumberOfBirds = 0;
let birdCounter = 0;
let currNumOfMoms = 0;
let currWater = 0;
let allBirds = [];
let allMothers = [];
let waterObj = [];
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
    let list = new List();
      allBirds[currentNumberOfBirds] = birdie;
      currentNumberOfBirds++;
      birdCounter++;
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
    waterObj[0] = water;
    currWater++;
  }
}

/**
 * In every time interval, for all the current birds,
 * we move them left or right by setting the birds left property 
 * Note that the bird is an html image element
 * Instead, of moving, we update the images. We use the same idea as we used updating the mother image, instead we go through all the birds
 * present within the array. 
 */
function updateBirds(){
  for (let i = 0; (i < currentNumberOfBirds) && (allBirds.length > 0); i++){

    let currentBird = allBirds[i];

    if(currentBird && currentBird.lifeSpan > 1){
      if(currentBird.birdie.currImageFlag == 0){
      currentBird.birdie.firstChild.src = 'gameenvironmentandrestingpose/chick_resting_1.svg';
      currentBird.birdie.currImageFlag = 1;
      }
      else{
      currentBird.birdie.firstChild.src = 'gameenvironmentandrestingpose/chick_resting_2.svg';
      currentBird.birdie.currImageFlag = 0;
      }
    }

    if(currentBird && currentBird.birdie.deathImgFlag == 1){
      currentBird.birdie.firstChild.src = 'gameenvironmentandrestingpose/Squarton_Dead_1.svg';
    }
  }
}
/**
 * To update the mother image, we first grab the current mother from the allMothers array. We then get the current mom image.
 * We use a simple 1-0 switching if-else block to make sure the switch happens every tick (If 0, we are on img2. If 1, we are on img1.)
 * The mother object has the field currImageFlag built into it so that this switching can happen.
 */
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
    // console.log("deadimg");
    // console.log(bird.birdie.deathImgFlag);
  }
  if (bird.lifeSpan <= 0){
    game_canvas.removeChild(bird.birdie);
    keepBird = false;
    birdCounter--;
  }
  // console.log(allBirds)

  return keepBird;
}

/**
 * Every second a bird is created, 
 * birds are moved 
 * and birds that have completed livespan are removed
 * The filter function runs removeBird on each bird in allBirds.
 * It keeps the birds for which removeBird returns true.
 */
function birdAction(){
  createMother();
  createBird();
  createWater();
  updateImage();
  updateBirds();
  allBirds = allBirds.filter(removeBirds);
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
  for(let m = 0; m < currNumOfMoms; m++){
    let currentMom = allMothers[m];
    if(currentMom){
      currentMom.updateMomPosition();
    }
  }
  for(let w = 0; w < currWater; w++){
    let currentWater = waterObj[w];
    if(currentWater){
      currentWater.updateWaterPosition();
    }
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
