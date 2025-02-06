/**
 * A list class that constructs an HTML to be appended to each bird. 
 * Each list has a size that is governed in the constants.js file. 
 * TO DO NEXT: dispay this list on the game canvas. 
 */

class List{
    /**
     * @param {Integer} lstSize the number of items in a list
     */
    constructor(lstSize){
        this.size = 0 || lstSize;
        let listDiv = document.createElement("div")
        let list = document.createElement("ul");
        listDiv.appendChild(list);
        list.className = "testingList"
        for(let i = 0; i < lstSize; i++){
            let child = document.createElement("li");
            child.textContent = i;
            list.appendChild(child);
            }
    }
}