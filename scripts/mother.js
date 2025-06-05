/**
 *  A Mother class that creates and styles an image object as a bird
 * we have an image element (dynamically generated)
 * We give the image element a class with pre-determined styles from chick_style.css
 * We set the image elements position on the screen with absolute, left and top
 * We add the child to the body of the html
 * Mom has a currImage flag. The currImage flag changes the sprite of the Mom. 
 * Currently, we have two images, corresponding to values 1 and 0 on this integer. 
 */
class Mother{
    constructor(){
    //   this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
      let motherDiv = document.createElement('div');
      let motherImg = document.createElement('img');
      motherImg.className = "mother";
      motherImg.src = 'images/mother_hen/Mother_Hen_1.svg';
      motherDiv.appendChild(motherImg);
      motherImg.style.position = "relative"


      this.mother = motherDiv;
      this.mother.currImageFlag = 1;
      this.mother.className = 'motherCont';
      this.mother.style.position="absolute";
      this.mother.style.left= "-50px";
      this.mother.style.top = centerY;

      console.log("centerX is" + centerX);
      console.log("Xwidth is" + window.innerWidth);

      this.updateMomPosition = function(){
        this.mother.style.left= "-50px";
        this.mother.style.top = centerY;      
      }
  
      game_canvas.appendChild(this.mother);
    }
  }
  