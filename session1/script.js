    let instructions = ["First help her plan"]
    let instructionCount = 0;
    let nextButton = document.getElementById("next-btn");
    let skipButton = document.getElementById("skip-btn")
    let displayObject = document.getElementById("instruction-display");
    let displayContainer = document.getElementById("instructions-container");
    let instructionObject = document.getElementById("instructions")
    let ssession1GameObject = document.getElementById("session1_game");
    let birdImageObject = document.getElementById("bird_img");
    let planTextObject = document.getElementById("session_title");

    //dragable elements
    let gatherObject = document.getElementById("session1_gather");
    let findPathObject = document.getElementById("session1_find_path");
    let guideChicks = document.getElementById("session1_guide_chicks")
    let birdImage = ["session2/images/mother_hen/Mother_Hen_1.svg", "session2/images/mother_hen/Mother_Hen_2.svg"];



    //elements to dragOver 
    let gatherTarget = document.getElementById("task1");
    let findPathTarget = document.getElementById("task2");
    let guideChicksTarget = document.getElementById("task3");

    nextButton.addEventListener("click", runThroughInstructions);
    skipButton.addEventListener("click", skipInstructions);

    gatherObject.addEventListener("dragstart", dragStartHandler);
    findPathObject.addEventListener("dragstart", dragStartHandler);
    guideChicks.addEventListener("dragstart", dragStartHandler);

    gatherTarget.addEventListener("dragover", dragOverHandler);
    findPathTarget.addEventListener("dragover", dragOverHandler);
    guideChicksTarget.addEventListener("dragover", dragOverHandler);

    gatherTarget.addEventListener("drop", dropHandler);
    findPathTarget.addEventListener("drop", dropHandler);
    guideChicksTarget.addEventListener("drop", dropHandler);

    function interval(){
        setInterval(changeChickenSprite, 1000);
    }

    function changeChickenSprite(){
        birdImageObject.src = birdImage[Math.round(Math.random())];
    }

    function runThroughInstructions(){
        if (instructionCount < instructions.length){
            console.log(displayObject.firstChild.nodeValue);
            displayObject.firstChild.nodeValue = instructions[instructionCount];
            instructionCount++;
        }
        else{
            instructionObject.style.display = "none";
            ssession1GameObject.className += " session1_gameplay";
        }
    }

    function skipInstructions(){
            window.location.href = "session2/index.html";
    }

    function matched(){

        return (gatherTarget.children.length > 0 && 
                findPathTarget.children.length > 0 && 
                guideChicksTarget.children.length > 0);
    }

    function dragStartHandler(e){
        e.dataTransfer.setData("text",e.target.id);
    }

    function dragOverHandler(e){
        e.preventDefault();
    }

    function dropHandler(e){
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
        let objToAdd = document.getElementById(data);
        console.log("in drop handler");

        e.target.appendChild(document.getElementById(data));    
        objToAdd.style.width = "90%";

        console.log("")
        if (matched()) {
            window.location.href = "session2/index.html";
        }else{
            planTextObject.firstChild.nodeValue = "what should she do next?"
        }

    }

    interval();





