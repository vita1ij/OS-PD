window.onload = onLoad;

function onLoad(){
    
}


function setPage(url){
    //remove all events
    var oldElement = document.getElementById("submitButton");
    var newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
    //delete old parameters
    initParameters();
    //clear Canvas
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle="#B0B0B0";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    //init
    switch(url.value){
        case "dynamic_relocation":
            addParameter("logical address", "logic");
            addParameter("relocation register", "reloc");
            $("#submitButton").on('click', dynamicRelocationStart);
            break;
        case "2":
            addParameter("Size of new application (KB): ", "appSize")
            initBinding();
            break;
    }
    window.location = "#content_div";
    
}

function addParameter(labelName, inputId) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var input = document.createElement("input");
    input.id = inputId;
    input.type = "text";
    input.name = "customParameter";
    cell1.textContent = labelName;
    cell2.appendChild(input);
    row.appendChild(cell1);
    row.appendChild(cell2);
    var cont = document.getElementById("parameters")
    cont.appendChild(row);
}

function getParameter(inputId) {
    var input = document.getElementById(inputId);
    return input.value;
}

function initParameters(){
    var parentDiv = document.getElementById("parameters");
    while (parentDiv.childElementCount > 0) {
        parentDiv.removeChild(parentDiv.childNodes[0]);
    }
}

function dynamicRelocationStart(sender, args){

    dynamicRelocationStartBasics();
}

function dynamicRelocationStartBasics(){
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    
    //clear
    context.fillStyle = "#FFFFFF";
    context.clearRect(0, 0, 640, 480);

    //draw boxes
    context.fillStyle = "#AAAAAA";
    context.fillRect(10, 50, 50, 50);
    context.fillRect(80, 25, 100, 100);
    context.fillRect(210, 25, 75, 100);

    context.fillStyle = "#000000";
    context.font="10px Georgia";
    context.fillText("CPU", 25,70);
    context.fillText("relocation", 100,40);
    context.fillText("register", 105,50);
    context.fillText("memory", 225,40);
}
