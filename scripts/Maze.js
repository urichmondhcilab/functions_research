/**
 * A Maze class that will be made up of Tile objects 
 */
class Maze{
    /**
     * 
     * @param {Number} startX The start pixel of the Maze along the horizontal
     * @param {Number} startY The start pixel of the Maze along the vertical
     * @param {Number} endX The end pixel of the Maze along the horizontal
     * @param {Number} endY The end pixel of the Maze along the vertical
     */
    constructor(startX, startY, endX, endY){
        this.endX = Math.floor(endX);
        this.endY = Math.floor(endY);

        // compute the width and height of each tile
        let tileWidth = Math.floor((endX - startX) / (NUMBER_OF_TILES_X - 1)); //-1 is here to make the amount of tiles in  the x 1-indexed 
        let tileHeight = Math.floor((endY - startY) / NUMBER_OF_TILES_Y); 

        // initialize maze to empty array. Each entry is a tile object
        this.maze = [];
        let currentX = Math.floor(startX);
        let currentY = Math.floor(startY) + 1; //+ 1 is here to make the amount of tiles in the y 1-indexed

        console.log(currentX)
        

        //create each tile add add each tile to maze and the DOM
        while (currentY < this.endY){
            currentX = Math.floor(startX);

            let mazeY = []
            while(currentX < endX){
                let currentState = state[Math.floor(Math.random() * state.length)];
                let tile = new Tile(currentX + 'px', currentY + 'px', tileWidth + 'px', tileHeight + 'px', currentState);

                
                game_canvas.appendChild(tile.div);
                currentX = currentX + (tileWidth);
                mazeY.push(tile)
            }
            this.maze.push(mazeY)
            currentY = currentY + (tileHeight);   
            console.log("oldsx " + startX + "oldex " + endX)
            startX = Math.floor(startX * 0.7); //edit start x and end x to turn in with the background.
            endX = Math.floor(endX * 1.1);
            console.log("nsx " + startX + "nex " + endX)
            
        }

        console.log(this.maze[0])
    }

    upadateMazePosition(){

        this.endX = Math.floor(mazeWidth);
        this.endY = Math.floor(mazeHeight);

        this.startX = Math.floor(mazeStartX);
        this.startY = Math.floor(mazeStartY);

        console.log(this.startX, this.startY, this.endX, this.endY);

        // compute the width and height of each tile
        let tileWidth = Math.floor((this.endX - this.startX) / (NUMBER_OF_TILES_X - 1)); //-1 is here to make the amount of tiles in  the x 1-indexed 
        let tileHeight = Math.floor((this.endY - this.startY) / NUMBER_OF_TILES_Y);   
        
        let currentX = Math.floor(this.startX);
        let currentY = Math.floor(this.startY) + 1; //+ 1 is here to make the amount of tiles in the y 1-indexed

        let i = 0;
        let j = 0

        while (i < this.maze.length){
            currentX = Math.floor(this.startX);
            while(j < this.maze[i].length){
                let currTile = this.maze[i][j];
                currTile.updateTile(currentX + 'px', currentY + 'px', tileWidth + 'px', tileHeight + 'px');

                currentX = currentX + (tileWidth);
                j++;
            }
            currentY = currentY + (tileHeight);   
            i++;            
        }        
        
        
    }
}