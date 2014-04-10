// Elements
var WIDTH, HEIGHT;
var ctx, logMem, physMem, memTable;
var COUNTER;

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
    switch(COUNTER) {
        case 3:
            drawSegment(this.x - 80, this.y - 80, "Code", "Segment1", "red");
            break;
        case 9:
            drawSegment(this.x - 80, this.y + 10, "Data", "Segment2", "orange");
            break;
        case 0:
            drawSegment(this.x + 10, this.y - 80, "Stack", "Segment3", "purple");
            break;
        case 6:
            drawSegment(this.x + 10, this.y + 10, "Library", "Segment4", "yellow");
            break;
    }
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

    // Side
    var segH = height/14;
    ctx.font = "16pt Calibri";
    ctx.fillStyle = "black";
    ctx.fillText("0", x-15, y+15);
    ctx.fillText("3000", x-45, y+segH*3+15);
    ctx.fillText("6000", x-45, y+segH*6+15);
    ctx.fillText("9000", x-45, y+segH*9+15);
    ctx.fillText("12000", x-60, y+segH*12+15);

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

    switch(COUNTER) {
        case 2:
            drawSegmentFill(this.x, this.y, this.width, segH, "Stack", "purple");
            break;
        case 5:
            drawSegmentFill(this.x, this.y + 2 * segH, this.width, segH, "Code", "red");
            break;
        case 8:
            drawSegmentFill(this.x, this.y + 7 * segH, this.width, segH, "Library", "yellow");
            break;
        case 11:
            drawSegmentFill(this.x, this.y + 12 * segH, this.width, segH, "Data", "orange");
            break;
    }

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

    switch(COUNTER) {
        case 1:
            drawTable(this.x, newY, this.width, "3", "1000", "0");
            break;
        case 4:
            drawTable(this.x, newY + 25, this.width, "1", "1000", "3000");
            break;
        case 7:
            drawTable(this.x, newY + 25 * 2, this.width, "4", "1000", "7000");
            break;
        case 10:
            drawTable(this.x, newY + 25 * 3, this.width, "2", "1000", "12000");
            break;
    }
};

function beginAnimation() {
    logMem.fill();
    physMem.fill();
    memTable.fill();
    COUNTER++;
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
    COUNTER = 0;
}