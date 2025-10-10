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


      this.mother = motherDiv;
      this.mother.currImageFlag = 1;
      this.mother.className = 'motherCont';
      this.mother.style.position="absolute";

      motherDiv.appendChild(motherImg);      
      this.updateMomPosition();


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
      //Change to mother sparkling
      this.mother.style.border = ".1rem solid cyan";  
      selectedBirds = allBirds;    
      
      for (const selectedBird of selectedBirds){
        selectedBird.birdie.style.border = "none";

        //Activate stars and colors
        selectedBird.selectionDiv.style.backgroundRepeat = "no-repeat";
        selectedBird.selectionDiv.style.backgroundPosition = "center";
        selectedBird.selectionDiv.style.backgroundSize = "cover";
        selectedBird.selectionDiv.style.display = "block";
        selectedBird.selected = true;
        selectedBird.selectedColorIndex = Math.floor(Math.random() * SELECTED_BIRD_COLOR_PALETTE_COUNT) + 1;         
        // console.log( selectedBird.selectionDiv.style.backgroundRepeat) ;
      }
    }

    updateMomPosition(){
      this.mother.style.left= `${Math.floor(motherPosX)}px`;
      this.mother.style.top = `${Math.floor(motherPosY)}px`;      
    }   
    
    /**
     * To update the mother image, We first set currMom to the mother DOM object. 
     * We use a simple 1-0 switching if-else block to make sure the switch happens every tick (If 0, we are on img2. If 1, we are on img1.)
     * The mother object has the field currImageFlag built into it so that this switching can happen.
     */
    updateMotherHen(){
      let currMom = this.mother;
      let currMomImage = currMom.firstChild;
      let flag = currMom.currImageFlag;

      currMomImage.src = (flag == 1) ? 'images/mother_hen/Mother_Hen_2.svg' : 'images/mother_hen/Mother_Hen_1.svg';
      currMom.currImageFlag = flag * -1;
    }    

  }
  