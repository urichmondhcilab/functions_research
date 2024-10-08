const MIN_LIFE_SPAN = 10;
const MAX_LIFE_SPAN = 50; // actually 100 + 500
const MAX_NUMBER_OF_BIRDS = 8;
// const WINDOW_WIDTH = window.innerWidth;
// const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = Math.min(window.innerWidth, window.innerHeight) / 2;
const WINDOW_HEIGHT = window.innerHeight / 2;
console.log("window width: " + WINDOW_WIDTH);
console.log("window height: " + WINDOW_HEIGHT);

const MIN_HEIGHT = WINDOW_HEIGHT;
const MIN_WIDTH = WINDOW_WIDTH;

const HEIGHT_OFFSET = window.innerHeight / 4;
const WIDTH_OFFSET = Math.min(window.innerWidth, window.innerHeight) / 4;

const MAX_MOVEMENT = 5;
const MIN_MOVEMENT = -5;


const centerLeft = Math.min(window.innerWidth, window.innerHeight) / 2;
const centerTop = window.innerHeight / 2;

