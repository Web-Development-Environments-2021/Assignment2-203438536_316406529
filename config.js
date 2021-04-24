function setKeyToGame(){
   keyUp = ascii(document.getElementById("upKey").value);
   keyDown = ascii(document.getElementById("downKey").value);
   keyLeft = ascii(document.getElementById("leftKey").value);
   keyRight = ascii(document.getElementById("rightKey").value);
   //reset the input fields values
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
    // food_remain = document.getElementById("numOfBalls").value;
    food_remain = Number($('#numOfBalls').val());
    // alert(food_remain);
    document.getElementById("numOfBalls").value ='';
}

function setTimer(){
    alert("enter timer set")
    // alert(val(document.getElementById="timerInput"));
    // alert($('#timerInput').val());
    timer = Number($('#timerInput').val());
    // alert(timer);
    // alert(typeof timer);
    document.getElementById('timerInput').value="";
}

function setBallsColor(){
    let highBall = $('#color25Ball').val();
    let medBall = $('#color15Ball').val();
    let lowBall = $('#color5Ball').val();
    alert(highBall);
}

function setNumOfmonsters(){
    var numMonster = document.getElementById("numMonster").value;
    numberOfMonnsers = numMonster;
}