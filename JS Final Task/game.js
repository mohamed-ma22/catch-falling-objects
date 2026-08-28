// Game variables
let score = 0;
let lives = 3;
let basketPosition = 50;
let fallingObjects = [];
let gameRunning = true;
let lastObjectTime = 0;

const gameArea = document.getElementById("game-area");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const gameOverScreen = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

// Move the basket
document.addEventListener("keydown", function (event) {
	if (!gameRunning) {
		return;
	}

	if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
		basketPosition -= 5;
	}

	if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
		basketPosition += 5;
	}

	basketPosition = Math.max(7, Math.min(93, basketPosition));
	basket.style.left = basketPosition + "%";
});

// Create a falling object
function createObject() {
	const object = document.createElement("div");
	object.className = "falling-object";
	object.style.left = Math.random() * 92 + "%";
	object.style.top = "0px";
	object.style.backgroundColor = getRandomColor();
	gameArea.appendChild(object);

	fallingObjects.push({
		element: object,
		top: 0,
		speed: 2 + score * 0.1
	});
}

function getRandomColor() {
	const colors = ["#ef476f", "#118ab2", "#06d6a0", "#f77f00"];
	return colors[Math.floor(Math.random() * colors.length)];
}

// Check collision and move objects
function moveObjects(timestamp) {
	if (!gameRunning) {
		return;
	}

	if (timestamp - lastObjectTime > 900) {
		createObject();
		lastObjectTime = timestamp;
	}

	const basketRectangle = basket.getBoundingClientRect();

	fallingObjects.forEach(function (object, index) {
		object.top += object.speed;
		object.element.style.top = object.top + "px";

		const objectRectangle = object.element.getBoundingClientRect();
		const touchingBasket = objectRectangle.bottom >= basketRectangle.top &&
			objectRectangle.left < basketRectangle.right &&
			objectRectangle.right > basketRectangle.left &&
			objectRectangle.top < basketRectangle.bottom;

		if (touchingBasket) {
			score++;
			updateScore();
			removeObject(index);
		} else if (objectRectangle.top > gameArea.getBoundingClientRect().bottom) {
			lives--;
			updateLives();
			removeObject(index);

			if (lives === 0) {
				gameOver();
			}
		}
	});

	requestAnimationFrame(moveObjects);
}

function removeObject(index) {
	fallingObjects[index].element.remove();
	fallingObjects.splice(index, 1);
}

function updateScore() {
	scoreDisplay.textContent = score;
}

function updateLives() {
	livesDisplay.textContent = lives;
}

// Game over
function gameOver() {
	gameRunning = false;
	finalScoreDisplay.textContent = score;
	gameOverScreen.hidden = false;
}

// Restart the game
function restartGame() {
	fallingObjects.forEach(function (object) {
		object.element.remove();
	});

	fallingObjects = [];
	score = 0;
	lives = 3;
	basketPosition = 50;
	gameRunning = true;
	lastObjectTime = performance.now();

	basket.style.left = basketPosition + "%";
	updateScore();
	updateLives();
	gameOverScreen.hidden = true;
	requestAnimationFrame(moveObjects);
}

restartButton.addEventListener("click", restartGame);
updateScore();
updateLives();
requestAnimationFrame(moveObjects);
