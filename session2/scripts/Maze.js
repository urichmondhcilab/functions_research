/**
 * A Maze class that will be made up of Tile objects 
 */
class Maze{
    /**
     * @param {Number} startX The start pixel of the Maze along the horizontal
     * @param {Number} startY The start pixel of the Maze along the vertical
     * @param {Number} endX The end pixel of the Maze along the horizontal
     * @param {Number} endY The end pixel of the Maze along the vertical
     */
    constructor(startX, startY, endX, endY){

        this.#init(startX, startY, endX, endY);

        //Loops creation of maze, until one that can be finished from start is created.
        this.travesable = false;
        while (!this.travesable){
            //removes any existing maze from DOM
            this.removeMazeDOM();

            // initialize maze to empty array. Each entry is a tile object
            this.maze = [];
            let currentX = Math.floor(startX);
            let currentY = Math.floor(startY) + 1; //+ 1 is here to make the amount of tiles in the y 1-indexed
            endX = Math.floor(endX);
            endY = Math.floor(endY);

            let i = 0;
            let j = 0;

            //create each tile add add each tile to maze and the DOM
            while (i < NUMBER_OF_TILES_Y){
                let mazeY = [];     
                j = 0;       
                currentX = Math.floor(startX);

                while(j < NUMBER_OF_TILES_X){
                    let currentState = state[Math.floor(Math.random() * state.length)];
                    let tile = new Tile(currentX + 'px', currentY + 'px', this.tileWidth + 'px', this.tileHeight + 'px', currentState);
                
                    game_canvas.appendChild(tile.div);
                    currentX = currentX + (this.tileWidth);
                    mazeY.push(tile)
                    j++;
                }

                this.maze.push(mazeY)
                currentY = currentY + (this.tileHeight);   
                startX = Math.floor(startX * 0.7); //edit start x and end x to turn in with the background.
                endX = Math.floor(endX * 1.1);
                i++;
            }        

            // console.log(this.maze[0])
            // i = this.maze.length - 1;
            // j = this.maze[0].length - 1;
            // let endTile = this.maze[i][j];
            // game_canvas.removeChild(endTile.div);                
            // this.maze[i][j] = new Tile(endTile.x, endTile.y, endTile.width, endTile.height, ENDSTATE); 
            // endTile = this.maze[i][j];
            // game_canvas.appendChild(endTile.div);
            this.setStart();
            this.setEnd();
            if (!this.canFinishMaze()){
                console.log("can NOT finish the maze");
            }
            else{
                console.log("can finish the maze");
                this.travesable = true;
            }
        }
    }


    upadateMazePosition(startX, startY, endX, endY){

        this.#init(startX, startY, endX, endY);
        
        let currentX = Math.floor(startX);
        let currentY = Math.floor(startY) + 1; //+ 1 is here to make the amount of tiles in the y 1-indexed

        let i = 0;
        let j = 0;

        // console.log(this.maze);
        while (i < this.maze.length){
            currentX = Math.floor(startX);
            j = 0;
            while(j < this.maze[i].length){
                let currTile = this.maze[i][j];
                currTile.updateTile(currentX + 'px', currentY + 'px', this.tileWidth + 'px', this.tileHeight + 'px');

                currentX = currentX + (this.tileWidth);
                j++;
            }
            currentY = currentY + (this.tileHeight);   
            i++;            
        }        
    }

    //right now, only replaces maze.occupied attributes, so maze and be refreshed,
    //and chicks can then spawn anywhere again.
    mazeRevert(){
        for (let i=0; i<this.maze.length; i++){
            for(let j=0; j < this.maze[i].length; j++){
                this.maze[i][j].occupied = false;
            }
        }
    }

    removeMazeDOM(){
        if(!this.maze){
            return;
        }
        for(let row of this.maze){
            for(let tile of row){
                if(tile && tile.div && tile.div.parentNode){
                    tile.div.parentNode.removeChild(tile.div);
                }
            }
        }

    }

  /**
   * 
   * @param {*} x, the chicks current x index in the maze, at intial call (0)
   * @param {*} y, the chicks current x index in the maze, at initial call (0)
   * @param {*} visited, a set that keeps track of indexes of maze already visited
   * @returns Recursive call for all possible next moves from current spot.
   */
  canFinishMaze(x = 0,y = 0, visited = new Set()){
    //Makes sure not out of bounds, if so ends recursion
    if (x <0 || y <0 ||  x >= this.maze.length || y >= this.maze[0].length){
      return false;
    }

    let tile = this.maze[x][y];

    //Makes sure chicks path end if on a wall, the start or a previously visited tile
    if (tile.state.name == "BLOCK" || visited.has(`${x},${y}`)){
      return false;
    }

    //Returns true, if it can reach the end in some path
    if (tile.state.name == "END"){
      return true;
    }
  
    //adds current index on maze to visited
    visited.add(`${x},${y}`);
    
    //recurive call for all possible moves, only one true (at any call/level) needed for true, to return true.
    return (this.canFinishMaze(x+1,y,visited) || this.canFinishMaze(x-1,y,visited)
     || this.canFinishMaze(x,y+1,visited) || this.canFinishMaze(x,y-1,visited))
  }



    #init(startX, startY, width, height){
        // compute the width and height of each tile
        this.tileWidth = Math.floor((width - startX) / (NUMBER_OF_TILES_X - 1)); //-1 is here to make the amount of tiles in  the x 1-indexed 
        this.tileHeight = Math.floor((height - startY) / NUMBER_OF_TILES_Y);   
    }

    setEnd(){
        let i = this.maze.length - 1;
        let j = this.maze[0].length - 1;
        let endTile = this.maze[i][j];
        game_canvas.removeChild(endTile.div);                
        this.maze[i][j] = new Tile(endTile.x, endTile.y, endTile.width, endTile.height, ENDSTATE); 
        endTile = this.maze[i][j];
        game_canvas.appendChild(endTile.div);        
    }

    setStart(){
        let i = 0;
        let j = 0;
        let startTile = this.maze[i][j];
        game_canvas.removeChild(startTile.div);                
        this.maze[i][j] = new Tile(startTile.x, startTile.y, startTile.width, startTile.height, STARTSTATE); 
        startTile = this.maze[i][j];
        game_canvas.appendChild(startTile.div);        
    }    
}