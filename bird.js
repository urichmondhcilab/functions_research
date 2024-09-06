/**
 *  A bird class that creates and styles an image object as a bird
 * birds have a lifeSpan, a check on what direction they have moved (moveleft) 
 * and an image element (dynamically generated)
 * We give the image element a class with pre-determined styles from chick_style.css
 * We set the image elements position on the screen with absolute, left and top
 * We add the child to the body of the html
 */
class Bird{
  constructor(){
    console.log(currentAngle);
    this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
    this.movedLeft = MIN_MOVEMENT + Math.floor(Math.random() * MAX_MOVEMENT);
    this.birdie = document.createElement('img');

    // let left = `${MIN_WIDTH + Math.floor(Math.random() * WIDTH_OFFSET)}px`;
    // let top = `${MIN_HEIGHT + Math.floor(Math.random() * HEIGHT_OFFSET)}px`;

    let left = `${centerLeft + Math.floor(radius * Math.cos(currentAngle * (Math.PI / 180)))}px`;
    let top = `${centerTop + Math.floor(radius * Math.sin(currentAngle * (Math.PI / 180)))}px`;
    currentAngle = (currentAngle + 45) % 360;

    this.birdie.className = 'chick';
    this.birdie.style.position="absolute";
    this.birdie.style.left= left;
    this.birdie.style.top = top;

    game_canvas.appendChild(this.birdie);
  }
}
