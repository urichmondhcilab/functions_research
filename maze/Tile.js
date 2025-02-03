/**
 * A class for one tile in a maze 
 */
class Tile{
    /**
     * @param {Number} x the start pixel of the tile on the horizontal
     * @param {Number} y the start pixel of the tile on the vertical
     * @param {Number} width the width of the tile 
     * @param {Number} height the height of the tile
     * @param {Object} state information about the tile PLANK, BLOCK, WATER, etc.
     */
    constructor(x, y, width, height, state){
        // simple property names 
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.state = state;

        // update html element properties
        this.div = document.createElement("div");
        this.div.style.backgroundImage = `url("${this.state.image_path}")`;
        this.div.style.backgroundPosition = "center";
        this.div.style.backgroundSize = "cover";
        this.div.style.backgroundColor = GROUND_COLOR;       
        this.div.style.position = "absolute";
        this.div.style.height = this.height;
        this.div.style.width = this.width;
        this.div.style.left = this.x;
        this.div.style.top = this.y;
    }
}