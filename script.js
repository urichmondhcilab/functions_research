let currentNumberOfBirds = 0;
let allBirds = [];

function bob(){
  setInterval(birdAction, 1000);
}

function createBird()
{
  if (currentNumberOfBirds < MAX_NUMBER_OF_BIRDS){
    let birdie = new Bird();
      allBirds[currentNumberOfBirds] = birdie;
      currentNumberOfBirds++;
      point_number.textContent = currentNumberOfBirds;
  }
}

function moveBirds(){
  for (let i = 0; (i < currentNumberOfBirds) && (allBirds.length > 0); i++){

    let currentBird = allBirds[i];
    if (currentBird){
      let currentLeft = parseInt(currentBird.birdie.style.left);
      let currentTop = parseInt(currentBird.birdie.style.top);

      currentBird.movedLeft = currentBird.movedLeft * -1;
      currentBird.birdie.style.left = `${currentLeft + currentBird.movedLeft}px`;
    }
  }
}

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

function birdAction(){
  createBird();
  moveBirds();
  allBirds = allBirds.filter(removeBirds);
}

function reset(){
  currentNumberOfBirds = 0;
  allBirds.forEach((bird, i) => {
    game_canvas.removeChild(bird.birdie);
  });

  allBirds = [];
}

window.addEventListener('load', bob);
reset_btn.addEventListener('click', reset);
