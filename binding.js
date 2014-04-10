var WIDTH;
var HEIGHT;
var ctx;
var memBar;

function MemBar(x, y, fCount, fSize)
{
    height = fCount*fSize;
    this.fFrames = [];
    this.apps = [];
    this.fCount = fCount;
    this.fSize = fSize;
    this.frameSize = 0;
    this.x = x;
    this.y = y;
    ctx.strokeStyle = 'black';
    ctx.font = '18pt Arial';
    ctx.strokeText('Frames', x, y - 5);
    ctx.beginPath();
    ctx.rect(x, y-1, 80, height+1);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.font = '14pt Arial';
    ctx.textAlign = 'center';
    ctx.lineWidth = 1;
    for (var i = 1;i<=fCount;i++) {
        ctx.strokeText(i, x + 40, y+(fSize*i)-2);
        ctx.moveTo(x,y+(fSize*i));
        ctx.lineTo(x+80,y+(fSize*i));
    }
    ctx.textAlign = 'left';
    ctx.stroke();   
}

MemBar.prototype.setFreeFrames = function(count, frameSize)
{
    var rFrame;
    this.frameSize = frameSize;
    if(count > 0 && count <= this.fCount){
        for (var i = 1;i<=count;i++) {
            do {
                rFrame = Math.floor(Math.random()*this.fCount)+1;
            } while (this.fFrames.indexOf(rFrame) > -1);
            this.fFrames.push(rFrame);
        }
        ctx.fillStyle = 'grey';
        for (var i = 1;i<=this.fCount;i++) {
            if(this.fFrames.indexOf(i) == -1) {
                ctx.fillRect(this.x+1,this.y+(this.fSize*(i-1)), 78, this.fSize);
            }
        }
        $("#submitButton").off('click', genFrames);
        $("#submitButton").on('click', newApp);
    } else alert("Frame count must be in 1.."+this.fCount);
}

function drawApp(appSize, color)
{
    if (appSize > 0 && Math.ceil(appSize/memBar.frameSize) <= memBar.fFrames.length) {
        document.getElementById("submitButton").disabled = true;
        ctx.fillStyle="#B0B0B0";
        ctx.fillRect(40,20,85,225);
        ctx.font = '12pt Arial';
        ctx.strokeText('Application', 40, 36);
        ctx.beginPath();
        ctx.rect(40,40,80,200);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
        setTimeout(function(){drawApp2(appSize,color)},1000);
    } else alert("Invalid application size!");
}

function drawApp2(appSize,color)
{
    var pageCnt = Math.ceil(appSize/memBar.frameSize);
    var pSize = 200/pageCnt;
    ctx.beginPath();
    for (var i = 1;i<=pageCnt;i++) {
        ctx.moveTo(40,40+(pSize*i));
        ctx.lineTo(120,40+(pSize*i));
    }
    ctx.stroke();
    setTimeout(function(){drawApp3(appSize,color)},1000);
}

function printFFrames()
{
    var text = "Free frames: "
    ctx.fillStyle="#B0B0B0";
    ctx.fillRect(20,360,300,50);
    for(var i = 0;i<memBar.fFrames.length;i++) text = text+" "+memBar.fFrames[i];
    ctx.font = '12pt Arial';
    ctx.strokeText(text, 20, 400);
}

function drawApp3(appSize,color)
{
    var pageCnt = Math.ceil(appSize/memBar.frameSize);
    var pSize = 200/pageCnt;
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.font = '12pt Arial';
    for (var i = 1;i<=pageCnt;i++) {
        ctx.strokeText("Page "+i, 40 + 40, 40+(pSize*i)-3);
    }
    ctx.textAlign = 'left';
    printFFrames();
    ctx.stroke();
    setTimeout(function(){drawApp4(appSize,color, 1)},1000);
}

function drawApp4(appSize, color, step)
{
    var pageCnt = Math.ceil(appSize/memBar.frameSize);
    if(step <= pageCnt) {
        i = memBar.fFrames.shift();
        printFFrames();
        ctx.fillStyle = color;
        ctx.fillRect(memBar.x+1,memBar.y+(memBar.fSize*(i-1)), 78, memBar.fSize);
        ctx.textAlign = 'center';
        ctx.strokeText("Page "+step, memBar.x + 40, memBar.y+(memBar.fSize*i)-2);
        ctx.textAlign = 'left';
        
        setTimeout(function(){drawApp4(appSize,color, step+1)},1000);
    } else {
        document.getElementById("submitButton").disabled = false;
    }
}

function genFrames(e) {
    if (e.preventDefault) e.preventDefault();
    memBar.setFreeFrames(parseInt(getParameter("appSize"),10), 1);
    return false;
}

function newApp(e) {
    var randColor = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    if (e.preventDefault) e.preventDefault();
    drawApp(parseInt(getParameter("appSize"),10), randColor);
    return false;
}

function initBinding()
{
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    ctx.fillStyle="#B0B0B0";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    memBar = new MemBar(500, 40, 20, 20);
    $("#submitButton").on('click', genFrames);
}