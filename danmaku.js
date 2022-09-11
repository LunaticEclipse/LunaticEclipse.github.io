
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




//accessing the canvas in html
var canvas = document.getElementById("danmaku");
var ctx = canvas.getContext("2d");
var t = 0;

//midpoint of canvas
var cx = canvas.width/2;
var cy = canvas.height/2;

//bullet tracking
var bullets = [];
var count = 0; //bullet count
//a bullet object: {x, y, vx, vy}

//player speed tracker
var dx = 0;
var dy = 0;

function shoot1(x, y, v, angle, color){
	bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), color:color};
	count += 1;
}

function shoot2(x, y, vx, vy, color){
	bullets[count] = {x:x, y:y, vx:vx, vy:vy, color:color};
	count += 1;
}





function WASD(){
		window.addEventListener("keydown", function (event) {
	  if (event.defaultPrevented) {
	    return; // Do nothing if the event was already processed
	  }


	  switch (event.key) {
	    case "ArrowDown":
	      dy = 2;
	      break;
	    case "ArrowUp":
	      dy = -2;
	      break;
	    case "ArrowLeft":
	      dx = -2;
	      break;
	    case "ArrowRight":
	      dx = 2;
	      break;
	    default:
	      return; // Quit when this doesn't handle the key event.
	  }

	  // Cancel the default action to avoid it being handled twice
	  event.preventDefault();
		
		}, true);
		// the last option dispatches the event to the listener first,
		// then dispatches event to window



		window.addEventListener("keyup", function (event) {
	  if (event.defaultPrevented) {
	    return; 
	  }

	  switch (event.key) {
	    case "ArrowDown":
	      dy = 0;
	      break;
	    case "ArrowUp":
	      dy = 0;
	      break;
	    case "ArrowLeft":
	      dx = 0;
	      break;
	    case "ArrowRight":
	      dx = 0;
	      break;
	    default:
	      return; // Quit when this doesn't handle the key event.
	  }

	  // Cancel the default action to avoid it being handled twice
	  event.preventDefault();
		
		}, true);



	}





function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);	//refresh screen

	ctx.beginPath();
	ctx.arc(x, y, 5, 0, pi*2);		//draw the ball at (x, y)
	ctx.fillStyle = "#0000FF";
	ctx.fill();
	ctx.closePath();

	x += dx;
	y += dy;

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