/**************************************
* Namespace for common stuff
**************************************/
(function () {
    this.Common = this.Common || {}

    //Canvas context
    this.ctx = function () {
        if (this.ctx) return this.ctx;
        if (document.getElementById("myCanvas")) {
            return document.getElementById("myCanvas").getContext("2d");
        }
    }

    this.ArrowHeadLen = 10;   // length of head in pixels

    Common.ClearCanvas = function(){
        ctx.fillStyle="#B0B0B0";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }

    Common.Box = function (x, y, width, height, text, color) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.text = text;
        this.color = color;

        this.Draw = function () {
            Common.DrawText(this.text, x, y, 18);
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    Common.DrawArrow = function (fromx, fromy, tox, toy) {
        ctx.beginPath();
        var angle = Math.atan2(toy - fromy, tox - fromx);
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - ArrowHeadLen * Math.cos(angle - Math.PI / 6), toy - ArrowHeadLen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - ArrowHeadLen * Math.cos(angle + Math.PI / 6), toy - ArrowHeadLen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }

    Common.DrawText = function (text, x, y, fontSize) {
        ctx.font = fontSize + 'pt Arial';
        for (var i = 0; i < text.length; i++) {
            ctx.strokeText(text[i], x + 5, y + 15 - ((text.length - i) * (fontSize + 5)));
        }
    }

} ());