/**
 * A class for one tile in a maze 
 */
class Tile{
    /**
     * 
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

        // html element properties
        this.div = document.createElement("div");
        this.div.style.backgroundImage = `url("${this.state.image_path}")`;
        this.div.style.backgroundPosition = "center";
        this.div.style.backgroundSize = "100% 70%";
        this.div.style.backgroundRepeat = "no-repeat"

        // position styles
        this.div.style.position = "absolute";
        this.div.style.height = this.height;
        this.div.style.width = this.width;
        this.div.style.left = this.x;
        this.div.style.top = this.y;  
        this.div.style.border = "0.1rem solid lightbrown";         

    }

    updateTile(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.div.style.height = this.height;
        this.div.style.width = this.width;
        this.div.style.left = this.x;
        this.div.style.top = this.y;        
    }
}