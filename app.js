var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

$(document).ready(function() {
	const context = canvas.getContext("2d");
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
	$('#Content').children().hide();
	$('#gamePage').show();
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

function Start() {
	// displayWelcome();
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
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
	interval = setInterval(UpdatePosition, 100);
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
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
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
			}
		}
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
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
