/**
 *  A bird class that creates and styles an image object as a bird
 * birds have a lifeSpan, a check on what direction they have moved (moveleft) 
 * and an image element (dynamically generated)
 * We give the image element a class with pre-determined styles from chick_style.css
 * We set the image elements position on the screen with absolute, left and top
 * We add the child to the body of the html
 */
class Mother{
    constructor(){
    //   this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
    //   this.movedLeft = MIN_MOVEMENT + Math.floor(Math.random() * MAX_MOVEMENT);
      this.mother = document.createElement('img');
  
      // let left = `${MIN_WIDTH + Math.floor(Math.random() * WIDTH_OFFSET)}px`;
      // let top = `${MIN_HEIGHT + Math.floor(Math.random() * HEIGHT_OFFSET)}px`;
  
      let left = `{0}px`;
      let top = `{0}px`;

      this.mother.currImageFlag = 0;

  
      this.mother.className = 'mother';
      this.mother.style.position="absolute";
      this.mother.style.left= left;
      this.mother.style.top = top;
  
      game_canvas.appendChild(this.mother);
    }
  }
  