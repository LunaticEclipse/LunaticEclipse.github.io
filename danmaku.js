

//NEED A CANVAS WITH id "screen"
//NEED A CANVAS WITH id "screen"
//NEED A CANVAS WITH id "screen"
//NEED A CANVAS WITH id "screen"
//NEED A CANVAS WITH id "screen"
//NEED A CANVAS WITH id "screen"

//NEED mathFunctions.js
//NEED mathFunctions.js
//NEED mathFunctions.js
//NEED mathFunctions.js
//NEED mathFunctions.js
//NEED mathFunctions.js

//NEED TO SCRIPT A FUNCTION pattern()
//NEED TO SCRIPT A FUNCTION pattern()
//NEED TO SCRIPT A FUNCTION pattern()
//NEED TO SCRIPT A FUNCTION pattern()
//NEED TO SCRIPT A FUNCTION pattern()




var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
var t = 0;

var cx = canvas.width/2;
var cy = canvas.height/2;

var bullets = [];
var count = 0; //bullet count
//a bullet object: {x, y, vx, vy}


function shoot1(x, y, v, angle, color){
	bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), color:color};
	count += 1;
}

function shoot2(x, y, vx, vy, color){
	bullets[count] = {x:x, y:y, vx:vx, vy:vy, color:color};
	count += 1;
}


function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);	//refresh screen



	for (let i = 0; i<count; i++){
		ctx.beginPath();
		ctx.arc(bullets[i].x, bullets[i].y, 5, 0, pi*2);		//draw the ball at (x, y)
		ctx.fillStyle = bullets[i].color;
		ctx.fill();
		ctx.closePath();

		bullets[i].x += bullets[i].vx;							//move the ball
		bullets[i].y += bullets[i].vy;
	}
}
