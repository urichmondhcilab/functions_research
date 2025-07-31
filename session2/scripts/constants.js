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
        image_path : "images/boulder_and_interface/boulder.svg"
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

const ENDSTATE = {
    name : "END",
    image_path : "images/planks/end_plank.svg"
}

const STARTSTATE = {
    name : "START",
    image_path : "images/planks/start_plank.svg"
}

const NUMBER_OF_TILES_X = 10;
const NUMBER_OF_TILES_Y = 2;

let selectedBirds = null;
let placedBlocks = null;
let ast = null;
let blockCount = 0;
let running = false;


const instructions = [{text: "click on a bird to program its path",
                            image_path: "images/chicks/squarton_resting_position_1.svg"},    
                        {   text: "click on the mother hen to program a path for all the chicks",
                            image_path: "images/mother_hen/Mother_Hen_1.svg"},

                        {   text: "use the blocks to right to find a path through the maze",
                            image_path : "images/planks/plank.svg"},

                        {   text: "drag the block you want into the blue space",
                            image_path : "images/instruction_images/code_blocks_1.png"},
                       {    text: "watch out, the chicks are running out of time!",
                            image_path : "images/chicks/squarton_dead.svg"
                       } ];


