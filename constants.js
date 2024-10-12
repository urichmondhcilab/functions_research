/* constants used in other files
    MIN_LIFE_SPAN: minimum life span of the bird
    MAX_LIFE_SPAN: maximum life span of the bird
    MAX_NUMBER_OF_BIRDS: The maximum number of birds that can be created

    MAX_MOVEMENT how far right a bird can move
    MIN_MOVEMENT how far left a bird can move

    centerLeft is the center of the screen horizontally
    centerTop is the center of the screen vertically

*/
const MIN_LIFE_SPAN = 10;
const MAX_LIFE_SPAN = 50; // actually 100 + 500
const MAX_NUMBER_OF_BIRDS = 8;

const MAX_MOM = 1;

const MAX_WATER = 1;

const HEIGHT_OFFSET = window.innerHeight / 4;
const WIDTH_OFFSET = Math.min(window.innerWidth, window.innerHeight) / 4;

const MAX_MOVEMENT = 5;
const MIN_MOVEMENT = -5;


// let centerLeft = Math.min(window.innerWidth, window.innerHeight) / 2;
// let centerTop = window.innerHeight / 2;

let centerLeft = window.innerWidth * 0.3; // at 30% of the width of the screen
let centerTop = window.innerHeight * 0.65; // at 65% of the height of the screen
let radius = Math.min(window.innerWidth / 8, window.innerHeight / 8); // the radius is relative to the width and height of the screen

