function setKeyToGame(){
   keyUp = ascii(document.getElementById("upKey").value);
   keyDown = ascii(document.getElementById("downKey").value);
   keyLeft = ascii(document.getElementById("leftKey").value);
   keyRight = ascii(document.getElementById("rightKey").value);
//    document.getElementById("upKey").value.reset();
   document.getElementById("upKey").value='';
   document.getElementById("downKey").value='';
   document.getElementById("leftKey").value='';
   document.getElementById("rightKey").value='';
   alert("exit set key")
}

function ascii (a) { 
    let keyCode = a.charCodeAt(0);
    if(keyCode>90){
        keyCode= keyCode - 32;
        a='';
    }    
    return keyCode; 
}

function setDefault(){
    keyUp = 38;
    keyDown = 40;
    keyLeft = 37;
    keyRight = 39;
}

function setNumberOfBalls(){
    food_remain = document.getElementById("numOfBalls").value;
    alert(food_remain);
    document.getElementById("numOfBalls").value ='';
}