const MIN_LIFE_SPAN = 100;
const MAX_LIFE_SPAN = 500; // actually 100 + 500
const MAX_NUMBER_OF_BIRDS = 8;

const HEIGHT_OFFSET = window.innerHeight / 4;
const WIDTH_OFFSET = Math.min(window.innerWidth, window.innerHeight) / 4;

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let motherOffsetX = (window.innerWidth * 0.6)/ 4;
let motherOffsetY = window.innerHeight / 8;

let birdStartX = motherOffsetX;
let birdStartY = window.innerHeight * 0.5;
let birdEndX = window.innerWidth * 0.6 - motherOffsetX;
let birdEndY = window.innerHeight * 0.6 - birdStartY;


let centerX = (window.innerWidth * 0.6)/ 2;
let centerY = window.innerHeight / 2;
let offsetX = 0; //screenWidth * 0.07; // offset is 7% of the screen width
let offsetY = screenWidth * 0.09; // offset is 9% of the screen width
let positionX = centerX - offsetX; // we subtract the X offset to shift the chick left
let positionY = centerY + offsetY; // we add the Y offset to move the chick further down from the center
let radius = screenWidth / 12; // the radius is relative to the width and height of the screen

let mazeStartX = 0;
let mazeStartY = (window.innerHeight * 0.7);
let mazeWidth = (window.innerWidth * 0.6);
let mazeHeight = (window.innerHeight  * 0.8);

const chickImagePaths = ['images/chicks/squarton_resting_position_1.svg', 'images/chicks/squarton_resting_position_2.svg'];
const state = [
    {   name : "BLOCK",
        color : "grey",
        image_path : "none"
    },
    {   name : "WATER",
        color : "skyblue",
        image_path: "images/water/water.svg"

    },
    {   name : "FOOD",
        color : "brown",
        image_path: "images/food/food.svg"

    },
    {   name : "PLANK",
        color : "brown",
        image_path : "images/planks/plank.svg"
    },   
    {   name : "PLANK",
        color : "brown",
        image_path : "images/planks/plank.svg"
    },     
    {   name : "PLANK",
        color : "brown",
        image_path : "images/planks/plank.svg"
    },            
]

const NUMBER_OF_TILES_X = 10;
const NUMBER_OF_TILES_Y = 1;

let selectedBirds = null;
let blockCount = 0;
let running = false;
let placedBlocks = null;
let ast = null;
