/**
 A bird class that creates and styles an image object as a bird

*/
class Bird{
  constructor(){
    this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
    this.movedLeft = MIN_MOVEMENT + Math.floor(Math.random() * MAX_MOVEMENT);
    this.birdie = document.createElement('img');

    let left = `${MIN_HEIGHT + Math.floor(Math.random() * 500)}px`;
    let top = `${MIN_WIDTH + Math.floor(Math.random() * 500)}px`;

    this.birdie.className = 'chick';
    this.birdie.style.position="absolute";
    this.birdie.style.left= left;
    this.birdie.style.top = top;

    game_canvas.appendChild(this.birdie);
  }
}
