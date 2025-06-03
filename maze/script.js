import { allowDrop, drop } from './Canvas.js';
import { makeDraggable } from './BlockLib.js';

document.addEventListener("DOMContentLoaded", function () {
    // Declare the maze and the chicken
    let maze = new Maze(0, 0, window.innerWidth / 2, window.innerHeight);
    let chicken = new Chicken(maze);

    // When the run button is clicked, execute the blocks that are in the canvas
    document.getElementById('run').addEventListener('click', () => {
        // Retrieve the blocks from the canvas
        const placedBlocks = document.querySelectorAll('#canvas .block');
        
        // For each block, do the appropriate action
        placedBlocks.forEach((block) => {
            // 1st action: move
            if (block.classList.contains("move")) {
                // get the direction and the number of steps to move
                const move = block.dataset.move;
                const numberInput = block.querySelector('input[type="number"]');
                const moveValue = numberInput ? parseInt(numberInput.value) : 0;

                // Check the move direction and apply the number input as the step value, then move the chicken
                if (move === 'up') {
                    chicken.move("up", moveValue);
                } else if (move === 'down') {
                    chicken.move("down", moveValue);
                } else if (move === 'left') {
                    chicken.move("left", moveValue);
                } else if (move === 'right') {
                    chicken.move("right", moveValue);
                }

            // 2nd action: drink
            } else if (block.classList.contains("drink")) {
                // do the drink action
                chicken.drink();
            }
        });
    });

    // reset button clears all the blocks from the canvas, but does not reset the chicken
    document.getElementById('reset').addEventListener('click', function () {
        const blocks = canvas.querySelectorAll('.block');
        blocks.forEach(block => block.remove());
    });
    
    // Add event listeners for drag and drop functionality on the canvas
    const canvas = document.getElementById('canvas');
    canvas.addEventListener('drop', drop);
    canvas.addEventListener('dragover', allowDrop);
    
    // Initialize draggable blocks
    makeDraggable();
});

