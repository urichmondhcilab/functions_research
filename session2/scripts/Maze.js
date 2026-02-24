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
    constructor(startX, startY, endX, endY, stateLen=3){

        this.#init(startX, startY, endX, endY, stateLen);

        this.travesable = false;
        while (!this.travesable){
            this.generateMaze(startX, startY, endX, endY, stateLen);
        }
    }

    /**
     * removes any existing maze from the DOM, creates a new maze with the given positions, and generates the tiles for the 2d maze.
     * If the maze is traversable from start to end, sets the traversable flag to true.
     * 
     * @param {*} startX the start x position of the maze
     * @param {*} startY the start y position of the maze
     * @param {*} endX the end x position of the maze
     * @param {*} endY the end y position of the maze
     * @param {*} stateLen the number of different tile states to choose from
     */
    generateMaze(startX, startY, endX, endY, stateLen){
        this.removeMazeDOM();
        //removes any existing maze from DOM

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
                let currentState = state[Math.floor(Math.random() * stateLen)];
                let tile = new Tile(currentX + 'px', currentY + 'px', this.tileWidth + 'px', this.tileHeight + 'px', currentState);
                       
                game_canvas.appendChild(tile.div);
                currentX = currentX + (this.tileWidth);
                mazeY.push(tile)
                j++;
            }
       
            this.maze.push(mazeY)
            currentY = currentY + (this.tileHeight);   
            startX = Math.floor(startX);
            endX = Math.floor(endX * 1.1);
            i++;
        }

        this.setStart();
        this.setEnd();
       
        if (this.canFinishMaze()){
            this.travesable = true;
        }
    }


    /**
     * Adjusts the position of each tile of the maze, based on current screen size.
     * 
     * @param {*} startX the start x position of the maze
     * @param {*} startY the start y position of the maze
     * @param {*} endX the end x position of the maze
     * @param {*} endY the end y position of the maze
     */
    upadateMazePosition(startX, startY, endX, endY){

        this.#init(startX, startY, endX, endY);
        
        let currentX = Math.floor(startX);
        let currentY = Math.floor(startY) + 1; //+ 1 is here to make the amount of tiles in the y 1-indexed

        let i = 0;
        let j = 0;

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

    /**
     * Iterates through the maze, and sets all tiles occupied attribute to false.
     * allows for the reset maze to properly allow chicks to respawn.
     */
    mazeRevert(){
        for (let i=0; i<this.maze.length; i++){
            for(let j=0; j < this.maze[i].length; j++){
                this.maze[i][j].occupied = false;
            }
        }
    }

    /**
     * Removes all tiles in the maze from the DOM.
     */
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
   * ensures that the current variables are not out of bounds, if any are, returns false, ending the recursion.
   * If the current tile is a BLOCK or has already been visited, returns false, ending the recursion.
   * If the current tile is the END tile, returns true, ending the recursion successfully, signifying that the maze is traversable.
   * 
   * @param {*} x, the chicks current x index in the maze, at intial call (0)
   * @param {*} y, the chicks current y index in the maze, at initial call (0)
   * @param {*} visited, a set that keeps track of indexes of maze already visited
   * @returns Recursive call for all possible next moves from current spot, Base Case @returns Boolean value of if the maze can be finished.
   */
  canFinishMaze(x = 0,y = 0, visited = new Set()){

    if (x <0 || y <0 ||  x >= this.maze.length || y >= this.maze[0].length){
      return false;
    }

    let tile = this.maze[x][y];
    if (tile.state.name == "BLOCK" || visited.has(`${x},${y}`)){
      return false;
    }

    if (tile.state.name == "END"){
      return true;
    }
  
    visited.add(`${x},${y}`);
    
    //recurive call for all possible moves, only one true (at any call/level) needed for true, to return true.
    return (this.canFinishMaze(x+1,y,visited) || this.canFinishMaze(x-1,y,visited)
     || this.canFinishMaze(x,y+1,visited) || this.canFinishMaze(x,y-1,visited))
  }

  /**
   * uses a breadth first search algorithm to find the shortest path from the start tile to the end tile
   * Traverses through the maze level by level, and keeps track of the distance traveled.
   * @returns Int, the length of the shortest path from start to end in the maze. To be compared with users # of moves
   */

  shortestPath(){
    let rows = this.maze.length;
    let cols = this.maze[0].length;

    let queue = [];
    let visited = new Set();

    queue.push({x:0, y:0, dist:0});
    visited.add('0,0');

    const moves =[
        [1,0],
        [-1,0],
        [0,1],
        [0,-1]
    ];

    while(queue.length>0){
        let { x, y, dist } = queue.shift();
        let tile = this.maze[x][y];

        if (tile.state.name == "END"){
            return dist;
        }

        for (let [dx,dy] of moves){
            let nx = x + dx;
            let ny = y + dy;

            if (nx>=0 && ny >= 0 && nx < rows && ny < cols){
                let nextTile = this.maze[nx][ny];
                let coords = `${nx},${ny}`;

                if (!visited.has(coords) && nextTile.state.name != "BLOCK"){
                    visited.add(coords);
                    queue.push({x:nx, y:ny, dist: dist + 1});
                }
            }
        }
    }
}

    #init(startX, startY, width, height){
        // compute the width and height of each tile
        this.tileWidth = Math.floor((width - startX) / (NUMBER_OF_TILES_X - 1)); //-1 is here to make the amount of tiles in  the x 1-indexed 
        this.tileHeight = Math.floor((height - startY) / NUMBER_OF_TILES_Y);   
    }

    /**
     * determines the end coordinates of the maze, and replaces the final tile with the end tile.
     */
    setEnd(){
        let i = this.maze.length - 1;
        let j = this.maze[0].length - 1;
        let endTile = this.maze[i][j];
        game_canvas.removeChild(endTile.div);                
        this.maze[i][j] = new Tile(endTile.x, endTile.y, endTile.width, endTile.height, ENDSTATE); 
        endTile = this.maze[i][j];
        game_canvas.appendChild(endTile.div);        
    }

    /**
     * determines the start coordinates of the maze, and replaces the final tile with the start tile.
     */

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