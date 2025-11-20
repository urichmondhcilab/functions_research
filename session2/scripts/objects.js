/* Retrieve HTML elements to be used in javascript
    The elements are retrieved by their ids.
    document is a global variable made available with JavaScript
 */
let chick = document.getElementById('chick_png');
let mother = document.getElementById('mother');
let water = document.getElementById('water');
let game_canvas =document.getElementById('game_canvas');
let point_number = document.getElementById('point_number');
let reset_btn = document.getElementById('reset');
let list = document.getElementById("list");
let runObject = document.getElementById('run');
let numObjects = []
const canvas = document.getElementById('canvas');
const blockDrop = document.getElementById('block-drop');
const hintText = document.getElementById('hint_text');
const nextButton = document.getElementById('next_button');
const closeButton = document.getElementById("close_button");
const backButton = document.getElementById("back_button");
const hintContainer = document.getElementById("hints");
const hintImage = document.getElementById("hint_image");
const transitionImageContainer = document.getElementById("transition_image_container");
const transitionImage = document.getElementById("transition_image");
const visibleNumber = document.getElementById("visible-number");
const numberList = document.getElementById("number-list");

for (let i in 10){
    numObjects.push(document.getElementById("num" + i))
}




    



    
