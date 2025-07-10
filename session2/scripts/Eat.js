class Eat extends Block{
    /**
     * A constructor for a move operation      
     * @param {Bird} gameObject the object to move
     * @param {Maze} maze where the bird is moved
     */
    constructor(gameObject, maze){
        super(gameObject, maze);
        this.action = "eat";
    }    
}