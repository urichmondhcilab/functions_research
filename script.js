let currentNumberOfBirds = 0;
let allBirds = [];
let currentAngle = 0;
let radius = 200;


function bob(){
  setInterval(birdAction, 1000);
}

function createBird()
{
  if (currentNumberOfBirds < MAX_NUMBER_OF_BIRDS){
    let birdie = new Bird();
      allBirds[currentNumberOfBirds] = birdie;
      currentNumberOfBirds++;
      point_number.textContent = currentNumberOfBirds; //this updates the counter of chicks on the top left. 
  }
}

function moveBirds(){
  for (let i = 0; (i < currentNumberOfBirds) && (allBirds.length > 0); i++){

    let currentBird = allBirds[i];
    if (currentBird){
      let currentLeft = parseInt(currentBird.birdie.style.left); //ask about this. 
      let currentTop = parseInt(currentBird.birdie.style.top);

      currentBird.movedLeft = currentBird.movedLeft * -1; //ask about this.
      currentBird.birdie.style.left = `${currentLeft + currentBird.movedLeft}px`; //ask about this. 
    }
  }
}

function removeBirds(bird){
  if (!bird) return false;
  let keepBird = true;
  bird.lifeSpan = bird.lifeSpan - 1;
  if (bird.lifeSpan <= 0){
    game_canvas.removeChild(bird.birdie); //why do we use bird.birdie?
    keepBird = false;
  }
  return keepBird;
}

function birdAction(){
  createBird();
  moveBirds();
  allBirds = allBirds.filter(removeBirds);
}

function reset(){
  currentNumberOfBirds = 0;
  allBirds.forEach((bird, i) => { //ask about this. what does forEach come from.
    game_canvas.removeChild(bird.birdie);
  });

  allBirds = [];
}

window.addEventListener('load', bob); 
// program starts Here , waits for page load
reset_btn.addEventListener('click', reset);
