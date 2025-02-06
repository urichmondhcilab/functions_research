/**
 * Immediately Invoked Function Expression that creates a maze object
 */
// (function(){
//     let maze = new Maze(0, 0 , window.innerWidth, window.innerHeight);
//     let chicken = new Chicken(maze);
// })();

/**
 * The IIFE didn't work for whatever reason, so I use the DOMContentLoaded listener to do the same thing
 */
document.addEventListener("DOMContentLoaded", function () {
    let maze = new Maze(0, 0, window.innerWidth, window.innerHeight);
    let chicken = new Chicken(maze);
});
