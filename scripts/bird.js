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
    currentAngle = (currentAngle + 45) % 360;
    this.id = birdId;

    this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
    let birdDiv = document.createElement('div');
    let birdImg = document.createElement('img');
    birdImg.className = "chick";
    birdImg.style.border= "none";
    birdDiv.appendChild(birdImg)

    this.birdie = birdDiv;
    this.birdie.deathImgFlag = 0;    
    this.birdie.className = 'chickCont';
    this.birdie.style.position="absolute";    
    this.birdie.style.left= `${(positionX) + Math.floor(radius * Math.cos(currentAngle * (Math.PI / 180)))}px`;
    this.birdie.style.top = `${(positionY) + Math.floor(radius * Math.sin(currentAngle * (Math.PI / 180)))}px`;    
    this.xIndex = 0;
    this.yIndex = 0;
    this.curTile = null

    let hasMoved = false;
    let isDrinking = false;
    let isEating = false;

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
  async displayCodeEditor(e){
    let codeEditor = document.getElementById("codeEditor");
    codeEditor.firstChild.nodeValue = "chick " + this.id;
    console.log(selectedBirds);
    if (selectedBirds != null && selectedBirds !== undefined){
      for (const selectedBird of selectedBirds){
        selectedBird.birdie.style.border = "none";
      }
    }
    if (motherHen !== null && motherHen !== undefined){
      motherHen.mother.style.border = "none";
    }

    this.birdie.style.border = ".1rem solid cyan";       
    selectedBirds = [this];
  }

  updateBirdPosition(){
    let left = `${(positionX) + Math.floor(radius * Math.cos(currentAngle * (Math.PI / 180)))}px`;
    let top = `${(positionY) + Math.floor(radius * Math.sin(currentAngle * (Math.PI / 180)))}px`;
    currentAngle = (currentAngle + 45) % 360;
    this.birdie.style.left= left;
    this.birdie.style.top = top;      
  }

  updateBird(){
      this.birdie.firstChild.src = chickImagePaths[Math.round (Math.random() * (chickImagePaths.length - 1))];    
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
    // console.log(curMaze);
    if (this.curTile === null){   
      this.curTile = curMaze[0][0];
    }

    //adjusts the index of the tile to move to +-1
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
  }


drink() {
  //Checks tile image, if water, changes to splash image, then reverts
  if(this.curTile.div.style.backgroundImage == `url("${"images/water/water.svg"}")`){
    this.isDrinking = true;
    this.birdie.firstChild.src = 'images/chicks/Squarton_splashing.svg';
    this.isDrinking = false;

  //Else, changes to death image and sets variables to despawn
  }else{
    this.birdie.firstChild.src = 'images/chicks/squarton_dead.svg';
    this.birdie.deathImgFlag = 1;
    this.lifeSpan = 0;
  }
}

  eat() {
    //Checks tile image, if food, changes to eat image, then reverts
    if(this.curTile.div.style.backgroundImage == `url("${"images/food/food.svg"}")`){
      this.isEating = true;
      this.birdie.firstChild.src = 'images/chicks/Squarton_feeding.svg';
      this.isEating = false;

    //Else, changes to death image and sets variables to despawn
    }else{
      this.birdie.firstChild.src = 'images/chicks/squarton_dead.svg';
      this.birdie.deathImgFlag = 1;
      this.lifeSpan = 0;
    }
  }
}
