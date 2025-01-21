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