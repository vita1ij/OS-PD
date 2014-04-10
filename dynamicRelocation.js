var cpuBox, relocationBox, memoryBox, relocationRegisterBox;
var intervalId, animCount, animTotal; 

function dynamicRelocation_Start(sender, args){
    if (isNaN(parseInt(getParameter("reloc"))) || isNaN(getParameter("logic"))) {
        alert('wrong type!');
        return;
    }
    document.getElementById("submitButton").disabled = true;
    dynamicRelocation_init();
    animCount = 60;
    animTotal = 460;
    intervalId = setInterval(function(){dynamicRelocationStart_Paint()},10);
}

function dynamicRelocation_init(){

    //init boxes
    cpuBox = new Common.Box(50, 150, 100, 200, ["CPU"], '#FFFFFF');
    relocationBox = new Common.Box(250, 150, 100, 200, ["relocation", "register"], '#FFFFFF');
    relocationRegisterBox = new Common.Box(255, 160, 90, 50, [], '#7777FF');
    memoryBox = new Common.Box(450, 150, 100, 200, ["memory"], 'yellow');
}

function dynamicRelocationStart_Paint() {
    Common.ClearCanvas();
    cpuBox.Draw();
    relocationBox.Draw();
    memoryBox.Draw();
    relocationRegisterBox.Draw();
    Common.DrawText([getParameter("reloc")], 260, 190, 12);

    Common.DrawArrow(150, 250, 250, 250);
    Common.DrawText(["logical", "address"], 170, 250, 12);
    Common.DrawArrow(350, 250, 450, 250);
    Common.DrawText(["physical", "address"], 370, 250, 12);

    Common.DrawText([(animCount < 260) ? getParameter("logic") : parseInt(getParameter("logic")) + parseInt(getParameter("reloc"))], animCount, 270, 12, (animCount > 260) ? "#FF0000" : null);
    animCount++;
    if (animCount === animTotal){
        clearInterval(intervalId);
        document.getElementById("submitButton").disabled = false;
    }
    /*
    if (animCount && animTotal && animCount <= animTotal){
        
        if (animCount != animTotal) {
            setTimeout(dynamicRelocationStart_Paint(animCount + 1, animTotal), 10000);
        }
    }
    */
}