const MIN_LIFE_SPAN = 100;
const MAX_LIFE_SPAN = 500; // actually 100 + 500
const MAX_NUMBER_OF_BIRDS = 8;

// const HEIGHT_OFFSET = window.innerHeight / 4;
// const WIDTH_OFFSET = Math.min(window.innerWidth, window.innerHeight) / 4;

let screenWidth = window.innerWidth;
let screenHeight = window.innerWidth * 0.56;

let backgroundImageWidth = window.innerWidth;
let backgroundImageHeight = window.innerWidth * 0.56;

let centerX = (backgroundImageWidth)/ 2;
let centerY = window.innerHeight / 2;

let motherPosX = centerX - backgroundImageWidth * 0.25;
let motherPosY = centerY - backgroundImageHeight * 0.15;

let mazeStartX = (backgroundImageWidth * 0.20);
let mazeStartY = centerY + screenHeight * 0.15 ;
let mazeWidth = (backgroundImageWidth * 0.7);
let mazeHeight = centerY + backgroundImageHeight * 0.4;

const chickImagePaths = [['images/chicks/squarton_resting_position_1.svg', 'images/chicks/squarton_resting_position_2.svg'],
                            ['images/poses/green_bird_poses/rest1.svg', 'images/poses/green_bird_poses/rest2.svg'],
                            ['images/poses/orange_bird_poses/rest1.svg', 'images/poses/orange_bird_poses/rest2.svg'],
                            ['images/poses/brown_bird_poses/rest1.svg', 'images/poses/brown_bird_poses/rest2.svg'],
                            ['images/poses/pink_bird_poses/rest1.svg', 'images/poses/pink_bird_poses/rest2.svg'],
                            ['images/poses/blue_bird_poses/rest1.svg', 'images/poses/blue_bird_poses/rest2.svg'],
                            ['images/poses/light_blue_bird_poses/rest1.svg', 'images/poses/light_blue_bird_poses/rest2.svg'],
                            ['images/poses/purple_bird_poses/rest1.svg', 'images/poses/purple_bird_poses/rest2.svg'],
                            ['images/poses/red_bird_poses/rest1.svg', 'images/poses/red_bird_poses/rest2.svg'],
                        ];

const chickSelectionStars = ['images/star_animation_frames/one.svg',
    'images/star_animation_frames/two.svg',
    'images/star_animation_frames/three.svg',
    'images/star_animation_frames/four.svg',
    'images/star_animation_frames/five.svg',
    'images/star_animation_frames/six.svg',
    'images/star_animation_frames/seven.svg'];
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
const SELECTED_BIRD_COLOR_PALETTE_COUNT = chickImagePaths.length - 1;


const instructions = [{text: "click on a bird to program its path",
                            image_path: "images/chicks/squarton_resting_position_1.svg"},    
                        {   text: "click on the mother hen to program a path for all the chicks",
                            image_path: "images/mother_hen/Mother_Hen_1.svg"},

                        {   text: "use the blocks to right to find a path through the maze",
                            image_path : "images/game_buttons/eat_button.svg"},

                        {   text: "drag the block you want into the blue space",
                            image_path : "images/boulder_and_interface/game_options_interface.svg"},

                       {    text: "watch out, the chicks are running out of time!",
                            image_path : "images/chicks/squarton_dead.svg"
                       } ];



const moveSound = new Audio('sound_mp3/Movement.mp3');
const eatSound = new Audio('sound_mp3/Eating.mp3');
const drinkSound = new Audio('sound_mp3/Drinking.mp3');



