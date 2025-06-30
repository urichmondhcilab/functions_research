/**
 * A unit of code in our AST
 */
class Block{
    /**
     * Initializes instance variables of a block object
     * @param {Bird} gameObject the bird that takes the action
     * @param {Maze} maze the maze (environment, context) within which the action is taken
     */
    constructor(gameObject, maze){
        this.gameObject = gameObject;
        this.maze = maze;
    }
}