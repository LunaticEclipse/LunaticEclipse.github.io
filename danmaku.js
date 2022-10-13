
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




//a toggle for options under development
var toggle = false;

//accessing the canvas in html
var canvas = document.getElementById("danmaku");
var ctx = canvas.getContext("2d");
var t = 0;


//bullet sprite
var shot = document.createElement('img');
shot.src = "img/Default_Shot.png";


//midpoint of canvas
var cx = canvas.width/2;
var cy = canvas.height/2;



//title of spell cards
var title = 0;



//bullet tracking
var bullets = [];
var count = 0; //bullet count
//a bullet object: {x, y, vx, vy}



//player coordinates
var x = 0;
var y = 0;

//player speed tracker
var dxL = 0;
var dxR = 0;
var dyU = 0;
var dyD = 0;
















//angle to aim at target
function aim(x, y, tx, ty){
	if(x > tx){
		return atan((ty-y)/(tx-x))+pi;
	} else {
		return atan((ty-y)/(tx-x));
	}
}


/*
BULLET ATTRIBUTES:
x, y, vx, vy	[self-explanatory]
color	 		string of hex-code ("#000000"), can also be integer (for some reasons?)

a 				acceleration
v2 				final speed of accelerating bullet
	[v1 DOES NOT EXIST]
flag 			to identify acc bullets (flag = "acc" leads to acceleration codes)
angle 			initial angle 	(stored for accelerating bullets)
v 				initial v 		(stored for accelerating bullets)

index 			index of bullet to be replaced
delay 			delay before replacing the bullet 
	[unit: 5ms  (e.g. delay=10 means a 50ms delay)]

spin 			[useless]
*/


//basic shot
function shoot1(x, y, v, angle, color){
	bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color};
	count += 1;
}
function shoot(x, y, v, angle, color){
	bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color};
	count += 1;
}

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


/////// CONSTRUCTION IN PROGRESS  //////////
function addPattern(index, delay, v1, a, v2, angle, color){
	
	bullets[count] = {index:index, delay:delay, vx:v1*cos(angle), vy:v1*sin(angle), v:v1, a:a, v2:v2, angle:angle, color:color}
	count += 1;
}
/////// CONSTRUCTION IN PROGRESS  //////////










function WASD(){

	var unfocusSpeed = 2;
	var focusSpeed = 0.7;

		window.addEventListener("keydown", function (event) {
	  if (event.defaultPrevented) {
	    return; // Do nothing if the event was already processed
	  }

	  switch (event.key) {
	    case "w":
	      dyU = unfocusSpeed;
	      break;
	    case "s":
	      dyD = unfocusSpeed;
	      break;
	    case "a":
	      dxL = unfocusSpeed;
	      break;
	    case "d":
	      dxR = unfocusSpeed;
	      break;
	    case "W":
	      dyU = focusSpeed;
	      break;
	    case "S":
	      dyD = focusSpeed;
	      break;
	    case "A":
	      dxL = focusSpeed;
	      break;
	    case "D":
	      dxR = focusSpeed;
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






function shotType(type){
	switch (type){
		case "smallred":
			return [0,0,12,12];
			break;
		case "smallorange":
			return [12,0,24,12];
			break;
		case "smallyellow":
			return [24,0,36,12];
			break;
		case "smallgreen":
			return [36,0,48,12];
			break;
		case "smallcyan":
			return [48,0,60,12];
			break;
		case "smallblue":
			return [60,0,72,12];
			break;
		case "smallpurple":
			return [72,0,84,12];
			break;
		case "smallgray":
			return [84,0,96,12];
			break;

	}
}




function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0)';
    }
    throw new Error('Bad Hex');
}








var lastCalledTime;
var fps;
function requestAnimFrame() {

  if(!lastCalledTime) {
     lastCalledTime = Date.now();
     fps = 0;
     return;
  }
  delta = (Date.now() - lastCalledTime)/1000;
  lastCalledTime = Date.now();
  fps = 1/delta;
}













function draw(){

	//refreshing screen
	ctx.clearRect(0,0,canvas.width,canvas.height);




	//drawing the background
	//ctx.fillStyle = "#303030"
	//ctx.fillRect(0,0,canvas.width,canvas.height);


	//drawing spell card title
	//OVERRIDE!! FPS DISPLAY
	requestAnimFrame();
	ctx.font = "30px Arial";
	ctx.fillStyle = "#FF0000";
	ctx.fillText(fps, 100, 50);







	//drawing the player
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, pi*2);		
	if(!toggle) ctx.fillStyle = "#0000FF";
	if(toggle) ctx.fillStyle = "#FFFFFF"
	ctx.fill();
	ctx.closePath();


	//player movement
	x -= dxL;
  	x += dxR;
  	y += dyD;
  	y -= dyU;










//BULLET DEPARTMENT




  	
  	for (let i = 0; i<count; i++){

		// rendering the glow of bright bullets
		if(bullets[i].x>-100 && bullets[i].x<canvas.width+100 && bullets[i].y>-100 && bullets[i].y<canvas.height+100){

			if (bullets[i].color.charAt(0) == '#'){


				//bullet is a monochromic circle
				//draw circle at (x,y)

				if (toggle){
					if(bullets[i].hit){
						//red bullets have brighter aura (30)

						var grd = ctx.createRadialGradient(bullets[i].x, bullets[i].y, 10, bullets[i].x, bullets[i].y, 30);
						grd.addColorStop(0, bullets[i].color);
						grd.addColorStop(1, hexToRgbA(bullets[i].color));
						ctx.fillStyle = grd;

						ctx.beginPath();
						ctx.arc(bullets[i].x, bullets[i].y, 30, 0, pi*2);
						ctx.fill();
						ctx.closePath();
					} else {
						//regular bullet aura (20)

						var grd = ctx.createRadialGradient(bullets[i].x, bullets[i].y, 10, bullets[i].x, bullets[i].y, 20);
						grd.addColorStop(0, bullets[i].color);
						grd.addColorStop(1, hexToRgbA(bullets[i].color));
						ctx.fillStyle = grd;

						ctx.beginPath();
						ctx.arc(bullets[i].x, bullets[i].y, 20, 0, pi*2);
						ctx.fill();
						ctx.closePath();
					}
				}

			}
		}

  	}



  	//handling bullets
	for (let i = 0; i<count; i++){


		//if bullets are in loading zone
		if(bullets[i].x>-100 && bullets[i].x<canvas.width+100 && bullets[i].y>-100 && bullets[i].y<canvas.height+100){
			
			if (bullets[i].color.charAt(0) == '#'){


				//bullet is a monochromic circle
				//draw circle at (x,y)

				if (toggle){
					if(bullets[i].hit)	ctx.fillStyle = "#FFD8D8";
					else 	ctx.fillStyle = "#FFFFFF";

					ctx.beginPath();
					ctx.arc(bullets[i].x, bullets[i].y, 10, 0, pi*2);
					ctx.fill();
					ctx.closePath();

				} else {
					ctx.beginPath();
					ctx.arc(bullets[i].x, bullets[i].y, 5, 0, pi*2);		
					ctx.fillStyle = bullets[i].color;
					ctx.fill();
					ctx.closePath();
				}



			} else {

				//bullet is of a special type, draw from Default_Shot.png
				
				var a = shotType(bullets[i].color);
				ctx.drawImage(shot,a[0],a[1],a[2]-a[0],a[3]-a[1],bullets[i].x,bullets[i].y, a[2]-a[0], a[3]-a[1]);
			}



			//moving the bullet
			bullets[i].x += bullets[i].vx;							
			bullets[i].y += bullets[i].vy;



			//hit detection 
			if(sq(bullets[i].x-x)+sq(bullets[i].y-y) <= 100){

				//change color to red (but only when it is standard monochromic bullet)
				
				if (bullets[i].color.charAt(0) == '#'){
					bullets[i].color = "#FF0000";
				}

				// flag bullet as hit
				bullets[i].hit = 1;
			}


			//handle shootAcc
			if(bullets[i].flag == "acc"){

				//slow down for negative a
				//speed up 	for positive a
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
