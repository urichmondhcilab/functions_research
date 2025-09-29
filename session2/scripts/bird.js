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
    this.points = 5;
    this.finished = false;

    // place birds on tiles
    this.placeBird(maze);

    // handle "this" that refers to the event object and "this" that refers to the object
    // bind the the the object to the member function
    this.displayCodeEditor = this.displayCodeEditor.bind(this);

    birdImg.addEventListener("click", this.displayCodeEditor);
    selectionDiv.addEventListener("click", this.displayCodeEditor);

    game_canvas.appendChild(this.birdie);

    //make a lifespan DOM elements:
    this.point_count = document.createElement("div");
    this.point_count.id = this.id + ' points';
    this.point_count.className = 'point_count';
    this.point_count.innerText = this.id + ': ' + this.lifeSpan;
    document.getElementById("points_container").appendChild(this.point_count);
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
        console.log("in for loop");
        selectedBird.birdie.style.border = "none";
        selectedBird.selected = false;
        selectedBird.selectionDiv.style.display = "none";
      }
    }
    if (motherHen !== null && motherHen !== undefined){
      motherHen.mother.style.border = "none";
    }

    // this.birdie.style.border = ".1rem solid cyan"; 
    this.selectionDiv.style.backgroundImage = "url('images/star_animation_frames/seven.svg')" ;  
    this.selectionDiv.style.backgroundRepeat = "no-repeat";
    this.selectionDiv.style.backgroundPosition = "center";
    this.selectionDiv.style.backgroundSize = "cover";
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
   */
  updateBird(){        
      if (this.selected){
        if (this.selectionCount > chickSelectionStars.length - 1) this.selectionCount = 0  
        this.selectionDiv.style.backgroundImage = `url(${chickSelectionStars[this.selectionCount++]})`;
        this.birdie.firstChild.src = chickImagePaths[this.selectedColorIndex][Math.round (Math.random() * (chickImagePaths[this.selectedColorIndex].length - 1))]; 
      }
      else{
        this.birdie.firstChild.src = chickImagePaths[0][Math.round (Math.random() * (chickImagePaths[0].length - 1))];   
      }
  }

  /**
   * Redcuce Lifespan by 1, update counter
   */
  pointDecrement(){
    if(!this.finished){
      this.lifeSpan = this.lifeSpan - 1;
      this.point_count.innerText = this.id + ': ' + this.lifeSpan;
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
      this.updatePoints(-1);
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


    //Display in new position
    let top = parseInt(slicePX(this.curTile.y) /*- slicePX(this.curTile.height) / 8*/);
    let left = parseInt(slicePX(this.curTile.x) + slicePX(this.curTile.width) / 4);  
    this.birdie.style.left= `${left}px`;
    this.birdie.style.top = `${top}px`;  
    moveSound.play();   

    if (this.curTile.state.name === "BLOCK"){   
      //this.die();
      return;
    }
    
    if (this.curTile.state.name == "END"){
      console.log("ended maze!");
      this.updatePoints(10);
      //Get current count in int form
      this.finished = true;
      this.point_count.innerText = this.id + ': ' + '!!!';
      // curFinishCount++;
      // finished_counter.textContent = curFinishCount;
      this.point_count.style.backgroundColor = "green";
      // this.lifeSpan = 0;
      //Disapear chick (animation/sound)
      //update finished counter
    }
}

/**
 * changes the bird sprite to the drinking sprite
 * the bird dies when it tries to drink on a tile that is not a water tiel
 */
drink() {
  if(this.curTile.state.name == "WATER"){
    this.birdie.firstChild.src = 'images/chicks/Squarton_splashing.svg';
    drinkSound.play();
    this.updatePoints(1);
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
      eatSound.play();
      this.updatePoints(1);
    }else{
      this.die();
    }
  }

      //this.birdie.firstChild.src = 'images/chicks/squarton_dead.svg';
    //this.birdie.deathImgFlag = 1;
/**
 * call to remove bird from list of birds
 */
  die(){
    if(this.curTile){
      this.curTile.occupied = false;
    }
    this.updatePoints(-1);
    dieSound.play();
    //lifespan resets
    this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
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
    this.points += val;
    console.log(this.points)
  }
}
