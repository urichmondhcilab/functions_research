/**
 * This is a class for the water object. 
 * Here, we give it positions, a name, and append it to the canvas.
 * the updateWaterPosition function is run every "tick" to reposition the left and top of the water circle relative to the size (height and width) of the screen.
 */
class Water{
    constructor(){
        this.water = document.createElement('div');
        this.water.id = "water";
        let left = centerX;
        let top = centerY;
  
    
        this.water.className = 'water';
        this.water.style.position="absolute";
        this.water.style.left= left;
        this.water.style.top = top;       
        
        this.updateWaterPosition = function(){
            let left = centerX;
            let top = centerY;
            this.birdie.style.left= left;
            this.birdie.style.top = top;      
          }
    
        game_canvas.appendChild(this.water);
    }
}