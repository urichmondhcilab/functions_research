/* constants used in other files
    MIN_LIFE_SPAN: minimum life span of the bird
    MAX_LIFE_SPAN: maximum life span of the bird
    MAX_NUMBER_OF_BIRDS: The maximum number of birds that can be created
    MAX_MOM and MAX_WATER = max amount of moms and waters that can be spawned

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


let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
let offsetX = screenWidth * 0.07; // offset is 7% of the screen width
let offsetY = screenWidth * 0.09; // offset is 9% of the screen width
let positionX = centerX - offsetX; // we subtract the X offset to shift the chick left
let positionY = centerY + offsetY; // we add the Y offset to move the chick further down from the center
let radius = screenWidth / 12; // the radius is relative to the width and height of the screen

