/**
 * A class representing the chick that will move through the maze
 */
class Chicken {
    /**
     * @param {Maze} maze The maze in which the chicken moves
     */
    constructor(maze) {
        this.maze = maze;
        this.tileWidth = Math.floor((maze.endX) / NUMBER_OF_TILES_X);
        this.tileHeight = Math.floor((maze.endY) / NUMBER_OF_TILES_Y);

        // Chicken should start in the top left
        this.xIndex = 0;
        this.yIndex = 0;

        // Chicken class members
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        this.div.style.width = `${this.tileWidth}px`;
        this.div.style.height = `${this.tileHeight}px`;
        this.div.style.left = `${this.xIndex * this.tileWidth}px`;
        this.div.style.top = `${this.yIndex * this.tileHeight}px`;
        this.div.style.backgroundImage = "url('images/chick.svg')";
        this.div.style.backgroundSize = "cover";
        this.div.style.zIndex = "10"; // Chicken should go on top of the background

        game_canvas.appendChild(this.div);
    }

    /**
     * Moves the chicken based on the arrow key pressed
     */
    move(direction, steps) {
        let newX = this.xIndex;
        let newY = this.yIndex;
    
        switch (direction) {
            case "up":
                newY = Math.max(newY - steps, 0);
                break;
            case "down":
                newY = Math.min(newY + steps, NUMBER_OF_TILES_Y - 1);
                break;
            case "left":
                newX = Math.max(newX - steps, 0);
                break;
            case "right":
                newX = Math.min(newX + steps, NUMBER_OF_TILES_X - 1);
                break;
        }
    
        this.xIndex = newX;
        this.yIndex = newY;
        this.div.style.left = `${this.xIndex * this.tileWidth}px`;
        this.div.style.top = `${this.yIndex * this.tileHeight}px`;
    }
    
    // drink method changes the sprite for 2 seconds
    drink() {
        this.div.style.backgroundImage = "url('images/chick2.svg')";
        setTimeout(() => {
            this.div.style.backgroundImage = "url('images/chick.svg')";
        }, 2000);
    }
}
