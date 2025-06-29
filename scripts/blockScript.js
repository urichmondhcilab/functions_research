import { allowDrop, drop } from './Canvas.js';
import { makeDraggable } from './BlockLib.js';

/**
 * delay; 
 * @param {number} ms - the number of miliseconds to delay.
 * @returns {Promise} a promise that resolves after the delay
 */
export function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", function () {
    // Declare the maze and the chicken
    const canvas = document.getElementById('canvas');
    const blockDrop = document.getElementById('block-drop');

    // When the run button is clicked, execute the blocks that are in the canvas
    document.getElementById('run').addEventListener('click', async () => {
        //Retrieve the blocks from the canvas
        const placedBlocks = document.querySelectorAll('#canvas .block');

        //Iterates through each chick, by all selected block actions
        // for(const chick of selectedBirds){      

        let chick = selectedBirds;
        console.log("the selected chick " + chick );   
        console.log(chick );        
            for(const block of placedBlocks){
                // 1st action: move
                if (block.classList.contains("move")) {
                    // get the direction and the number of steps to move
                    const move = block.dataset.move;
                    const numberInput = block.querySelector('input[type="number"]');
                    const moveValue = numberInput ? parseInt(numberInput.value) : 0;
                    let curMaze = maze.maze;
                    //Moves current chick in desired direction and amount, based on current maze position
                    chick.move(move, moveValue, curMaze);
                    await delay(moveValue * 1000);
                
                // 2nd action: drink
                } else if (block.classList.contains("drink")) {
                    // do the drink action
                    await chick.drink();
                
                // 3rd action: eat
                } else if (block.classList.contains("eat")) {
                // do the eat action
                await chick.eat();
                }
            };
        // };
    });

    // reset button clears all the blocks from the canvas, but does not reset the chicken
    document.getElementById('block-reset').addEventListener('click', function () {
        const blocks = blockDrop.querySelectorAll('.block');
        blocks.forEach(block => block.remove());
     });
    

    // Add event listeners for drag and drop functionality on the canvas
    canvas.addEventListener('drop', drop);
    canvas.addEventListener('dragover', allowDrop);

    
    // Initialize draggable blocks
    makeDraggable();
});