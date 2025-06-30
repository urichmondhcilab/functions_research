class Parser{
    /**
     * Parses placed blocks and changes it to a list of Block objects
     * @param {Bird} gameObjects the bird that will take action on the maze
     * @param {Array} placedBlocks an array of JS Elements that were used to create the block
     * @param {Maze} maze the maze through which the bird moves
     */
    constructor(gameObjects, placedBlocks, maze){
        this.ASTBlocks = [];
        this.placedBlocks = placedBlocks;
        this.maze = maze;
        this.gameObjects = gameObjects;
    }

    /**
     * parses placedblocks so that each block is a single action
     * @returns a list of blocks
     */
    parse(){

    for (const gameObject of this.gameObjects){
        for(const block of this.placedBlocks){
            if (block.classList.contains("move")) {
                const direction = block.dataset.move;
                const numberInput = block.querySelector('input[type="number"]');
                const timesToMove = numberInput ? parseInt(numberInput.value) : 0; 
                for (let i = 0; i < timesToMove; i++){
                    this.ASTBlocks.push(new Move(direction, gameObject, this.maze));
                }                                                
            }
            else if (block.classList.contains("drink")){
                    this.ASTBlocks.push(new Drink(gameObject, this.maze));                
            }
            else if (block.classList.contains("eat")){
                    this.ASTBlocks.push(new Eat(gameObject, this.maze));    
            }            
        }
    }

    // let finalBlocks = [];
    // console.log("number of blocks: " +this.placedBlocks.length);
    // console.log("number of gameobjects: " + this.gameObjects.length)

    // for (let i = 0; i < this.placedBlocks.length; i++){
    //     let j = i; //blockcount
    //     let k = 0; // birdcount
    //     while (k <= i && k < this.gameObjects.length){
    //         let gameObject = this.gameObjects[k];
    //         let block = this.placedBlocks[j];
    //         // push (gameObject[k], this.placedBlocks[j])
    //         if (block.classList.contains("move")) {
    //             const direction = block.dataset.move;
    //             const numberInput = block.querySelector('input[type="number"]');
    //             const timesToMove = numberInput ? parseInt(numberInput.value) : 0; 
    //             for (let i = 0; i < timesToMove; i++){
    //                 this.ASTBlocks.push(new Move(direction, gameObject, this.maze));
    //             }                                                
    //         }
    //         else if (block.classList.contains("drink")){
    //                 this.ASTBlocks.push(new Drink(gameObject, this.maze));                
    //         }
    //         else if (block.classList.contains("eat")){
    //                 this.ASTBlocks.push(new Eat(gameObject, this.maze));    
    //         }             
    //         k++;
    //         j--;
    //         console.log("i: " + i + "j: " + j + "k: " + k);
    //     }
    // }

        return this.ASTBlocks;
    }
}