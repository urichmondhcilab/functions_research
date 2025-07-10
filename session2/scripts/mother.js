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
      let motherDiv = document.createElement('div');
      let motherImg = document.createElement('img');
      motherImg.className = "mother";
      motherImg.src = 'images/mother_hen/Mother_Hen_1.svg';
      motherDiv.appendChild(motherImg);

      this.mother = motherDiv;
      this.mother.currImageFlag = 1;
      this.mother.className = 'motherCont';
      this.mother.style.position="absolute";

      this.mother.style.left = `${Math.floor(centerX) - motherOffsetX}px`;
      this.mother.style.top = `${Math.floor(centerY) - motherOffsetY}px`;

      this.updateMomPosition = function(){
        this.mother.style.left= `${Math.floor(centerX) - motherOffsetX}px`;
        this.mother.style.top = `${Math.floor(centerY) - motherOffsetY}px`;      
      }

    this.selectAllBirds = this.selectAllBirds.bind(this);      
      motherImg.addEventListener('click', this.selectAllBirds);
  
      game_canvas.appendChild(this.mother);
    }

    selectAllBirds(e){

      let codeEditor = document.getElementById("codeEditor");
      console.log(selectedBirds);
      if (selectedBirds != null && selectedBirds !== undefined){
        for (const selectedBird of selectedBirds){
          selectedBird.birdie.style.border = "none";
        }
      }
      this.mother.style.border = ".1rem solid cyan";    
      selectedBirds = allBirds;      

    }


  }
  