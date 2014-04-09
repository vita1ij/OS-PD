var WIDTH;
var HEIGHT;
var ctx;
var memoryBox;
var swapBox;
var processes = new Array();
var processesWait = new Array();
var memoryWeight;
var waitingWeight;
var totalProcesses;
var frames;
var intervalId;
var intervalId2;
var prepared = false;



function ProcessMemory(box, weight){

    this.box = box;
    this.weight = weight;

}



function initSwap(){

    memoryBox = new Common.Box(50, 150, 100, 210, ["RAM"], '#FFFFFF');
    swapBox = new Common.Box(450, 150, 150, 200, ["Swap file"], '#FFFFFF');
    reDrawGrid();
    totalProcesses = memoryWeight = waitingWeight = parseInt(0);
    frames = 0;
}

function drawMemoryBlock(blockWeight){
    var randColor = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
    var newBox;
    var bWeight = parseInt(blockWeight);
    totalProcesses++;
    if(memoryWeight + bWeight <= 200){
        newBox = new Common.Box(65 ,155+memoryWeight , 70,blockWeight,"", randColor);
        newBox.Draw();
        processes.push(new ProcessMemory(newBox, blockWeight));
        memoryWeight += parseInt(blockWeight);
    } else {
        while(memoryWeight + bWeight > 200){
            prepared = false;
            var oldProcess = processes.shift();
            memoryWeight -= oldProcess.weight;
                intervalId = setInterval(function () {
                    animateDrop(oldProcess)
                }, 15);
        }
    }
}

function reDrawGrid(){
    Common.ClearCanvas();
    memoryBox.Draw();
    swapBox.Draw();
}
function animateDrop(process){
    frames++;
    reDrawGrid();
    process.box.x ++;
    var newBox = new Common.Box(process.box.x + frames,process.box.y,70, process.weight,"",process.box.color);
    newBox.Draw();
    var temp = new Array()
    processes.forEach(function(entry){
        entry.box.Draw();
    });

    if(frames == 200){
        frames = 0;
        clearInterval(intervalId);
        intervalId2 = setInterval(function(){moveLeftovers(process.weight)},15);
        processesWait.push(new ProcessMemory(newBox, process.weight))
        prepared = true;
    }
}

function moveLeftovers(limit){
    reDrawGrid();
    frames++;
    var reached = frames==limit;
    var temp = new Array();
    processes.forEach(function(one){
        var box = one.box;
        var newBox = new Common.Box(box.x,box.y-frames,70, one.weight, "", box.color);
        newBox.Draw();
        if(reached){temp.push(new ProcessMemory(newBox, one.weight));}
    });
    if(frames  > limit -1){
        clearInterval(intervalId2);
        frames=0;
        processes = temp;
    }
}

function startTheSwap(){
    drawMemoryBlock(getParameter("memAmount"));
}