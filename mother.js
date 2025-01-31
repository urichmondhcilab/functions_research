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
      let imgMDiv = document.createElement('div');
      let motherImg = document.createElement('img');
      motherImg.className = "mother";
      imgMDiv.className = "mDiv";
      motherImg.src = "/functions_research/images/Mother_Hen_1.svg";
      imgMDiv.appendChild(motherImg);
      motherDiv.appendChild(imgMDiv);
      motherImg.style.position = "relative"
      this.mother = motherDiv;

  
      let left = centerX;
      let top = centerY;

      this.mother.currImageFlag = 0;

  
      this.mother.className = 'motherCont';
      this.mother.style.position="absolute";
      this.mother.style.left= left;
      this.mother.style.top = top;

      this.updateMomPosition = function(){
        let left = centerX;
        let top = centerY;
        this.mother.style.left= left;
        this.mother.style.top = top;      
      }
  
      game_canvas.appendChild(this.mother);
    }
  }
  