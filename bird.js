/**
 *  A bird class that creates and styles an image object as a bird
 * birds have a lifeSpan, a check on what direction they have moved (moveleft) 
 * and an image element (dynamically generated)
 * We give the image element a class with pre-determined styles from chick_style.css
 * We set the image elements position on the screen with absolute, left and top
 * We add the child to the body of the html
 * We have a currImage and deathImage flag. The currImage flag changes the sprite of the chicks. 
 * Currently, we have two images, corresponding to values 1 and 0 on this integer. 
 * We have a deathImage. When this flag is set to 1, the death image is displayed. Otherwise, the image is set to the normal chick image.
 */
class Bird{

  constructor(birdId){
    // give the bird an id
    this.id = birdId;

    this.lifeSpan = MIN_LIFE_SPAN + Math.floor(Math.random() * MAX_LIFE_SPAN);
    this.movedLeft = MIN_MOVEMENT + Math.floor(Math.random() * MAX_MOVEMENT);
    let birdDiv = document.createElement('div');
    let birdImg = document.createElement('img');
    birdImg.className = "chick"
    birdImg.src = "SRP1.svg";
    birdImg.style.objectFit = "cover";
    birdImg.style.border= "none";
    birdDiv.appendChild(birdImg)
    this.birdie = birdDiv;
    let listInst = new List(3);
    this.birdie.list = listInst;

    let left = `${(positionX) + Math.floor(radius * Math.cos(currentAngle * (Math.PI / 180)))}px`;
    let top = `${(positionY) + Math.floor(radius * Math.sin(currentAngle * (Math.PI / 180)))}px`;

    currentAngle = (currentAngle + 45) % 360;

    this.birdie.currImageFlag= 0;
    this.birdie.deathImgFlag = 0;

    this.birdie.className = 'chickCont';
    this.birdie.style.position="absolute";
    this.birdie.style.left= left;
    this.birdie.style.top = top;


    // handle this that refers to the event object and this that refers to the object
    // bind the the the object to the member function
    this.displayCodeEditor = this.displayCodeEditor.bind(this);

    birdImg.addEventListener("click", this.displayCodeEditor);

    game_canvas.appendChild(this.birdie);
  }

  /**
   * display the bird's id everytime a bird is clicked
   * @param {Object} e is the event object
   */
  displayCodeEditor(e){
    let codeEditor = document.getElementById("codeEditor");
    codeEditor.firstChild.nodeValue = "chick " + this.id;
    console.log(this.id);
  }

  updateBirdPosition(){
    let left = `${(positionX) + Math.floor(radius * Math.cos(currentAngle * (Math.PI / 180)))}px`;
    let top = `${(positionY) + Math.floor(radius * Math.sin(currentAngle * (Math.PI / 180)))}px`;
    currentAngle = (currentAngle + 45) % 360;
    this.birdie.style.left= left;
    this.birdie.style.top = top;      
  }
}
