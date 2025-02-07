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
        this.endX = Math.floor(endX);
        this.endY = Math.floor(endY);

        // compute the width and height of each tile
        let tileWidth = Math.floor((endX - startX) / NUMBER_OF_TILES_X);
        let tileHeight = Math.floor((endY - startY) / NUMBER_OF_TILES_Y);

        // initialize maze to empty array. Each entry is a tile object
        let maze = [];
        let currentX = Math.floor(startX);
        let currentY = Math.floor(startY);

        //create each tile and the tile to maze and then the DOM
        while (currentX < this.endX){
            currentY = startY;

            while(currentY < this.endY){
                let currentState = state[Math.floor(Math.random() * state.length)];
                let tile = new Tile(currentX + 'px', currentY + 'px', tileWidth + 'px', tileHeight + 'px', currentState);

                maze.push(tile);
                game_canvas.appendChild(tile.div);
                currentY = currentY + tileHeight;    
            }
            
            currentX = currentX + tileWidth;
        }

    }
}