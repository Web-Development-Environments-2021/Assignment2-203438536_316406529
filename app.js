var context;
var shape = new Object();
var board;
var score;
var failsLeft;
var pac_color;
var start_time;
var time_elapsed;
var interval;

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


//MovingPoint
var movingPointLocation = new Array(3);
var movingPointInterval;

//timer
var timer;
//current user
var playingNow;

/*
0 = empty
1 = food
2= pacmen
3= 
4= wall
5= special food
10= monster
50=movingPoints
*/
// const context = canvas.getContext("2d");
$(document).ready(function() {
	// context = canvas.getContext("2d");
	// Start();
	$('#Content').children().hide();
	$('#welcome').show();
	//context = displayWelcome();
});

function displayWelcome(){
	$('#Content').children().hide();
	$('#welcome').show();

}

function displayRegister(){
	$('#Content').children().hide();
	$('#Register').show();
}


function displayLogin(){
	$('#Content').children().hide();
	$('#logIn').show();
}

function displayConfig(){
	$('#Content').children().hide();
	$('#config').show();
}

function displayAbout(){
	$('#Content').children().hide();
	$('#about').show();
}

function displayGamePage(){
	context = canvas.getContext("2d");
	$('#Content').children().hide();
	$('#gamePage').show();
	earse();
	Start();
}

function submitRegister(){
	alert("enter submit func")
	let userName = document.getElementById("userName").value;
	let pass = document.getElementById("password").value;
	let fullName = document.getElementById("fullName").value;
	let email = document.getElementById("email").value;
	let birthDay = document.getElementById("birthDay").value;
	let usernameCheck = checkIfUsernameExist(userName);
	if(usernameCheck){
		alert("UserName already exist in system, please choose log-in or register.");
		displayWelcome();
		return;
	}
	let passCheck = passwordValidation(pass);
	if(!passCheck){
		alert("invalid password, make sure your password contains minimun 6 char, letters and numbers");
		return;
	}
	let fullnameCheck = fullNameValidation(fullNameValidation);
	let emailCheck = emailValidation(email);

	if(passCheck & fullnameCheck  & emailCheck  & !usernameCheck){
		usersDB.push({
			username: userName,
			password: pass,
			fullName: fullName,
			email: email,
			birthDate: birthDay
		});
		alert("User " + userName + " successfuly sign in!");
		displayGamePage();
	}
	else{
		alert("Error!");
	}
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

function fullNameValidation(fullName){
	alert("enter fullname func");

	// var matches = fullName.match(/\d+/g);
	if (/\d/.test(fullName)) {
   	 	alert('fullName contains number');	
		return false;
	}
	else{
		return true;
	}
}

function passwordValidation(pass){
	alert("enter pass func");
	var passForm =  /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
	alert("pass 2");
	if(pass.match(passForm)){
		alert("valid pass");
		return true;
	}
	alert("Please enter a valid password.\n(At least 6 characters, at least one digit and one letter)");
	return false;
}

function emailValidation(email){
	alert("enter email func");
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if(emailReg.test(email)){
		return true;
	}
	else{
		alert("Please enter valid email.");
		return false;
	}
}
function earse(){
	score = 0;
	failsLeft = 5;

}

function Start() {
	if (failsLeft == 0){
		alert("you lost the game");
		alert("you have reached: "+ score +" score");
		earse();
	}

	board = new Array();
	//monster
	monster1Location = [0,0,0];
	monster2Location = [9,9,0];
	monster3Location = [0,9,0];
	monster4Location = [9,0,0];

	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var special_food_remain = 2;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	while (special_food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if (board[emptyCell[0]][emptyCell[1]] != 1 ||board[emptyCell[0]][emptyCell[1]] != 2 || board[emptyCell[0]][emptyCell[1]] != 4){
			board[emptyCell[0]][emptyCell[1]] = 5;
			special_food_remain--;
		}

	}

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
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
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

  if(timer!=null){
		lblRemain.value = timer-time_elapsed;	
	}
	currUser.value = playingNow;
	lifeRemain.value = failsLeft;
	movingPointRandomMove();

  
	// movingPointRandomMove();

  
	// updateMonsterLocaation(monster1Location);
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
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
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 5){//special 5 points
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "green"; //color
				context.fill();
			} else if (board[i][j] == 10){//monster
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();
			}
			else if (board[i][j] == 50){//movingPoints
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "yellow"; //color
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
	// if(monsterLocation[0]==shape.i){//wanna go down/up
	// 	if(board[monsterLocation[0]+1][monsterLocation[1]] != 4){//go right

	// 	}
	// 	else{//go left

	// 	}
	// }
	var flag = true;
	if (flag && monsterLocation[0]<shape.i && board[monsterLocation[0]+1][monsterLocation[1]] != 4 && monsterLocation[0]<9 && board[monsterLocation[0]+1][monsterLocation[1]] != 10){//one step to the right
		if(monsterLocation[0]+1 == shape.i && monsterLocation[1] == shape.j){
			flag = false;
			monsterEatPacman();
			Start();
			return;
		}
		board[monsterLocation[0]][monsterLocation[1]] = monsterLocation[2];
		monsterLocation[0]+= 1;
		monsterLocation[2] = board[monsterLocation[0]][monsterLocation[1]];
		board[monsterLocation[0]][monsterLocation[1]] = 10;
	}
	else if(flag && monsterLocation[1]<shape.j && board[monsterLocation[0]][monsterLocation[1]+1] != 4 && monsterLocation[1]<9 && board[monsterLocation[0]][monsterLocation[1]+1] != 10){//one step to the down
		if(monsterLocation[0] == shape.i && monsterLocation[1]+1 == shape.j){
			flag = false;
			monsterEatPacman();
			Start();
			return;
		}
		board[monsterLocation[0]][monsterLocation[1]] =  monsterLocation[2];
		monsterLocation[1]+= 1;
		monsterLocation[2] = board[monsterLocation[0]][monsterLocation[1]];
		board[monsterLocation[0]][monsterLocation[1]] = 10;

	}
	else if (flag && monsterLocation[0]>shape.i && board[monsterLocation[0]-1][monsterLocation[1]] !=  4 && monsterLocation[0]>0 && board[monsterLocation[0]-1][monsterLocation[1]] !=  10){//one step left
		if(monsterLocation[0]-1 == shape.i && monsterLocation[1] == shape.j){
			flag = false;
			monsterEatPacman();
			Start();
			return;
		}
		board[monsterLocation[0]][monsterLocation[1]] =  monsterLocation[2];
		monsterLocation[0]-= 1;
		monsterLocation[2] = board[monsterLocation[0]][monsterLocation[1]];
		board[monsterLocation[0]][monsterLocation[1]] = 10;

	}
	else if(flag && monsterLocation[1]>shape.j && board[monsterLocation[0]][monsterLocation[1]-1] !=  4 && monsterLocation[1]>0 && board[monsterLocation[0]][monsterLocation[1]-1] !=  10){//one step to the up
		if(monsterLocation[0] == shape.i && monsterLocation[1]-1 == shape.j){
			flag = false;
			monsterEatPacman();
			Start();
			return;
		}
		board[monsterLocation[0]][monsterLocation[1]] =  monsterLocation[2];
		monsterLocation[1]-= 1;
		monsterLocation[2] = board[monsterLocation[0]][monsterLocation[1]];
		board[monsterLocation[0]][monsterLocation[1]] = 10;
	}
	else if (flag){
		flag = false;
		movingPointRandomMove(monsterLocation,10);
	}

	
	

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
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {//regular score
		score++;
	}
	if (board[shape.i][shape.j] == 5) {//5 points score
		score+=5;
	}
	if (board[shape.i][shape.j] == 10) {//monster
		monsterEatPacman();
		Start();
		return;
	}
	if (board[shape.i][shape.j] ==50){//moving Point
		score+=50;
		window.clearInterval(movingPointInterval);
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
	if (score == 50) {
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		window.clearInterval(movingPointInterval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function monsterEatPacman(){
	// if (failsLeft == 0){
	// 	alert("you lost the game");
	// 	alert("you have reached: "+ score +" score");
	// 	Start();
	// }
	// monster1Location = [0,0,0];
	// monster2Location = [9,9,0];
	// monster3Location = [0,9,0];
	// monster4Location = [9,0,0];
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	window.clearInterval(movingPointInterval);
	failsLeft-=1;
	score-=10;
	window.clearInterval(monsterInterval);
}

function movingPointRandomMove(){
	movigObjectRandomMove(movingPointLocation,50);
}

function movigObjectRandomMove(object,symbol){//location, board number
	var x=5;
	var y=5;
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
	if(board[object[0]+x][object[1]+y] != 4 && (9 > object[0]+x > 0) &&  (9 > object[1]+y > 0)){

		if (object[2] != 2 && object[2] != 10 && object[2] != 50){
			board[object[0]][object[1]] = object[2];
			object[0] +=  x;
			object[1] +=  y;
			object[2] = board[object[0]][object[1]];
			board[object[0]][object[1]] = symbol;
		}
	}
	
}