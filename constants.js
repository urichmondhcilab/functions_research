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

const HEIGHT_OFFSET = window.innerHeight / 4;
const WIDTH_OFFSET = Math.min(window.innerWidth, window.innerHeight) / 4;

const MAX_MOVEMENT = 5;
const MIN_MOVEMENT = -5;


const centerLeft = Math.min(window.innerWidth, window.innerHeight) / 2;
const centerTop = window.innerHeight / 2;

