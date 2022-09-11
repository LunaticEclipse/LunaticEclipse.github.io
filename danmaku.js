

//NEED A CANVAS WITH id "danmaku"
//NEED A CANVAS WITH id "danmaku"
//NEED A CANVAS WITH id "danmaku"
//NEED A CANVAS WITH id "danmaku"
//NEED A CANVAS WITH id "danmaku"
//NEED A CANVAS WITH id "danmaku"

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




var canvas = document.getElementById("danmaku");
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

	ctx.beginPath();
	ctx.arc(x, y, 5, 0, pi*2);		//draw the ball at (x, y)
	ctx.fillStyle = "#0000FF";
	ctx.fill();
	ctx.closePath();

	for (let i = 0; i<count; i++){
		ctx.beginPath();
		ctx.arc(bullets[i].x, bullets[i].y, 5, 0, pi*2);		
		ctx.fillStyle = bullets[i].color;
		ctx.fill();
		ctx.closePath();

		bullets[i].x += bullets[i].vx;							
		bullets[i].y += bullets[i].vy;
	}
}
