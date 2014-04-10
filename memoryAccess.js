var initMemoryAccess_BaseRomb;
var initMemoryAccess_LimitRomb;
var initMemoryAccess_CpuBox;
var initMemoryAccess_BaseBox;
var initMemoryAccess_LimitBox;
var initMemoryAccess_MemoryBox;


function initMemoryAccess(){
    addParameter("Base value", "base");
    addParameter("Limit value", "limit");
    addParameter("Adress", "address");

    initMemoryAccess_BaseRomb = new Common.Romb(250, 325, 50, 25, "#5555FF");
    initMemoryAccess_LimitRomb = new Common.Romb(400, 325, 50, 25, "5555FF");

    initMemoryAccess_CpuBox = new Common.Box(50, 300, 100, 50, ["Address"], 'white');
    initMemoryAccess_BaseBox = new Common.Box(200, 150, 100, 50, ["Base"], 'white');
    initMemoryAccess_LimitBox = new Common.Box(350, 150, 100, 50, ["Base","+","Limit"], 'white');
    initMemoryAccess_MemoryBox = new Common.Box(500, 150, 100, 300, ["Memory"], 'yellow');

    initMemoryAccess_Paint();
    $("#submitButton").on('click', MemoryAccess_Start);
}

function initMemoryAccess_Paint(status){
    if (isNaN(parseInt(status)))
    {
        status = 0;
    }
    Common.ClearCanvas();

    initMemoryAccess_BaseRomb.Draw();
    initMemoryAccess_LimitRomb.Draw();

    Common.DrawText([">="],240, 335, 12);
    Common.DrawText(["<"],390, 335, 12);

    initMemoryAccess_CpuBox.Draw();
    initMemoryAccess_BaseBox.Draw();
    initMemoryAccess_LimitBox.Draw();
    initMemoryAccess_MemoryBox.Draw();

    Common.DrawArrow(150, 325, 200, 325, (status == 0) ? "black" : "green");
    Common.DrawArrow(300, 325, 350, 325, (status == 0 || status == 1) ? "black" : "green");
    Common.DrawArrow(450, 325, 500, 325, (status != 3) ? "black" : "green");
    Common.DrawArrow(250, 200, 250, 300, (status == 0) ? "black" : "green");
    Common.DrawArrow(400, 200, 400, 300, (status != 2 && status != 3) ? "black" : "green");
    Common.DrawArrow(250, 350, 250, 400, (status != 1) ? "black" : "red");
    Common.DrawArrow(400, 350, 400, 400, (status != 2) ? "black" : "red");

}

function MemoryAccess_Start(){
    if (isNaN(parseInt(getParameter("base"))) || isNaN(parseInt(getParameter("limit"))) || isNaN(parseInt(getParameter("address")))){
        alert('wrong type!');
        return;
    }
    var base = parseInt(getParameter("base"));
    var limit = parseInt(getParameter("limit"));
    var address = parseInt(getParameter("address"));
    
    if (address < base){
        //error base
        initMemoryAccess_Paint(1)
    }
    else if (address >= base + limit){
        //error limit
        initMemoryAccess_Paint(2)
    }
    else{
        //good
        initMemoryAccess_Paint(3)
    }

    Common.DrawText([address],75, 325, 10);
    Common.DrawText([base],225, 175, 10);
    Common.DrawText([limit + address],375, 175, 10);
}