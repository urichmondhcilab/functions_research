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
        for(const block of this.placedBlocks){
            if (block.classList.contains("move")) {
                const direction = block.dataset.move;
                const numberInput = block.querySelector('input[type="number"]');
                const timesToMove = numberInput ? parseInt(numberInput.value) : 0; 
                for (let i = 0; i < timesToMove; i++){
                    this.ASTBlocks.push(new Move("move", direction, this.gameObject, this.maze));
                }                                                
            }
            else if (block.classList.contains("drink")){
                    this.ASTBlocks.push(new Drink("drink", this.gameObject, this.maze));                
            }
            else if (block.classList.contains("eat")){
                    this.ASTBlocks.push(new Eat("eat", this.gameObject, this.maze));    
            }            
        }

        return this.ASTBlocks;
    }
}