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
        let tileWidth = Math.floor((endX - startX) / NUMBER_OF_TILES_X);
        let tileHeight = Math.floor((endY - startY) / NUMBER_OF_TILES_Y);

        // initialize maze to empty array. Each entry is a tile object
        let maze = [];
        let currentX = Math.floor(startX);
        let currentY = Math.floor(startY);

        //create each tile add add each tile to maze and the DOM

        console.log(endY)
        while (currentY < this.endY){
            currentX = Math.floor(startX);

            let mazeY = []
            while(currentX < endX){
                let currentState = state[Math.floor(Math.random() * state.length)];
                let tile = new Tile(currentX + 'px', currentY + 'px', tileWidth + 'px', tileHeight + 'px', currentState);

                
                game_canvas.appendChild(tile.div);
                currentX = currentX + (tileWidth * 1 / 4);
                mazeY.push(tile)
            }
            maze.push(mazeY)
            currentY = currentY + (tileHeight);   
            console.log("oldsx " + startX + "oldex " + endX)
            startX = Math.floor(startX * 0.50); //edit start x and end x to turn in with the background.
            endX = Math.floor(endX * 1.1);
            console.log("nsx " + startX + "nex " + endX)
            
        }

        console.log(maze)

    }
}