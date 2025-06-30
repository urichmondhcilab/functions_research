class Interpreter{

    static interpret(block){
        const gameObject = block.gameObject;
        const action = block.action;
        switch (action){
            case "move":            
               gameObject.move(block.direction, 1, block.maze.maze);
                break;
            case "eat":
                gameObject.eat();
                break;
            case "drink":
                gameObject.drink();                
                break
        }
    }
}