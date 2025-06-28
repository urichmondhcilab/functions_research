/**
 * currentNumberOfBirds is a counter for the number of birds created at each timeInterval
 * allBirds an array that will hold bird objects as they are created
 * currentAngle I'm placing birds at a radius from a point and incrementing this angle
 *  every time interval
 * radius is the distance of my bird from by choosen center 
 * motherCreated is a boolean value, true if mother created.
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
let currentAngle = 0;
let maze = null;
let selectedBirds = [];
//let radius = 200;

/**
 * animateGameObjects by changing sprites
 * runs setInterval 
 * setInterval(fun, ms) is a JavaScript function that receives a function fun
 * and runs fun every ms milliseconds
 * In this case it receives the function birdAction and runs it every 1000 milliseconds
 */
function animateGameObjects(){
  setInterval(birdAction, 1000);
}


/**
 * In a time interval, if we have not exceeded the maximum number of birds,
 * We create a new bird 
 * and add the bird to the array of existing birds
 * increment the current number of birds
 * write the new number of birds on the screen
`* adds event listener, when clicked, sets that bird object to selectedBird.
  * to allow coding.
  * Remove event listener, remove redundance
 */
function createBird(){
  if (currentNumberOfBirds < MAX_NUMBER_OF_BIRDS){
    let birdie = new Bird(currentNumberOfBirds);
      allBirds[currentNumberOfBirds] = birdie;
      currentNumberOfBirds++;
      birdCounter++;
      birdie.birdie.addEventListener("click", function () {
        selectedBirds.length = 0;
        selectedBirds.push(birdie);
     });
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
    motherHen.mother.addEventListener("click", function () {
      selectedBirds.length = 0;
      selectedBirds = allBirds;
   });
  }
}

/**
 * In every time interval, for all the current birds,
 * we move them left or right by setting the birds left property
 * We also switch between the two chick resting poses by checking for either a 1 or 0 value
 * 
 * Checks if currently eating/drinking, if so, skips resting image change until finished
 * 
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
      if(currentBird.birdie.currImageFlag == 0){
      currentBird.birdie.firstChild.src = 'images/chicks/squarton_resting_position_1.svg'; //'gameenvironmentandrestingpose/chick_resting_1.svg';
      currentBird.birdie.currImageFlag = 1;
      }
      else{
      currentBird.birdie.firstChild.src = 'images/chicks/squarton_resting_position_2.svg';
      currentBird.birdie.currImageFlag = 0;
      }
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

function test(){
  console.log("here");
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
  updateMotherHen();
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
function repositionGameObjects(){
  //reset the positions of the birds based on new screen size
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  centerX = (window.innerWidth * 0.6)/ 2;
  centerY = window.innerHeight / 2;
  offsetX = screenWidth * 0.07; // offset is 7% of the screen width
  offsetY = screenWidth * 0.09; // offset is 9% of the screen width
  positionX = centerX - offsetX; // we subtract the X offset to shift the chick left
  positionY = centerY + offsetY; // we add the Y offset to move the chick further down from the center
  radius = screenWidth / 12; // the radius is relative to the width and height of the screen

  // update maze location variables 
  mazeStartX = 0;
  mazeStartY = (window.innerHeight * 0.7);
  mazeWidth = (window.innerWidth * 0.6);
  mazeHeight = (window.innerHeight  * 0.8);


  for (let i = 0; (i < currentNumberOfBirds) && (allBirds.length > 0); i++){
    let currentBird = allBirds[i];
    if (currentBird)
      currentBird.updateBirdPosition();
  } 

    if(motherHen != null){
      motherHen.updateMomPosition();
    }

    console.log("maze in reposition: " + maze);
    if (maze) maze.upadateMazePosition(mazeStartX, mazeStartY, mazeWidth, mazeHeight);
  
}

(function(){
  maze = new Maze(mazeStartX, mazeStartY, mazeWidth, mazeHeight); 
})();


/**
 * The program starts here
 * An event listener runs in the background waiting for an event to occur on an element
 * In these two cases load and click
 * Once load occurs the function animateGameObjects is invoked
 * Once the reset button is clicked the function reset is invoked
 */
window.addEventListener('load', animateGameObjects);
window.addEventListener('resize', repositionGameObjects);
reset_btn.addEventListener('click', reset);
