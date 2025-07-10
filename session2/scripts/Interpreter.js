/**
 * Carries out the action associated with a game object
 */
class Interpreter{
    /**
     * Executes an action in block on a game object in block
     * @param {Block} block a unit of action to be taken on a gameObject
     */
    static interpret(block){
        const gameObject = block.gameObject;
        const action = block.action;
        switch (action){
            case "move":            
               gameObject.move(block.direction, block.maze.maze);
                break;
            case "eat":
                gameObject.eat();
                break;
            case "drink":
                gameObject.drink();                
                break;
            case "start":
                gameObject.start(block.maze.maze);
        }
    }
}