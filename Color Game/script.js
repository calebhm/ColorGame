// FOCUS ON FUNCTIONAL DESIGN PATTERN

var numSquares = 6;
var colors = [];
var targetedColor;
var h1 = document.querySelector("h1");
var colorDisplay = document.getElementById("colorDisplay");
var resetButton = document.getElementById("reset");
var messageDisplay = document.querySelector("#message");
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");

init();

function init(){
	colorDisplay.textContent = targetedColor;

	resetButton.addEventListener("click", function(){
		reset();
	});
	
	setUpModeButtons();
	setUpSquares();
	reset();
}

function reset(){
	resetButton.textContent = "New Colors";
	colors = generateRandomColors(numSquares);
	targetedColor = targetColor();
	colorDisplay.textContent = targetedColor;
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "#232323";
	messageDisplay.textContent = "";
}

function generateRandomColors(num){
	// initialize temporary array
	var arr = [];
	for(var i = 0; i < num; i++){
		// get random color "num" times, push to array
		arr.push(randomColor());
	}
	//return array
	return arr;
}

function randomColor(){
	// set random number from 0 to 255 as vars r g and b
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	// return rgb() color string
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function targetColor(){
	// target a random index in the colors[] array
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function setUpModeButtons(){
	// add listeners to mode buttons
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			reset();
		});
	}
}

function setUpSquares(){
	// add listeners to squares
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			// get color of square and compare to targetedColor
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === targetedColor){
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
				messageDisplay.textContent = "Correct!";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function changeColors(color){
	// loop over squares and change them to targeted color
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}