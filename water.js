class Water{
    constructor(){
        this.water = document.createElement('img');
        let left = `{0}px`;
        let top = `{0}px`;
  
    
        this.water.className = 'water';
        this.water.style.position="absolute";
        this.water.style.left= left;
        this.water.style.top = top;
    
        game_canvas.appendChild(this.water);
    }
}