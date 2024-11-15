class List{
    constructor(){
        let size = 5;
        let list = document.createElement("ul");
        for(let i = 0; i < size; i++){
            let child = document.createElement("li");
            child.textContent = i;
            list.appendChild(child);
            console.log(i);
            }
    }
}