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
    // console.log(currentAngle);
    this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
    this.movedLeft = MIN_MOVEMENT + Math.floor(Math.random() * MAX_MOVEMENT);
    this.birdie = document.createElement('img');
    // let listInst = new List();
    // this.birdie.list = listInst;



    let left = `${(positionX) + Math.floor(radius * Math.cos(currentAngle * (Math.PI / 180)))}px`;
    let top = `${(positionY) + Math.floor(radius * Math.sin(currentAngle * (Math.PI / 180)))}px`;

    currentAngle = (currentAngle + 45) % 360;

    this.birdie.currImageFlag= 0;
    this.birdie.deathImgFlag = 0;

    this.birdie.className = 'chick';
    this.birdie.style.position="absolute";
    this.birdie.style.left= left;
    this.birdie.style.top = top;

    // a function to update the position of a bird 
    this.updateBirdPosition = function(){
      let left = `${(positionX) + Math.floor(radius * Math.cos(currentAngle * (Math.PI / 180)))}px`;
      let top = `${(positionY) + Math.floor(radius * Math.sin(currentAngle * (Math.PI / 180)))}px`;
      currentAngle = (currentAngle + 45) % 360;
      this.birdie.style.left= left;
      this.birdie.style.top = top;      
    }

    game_canvas.appendChild(this.birdie);
  }
}
