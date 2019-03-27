let snake = [
	{x: 150, y: 150},
	{x: 120, y: 150},
	{x: 90, y: 150}
	{x: 30, y: 150}
]
var tail
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var dx = 1
var dy = 0
var scl = canvas.width/20
var foodSpotX = scl*Math.floor(Math.random()*20)
var foodSpotY = scl*Math.floor(Math.random()*20)
var points = 0
var score = document.getElementById('score')

window.addEventListener('keydown', function (e) {
	var key = e.keyCode

	if (key == 37 && dx !== 1 && !sameFrame) {dx = -1; dy = 0; sameFrame = true}
	if (key == 38 && dy !== 1 && !sameFrame) {dy = -1; dx = 0; sameFrame = true}
	if (key == 39 && dx !== -1 && !sameFrame) {dx = 1; dy = 0; sameFrame = true}
	if (key == 40 && dy !== -1 && !sameFrame) {dy = 1; dx = 0; sameFrame = true}
})

function newPos(){
	for (i = snake.length-1; i>0; i--){
		snake[i].x = snake[i-1].x
		snake[i].y = snake[i-1].y
	}

	snake[0].x += dx*scl
	snake[0].y += dy*scl

	if(snake[0].x == food.x && snake[0].y == food.y){
		points++
		score.innerHTML = points
	 	tail = {x: 0, y: 0}
		tail.x += snake[snake.length-1].x
		tail.y += snake[snake.length-1].y

		snake.push(tail)
		food.newSpot()
	}

	if(snake[0].x > canvas.width-scl || snake[0].x < 0 || snake[0].y > canvas.height-scl || snake[0].y < 0){
		lost()
	}

	for(i=2; i<snake.length; i++){
			
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			lost()
		}
	}
}

function drawSnake(){
	snake.forEach(drawSnakePart)
}

var food = function(){

	food.newSpot = function(){
		foodSpotX = scl*Math.floor(Math.random()*20)
		foodSpotY = scl*Math.floor(Math.random()*20)
	}

	food.x = foodSpotX
	food.y = foodSpotY

	drawFood()
}

function drawFood(){
	ctx.fillStyle = 'red'
	ctx.fillRect(food.x, food.y, scl, scl)
	ctx.strokeStyle = 'black'
	ctx.strokeRect(food.x, food.y, scl, scl)
}

function drawSnakePart(snakePart){
	ctx.fillStyle = 'green'
	ctx.strokeStyle = 'black'
	ctx.fillRect(snakePart.x, snakePart.y, scl, scl)
	ctx.strokeRect(snakePart.x, snakePart.y, scl, scl)
}

function lost(){
	points = 0
	score.innerHTML = points
	snake = [
		{x: 150, y: 150},
		{x: 120, y: 150},
		{x: 90, y: 150}
	]
	dx = 1
	dy = 0
	foodSpotX = scl*Math.floor(Math.random()*20)
	foodSpotY = scl*Math.floor(Math.random()*20)
	alert('Jogar novamente?')
}

function updateGameArea() {
	sameFrame = false
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	newPos()
	food()
	drawSnake()
}
setInterval(updateGameArea, 100)

	