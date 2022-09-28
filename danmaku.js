
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





//x is player x coord; same for y

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
var dxL = 0;
var dxR = 0;
var dyU = 0;
var dyD = 0;

//basic shot
function shoot1(x, y, v, angle, color){
	bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color};
	count += 1;
}

//vector shot
// !!NOT updated to acc shots
/*
function shoot2(x, y, vx, vy, color){
	bullets[count] = {x:x, y:y, vx:vx, vy:vy, spin:0, color:color};
	count += 1;
}
*/

//homing shot
function shoot3(x, y, tx, ty, v, color){
	if(x > tx){
		var angle = atan((ty-y)/(tx-x))+pi;
		bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color};
	} else {
		var angle = atan((ty-y)/(tx-x));
		bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color};
	}
	count += 1;
}

function shootHoming(x, y, tx, ty, v, color){
	if(x > tx){
		var angle = atan((ty-y)/(tx-x))+pi;
		bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color};
	} else {
		var angle = atan((ty-y)/(tx-x));
		bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color};
	}
	count += 1;
}

function shootRing(x, y, v, angle, member, r, color){
	var i = 0;
	while(i<member){
		var a = angle + i*2*pi/member;
		bullets[count] = {x:x+r*cos(a), y:y+r*sin(a), vx:v*cos(a), vy:v*sin(a), v:v, spin:0, angle:angle, color:color};
		count += 1;
		i += 1;
	}
}

function shootAcc(x, y, v1, a, v2, angle, color){
	bullets[count] = {flag:"acc", x:x, y:y, vx:v1*cos(angle), vy:v1*sin(angle), v:v1, a:a, v2:v2, angle:angle, color:color};
	count += 1;
}

function shootAccRing(x,y,v1,a,v2,angle,member,r,color){
	var i = 0;
	while(i<member){
		var ang = angle + i*2*pi/member;
		bullets[count] = {flag:"acc", x:x+r*cos(ang), y:y+r*sin(ang), vx:v1*cos(ang), vy:v1*sin(ang), v:v1, a:a, v2:v2, angle:ang, color:color};
		count += 1;
		i += 1;
	}
}


function WASD(){
		window.addEventListener("keydown", function (event) {
	  if (event.defaultPrevented) {
	    return; // Do nothing if the event was already processed
	  }

	  switch (event.key) {
	    case "w":
	      dyU = 2;
	      break;
	    case "s":
	      dyD = 2;
	      break;
	    case "a":
	      dxL = 2;
	      break;
	    case "d":
	      dxR = 2;
	      break;
	    case "W":
	      dyU = 1;
	      break;
	    case "S":
	      dyD = 1;
	      break;
	    case "A":
	      dxL = 1;
	      break;
	    case "D":
	      dxR = 1;
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
	  	case "shift":
	  		dxL = 0;
	 		dxR = 0;
			dyU = 0;
			dyD = 0;
	    case "w":
	      dyU = 0;
	      break;
	    case "s":
	      dyD = 0;
	      break;
	    case "a":
	      dxL = 0;
	      break;
	    case "d":
	      dxR = 0;
	      break;
	    case "W":
	      dyU = 0;
	      break;
	    case "S":
	      dyD = 0;
	      break;
	    case "A":
	      dxL = 0;
	      break;
	    case "D":
	      dxR = 0;
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

	x -= dxL;
  	x += dxR;
  	y += dyD;
  	y -= dyU;

	for (let i = 0; i<count; i++){
		if(bullets[i].x>-500 && bullets[i].x<canvas.width+500 && bullets[i].y>-500 && bullets[i].y<canvas.height+500){
			ctx.beginPath();
			ctx.arc(bullets[i].x, bullets[i].y, 5, 0, pi*2);		
			ctx.fillStyle = bullets[i].color;
			ctx.fill();
			ctx.closePath();

			bullets[i].x += bullets[i].vx;							
			bullets[i].y += bullets[i].vy;

			if(bullets[i].x == x || bullets[i].y == y){
				bullets[i].color = "#FF0000";
			}

			if(bullets[i].flag == "acc"){
				if(bullets[i].a<0 && bullets[i].v > bullets[i].v2){
					bullets[i].v += bullets[i].a;
					bullets[i].vx = bullets[i].v * cos(bullets[i].angle);
					bullets[i].vy = bullets[i].v * sin(bullets[i].angle);
				} else if(bullets[i].a>0 && bullets[i].v < bullets[i].v2){
					bullets[i].v += bullets[i].a;
					bullets[i].vx = bullets[i].v * cos(bullets[i].angle);
					bullets[i].vy = bullets[i].v * sin(bullets[i].angle);
				}
			}

		}
	}
}
