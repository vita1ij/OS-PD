var cpuBox, relocationBox, memoryBox, relocationRegisterBox;

function dynamicRelocation_Start(sender, args){
    dynamicRelocation_init();
}

function dynamicRelocation_init(){

    //init boxes
    cpuBox = new Common.Box(50, 150, 100, 200, ["CPU"], '#FFFFFF');
    relocationBox = new Common.Box(250, 150, 100, 200, ["relocation", "register"], '#FFFFFF');
    relocationRegisterBox = new Common.Box(255, 160, 90, 50, [], '#7777FF');
    memoryBox = new Common.Box(450, 150, 100, 200, ["memory"], '#FFFFFF');

    dynamicRelocationStart_Paint();

}

function dynamicRelocationStart_Paint(animCount, animTotal) {
    
    cpuBox.Draw();
    relocationBox.Draw();
    memoryBox.Draw();
    relocationRegisterBox.Draw();

    Common.DrawArrow(150, 250, 250, 250);
    Common.DrawText(["logical", "address"], 170, 250, 12);
    Common.DrawArrow(350, 250, 450, 250);
    Common.DrawText(["physical", "address"], 370, 250, 12);

    //draw 
    if (animCount && animTotal){
        
    }
}