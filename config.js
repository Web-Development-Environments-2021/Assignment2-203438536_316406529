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
    init_food_remain = Number($('#numOfBalls').val());
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
    // let highBall = $('#color25Ball').val();
    // let medBall = $('#color15Ball').val();
    // let lowBall = $('#color5Ball').val();
    color5p = $('#color5Ball').val();
    color15p = $('#color15Ball').val();
    color25p =  $('#color25Ball').val();
    alert(highBall);
}

function setNumOfmonsters(){
    var numMonster = document.getElementById("numMonster").value;
    numberOfMonnsers = numMonster;
}

function keyUpSet(){
    addEventListener('keydown',function up(e) {
        // $('lblKeyUpID').value = e.keyCode;
        // lblKeyUpIn.value = e.keyCode;
        keyUp = e.keyCode;
        lblKeyUpIn.value = String.fromCharCode(e.keyCode);
        removeEventListener('keydown',up);
    })
    
}
function keyDownSet(){
    addEventListener('keydown',function down(e) {
        // $('lblKeyUpID').value = e.keyCode;
        // lblKeyUpIn.value = e.keyCode;
        if(e.keyCode == keyUp){
            alert("choose another");
        }
        else{
            keyDown = e.keyCode;
            lblKeyDownIn.value = String.fromCharCode(e.keyCode);
        }
        removeEventListener('keydown',down);
    })

}

function keyRightSet(){
    addEventListener('keydown', function right(e) {
        // $('lblKeyUpID').value = e.keyCode;
        // lblKeyUpIn.value = e.keyCode;
        if(e.keyCode == keyUp && e.keyCode == keyDown){
            alert("choose another");
        }
        else{
            keyRight = e.keyCode;
            lblKeyRightIn.value = String.fromCharCode(e.keyCode);
        }
        removeEventListener('keydown', right);
    })
}
function keyLeftSet(){
    addEventListener('keydown',function left(e) {
        // $('lblKeyUpID').value = e.keyCode;
        // lblKeyUpIn.value = e.keyCode;
        if(e.keyCode == keyUp || e.keyCode == keyDown || e.keyCode == keyRight){
            alert("choose another");
        }
        else{
            keyLeft = e.keyCode;
            lblKeyLeftIn.value = String.fromCharCode(e.keyCode);
        }
        removeEventListener('keydown', left);
    })
}
