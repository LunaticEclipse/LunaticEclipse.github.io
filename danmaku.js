
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

//tracking addPattern
var queue = [];
var countQ = 0;




//player coordinates
var x = 0;
var y = 0;

//player speed tracker
var dxL = 0;
var dxR = 0;
var dyU = 0;
var dyD = 0;
var fast = true;

var playerColor = "#c0c0c0"

var unfocusSpeed = 3;
var focusSpeed = 1;
var playerSpeed = unfocusSpeed;



const bulletSize = 10;
const bulletSizeL = 20;
const bulletSizeS = 7;











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
size			"large" = 20;	"small" = 5;	otherwise = 10
(see the const bulletSize)

x, y, vx, vy	[self-explanatory]
color	 		string of hex-code ("#000000"), can also be integer (for some reasons?)

a 				acceleration
v2 				final speed of accelerating bullet
	[v1 DOES NOT EXIST]
flag 			to identify acc bullets (flag = "acc" leads to acceleration codes)
angle 			initial angle 	(stored for accelerating bullets)
v 				initial v 		(stored for accelerating bullets)

hit 			whether a bullet has hit the player (1 or NaN)
negative		make bullet black-core

index 			index of bullet to be replaced
delay 			delay before replacing the bullet 
	[unit: 5ms  (e.g. delay=10 means a 50ms delay)]

spin 			[useless]
*/


//basic shot
function shoot1(x, y, v, angle, color){
	bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color, omega:0};
	count += 1;
}
function shoot(x, y, v, angle, color){
	bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color, omega:0};
	count += 1;
}

//homing shot
function shoot3(x, y, tx, ty, v, color){
	if(x > tx){
		var angle = atan((ty-y)/(tx-x))+pi;
		bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color, omega:0};
	} else {
		var angle = atan((ty-y)/(tx-x));
		bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color, omega:0};
	}
	count += 1;
}

function shootHoming(x, y, tx, ty, v, color){
	if(x > tx){
		var angle = atan((ty-y)/(tx-x))+pi;
		bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color, omega:0};
	} else {
		var angle = atan((ty-y)/(tx-x));
		bullets[count] = {x:x, y:y, vx:v*cos(angle), vy:v*sin(angle), v:v, spin:0, angle:angle, color:color, omega:0};
	}
	count += 1;
}

function shootRing(x, y, v, angle, member, r, color){
	var i = 0;
	while(i<member){
		var a = angle + i*2*pi/member;
		bullets[count] = {x:x+r*cos(a), y:y+r*sin(a), vx:v*cos(a), vy:v*sin(a), v:v, spin:0, angle:a, color:color, omega:0};
		count += 1;
		i += 1;
	}
}

function shootAcc(x, y, v1, a, v2, angle, color){
	bullets[count] = {flag:"acc", x:x, y:y, vx:v1*cos(angle), vy:v1*sin(angle), v:v1, a:a, v2:v2, angle:angle, color:color, omega:0};
	count += 1;
}

function shootAccRing(x,y,v1,a,v2,angle,member,r,color){
	var i = 0;
	while(i<member){
		var ang = angle + i*2*pi/member;
		bullets[count] = {flag:"acc", x:x+r*cos(ang), y:y+r*sin(ang), vx:v1*cos(ang), vy:v1*sin(ang), v:v1, a:a, v2:v2, angle:ang, color:color, omega:0};
		count += 1;
		i += 1;
	}
}



function addPattern(index, delay, v1, a, v2, angle, omega, color){
	queue[countQ] = {index:index, delay:delay, v:v1, a:a, v2:v2, angle:angle, color:color, omega:omega}
	countQ += 1;
}

//function addSpin(index, delay, omega){
	//queue[countQ] = {index:index, delay:delay, omega:omega}
	//countQ += 1;
//}





function draw(){

	//refreshing screen
	ctx.clearRect(0,0,canvas.width,canvas.height);





	//drawing spell card title
	//OVERRIDE!! FPS DISPLAY
	requestAnimFrame();
	ctx.font = "30px Arial";
	ctx.fillStyle = "#FF0000";
	ctx.fillText(fps, 100, 100)
	







	




	//player movement
	if(x>=5) x -= dxL*playerSpeed;
  	if(x<=canvas.width-5) x += dxR*playerSpeed;
  	if(y<=canvas.height-5) y += dyD*playerSpeed;
  	if(y>=5) y -= dyU*playerSpeed;










//BULLET DEPARTMENT


// handle addPattern
	for(let i = 0; i<countQ; i++){

		console.log(queue[i].omega)
		if(queue[i].delay == 0){

			//ensure the addPattern is never activated again
			queue[i].delay = -1
			

			//updating the bullet's attribute to the new ones
			bullets[queue[i].index].flag = "acc";
			if(queue[i].angle == "aim"){
				bullets[queue[i].index].angle = aim(bullets[queue[i].index].x,bullets[queue[i].index].y,x,y);
			} else if(queue[i].angle != "same"){
				bullets[queue[i].index].angle = queue[i].angle;
			}
			bullets[queue[i].index].v = queue[i].v;
			bullets[queue[i].index].a = queue[i].a;
			bullets[queue[i].index].v2 = queue[i].v2;


			//handling spin

			bullets[queue[i].index].omega = queue[i].omega;


			// handling color change (collided bullets stay red)
			if(bullets[queue[i].index].hit != 1){
				bullets[queue[i].index].color = queue[i].color;
			}

			
			//updating vx, vy to new angle
			bullets[queue[i].index].vx = bullets[queue[i].index].v*cos(bullets[queue[i].index].angle);
			bullets[queue[i].index].vy = bullets[queue[i].index].v*sin(bullets[queue[i].index].angle);


			

		} else if(queue[i].delay > 0){
			queue[i].delay--;
		}

	}



  	


// handle aura
  	for (let i = 0; i<count; i++){
  		let r = bulletSize;
  		if(bullets[i].size == "large"){
  			r = bulletSizeL;
  		} else if(bullets[i].size == "small"){
  			r = bulletSizeS;
  		}


		// rendering the glow of bright bullets
		if(bullets[i].x>-100 && bullets[i].x<canvas.width+100 && bullets[i].y>-200 && bullets[i].y<canvas.height+100){

			if (bullets[i].color.charAt(0) == '#'){


				//bullet is a monochromic circle
				//draw circle at (x,y)

				if (toggle){
					if(bullets[i].hit){
						//red bullets have brighter aura (30)

						var grd = ctx.createRadialGradient(bullets[i].x, bullets[i].y, r, bullets[i].x, bullets[i].y, 3*r);
						grd.addColorStop(0, bullets[i].color);
						grd.addColorStop(1, hexToRgbA(bullets[i].color));
						ctx.fillStyle = grd;

						ctx.beginPath();
						ctx.arc(bullets[i].x, bullets[i].y, 3*r, 0, pi*2);
						ctx.fill();
						ctx.closePath();
					} else {
						//regular bullet aura (20)

						var grd = ctx.createRadialGradient(bullets[i].x, bullets[i].y, r, bullets[i].x, bullets[i].y, 2*r);
						grd.addColorStop(0, bullets[i].color);
						grd.addColorStop(1, hexToRgbA(bullets[i].color));
						ctx.fillStyle = grd;

						ctx.beginPath();
						ctx.arc(bullets[i].x, bullets[i].y, 2*r, 0, pi*2);
						ctx.fill();
						ctx.closePath();
					}
				}

			}
		}

  	}



  	//drawing the player
  	//it is drawn here so that it is above aura
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, pi*2);
	if(!toggle){
		ctx.fillStyle = "#0000FF";
	} else {
		ctx.fillStyle = playerColor;
	} 
	ctx.fill();
	ctx.closePath();



  	//handling bullets
	for (let i = 0; i<count; i++){
		let r = bulletSize;
  		if(bullets[i].size == "large"){
  			r = bulletSizeL;
  		} else if(bullets[i].size == "small"){
  			r = bulletSizeS;
  		}

		//if bullets are in loading zone
		if(bullets[i].x>-100 && bullets[i].x<canvas.width+100 && bullets[i].y>-200 && bullets[i].y<canvas.height+100){
			
			if (bullets[i].color.charAt(0) == '#'){


				//bullet is a monochromic circle
				//draw circle at (x,y)

				if (toggle){
					if(bullets[i].hit)	ctx.fillStyle = "#FFD8D8";
					else if(bullets[i].negative) 	ctx.fillStyle = "#000000";
					else ctx.fillStyle = "#FFFFFF"

					ctx.beginPath();
					ctx.arc(bullets[i].x, bullets[i].y, r, 0, pi*2);
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
			bullets[i].angle += bullets[i].omega;
			bullets[i].vx = bullets[i].v * cos(bullets[i].angle)
			bullets[i].vy = bullets[i].v * sin(bullets[i].angle)
			bullets[i].x += bullets[i].vx;							
			bullets[i].y += bullets[i].vy;





			//hit detection 
			let hitbox = 0;
			if(r == bulletSizeS)	hitbox = r-2;
			else if (r == bulletSize)	hitbox = r/2;
			else hitbox = r-5;
			if(sq(bullets[i].x-x)+sq(bullets[i].y-y) <= hitbox*hitbox){

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








function WASD(){



//KEY DOWN

		window.addEventListener("keydown", function (event) {
	  if (event.defaultPrevented) {
	    return; // Do nothing if the event was already processed
	  }


	  if(fast){
		  switch (event.key) {
		  	case "z":
		  		fast = false;
		  		playerColor = "#ffd700"
		  		playerSpeed = focusSpeed;
		  		break;
		    case "ArrowUp":
		      if(dxL == 1){
		      	dxL = 1/sqrt(2)
		      	dyU = 1/sqrt(2)
		      } else if (dxR == 1){
		      	dxR = 1/sqrt(2)
		      	dyU = 1/sqrt(2)
		      } else if (dyU == 0){
		      	dyU = 1
		      }
		      break;
		    case "ArrowDown":
		      if(dxL == 1){
		      	dxL = 1/sqrt(2)
		      	dyD = 1/sqrt(2)
		      } else if (dxR == 1){
		      	dxR = 1/sqrt(2)
		      	dyD = 1/sqrt(2)
		      } else if (dyD == 0){
		      	dyD = 1
		      }
		      break;
		    case "ArrowLeft":
		      if(dyU == 1){
		      	dxL = 1/sqrt(2)
		      	dyU = 1/sqrt(2)
		      } else if (dyD == 1){
		      	dxL = 1/sqrt(2)
		      	dyD = 1/sqrt(2)
		      } else if (dxL == 0){
		      	dxL = 1
		      }
		      break;
		    case "ArrowRight":
		      if(dyU == 1){
		      	dxR = 1/sqrt(2)
		      	dyU = 1/sqrt(2)
		      } else if (dyD == 1){
		      	dxR = 1/sqrt(2)
		      	dyD = 1/sqrt(2)
		      } else if (dxR == 0){
		      	dxR = 1
		      }
		      break;
		    default:
		      return; // Quit when this doesn't handle the key event.
		  }
		} else {
			switch (event.key) {
				case "z":
					fast = true;
					playerColor = "#c0c0c0"
					playerSpeed = unfocusSpeed;
					break;
			    case "ArrowUp":
			      if(dxL == 1){
			      	dxL = 1/sqrt(2)
			      	dyU = 1/sqrt(2)
			      } else if (dxR == 1){
			      	dxR = 1/sqrt(2)
			      	dyU = 1/sqrt(2)
			      } else if (dyU == 0){
			      	dyU = 1
			      }
			      break;
			    case "ArrowDown":
			      if(dxL == 1){
			      	dxL = 1/sqrt(2)
			      	dyD = 1/sqrt(2)
			      } else if (dxR == 1){
			      	dxR = 1/sqrt(2)
			      	dyD = 1/sqrt(2)
			      } else if (dyD == 0){
			      	dyD = 1
			      }
			      break;
			    case "ArrowLeft":
			      if(dyU == 1){
			      	dxL = 1/sqrt(2)
			      	dyU = 1/sqrt(2)
			      } else if (dyD == 1){
			      	dxL = 1/sqrt(2)
			      	dyD = 1/sqrt(2)
			      } else if (dxL == 0){
			      	dxL = 1
			      }
			      break;
			    case "ArrowRight":
			      if(dyU == 1){
			      	dxR = 1/sqrt(2)
			      	dyU = 1/sqrt(2)
			      } else if (dyD == 1){
			      	dxR = 1/sqrt(2)
			      	dyD = 1/sqrt(2)
			      } else if (dxR == 0){
			      	dxR = 1
			      }
			      break;
			    default:
			      return; // Quit when this doesn't handle the key event.
		  }
		}

	  // Cancel the default action to avoid it being handled twice
	  event.preventDefault();
		
		}, true);
		// the last option dispatches the event to the listener first,
		// then dispatches event to window





//KEY UP
		window.addEventListener("keyup", function (event) {
	  if (event.defaultPrevented) {
	    return; 
	  }

	  switch (event.key) {
	    case "ArrowUp":
	      if(dxL > 0){
	      	dxL = 1
	      } 
	      if(dxR > 0){
	      	dxR = 1
	      }
	      dyU = 0;
	      break;
	    case "ArrowDown":
	      if(dxL > 0){
	      	dxL = 1
	      } 
	      if(dxR > 0){
	      	dxR = 1
	      }
	      dyD = 0;
	      break;
	    case "ArrowLeft":
	      if(dyU > 0){
	      	dyU = 1
	      } 
	      if(dyD > 0){
	      	dyD = 1
	      }
	      dxL = 0;
	      break;
	    case "ArrowRight":
	      if(dyU > 0){
	      	dyU = 1
	      } 
	      if(dyD > 0){
	      	dyD = 1
	      }
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
		case "redscale":
			return [0,209,17,224];
			break;
		case "orangescale":
			return [18,209,35,224];
			break;
		case "yellowscale":
			return [36,209,53,224];
			break;
		case "greenscale":
			return [54,209,71,224];
			break;
		case "cyanscale":
			return [72,209,89,224];
			break;
		case "bluescale":
			return [90,209,107,224];
			break;
		case "purplescale":
			return [108,209,125,224];
			break;
		case "grayscale":
			return [126,209,143,224];
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


