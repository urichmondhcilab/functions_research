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
  constructor(birdId, maze){
    // give the bird an id
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
    this.curTile = null;       
    this.xIndex = 0;
    this.yIndex = 0;

    // place birds on tiles
    this.placeBird(maze);



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


  /**
   * update the bird position when the screen has been resized
   */
  updateBirdPosition(){
    
    // this.birdie.style.left= this.curTile.x;
    // this.birdie.style.top = this.curTile.y; 
    
    let top = parseInt(slicePX(this.curTile.y) - slicePX(this.curTile.height) / 8);
    let left = parseInt(slicePX(this.curTile.x) + slicePX(this.curTile.width) / 4);  
    this.birdie.style.left= `${left}px`;
    this.birdie.style.top = `${top}px`;     
  }


  /**
   * update the bird sprite to a random sprite
   */
  updateBird(){
      this.birdie.firstChild.src = chickImagePaths[Math.round (Math.random() * (chickImagePaths.length - 1))];    
  }

/**
 * move the bird to the start of the maze
 * @param {Maze} curMaze 
 */
start(curMaze) {
  this.curTile = curMaze[0][0];
  this.yIndex = 0;
  this.xIndex = 0;
  this.birdie.style.left = this.curTile.x;
  this.birdie.style.top = this.curTile.y;  
}    

/**
 * Moves the chick to the desired end tile, one step at a time
 * @param {string} direction is the direction to move in
 * @param {Integer} steps, amount of steps/tiles to move
 * @param {Array} curMaze, current array of the maze, houses tiles
 */
move(direction, curMaze) {

  //If this is the chicks first move, the bird dies
  if (this.curTile === null){   
    this.die();
    return;
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
    //Display in new position
    let top = parseInt(slicePX(this.curTile.y) - slicePX(this.curTile.height) / 8);
    let left = parseInt(slicePX(this.curTile.x) + slicePX(this.curTile.width) / 4);  
    this.birdie.style.left= `${left}px`;
    this.birdie.style.top = `${top}px`;     

    // this.birdie.style.left = this.curTile.x;
    // this.birdie.style.top = this.curTile.y;
}

/**
 * changes the bird sprite to the drinking sprite
 * the bird dies when it tries to drink on a tile that is not a water tiel
 */
drink() {
  if(this.curTile.state.name == "WATER"){
    this.birdie.firstChild.src = 'images/chicks/Squarton_splashing.svg';
  }else{
    this.die();
  }
}


/**
 * changes the bird sprite to the eating sprite
 * the bird dies if it tries to eat on a plank that is not an eating plank
 */
  eat() {
  if(this.curTile.state.name == "FOOD"){
      this.birdie.firstChild.src = 'images/chicks/Squarton_feeding.svg';
    }else{
      this.die();
    }
  }


/**
 * call to remove bird from list of birds
 */
  die(){
    this.birdie.firstChild.src = 'images/chicks/squarton_dead.svg';
    this.birdie.deathImgFlag = 1;
    this.lifeSpan = 0;  
  }


  placeBird(maze){
    let mazeArray = maze.maze;
    let width = mazeArray.length;
    let height = mazeArray[0].length;
    let i = parseInt(Math.random() * width);
    let j = parseInt(Math.random() * height);
    let tile = mazeArray[i][j];
    let top = parseInt(slicePX(tile.y) - slicePX(tile.height) / 8);
    let left = parseInt(slicePX(tile.x) + slicePX(tile.width) / 4);  
    this.birdie.style.left= `${left}px`;
    this.birdie.style.top = `${top}px`;  
    this.curTile = tile;    
    this.xIndex = j;
    this.yIndex = i;
    
    console.log(top);
    console.log(left);
  }


}
