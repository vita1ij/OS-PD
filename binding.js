var WIDTH;
var HEIGHT;
var ctx;
var memBar;

function MemBar(x, y, height)
{
    this.x = x;
    this.y = y;
    this.height = height;
    this.filled = 0;
    ctx.font = '18pt Arial';
    ctx.strokeText('RAM', x + 5, y - 5);
    ctx.beginPath();
    ctx.rect(x, y-1, 80, height+1);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

MemBar.prototype.fill = function (limit, color) {
    if (this.filled + limit < this.height) {
        var base = this.filled;
        this.filled += limit;
        ctx.fillStyle = color;
        ctx.fillRect(this.x+1,this.y + base,78,limit);
    } else alert("Application too large!");
};

function addApp(e) {
    if (e.preventDefault) e.preventDefault();
    randColor = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
    memBar.fill(parseInt(getParameter("appSize"),10), randColor);
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
    memBar = new MemBar(500, 100, 300)
    $("#submitButton").on('click', addApp);
}