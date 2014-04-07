window.onload = onLoad;

function onLoad(){
    addParameter("foo", "bar");
    addParameter("foo", "bar");
    addParameter("foo", "bar");
}


function setPage(url){
    switch(url.value){
        case "dynamic_relocation":

            break;
    }
    
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
