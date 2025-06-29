/**
 * A bird class that creates and styles an image object as a bird
 * birds have a lifeSpan
 * and an image element (dynamically generated)
 * We give the image element a class with pre-determined styles from chick_style.css
 * We set the image elements position on the screen with absolute, left and top
 * We add the child to the body of the html
 * We have a currImage and deathImage flag. The currImage flag changes the sprite of the chicks. 
 * Currently, we have two images, corresponding to values 1 and 0 on this integer. 
 * We have a deathImage. When this flag is set to 1, the death image is displayed. Otherwise, the image is set to the normal chick image.
 */
class Bird{
/**
 * The constructor initializes the birdId
 * @param {Number} birdId the number assigned to the bird when it was created 
 */
  constructor(birdId){
    // give the bird an id
    this.id = birdId;

    this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
    let birdDiv = document.createElement('div');
    let birdImg = document.createElement('img');
    birdImg.className = "chick";
    // birdImg.style.objectFit = "cover";
    birdImg.style.border= "none";
    birdDiv.appendChild(birdImg)
    this.birdie = birdDiv;

    let left = `${(positionX) + Math.floor(radius * Math.cos(currentAngle * (Math.PI / 180)))}px`;
    let top = `${(positionY) + Math.floor(radius * Math.sin(currentAngle * (Math.PI / 180)))}px`;
    let hasMoved = false;
    let isDrinking = false;
    let isEating = false;
    currentAngle = (currentAngle + 45) % 360;

    this.birdie.currImageFlag= 0;
    this.birdie.deathImgFlag = 0;

    this.birdie.className = 'chickCont';
    this.birdie.style.position="absolute";

    this.birdie.style.left= left;
    this.birdie.style.top = top;
    this.xIndex = 0;
    this.yIndex = 0;
    this.curTile = null

    // handle "this" that refers to the event object and "this" that refers to the object
    // bind the the the object to the member function
    this.displayCodeEditor = this.displayCodeEditor.bind(this);

    birdImg.addEventListener("click", this.displayCodeEditor);

    game_canvas.appendChild(this.birdie);
  }

  /**
   * display the bird's id everytime a bird is clicked
   * @param {Object} e is the event object
   */
  displayCodeEditor(e){
    let codeEditor = document.getElementById("codeEditor");
    codeEditor.firstChild.nodeValue = "chick " + this.id;
    let curClass = this.birdie.className;
    this.birdie.className = curClass + " selectedBackground";
    if (selectedBirds != null)
      selectedBirds.style.border = "none";
    selectedBirds = this.birdie;

  }

  updateBirdPosition(){
    let left = `${(positionX) + Math.floor(radius * Math.cos(currentAngle * (Math.PI / 180)))}px`;
    let top = `${(positionY) + Math.floor(radius * Math.sin(currentAngle * (Math.PI / 180)))}px`;
    currentAngle = (currentAngle + 45) % 360;
    this.birdie.style.left= left;
    this.birdie.style.top = top;      
  }

  updateBird(){
      console.log(Math.round (Math.random() * (chickImagePaths.length - 1)));
      this.birdie.firstChild.src = chickImagePaths[Math.round (Math.random() * (chickImagePaths.length - 1))];    
      // if (selectedBirds != this.birdie){
      //   this.birdie.border = "None";
      // }
  }

/**
 * Moves the chick to the desired end tile, one step at a time
 * @param {string} direction is the direction to move in
 * @param {Int} steps, amount of steps/tiles to move
 * @param {Array} curMaze, current array of the maze, houses tiles
 */
  //Data structure all the tiles until the end
  move(direction, steps, curMaze) {

    //If this is the chicks first move, set the current tile to the first in maze
    if (this.curTile === null){
      this.curTile = curMaze[0][0];
    }

    //Loops through the number of steps
    //adjusts the index of the tile to move to +-1
    for(let i=0; i<steps; i++){
      setTimeout(() => {
        switch (direction) {
          case "up":
              this.yIndex = Math.max(this.yIndex - 1, 0);
              break;
          case "down":
              this.yIndex = Math.min(this.yIndex + 1, NUMBER_OF_TILES_Y - 1);
              break;
          case "left":
            this.xIndex = Math.max(this.xIndex - 1, 0);
              break;
          case "right":
            this.xIndex = Math.min(this.xIndex + 1, NUMBER_OF_TILES_X - 1);
              break;
        }

      //Gets the tile from updated indexes
      this.curTile = curMaze[this.yIndex][this.xIndex];
      //Display new position
      this.birdie.style.left = this.curTile.x;
      this.birdie.style.top = this.curTile.y;
      }, 1000 * i);

    }
  }


async drink() {
  //Checks tile image, if water, changes to splash image, then reverts
  if(this.curTile.div.style.backgroundImage == `url("${"images/water/water.svg"}")`){

    this.isDrinking = true;
    this.birdie.firstChild.src = 'images/chicks/Squarton_splashing.svg';
    await new Promise(resolve => setTimeout(resolve, 1000)); // delay 1 second
    this.birdie.firstChild.src = 'images/chicks/squarton_resting_position_1.svg';
    this.isDrinking = false;

  //Else, changes to death image and sets variables to despawn
  }else{
    this.birdie.firstChild.src = 'images/chicks/squarton_dead.svg';
    this.birdie.deathImgFlag = 1;
    this.lifeSpan = 0;
  }
}

  async eat() {
    //Checks tile image, if food, changes to eat image, then reverts
    if(this.curTile.div.style.backgroundImage == `url("${"images/food/food.svg"}")`){
      this.isEating = true;
      this.birdie.firstChild.src = 'images/chicks/Squarton_feeding.svg';
      await new Promise(resolve => setTimeout(resolve, 1000)); // delay 1 second
      this.birdie.firstChild.src = 'images/chicks/squarton_resting_position_1.svg';
      this.isEating = false;

    //Else, changes to death image and sets variables to despawn
    }else{
      this.birdie.firstChild.src = 'images/chicks/squarton_dead.svg';
      this.birdie.deathImgFlag = 1;
      this.lifeSpan = 0;
    }
  }
}
