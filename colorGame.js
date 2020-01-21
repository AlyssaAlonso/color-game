let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll('.square');
let colorDisplay = document.querySelector('#colorDisplay');
let messageDisplay = document.querySelector('#message');
let h1 = document.querySelector('h1');
let restartButton = document.querySelector('#restart');
let difficultyButtons = document.querySelectorAll('.difficulty');

init();

function init() {
	setupButtons();
	setupSquares();
	restart();
}

function setupButtons() {
	//game difficulty buttons event listeners
	for (i = 0; i < difficultyButtons.length; i++) {
		difficultyButtons[i].addEventListener('click', function() {
			difficultyButtons[0].classList.remove('selected');
			difficultyButtons[1].classList.remove('selected');
			this.classList.add('selected');
			this.textContent === 'Easy' ? (numSquares = 3) : (numSquares = 6);
			restart();
		});
	}

	//restart button event listener
	restartButton.addEventListener('click', function() {
		restart();
	});
}

function setupSquares() {
	for (i = 0; i < squares.length; i++) {
		//adds click listeners to squares
		squares[i].addEventListener('click', function() {
			//grabs color of clicked squares
			let clickedColor = this.style.backgroundColor;
			//compares color to pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = 'Correct!';
				restartButton.textContent = 'Restart';
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = '#232323';
				messageDisplay.textContent = 'Try Again';
			}
		});
	}
}

function restart() {
	restartButton.textContent = 'New Colors';
	messageDisplay.textContent = '';
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	//change colors of squares
	for (i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = 'block';
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = 'none';
		}
	}

	h1.style.backgroundColor = 'steelblue';
}

function changeColors(color) {
	//loops through all squares
	for (let i = 0; i < squares.length; i++) {
		//changes each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	let arr = [];

	for (let i = 0; i < num; i++) {
		//gets random color and pushes it into arr
		arr.push(randomColor());
	}
	return arr;
}

function randomColor() {
	//picks a "red", "green, and "blue" from 0 - 255
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;
}
