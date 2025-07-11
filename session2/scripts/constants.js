const MIN_LIFE_SPAN = 100;
const MAX_LIFE_SPAN = 500; // actually 100 + 500
const MAX_NUMBER_OF_BIRDS = 8;

const HEIGHT_OFFSET = window.innerHeight / 4;
const WIDTH_OFFSET = Math.min(window.innerWidth, window.innerHeight) / 4;

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let motherOffsetX = (window.innerWidth * 0.6)/ 4;
let motherOffsetY = window.innerHeight / 8;

let birdStartX =(window.innerWidth * 0.25);
let birdStartY = window.innerHeight * 0.5;
let birdEndX = window.innerWidth * 0.5 - birdStartX;
let birdEndY = window.innerHeight * 0.6 - birdStartY;

let centerX = (window.innerWidth * 0.6)/ 2;
let centerY = window.innerHeight / 2;

let mazeStartX = 0;
let mazeStartY = (window.innerHeight * 0.7);
let mazeWidth = (window.innerWidth * 0.6);
let mazeHeight = (window.innerHeight  * 0.9);

const chickImagePaths = ['images/chicks/squarton_resting_position_1.svg', 'images/chicks/squarton_resting_position_2.svg'];
const state = [
    {   name : "BLOCK",
        image_path : "none"
    },
    {   name : "WATER",
        image_path: "images/water/water.svg"

    },
    {   name : "FOOD",
        image_path: "images/food/food.svg"

    },
    {   name : "PLANK",
        image_path : "images/planks/plank.svg"
    },   
    {   name : "PLANK",
        image_path : "images/planks/plank.svg"
    },     
    {   name : "PLANK",
        image_path : "images/planks/plank.svg"
    },            
]

const NUMBER_OF_TILES_X = 10;
const NUMBER_OF_TILES_Y = 2;

let selectedBirds = null;
let placedBlocks = null;
let ast = null;
let blockCount = 0;
let running = false;

