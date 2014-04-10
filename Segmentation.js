// Elements
var WIDTH, HEIGHT;
var ctx, logMem, physMem, memTable;

function LogicalMemory(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    // Draw Circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#1589FF";
    ctx.stroke();

    // Title
    ctx.font = "16pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText("Logical adsress space", x-radius+15, y+radius+25);
}

function drawSegment(x, y, title, subTitle, color) {
    // Draw rectangle
    ctx.beginPath();
    ctx.rect(x, y, 60, 45);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();

    // Title
    ctx.font = "11pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText(title, x+3, y+15);

    // SubTitle
    ctx.font = "11pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText(subTitle, x, y+45+15);
}

LogicalMemory.prototype.fill = function() {
    drawSegment(this.x-80, this.y-80, "Code", "Segment1", "red");
    drawSegment(this.x-80, this.y+10, "Data", "Segment2", "orange");
    drawSegment(this.x+10, this.y-80, "Stack", "Segment3", "purple");
    drawSegment(this.x+10, this.y+10, "Library", "Segment4", "yellow");
};

function PhysicalMemory(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // Draw rectangle
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#1589FF";
    ctx.stroke();

    // Title
    ctx.font = "16pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText("Physical memory", x-35, y+height+25);
}

function drawSegmentFill(x, y, width, height, title, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.font = "11pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText(title, x+3, y+15);
}

PhysicalMemory.prototype.fill = function() {
    var segH = this.height/14;

    drawSegmentFill(this.x, this.y, this.width, segH, "Stack", "purple");
    drawSegmentFill(this.x, this.y+2*segH, this.width, segH, "Code", "red");
    drawSegmentFill(this.x, this.y+7*segH, this.width, segH, "Library", "yellow");
    drawSegmentFill(this.x, this.y+12*segH, this.width, segH, "Data", "orange");
};

function SegmentationTable(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // Draw rectangle
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#1589FF";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x+width/2, y);
    ctx.lineTo(x+width/2, y+height);
    ctx.stroke();

    // Header
    ctx.beginPath();
    ctx.rect(x, y, width, 25);
    ctx.fillStyle = "#1589FF";
    ctx.fill();

    ctx.font = "11pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText("Limit", x+3, y+15);

    ctx.font = "11pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText("Base", x+width/2+3, y+15);

    // Title
    ctx.font = "16pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText("Segment Table", x-15, y+height+25);
}

function drawTable(x, y, width, title1, title2, title3) {
    ctx.font = "11pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText(title1, x-15, y+15);

    ctx.font = "11pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText(title2, x+3, y+15);

    ctx.font = "11pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText(title3, x+width/2+3, y+15);
}

SegmentationTable.prototype.fill = function() {
    var newY = this.y+25;

    drawTable(this.x, newY, this.width, "3", "1000", "0");
    drawTable(this.x, newY+25, this.width, "1", "1000", "3000");
    drawTable(this.x, newY+25*2, this.width, "4", "1000", "7000");
    drawTable(this.x, newY+25*3, this.width, "2", "1000", "12000");
};

function beginAnimation(e) {
    logMem.fill();
    physMem.fill();
    memTable.fill();
    return false;
}

function initSegmentation() {
    // Get Canvas
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    // Get dimension
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    ctx.fillStyle = "#B0B0B0";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Init main objects
    logMem = new LogicalMemory(150, HEIGHT/2, 120);
    physMem = new PhysicalMemory(WIDTH-120, 10, 100, HEIGHT-50);
    memTable = new SegmentationTable(WIDTH/2+20, (HEIGHT/2)-100, 100, 120);
    $("#submitButton").on('click', beginAnimation);
}