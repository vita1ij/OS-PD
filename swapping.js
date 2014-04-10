var memoryBox;
var swapBox;
var processes = [];
var processesWait = [];
var memoryWeight;
var waitingWeight;
var frames;
var intervalId;
var intervalId2;
var lasBlockMemory;
var labelTotalProcessWaiting;

function ProcessMemory(box, weight) {

    this.box = box;
    this.weight = weight;

}

function initSwap() {

    memoryBox = new Common.Box(50, 150, 100, 210, ["RAM"], '#FFFFFF');
    swapBox = new Common.Box(450, 150, 150, 210, ["Swap file"], '#FFFFFF');
    reDrawGrid();
    memoryWeight = waitingWeight = parseInt(0);
    frames = 0;
}

function drawMemoryBlock(blockWeight) {
    var randColor = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    var newBox;
    var bWeight = parseInt(blockWeight);
    lasBlockMemory = bWeight;
    if (memoryWeight + bWeight <= 200) {
        newBox = new Common.Box(65, 155 + memoryWeight, 70, blockWeight, "", randColor);
        newBox.Draw();
        processes.push(new ProcessMemory(newBox, blockWeight));
        memoryWeight += parseInt(blockWeight);
        document.getElementById("submitButton").disabled = false;
    } else {
        var oldProcess = [];
        while (memoryWeight + bWeight > 200) {
            var temp = processes.shift();
            oldProcess.push(temp);
            memoryWeight -= temp.weight;
        }
        intervalId = setInterval(function () {
            animateDrop(oldProcess)
        }, 15);
    }
}

function reDrawGrid() {
    Common.ClearCanvas();
    memoryBox.Draw();
    swapBox.Draw();
    var string = processesWait.length.toString();
    labelTotalProcessWaiting = new Common.DrawText([string], 550, 190, 15, 'black');
}
function animateDrop(droplings) {
    frames++;
    reDrawGrid();
    var tempWeight = parseInt(0);
    droplings.forEach(function (process) {
        process.box.x++;
        var newBox = new Common.Box(process.box.x + frames, process.box.y, 70, process.weight, "", process.box.color);
        Common.DrawArrow(160, 130, 430, 130);

        newBox.Draw();
        tempWeight += parseInt(process.weight);
    });

    processes.forEach(function (entry) {
        entry.box.Draw();
    });

    if (frames == 200) {
        frames = 0;
        clearInterval(intervalId);
        intervalId2 = setInterval(function () {
            moveLeftovers(tempWeight, true)
        }, 15);
        droplings.forEach(function (process) {
            processesWait.push(new ProcessMemory(process.box, process.weight));
        });

    }
}

function moveLeftovers(limit, drawAfter) {
    reDrawGrid();
    frames++;
    var reached = frames == limit;
    var temp = [];
    processes.forEach(function (one) {
        var box = one.box;
        var newBox = new Common.Box(box.x, box.y - frames, 70, one.weight, "", box.color);
        newBox.Draw();
        if (reached) {
            temp.push(new ProcessMemory(newBox, one.weight));
        }
    });
    if (frames > limit - 1) {
        frames = 0;
        processes = temp;
        if(drawAfter) {
            clearInterval(intervalId2);
            drawMemoryBlock(parseInt(lasBlockMemory));
            document.getElementById("submitButton").disabled = false;
        } else {
            clearInterval(intervalId2);
            var waiting = processesWait.shift();

            intervalId = setInterval(function(){ memoryComesBack(waiting);}, 15);
        }
    }
}
function getBack() {
    var droplets = [];
    var param2 = processesWait[0];
    var droppedWeight = parseInt(0);
    while(parseInt(memoryWeight) + parseInt(param2.weight) > 200){
        var temp = processes.shift();
        memoryWeight -= parseInt(temp.weight);
        droppedWeight += parseInt(temp.weight);
        droplets.push(temp);
    }
    if(droplets.length > 0) {
        intervalId2 = setInterval(function () {
            moveLeftovers(droppedWeight, false);
        }, 15);
    } else {
        var waiting = processesWait.shift();

        intervalId = setInterval(function(){ memoryComesBack(waiting);}, 15);
    }
}

function memoryComesBack(process){

    reDrawGrid();
    frames++;

    var newBox = new Common.Box(process.box.x-frames*2+202,155+memoryWeight, 70,process.weight,"", process.box.color);
    newBox.Draw();
    Common.DrawArrow(430, 380,160, 380);

    processes.forEach(function (entry) {
        entry.box.Draw();
    });

    if(frames >200){
        frames = 0;
        clearInterval(intervalId);
        processes.push(new ProcessMemory(newBox, process.weight));
        memoryWeight += parseInt(process.weight);
        lastReDraw();
        document.getElementById("submitButton").disabled = false;
    }
}

function lastReDraw(){
    reDrawGrid();
    processes.forEach(function (entry) {
        entry.box.Draw();
    });
}

function startTheSwap() {
    var param = getParameter("memAmount");
    if(param < 0 || param > 200){
        alert("Nevar ievadīt parametru, kas nav intervālā [0;200]");
    }
    document.getElementById("submitButton").disabled = true;
    if (param == 0) {
        if(processesWait.length == 0){
            alert("Nav ko izņemt");
            document.getElementById("submitButton").disabled = false;
        } else {
            getBack();
        }
    } else {
        drawMemoryBlock(param);
    }
}