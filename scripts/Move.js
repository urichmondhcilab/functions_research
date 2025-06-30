class Move extends Block{
    /**
     * A constructor for a move operation
     * @param {String} direction up, down, right, or left           
     * @param {Bird} gameObject the object to move
     * @param {Maze} maze where the bird is moved
     */
    constructor(action, direction, gameObject, maze){
        super(action, gameObject, maze);
        this.direction = direction;
    }    
}