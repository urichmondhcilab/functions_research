/**
 A bird class that creates and styles an image object as a bird

*/
class mother_bird{
  constructor(){
    //console.log(currentAngle);
    this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
    this.movedLeft = MIN_MOVEMENT + Math.floor(Math.random() * MAX_MOVEMENT);
    this.mother = document.createElement('img');

    // let left = `${MIN_WIDTH + Math.floor(Math.random() * WIDTH_OFFSET)}px`;
    // let top = `${MIN_HEIGHT + Math.floor(Math.random() * HEIGHT_OFFSET)}px`;

    //let left = `${centerLeft + Math.floor(radius * Math.cos(currentAngle * (Math.PI / 180)))}px`;
    //let top = `${centerTop + Math.floor(radius * Math.sin(currentAngle * (Math.PI / 180)))}px`;
    
    let left = '400px'
    let right = '$20px'
    //currentAngle = 180

    

    this.mother.className = 'mother';
    this.mother.style.position="absolute";
    this.mother.style.left= left;
    this.mother.style.top = top;

    game_canvas.appendChild(this.mother);
  }
}
