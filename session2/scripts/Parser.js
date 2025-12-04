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
        this.parsedAST = [];       
    }

    /**
     * parses placedblocks so that each block is a single action
     * @returns a list of blocks
     */
    parse(){
        // create blocks without assigning game objects    
        this.parseOne();

        // schedule blocks so each bird executes a block one after the other
        // and not all blocks per bird
        // the first bird gets to the last block 
        let blockCount = this.ASTBlocks.length;
        let birdCount = this.gameObjects.length;
        let i = 0;
        let j = 0;
        let k = i;
        while(i < blockCount){
            j = 0
            k = i;
            while(k >= 0 && j < birdCount /*&& j <= k*/){
                
                // console.log(k + " " + j + " " + i);
                let block = this.ASTBlocks[k];
                this.parseAction(block, this.gameObjects[j]);                
                j++;
                k--;
            }                
            i++;
        }   

        // 2 4 5
        // we pick up processing the second bird and other birds so they get to the last block
        let m = blockCount - 1;
        let n = birdCount;
        i = 1; //to birdCount
        k = i;        
        j = m;

        while(i < n){
            k = m;
            j = i
            while((k >= 0) && j < n){
                console.log(k + " " + j + ". . . .")
                let block = this.ASTBlocks[k];
                this.parseAction(block, this.gameObjects[j]);              
                k--;
                j++;
            }
            i++;
        }

        this.ASTBlocks = [];
        return this.parsedAST;
    }


    /**
     * Associates blocks with gameObjects
     * @param {Array} block Array of Blocks
     * @param {Array} gameObject Array of birds
     */
    parseAction(block, gameObject){
        switch(block.action){
            case "move":
                this.parsedAST.push(new Move(block.direction, gameObject, this.maze));
                break;
            case "drink":
                this.parsedAST.push(new Drink(gameObject, this.maze));
                break;
            case "eat":
                this.parsedAST.push(new Eat(gameObject, this.maze));
                break;
            case "start":                       
                this.parsedAST.push(new Start(gameObject, this.maze));
                break;
        }  
    }


    /**
     * parse blocks without assigning them to game object
     */
    parseOne(){
        // create blocks without assigning game objects
        for(const block of this.placedBlocks){
            if (block.classList.contains("drink")){
                this.ASTBlocks.push(new Drink(null, this.maze));                
            }
            else if (block.classList.contains("eat")){
                this.ASTBlocks.push(new Eat(null, this.maze));    
            } 
            else if (block.classList.contains("start")){
                this.ASTBlocks.push(new Start(null, this.maze));
            }
            else if (block.classList.contains("new-move")){
                // using image name to determine moves!
                let visibleMove = window.getComputedStyle(block.querySelector(".visible-move")).backgroundImage;
                let visibleNumber = window.getComputedStyle(block.querySelector(".visible-number")).backgroundImage;                
                const direction = visibleMove.split('/').at(-1).split('.')[0]; // split path by /, select last entry, split by .
                const timesToMove = visibleNumber.split('/').at(-1).split('.')[0].slice(-1);
                for (let i = 0; i < timesToMove; i++){
                    this.ASTBlocks.push(new Move(direction, null, this.maze));
                }                   
            }
        }          
    }
}