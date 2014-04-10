/**************************************
* Namespace for common stuff
**************************************/
(function () {
    this.Common = this.Common || {}
    //Canvas
    function getCanvas() {
        if (this.canvas) return this.canvas;
        if (document.getElementById("myCanvas")) return document.getElementById("myCanvas");
    }

    //Canvas context
    this.ctx = function () {
        if (this.ctx) return this.ctx;
        if (document.getElementById("myCanvas")) {
            return document.getElementById("myCanvas").getContext("2d");
        }
    }

    this.ArrowHeadLen = 10;   // length of head in pixels

    Common.ClearCanvas = function () {
        ctx.fillStyle = "#B0B0B0";
        ctx.fillRect(0, 0, getCanvas().width, getCanvas().height);
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

    Common.Romb = function (x, y, halfWidth, halfHeight, color) {
        this.x = x;
        this.y = y;
        this.halfWidth = halfWidth;
        this.halfHeight = halfHeight;
        this.color = color;

        this.Draw = function () {
            ctx.beginPath();
            ctx.moveTo(x - halfWidth, y);
            ctx.lineTo(x, y - halfHeight);
            ctx.lineTo(x + halfWidth, y);
            ctx.lineTo(x, y + halfHeight);
            ctx.lineTo(x - halfWidth, y);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }

    Common.DrawArrow = function (fromx, fromy, tox, toy, color) {
        ctx.strokeStyle = color || '#000000';
        ctx.beginPath();
        var angle = Math.atan2(toy - fromy, tox - fromx);
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - ArrowHeadLen * Math.cos(angle - Math.PI / 6), toy - ArrowHeadLen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - ArrowHeadLen * Math.cos(angle + Math.PI / 6), toy - ArrowHeadLen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
        ctx.strokeStyle = '#000000';
    }

    Common.DrawText = function (text, x, y, fontSize, fontColor) {
        ctx.font = fontSize + 'pt Arial';
        ctx.strokeStyle = fontColor || '#000000';
        for (var i = 0; i < text.length; i++) {
            ctx.strokeText(text[i], x + 5, y + 15 - ((text.length - i) * (fontSize + 5)));
        }
        ctx.strokeStyle = '#000000';
    }

} ());