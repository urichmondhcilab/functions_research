class List{
    constructor(lstSize){
        this.size = 0 || lstSize;
        let list = document.createElement("ul");
        for(let i = 0; i < lstSize; i++){
            let child = document.createElement("li");
            child.textContent = i;
            list.appendChild(child);
            //console.log(i);
            }
    }
}