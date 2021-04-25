var context;
var shape = new Object();
var board;
var score;
var failsLeft = 5;
var pac_color;
var start_time;
var time_elapsed;
var interval;
//food balls
var init_food_remain = 50;
var initfivePointFoorRemain=30;
var initfifteenPointFoodRemain= 15;
var initTwentyFivePintFoodRemain = 5;
var food_remain=50;
var fivePointFoorRemain=30;
var fifteenPointFoodRemain=15;
var TwentyFivePintFoodRemain=5;

var lifeBalls = 2;
var x_press = 0.15;
var y_press =1.85;
var eye_press_y;
var eye_press_x;
var keyUp = 38;
var keyDown = 40;
var keyLeft = 37;
var keyRight = 39;
//monster
var numberOfMonnsers=4;
var monsterInterval;
var monster1Location;
var monster2Location;
var monster3Location;
var monster4Location;
//size
var width = 15;
var hight = 10;
// var wallcrash;
// var monsterCrash;
// var boardWallsCrash;
// var specialPointCrash;

//MovingPoint
var movingPointLocation = new Array(3);
var movingPointInterval;

//timer
var timer=60;
//current user
var playingNow;
//last key press
var lastKey;

/*
0 = empty
1 = food
2= pacmen
3= 
4= wall
5= special food
10= monster
50=movingPoints
40= lifeBalls
*/
// const context = canvas.getContext("2d");
$(document).ready(function() {
	// context = canvas.getContext("2d");
	// Start();
	$('#Content').children().hide();
	$('#welcome').show();
	//context = displayWelcome();
});

window.addEventListener("keydown", function(e) {//disable keyboard scrolling
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

function displayWelcome(){
	$('#Content').children().hide();
	$('#welcome').show();
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	window.clearInterval(movingPointInterval);

}

function displayRegister(){
	$('#Content').children().hide();
	$('#Register').show();
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	window.clearInterval(movingPointInterval);
}

function displayLogin(){
	$('#Content').children().hide();
	$('#logIn').show();
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	window.clearInterval(movingPointInterval);
}

function displayConfig(){
	$('#Content').children().hide();
	$('#config').show();
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	window.clearInterval(movingPointInterval);
	var modal = document.getElementById("myModalConfig");
	var span = document.getElementsByClassName("close")[0];

	modal.style.display = "block";
	span.onclick = function() {
		modal.style.display = "none";
	}
	//close if click outside the modal
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
	//close id ESC press
	window.addEventListener('keyup', function(event) {
		// If  ESC key was pressed...
		if (event.keyCode == 27) {
			// try close your dialog
			modal.style.display = "none";
		}
	});
}

function displayAbout(){
	$('#Content').children().hide();
	$('#about').show();
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	window.clearInterval(movingPointInterval);
	var modal = document.getElementById("myModal");
	var span = document.getElementsByClassName("close")[1];

	modal.style.display = "block";
	span.onclick = function() {
		modal.style.display = "none";
	}
	//close if click outside the modal
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
	//close id ESC press
	window.addEventListener('keyup', function(event) {
		// If  ESC key was pressed...
		if (event.keyCode == 27) {
			// try close your dialog
			modal.style.display = "none";
		}
	});
}

function displayGamePage(){
	context = canvas.getContext("2d");
	$('#Content').children().hide();
	$('#gamePage').show();
	// window.clearInterval(interval);
	// window.clearInterval(monsterInterval);
	// window.clearInterval(movingPointInterval);
	// window.clearInterval(monsterInterval);
	earse();
	Start();
}

function LogIn(){

	let logInUserName = document.getElementById("logInUserName").value;
	let logInPass = document.getElementById("logInPass").value;
	let detailCheck = checkLogInDetails(logInUserName,logInPass);
	if(detailCheck){
		alert(logInUserName);
		playingNow = logInUserName;
		displayGamePage();
	}
	else{
		alert("userName Or Password Incorrect")
	}
}

function earse(){
	score = 0;
	failsLeft = 5;
	lifeBalls = 2;
	food_remain = init_food_remain;
	fivePointFoorRemain = food_remain*0.6;
	fifteenPointFoodRemain = food_remain*0.3;
	TwentyFivePintFoodRemain = food_remain*0.1;
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	window.clearInterval(movingPointInterval);

}

function Start() {
	food_remain = init_food_remain;
	fivePointFoorRemain = food_remain*0.6;
	fifteenPointFoodRemain = food_remain*0.3;
	TwentyFivePintFoodRemain = food_remain*0.1;
	if (failsLeft == 0){
		alert("you lost the game");
		alert("you have reached: "+ score +" score");
		earse();
	}

	board = new Array();
	//monster
	monster1Location = [0,0,0];
	monster2Location = [width-1,hight-1,0];
	monster3Location = [0,hight-1,0];
	monster4Location = [width-1,0,0];

	pac_color = "yellow";
	var cnt = width*10;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < width; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < hight; j++) {
			if (
				(i == 2 && j == 3) ||
				(i == 2 && j == 4) ||
				(i == 2 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i == 3 && j == 5) ||
				(i == 11 && j == 7) ||
				(i == 12 && j == 7) ||
				(i == 13 && j == 7) ||
				(i == 12 && j == 8) ||
				(i == 1 && j == 8) ||
				(i == 2 && j == 8) ||
				(i == 3 && j == 8) ||
				(i == 11 && j == 2) ||
				(i == 11 && j == 3) ||
				(i == 11 && j == 4) ||
				(i == 7 && j == 7) ||
				(i == 6 && j == 7) ||
				(i == 8 && j == 4) ||
				(i == 10 && j == 7)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					// board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					if(!((i==width-1 && j==hight-1) || (i==0 && j==0) || (i==0 && j==hight-1) || (i==width-1 && j==0))){
						shape.i = i;
						shape.j = j;
						pacman_remain--;
						board[i][j] = 2;
					}
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (fivePointFoorRemain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		fivePointFoorRemain--;
	}
	while (fifteenPointFoodRemain > 0) {//special food
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 15;
		fifteenPointFoodRemain--;
	}
	while (TwentyFivePintFoodRemain > 0) {//special food
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 25;
		TwentyFivePintFoodRemain--;
	}
	while (lifeBalls > 0) {
		var emptyCell = findRandomEmptyCell(board);//more life
		board[emptyCell[0]][emptyCell[1]] = 40;
		lifeBalls--;
	}
	var emptyCell = findRandomEmptyCell(board);//more time
	board[emptyCell[0]][emptyCell[1]] = 12;
	var emptyCell = findRandomEmptyCell(board);//more time
	board[emptyCell[0]][emptyCell[1]] = 12;
	//monster start locations
	if(numberOfMonnsers>0){
		board[monster1Location[0]][monster1Location[1]] = 10;
	}
	if(numberOfMonnsers>1){
		board[monster2Location[0]][monster2Location[1]] = 10;
	}
	if(numberOfMonnsers>2){
		board[monster3Location[0]][monster3Location[1]] = 10;
	}
	if(numberOfMonnsers>3){
		board[monster4Location[0]][monster4Location[1]] = 10;
	}
	//moving Points
	movingPointLocation = [4,4,0];
	board[movingPointLocation[0]][movingPointLocation[1]] = 50;
	//keys listener
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			lastKey = e.keyCode;
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	monsterInterval = setInterval(mostersLocationsUpdate,1000);
	interval = setInterval(UpdatePosition, 300);
	movingPointInterval = setInterval(movingPointRandomMove, 800);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (width) );
	var j = Math.floor(Math.random() * (hight) );
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (width) );
		j = Math.floor(Math.random() * (hight) );
	}
	return [i, j];
}

function GetKeyPressed() {
	// alert(keyUp);
	if (keysDown[keyUp]) { //up
		x_press =1.65 ;
		y_press = 3.35;
		return 1;
	}
	if (keysDown[keyDown]) {//down
		x_press = 0.7;
		y_press = 2.4;
		return 2;
	}
	if (keysDown[keyLeft]) {//left
		x_press = 1.10;
		y_press = 2.80;
		// eye_press_y = 13;
		// eye_press_x = 2;
		return 3;
	}
	if (keysDown[keyRight]) {//right
		x_press = 0.15;
		y_press =1.85;
		// eye_press_y = 13;
		// eye_press_x = 5;
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	numberOfBalls.value = init_food_remain;
	GameInitTIme.value = timer;
	fivePointBall.value = "red";
	fifteenPointBall.value = "pink";
	twentyFivePointBall.value = "black";
	monstersNum.value = numberOfMonnsers;


  if(timer!=null){
		lblRemain.value = timer-time_elapsed;	
	}
	currUser.value = playingNow;
	lifeRemain.value = failsLeft;	
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < hight; j++) {
			var center = new Object();
			center.x = i * 50 + 30;
			center.y = j * 50 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 20, x_press * Math.PI, y_press * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 13, 4, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 5) {//5 point cirle
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle black 1 point
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 15){//special 15 points
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle green 5 points
				context.fillStyle = "green"; //color
				context.fill();
			} else if (board[i][j] == 25){//special 25 points
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle green 5 points
				context.fillStyle = "#FF8C00"; //color
				context.fill();
			}else if (board[i][j] == 4) {//wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "#2F4F4F"; //color
				context.fill();
			} else if (board[i][j] == 10){//monster
				context.beginPath();
				const monster = document.getElementById('monster');
				context.drawImage(monster,center.x-20, center.y-20,40,40);
				// context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle res monsters
				// context.fillStyle = "red"; //color
				context.fill();
			}
			else if (board[i][j] == 50){//movingPoints
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle yellow 50 points
				context.fillStyle = "yellow"; //color
				context.fill();
			}
			else if (board[i][j] == 40){//life
				context.beginPath();
				const life = document.getElementById('life');
				context.drawImage(life,center.x-30, center.y-30,60,60);
				// context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				// context.fillStyle = "blue"; //color
				context.fill();
			}
			else if (board[i][j] == 12){//more time
				context.beginPath();
				const clock = document.getElementById('clock');
				context.drawImage(clock,center.x-20, center.y-20,40,40);
				// context.arc(center.x, center.y, 20, 0, 2 * Math.PI); // clock
				// context.fillStyle = "pint"; //color
				context.fill();
			}
		}
	}
}

function mostersLocationsUpdate(){
	if(numberOfMonnsers>0){
		updateMonsterLocaation(monster1Location);
	}
	if(numberOfMonnsers>1){
		updateMonsterLocaation(monster2Location);
	}
	if(numberOfMonnsers>2){
		updateMonsterLocaation(monster3Location);
	}
	if(numberOfMonnsers>3){
		updateMonsterLocaation(monster4Location);
	}
}

function updateMonsterLocaation(monsterLocation){
	var flag = true;
	if (monsterLocation[0]<width-1){
		var wallcrash = board[monsterLocation[0]+1][monsterLocation[1]] != 4;
		var monsterCrash = board[monsterLocation[0]+1][monsterLocation[1]] != 10;
		var specialPointCrash = board[monsterLocation[0]+1][monsterLocation[1]] != 50;
		var moreLife = board[monsterLocation[0]+1][monsterLocation[1]] != 40;
		if (monsterLocation[0]<shape.i && wallcrash && monsterCrash && specialPointCrash && moreLife){//one step to the right
			board[monsterLocation[0]][monsterLocation[1]] = monsterLocation[2];
			monsterLocation[0]+= 1;
			monsterLocation[2] = board[monsterLocation[0]][monsterLocation[1]];
			board[monsterLocation[0]][monsterLocation[1]] = 10;
			flag = false;
			if(monsterLocation[0] == shape.i && monsterLocation[1] == shape.j){
				monsterEatPacman();
			}
		}
	}
	if(flag && monsterLocation[1]<hight-1){
		var wallcrash = board[monsterLocation[0]][monsterLocation[1]+1] != 4;
		var monsterCrash = board[monsterLocation[0]][monsterLocation[1]+1] != 10;
		var specialPointCrash = board[monsterLocation[0]][monsterLocation[1]+1] != 50;//extra point
		var moreLife = board[monsterLocation[0]][monsterLocation[1]+1] != 40;//extra life
		if(monsterLocation[1]<shape.j && wallcrash && monsterCrash && specialPointCrash && moreLife){//one step to the down
			board[monsterLocation[0]][monsterLocation[1]] =  monsterLocation[2];
			monsterLocation[1]+= 1;
			monsterLocation[2] = board[monsterLocation[0]][monsterLocation[1]];
			board[monsterLocation[0]][monsterLocation[1]] = 10;
			flag = false;
			if(monsterLocation[0] == shape.i && monsterLocation[1] == shape.j){
				monsterEatPacman();
			}
		}
	}
	if(flag && monsterLocation[0]>0){
		var wallcrash = board[monsterLocation[0]-1][monsterLocation[1]] !=  4;
		var monsterCrash = board[monsterLocation[0]-1][monsterLocation[1]] !=  10;
		var specialPointCrash = board[monsterLocation[0]-1][monsterLocation[1]] !=  50;
		var moreLife = board[monsterLocation[0]-1][monsterLocation[1]] !=  40;

		if (monsterLocation[0]>shape.i && wallcrash && monsterCrash && specialPointCrash && moreLife){//one step left
			board[monsterLocation[0]][monsterLocation[1]] =  monsterLocation[2];
			monsterLocation[0]-= 1;
			monsterLocation[2] = board[monsterLocation[0]][monsterLocation[1]];
			board[monsterLocation[0]][monsterLocation[1]] = 10;
			flag = false;
			if(monsterLocation[0] == shape.i && monsterLocation[1] == shape.j){
				monsterEatPacman();
			}
		}
	}
	if(flag && monsterLocation[1]>0){
		wallcrash = board[monsterLocation[0]][monsterLocation[1]-1] !=  4;
		monsterCrash = board[monsterLocation[0]][monsterLocation[1]-1] !=  10;
		specialPointCrash = board[monsterLocation[0]][monsterLocation[1]-1] !=  50;
		moreLife = board[monsterLocation[0]][monsterLocation[1]-1] !=  40;
		if(monsterLocation[1]>shape.j && wallcrash && monsterCrash && specialPointCrash && moreLife){//one step to the up
			board[monsterLocation[0]][monsterLocation[1]] =  monsterLocation[2];
			monsterLocation[1]-= 1;
			monsterLocation[2] = board[monsterLocation[0]][monsterLocation[1]];
			board[monsterLocation[0]][monsterLocation[1]] = 10;
			flag = false;
			if(monsterLocation[0] == shape.i && monsterLocation[1] == shape.j){
				monsterEatPacman();
			}
		}
	}	
	if (flag){
		flag = false;
		movigObjectRandomMove(monsterLocation,10);
	}
	Draw();
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < (hight-1) && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < (width-1) && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 5) {//5 score
		score+=5;
	}
	if (board[shape.i][shape.j] == 15) {//15 points score
		score+=15;
	}
	if (board[shape.i][shape.j] == 25) {//25 points score
		score+=25;
	}
	if (board[shape.i][shape.j] == 10) {//monster
		x=5;
		monsterEatPacman();
		Draw();
		return;
	}
	if (board[shape.i][shape.j] ==50){//moving Point
		score+=50;
		window.clearInterval(movingPointInterval);
	}
	if (board[shape.i][shape.j] ==40){//life Point
		failsLeft+=1;
	}
	if (board[shape.i][shape.j] ==12){//more time
		timer+=12;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	// alert(timer);
	if(timer != null){
		if(time_elapsed >= timer){
			alert("game finished!");
		}
	}
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= 50) {
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		window.clearInterval(movingPointInterval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function monsterEatPacman(){
	if (failsLeft == 0){
		alert("you lost the game");
		alert("you have reached: "+ score +" score");
		earse();
		Start();
	}
	// board[monster1Location[0]][monster1Location[1]] = monster1Location[2];
	// monster1Location = [0,0,0];
	// monster2Location = [9,9,0];
	// monster3Location = [0,9,0];
	// monster4Location = [9,0,0];
	// window.clearInterval(interval);
	// window.clearInterval(monsterInterval);
	// window.clearInterval(movingPointInterval);
	// window.clearInterval(monsterInterval);
	// alert('enter monster eat func');
	failsLeft -= 1;
	score -= 10;
	board[shape.i][shape.j] = 0;
	keysDown[lastKey]=false;
	keysDown={};
	i=4;
	j=4;
	shape.i=i;
	shape.j=j;
	board[shape.i][shape.j] = 2;
	// alert(numberOfMonnsers);
	if(numberOfMonnsers>0){
		board[monster1Location[0]][monster1Location[1]] = 0;
		monster1Location = [0,0,0];
		board[monster1Location[0]][monster1Location[1]] = 10;
	}
	if(numberOfMonnsers>1){
		board[monster2Location[0]][monster2Location[1]] = 0;
		monster2Location = [width-1,hight-1,0];
		board[monster2Location[0]][monster2Location[1]] = 10;
	}
	if(numberOfMonnsers>2){
		board[monster3Location[0]][monster3Location[1]] =0;
		monster3Location = [0,hight-1,0];
		board[monster3Location[0]][monster3Location[1]] = 10;
	}
	if(numberOfMonnsers>3){
		board[monster4Location[0]][monster4Location[1]] = 0;
		monster4Location = [width-1,0,0];
		board[monster4Location[0]][monster4Location[1]] = 10;
	}

	// Draw();

}

function movingPointRandomMove(){
	movigObjectRandomMove(movingPointLocation,50);
}

function movigObjectRandomMove(object,symbol){//location, board number
	var x=5;
	var y=5;
	flag = true;
	while(flag){
		while(x==y || x==-y){
			y=5;
			x=5;
			while ((x != 0  && x!=1 && x!=-1)) {
				x = Math.floor(Math.random() *10)-5;
			}
			while ((y != 0  && y!=1 && y!=-1 )) {
				y = Math.floor(Math.random() *10)-5;
			}
		}
		if ((object[0] + x) < width && (object[1] +y) < hight){
			var monsterCrash = board[object[0]+x][object[1]+y] == 10 && symbol==50;
			var specialPointCrash = board[object[0]+x][object[1]+y] == 50 && symbol==10;
			var mostermonsterCreash = board[object[0]+x][object[1]+y] == 10 && symbol==10;
			var wallcrash = board[object[0]+x][object[1]+y] == 4;
			var packmanCrash = board[object[0]+x][object[1]+y] == 2;
			if(!monsterCrash && !specialPointCrash && !wallcrash && !packmanCrash && !mostermonsterCreash){
				
				board[object[0]][object[1]] = object[2];
				object[0] +=  x;
				object[1] +=  y;
				object[2] = board[object[0]][object[1]];
				board[object[0]][object[1]] = symbol;
				flag=false;
	
			}
		}
		x=5;
		y=5;	
	}	
}

