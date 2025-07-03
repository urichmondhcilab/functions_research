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
    }

    upadateMazePosition(startX, startY, endX, endY){

        this.#init(startX, startY, endX, endY);
        
        let currentX = Math.floor(startX);
        let currentY = Math.floor(startY) + 1; //+ 1 is here to make the amount of tiles in the y 1-indexed

        let i = 0;
        let j = 0;

        console.log(this.maze);
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


    #init(startX, startY, width, height){
        // compute the width and height of each tile
        this.tileWidth = Math.floor((width - startX) / (NUMBER_OF_TILES_X - 1)); //-1 is here to make the amount of tiles in  the x 1-indexed 
        this.tileHeight = Math.floor((height - startY) / NUMBER_OF_TILES_Y);   
    }
}