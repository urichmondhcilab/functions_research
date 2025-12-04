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
    this.maze = maze

    this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
    this.curLife = this.lifeSpan;
    let birdDiv = document.createElement('div');
    let birdImg = document.createElement('img');
    let selectionDiv = document.createElement('div');
    selectionDiv.style.position = "absolute";
    selectionDiv.style.top = "0px";
    selectionDiv.style.left = "0px";
    selectionDiv.style.width = "150%";
    selectionDiv.style.height = "150%";
    selectionDiv.style.transform = "translate(-25%, -25%)"
    // selectionDiv.style.border = "0.1rem solid red";
    selectionDiv.style.display = "none";
    birdImg.className = "chick";
    birdImg.style.border= "none";
    birdDiv.appendChild(birdImg)
    birdDiv.appendChild(selectionDiv);

    this.birdie = birdDiv;
    this.selectionDiv = selectionDiv;
    this.birdie.deathImgFlag = 0;    
    this.birdie.className = 'chickCont';
    this.birdie.style.position="absolute";  
    this.curTile = null;       
    this.xIndex = 0;
    this.yIndex = 0;
    this.selected = false;
    this.selectionCount = 0;
    this.finished = false;
    this.hasConsumed = false;

    // animation variables
    this.animationCount = 5;

    // place birds on tiles
    this.placeBird(maze);

    // handle "this" that refers to the event object and "this" that refers to the object
    // bind the the the object to the member function
    this.displayCodeEditor = this.displayCodeEditor.bind(this);

    birdImg.addEventListener("click", this.displayCodeEditor);
    selectionDiv.addEventListener("click", this.displayCodeEditor);

    game_canvas.appendChild(this.birdie);

    //create a point_display div to hold chick image and point counter
    this.point_display = document.createElement('div');
    this.point_display.className = 'point_display'

    //creates a chick image for each chick in point counter
    this.chick_Icon = document.createElement("img");
    this.chick_Icon.src = chickImagePaths[0][0];
    this.chick_Icon.className = "chick_icon";

    //Create a assocaited container for health bar
    this.healthBarContainer = document.createElement("div");
    this.healthBarContainer.className = "health_bar_container";

    this.healthBarFill = document.createElement("div");
    this.healthBarFill.className = "health_bar_fill";

    this.healthBarContainer.appendChild(this.healthBarFill);

    this.point_display.appendChild(this.chick_Icon);
    this.point_display.appendChild(this.healthBarContainer);

    document.getElementById("points_container").appendChild(this.point_display);
  }

  /**
   * display the bird's id everytime a bird is clicked
   * @param {Object} e is the event object
   */
  async displayCodeEditor(e){
    // let codeEditor = document.getElementById("codeEditor");
    // codeEditor.firstChild.nodeValue = "chick " + this.id;
    // console.log(selectedBirds);
    if (selectedBirds != null && selectedBirds !== undefined){
      for (const selectedBird of selectedBirds){
        console.log("in for loop");
        selectedBird.birdie.style.border = "none";
        selectedBird.selected = false;
        selectedBird.selectionDiv.style.display = "none";
      }
    }
    if (motherHen !== null && motherHen !== undefined){
      motherHen.mother.style.border = "none";
    }

    this.selectionDiv.style.backgroundImage = "url('images/star_animation_frames/seven.svg')" ;  
    this.selectionDiv.style.backgroundRepeat = "no-repeat";
    this.selectionDiv.style.backgroundPosition = "center";
    this.selectionDiv.style.backgroundSize = "cover";

    // this.selectionDiv.className = "chick_icon";

    this.selectionDiv.style.display = "block";
    this.selected = true;
    this.selectedColorIndex = Math.floor(Math.random() * SELECTED_BIRD_COLOR_PALETTE_COUNT) + 1;
    selectedBirds = [this];
  }


  /**
   * update the bird position when the screen has been resized
   */
  updateBirdPosition(){
    console.log(this.curTile.height);
    let top = parseInt(slicePX(this.curTile.y) /*- slicePX(this.curTile.height) / 8*/);
    let left = parseInt(slicePX(this.curTile.x) + slicePX(this.curTile.width) / 4);  
    this.birdie.style.left= `${left}px`;
    this.birdie.style.top = `${top}px`; 
    
  }


  /**
   * update the bird sprite to a random sprite
   * If selected, changes both chick sprite, and associated lifespan counter sprite to same color
   */
  updateBird(){
      if (this.selected){
        if (this.selectionCount > chickSelectionStars.length - 1) this.selectionCount = 0  
        this.selectionDiv.style.backgroundImage = `url(${chickSelectionStars[this.selectionCount++]})`;
        let chick_color = chickImagePaths[this.selectedColorIndex][Math.round (Math.random() * (chickImagePaths[this.selectedColorIndex].length - 1))];
        this.birdie.firstChild.src = chick_color; 
        this.chick_Icon.src = chick_color;
      }
      else{
        let chick_color = chickImagePaths[0][Math.round (Math.random() * (chickImagePaths[0].length - 1))];
        this.birdie.firstChild.src = chick_color;
        this.chick_Icon.src = chick_color;   
      }
  }

  /**
   * Redcuce Lifespan by 1, sets life bar width to percent of current life / total
   * sets color based on which 3rd of lifespan percent is
   */
  pointDecrement(){
    if(!this.finished){
      this.curLife -= 1;
      const lifePercent = this.curLife / this.lifeSpan;
      this.healthBarFill.style.width = (lifePercent * 100) + "%";
      
      if (lifePercent > .66){
        this.healthBarFill.style.backgroundColor = "rgb(53, 255, 53)"
      }
      else if(lifePercent > .33){
        this.healthBarFill.style.backgroundColor = "rgb(245, 237, 10)";
      }
      else{
        this.healthBarFill.style.backgroundColor = "rgb(255, 115, 0)";
      }
    }
  }

/**
 * move the bird to the start of the maze
 * @param {Maze} curMaze 
 */
start(curMaze) {
  this.yIndex = 0;
  this.xIndex = 0;  
  this.curTile = curMaze[this.xIndex][this.yIndex];
  this.birdie.style.left = this.curTile.x;
  this.birdie.style.top = this.curTile.y;  
}    

/**
 * Moves the chick to the desired end tile, one step at a time
 * @param {string} direction is the direction to move in
 * @param {Array} curMaze, current array of the maze, houses tiles
 */
move(direction, curMaze) {

  //If this is the chicks first move, the bird dies
  if (this.curTile === null || this.curTile.state.name === "BLOCK"){   
    this.die();
    return;
  }

  let newX = this.xIndex;
  let newY = this.yIndex;
  //adjusts the index of the tile to move to +-1
      switch (direction) {
        case "up":
            newY = Math.max(newY - 1, 0);
            break;
        case "down":
            newY = Math.min(newY + 1, NUMBER_OF_TILES_Y - 1);
            break;
        case "left":
          newX = Math.max(newX - 1, 0);
            break;
        case "right":
          newX = Math.min(newX + 1, NUMBER_OF_TILES_X - 1);
            break;
      }

    //Gets the tile from updated indexes, check if it will be a block
    //if so returns
    const newTile = curMaze[newY][newX];
    if (newTile.state.name === "BLOCK"){
      dieSound.play();
      this.updatePoints(-25);
      return;
    }
    //Tile no longer occupied
    this.curTile.occupied = false;
    //else sets this. variables
    this.xIndex = newX;
    this.yIndex = newY;
    this.curTile = newTile;
    //new tile now occupied
    this.curTile.occupied = true;
    //no can eat on new tile
    this.hasConsumed = false;

    //Display in new position
    let top = parseInt(slicePX(this.curTile.y) /*- slicePX(this.curTile.height) / 8*/);
    let left = parseInt(slicePX(this.curTile.x) + slicePX(this.curTile.width) / 4);  
    this.birdie.style.left= `${left}px`;
    this.birdie.style.top = `${top}px`;

    moveSound.currentTime = 0;
    moveSound.play();

    if (this.curTile.state.name === "BLOCK"){   
      return;
    }
    
    if (this.curTile.state.name == "END"){
      console.log("ended maze!");
      this.updatePoints(100);
      //Get current count in int form
      this.finished = true;
      this.point_display.style.backgroundColor = "green";
      //Disapear chick (animation/sound)
      //update finished counter
    }
}

/**
 * changes the bird sprite to the drinking sprite
 * Only works for water tiles, points are updated
 */
drink() {
  if(this.curTile.state.name == "WATER" && !this.hasConsumed){
    this.birdie.firstChild.src = 'images/chicks/Squarton_splashing.svg';
    this.hasConsumed = true;
    drinkSound.play();
    this.updatePoints(50);
  }
}


/**
 * changes the bird sprite to the eating sprite
 * Only works for food tiles, points are updated
 */
  eat() {
  if(this.curTile.state.name == "FOOD" && !this.hasConsumed){
      this.birdie.firstChild.src = 'images/chicks/Squarton_feeding.svg';
      this.hasConsumed = true;
      eatSound.play();
      this.updatePoints(50);
    }
  }

/**
 * call to remove bird from list of birds
 */
  die(){
    if(this.curTile){
      this.curTile.occupied = false;
    }
    this.updatePoints(-50);
    this.hasConsumed = false;
    dieSound.play();
    //lifespan resets
    this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
    this.curLife = this.lifeSpan;
    //Places bird on new open spot in maze.
    this.placeBird(maze);
  }


/**
* birds cannot be placed on a block, start or end
* @param {Object} maze 
*/
  placeBird(maze){
    let mazeArray = maze.maze;
    let width = mazeArray.length;
    let height = mazeArray[0].length;
    let i = parseInt(Math.random() * width);
    let j = parseInt(Math.random() * height);
    while (mazeArray[i][j].state.name == "BLOCK" || mazeArray[i][j].state.name == "START" || mazeArray[i][j].state.name == "END"|| mazeArray[i][j].occupied == true){
      i = parseInt(Math.random() * width);
      j = parseInt(Math.random() * height);
    }
    let tile = mazeArray[i][j];
    tile.occupied = true;
    let top = parseInt(slicePX(tile.y) /*+ slicePX(tile.height) / 16*/);
    let left = parseInt(slicePX(tile.x) + slicePX(tile.width) / 4);  
    this.birdie.style.left= `${left}px`;
    this.birdie.style.top = `${top}px`;  
    this.curTile = tile;    
    this.xIndex = j;
    this.yIndex = i;
  }

/**
 * takes in an int and adjusts the birds point total to its value
 * @param {int} val, value of points to be updated
 */
  updatePoints(val){
    this.curLife += val;
    console.log(this.curLife);
  }


  gameCompletionAnimation(){
        let chick_color = chickEndAnimationPoses[this.selectedColorIndex][0];
        this.birdie.firstChild.src = chick_color;    
        this.animationCount -= 1;
  }
}
