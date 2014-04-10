window.onload = onLoad;

//todo neeD?
function onLoad(){
    promise = setTimeout(2000); 

}

/*******************************
* Dynamicly change controls
* after topic was changed
*******************************/
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
            $("#submitButton").on('click', dynamicRelocation_Start);
            break;
        case "2":
            addParameter("Size of new application (KB): ", "appSize");
            addDropBox("select application: ", "useApp");
            initBinding();
            break;
        case "swapping":
            addParameter("Process memory amount", "memAmount");
            $("#submitButton").on('click', startTheSwap);
            initSwap();
            break;
        case "segmentation":
            initSegmentation();
            break;
    }
    window.location = "#content_div";
    
}

/*******************************
* Adds parameter to form
*******************************/
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
    var cont = document.getElementById("parameters");
    cont.appendChild(row);
}

function addDropBox(labelName, selectId)
{
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var select = document.createElement("select");
    select.id = selectId;
    cell1.textContent = labelName;
    cell2.appendChild(select);
    row.appendChild(cell1);
    row.appendChild(cell2);
    var cont = document.getElementById("parameters");
    cont.appendChild(row);
}

/*******************************
* Gets parameter's value by id
*******************************/
function getParameter(inputId) {
    var input = document.getElementById(inputId);
    return input.value;
}

/*******************************
* Deletes old parameters
*******************************/
function initParameters(){
    var parentDiv = document.getElementById("parameters");
    while (parentDiv.childElementCount > 0) {
        parentDiv.removeChild(parentDiv.childNodes[0]);
    }
}


