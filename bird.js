/**
 A bird class that creates and styles an image object as a bird

*/
class Bird{
  constructor(){
    this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
    this.movedLeft = MIN_MOVEMENT + Math.floor(Math.random() * MAX_MOVEMENT);
    this.birdie = document.createElement('img');

    let left = `${Math.floor(Math.random() * WINDOW_WIDTH)}px`;
    let top = `${Math.floor(Math.random() * WINDOW_HEIGHT)}px`;

    this.birdie.className = 'chick';
    this.birdie.style.position="absolute";
    this.birdie.style.left= left;
    this.birdie.style.top = top;

    game_canvas.appendChild(this.birdie);
  }
}
