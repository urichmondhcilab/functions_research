class Parser{
    /**
     * Parses placed blocks and changes it to a list of Block objects
     * @param {Bird} gameObject the bird that will take action on the maze
     * @param {Array} placedBlocks an array of JS Elements that were used to create the block
     * @param {Maze} maze the maze through which the bird moves
     */
    constructor(gameObject, placedBlocks, maze){
        this.ASTBlocks = [];
        this.placedBlocks = placedBlocks;
        this.maze = maze;
        this.gameObject = gameObject;
    }

    parse(){
        let placedBlocks = this.placedBlocks;
        let maze = this.maze.maze;
        let ASTBlocks = this.ASTBlocks;
        let gameObject = this.gameObject;

        for(const block of placedBlocks){
            if (block.classList.contains("move")) {
                const direction = block.dataset.move;
                console.log("the direction" + direction);
                const numberInput = block.querySelector('input[type="number"]');
                const timesToMove = numberInput ? parseInt(numberInput.value) : 0; 
                for (let i = 0; i < timesToMove; i++){
                    ASTBlocks.push(new Move("move", direction, gameObject, maze));
                }                                                
            }
            else if (block.classList.contains("drink")){
                    ASTBlocks.push(new Drink("drink", gameObject, maze));                
            }
            else if (block.classList.contains("eat")){
                    ASTBlocks.push(new Eat("eat", gameObject, maze));    
            }            
        }

        return this.ASTBlocks;
    }
}