/*the author: Karolina Debowska
Assignment javascript
05/12/2018*/

/* I used copyright free pictures made by Citron Vert
https://www.deviantart.com/citron--vert/art/Little-test-of-animation-374620284*/

//functions

//---------------- functions that use images -------------

/*load images from the file then draw them, setting parameters of a position 
and choosing a relevant element of the array*/
function draw (context, x, y, i) { 
    //create an image object
    var img = new Image();
	// check all loaded before calling draw
    img.onload = function() {
		context.drawImage(img, x, y);
		console.log("draw function");
	}
	img.src = pictures[i];
}
//walk (motion)
function motion(){
    //while execution, stop other functions
    eating=false;
    lookInMotion=false;
    headInMotion=false;
    kicking=false;
    console.log("In motion");
    setTimeout(function() {
        requestId = requestAnimationFrame(motion);
		//if variable inMotion is false, the execution of the function is stopped
        if (inMotion){
            draw(context, x ,150, n);
            update();
        }
		else 
			stop();
 	}, 150);// render one frame every 150ms  
}
//walk (update)
function update(){
    if (n==10){
        n=1;//requesting first frame
        x-=70;//reducing translation (the location of a horse in the pictures isn't constant)    
    }
    else {
        n+=1; //requesting the next picture
        x-=1; //move to the left
    } 
    if (x<-490){//parameteres at the moment when horse is out of the canvas
        stop();
		//initialize the update functions' parametrs
        x=150;
        n=0;
		//update the current state of a function
        inMotion=false;
    }
}
function walk(){
	//remove the last picture of the last invoked function
  	clearCanvas();
	//set initial values 
	//start();
    if (!inMotion){
		//update the current state of a function
        inMotion=true;
        motion();
    }
}
//head (motion)
function headup(){
	//while execution, stop other functions 
	lookInMotion=false;
	eating=false; 
    inMotion=false; 
    //initialize the update functions' parametrs (walk)
    x=150;
    n=0;
    setTimeout(function() {
        requestId = requestAnimationFrame(headup);
        //if variable headInMotion is false, the execution of the function is stopped
		if (headInMotion){
			update1();
			draw(context, 150 ,150, h);
		}
		else 
			stop();
   	}, 250); // render one frame every 250ms  
}
//head (update)
function update1(){
    if (h==0)
        h=10; //the first frame 
    else 
        h+=1;
    if (h==14){//the last frame before animation stops
        stop();  
        headInMotion=false; //change the state of a function 
    }
    if (h>14){
        h=0;// set up the initial value
    }
}
//horse looks at the user
function head(){
	//remove the last picture of the last invoked function
	clearCanvas();
	if (!headInMotion){
		//update the current state of a function
		headInMotion=true;
		headup();
	}
}
//lookBehind (motion)
function look(){
    //while execution, stop other functions
	eating=false;
    inMotion=false;
    //initialize the update functions' parametrs (walk)
    x=150;
    n=0;
    setTimeout(function() {
        requestId = requestAnimationFrame(look);
        //if variable lookInMotion is false, the execution of the function is stopped
        if (lookInMotion){
      		update2();
            draw(context, 150 ,150, l);
     	}
		else 
			stop();
 	}, 250); // render one frame every 250ms
}
//lookBehind(update)
function update2(){
    if (l==0)
        l=10;//the first frame
    else 
        l+=1;
    if (l==19){//the last frame before animation stops
        stop();  
		//update the current state of a function
        lookInMotion=false;
    }
    if (l>19)
        l=0; //come back to the initial value
}
function lookBehind(){
	//remove the last picture of the last invoked function
   	clearCanvas();
    if (!lookInMotion){
		//update the curent state of a function
        lookInMotion=true;
        look();
    }
}

//-----------functions called by clicking on canvas-------
//motion of the other horse
function guestComing(){
	//this funtion can be invoked while other functions are executed
    setTimeout(function() {
        requestId = requestAnimationFrame(guestComing);
		if (guestInMotion){
			draw(context, x2 ,150, g);
			update3();
		}
		else 
			stop();
   	}, 150);// render one frame every 150ms   
}
function guestHeadUp(){
	//this funtion can be invoked while other functions are executed
   	setTimeout(function() {
        requestId = requestAnimationFrame(guestHeadUp);
		if (!guestInMotion){
			update1();
			draw(context, 699 ,150, h);
		}
		else 
			stop();
   	}, 250); // render one frame every 250ms
}
//guest(update)
function update3(){
  	if (g==10){
      	g=1;//requesting first frame
		x2-=70;//reducing translation (the location of a horse in the pictures isn't constant)
    }
    else{
        g+=1; //requesting next picture
        x2+=1;//move to the left
    } 
    if (g>19)
        g=0 // set the initial value
    if (x2<700){//the final position of a horse
        stop();
		//set the initial values
        x2=1000;
        g=0;
		//update the current state of a function
		guestInMotion=false;
        guestHeadUp();
        //the first horse will look behind only if it doesn't kick, walk or eat while guest is coming
		if (!inMotion && !kicking && !eating){
            //change the current state of the look function to call it
			lookInMotion=true;
			look();
		}
    }
}
function guest(evt){
	//access coordinates of a mouse
	var pos = getMouseXY(evt);
    //the function can't be called again while execution 
	if (pos.x>630 && !guestInMotion) {
        /*the first horse won't stop doing what it's doing when the guest comes
        (no clearCanvas,initial function)*/
		//update the current state of a function
		guestInMotion=true;
		guestComing();
		}
	else 
		stop();
}function eat(){
    //while execution, stop other functions
    headInMotion=false;
	lookInMotion=false;
    kicking=false;
    inMotion=false; 
    //initialize the update functions' parametrs (walk)
    x=150;
    n=0;
    setTimeout(function() {
        requestId = requestAnimationFrame(eat);
        //if variable eating is false, the execution of the function is stopped
        if (eating){
            draw(context,150 ,150, e);
            update4();
        }
		else 
			stop();
 	}, 500);// render one frame every 500ms
}
//feed (update)
function update4(){
    if (e==0){
        e=23;//requesting first frame    
    }
    else {
        e-=1; //next picture      
    } 
    if (e==21){//the execution of a function doesn't stop itself (infinite loop)
        e=23; //request first frame of animation
    }
}
function feed(evt){
    //clear canvas only if the horse is walking
	if (inMotion)
		clearCanvas();
	//accessing the position of a mouse
	var pos = getMouseXY(evt);
    //the function can't ba called again while execution
	if (pos.x>305 && pos.x<630 && !eating){
		//update the current state of a function
		eating=true;
		eat();
	}
	else 
		stop();
}
//kick (motion)
function kickIt(){
	//while execution, stop other functions
    lookInMotion=false;
    headInMotion=false;
	eating=false;
	inMotion=false;
    //initialize the update functions' parametrs (walk)
    x=150;
    n=0;
   	setTimeout(function() {
        requestId = requestAnimationFrame(kickIt);
        //if variable kicking is false, the execution of the function is stopped
        if (kicking){
            draw(context,150 ,150, k);
            update5();
        }
		else 
			stop();
  	}, 90);// render one frame every 400ms
}
//kick (update)
function update5(){
	if (k==0){
        k=4;//requesting first frame   
    }
    else{
        k+=1;
    } 
    if (k==8){// the last frame before animation stops
        stop();
		//update the current state of a function
        kicking=false;
    }
    if (k>8){
        k=0; // set the initial value
    }
}
function kick(evt){
	//accessing position of a mouse
  	var pos = getMouseXY(evt);
	//the function can't ba called again while execution
	if (pos.x<305 && !kicking){
		clearCanvas();
		//update the current state
		kicking=true;
		kickIt();
	}
	else 
		stop();
}
//---------------------other functions-------------------------

//clear canvas
function clearCanvas() {
    context.clearRect(0, 0, WIDTH, HEIGHT );
    console.log("clearCanvas")
}
//stop animation
function stop() {
    cancelAnimationFrame(requestId);
    console.log("stop function")
}
//get coordinates of a mouse
function getMouseXY(e) {
	/*get an object with properties such as the top left corner coordinates of the
    canvas and the width and height including border and padding*/
	var boundingRect = canvas.getBoundingClientRect();
	//the top left corner coordiantes of a canvas (x)
	var offsetX = boundingRect.left;
	//the top left corner coordiantes of a canvas (y)
	var offsetY = boundingRect.top;
	//the size of a border and padding (x)
	var w = (boundingRect.width-canvas.width)/2;
	//the size of a border and padding (y)
	var h = (boundingRect.height-canvas.height)/2;
	//the top left coordinates of a canvas including border and padding
	offsetX += w;
	offsetY += h;
	//coordinates of a mouse on canvas (rounded)
	var mx = Math.round(e.clientX-offsetX);
	var my = Math.round(e.clientY-offsetY);
	return {x: mx, y: my}; // return as an object
}

//---------function to initialise, initial and reset the program------------
function start(){
	//draw a white rectangle that covers the canvas
    clearCanvas();
	//the current state of functions
	kicking=false;
    headInMotion=false;
    lookInMotion=false;
    inMotion=false;
    eating=false;
	guestInMotion=false;
	//the update functions' variables are set to the initial values (a position of the picture on the canvas)
    x=150;
	x2=1000;
	//the update functions' variables are set to the initial values to access particular elements of the array
    l=0;
    h=0;
    g=0; 
    e=0;
	k=0;
    //come back to the initital state- the main picture
    initial();  
}
//the initial state of canvas
function initial(){
    draw(context, 150, 150, 0);
}

// main program body

// global variables 
var canvas = document.getElementById("my_canvas");
var context = canvas.getContext("2d");
//the size of a canvas
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var requestId;
//the update functions' variables
var x=150;
var x2=1000;
var n=0;
var g=0
var l=0;
var e=0;
var h=0;
var k=0;
//create the array of pictures
var pictures = [];
pictures[0]="images/frame_0_delay-0.1s.jpg";
pictures[1]="images/frame_1_delay-0.1s.jpg";
pictures[2]="images/frame_3_delay-0.1s.jpg";
pictures[3]="images/frame_5_delay-0.1s.jpg";
pictures[4]="images/frame_6_delay-0.1s.jpg";
pictures[5]="images/frame_7_delay-0.1s.jpg";
pictures[6]="images/frame_8_delay-0.1s.jpg";
pictures[7]="images/frame_9_delay-0.1s.jpg";
pictures[8]="images/frame_10_delay-0.1s.jpg";
pictures[9]="images/frame_11_delay-0.1s.jpg";
pictures[10]="images/frame_12_delay-0.1s.jpg";
pictures[11]="images/frame_16_delay-0.1s.jpg";
pictures[12]="images/frame_17_delay-0.1s.jpg";
pictures[13]="images/frame_18_delay-0.1s.jpg";
pictures[14]="images/frame_19_delay-0.1s.jpg";
pictures[15]="images/frame_20_delay-0.1s.jpg";
pictures[16]="images/frame_21_delay-0.1s.jpg";
pictures[17]="images/frame_22_delay-0.1s.jpg";
pictures[18]="images/frame_23_delay-0.1s.jpg";
pictures[19]="images/frame_24_delay-0.1s.jpg";
pictures[20]="images/frame_25_delay-0.1s.jpg";
pictures[21]="images/frame_26_delay-0.1s.jpg";
pictures[22]="images/food1.jpg";
pictures[23]="images/food2.jpg";
//the initial state of functions
var inMotion=false;
var headInMotion=false;
var lookInMotion=false;
var guestInMotion=false;
var kicking=false;
var eating=false;

//buttons
var clearButton = document.getElementById("clearButton");
console.log("Clear button" + clearButton, false)
clearButton.addEventListener("click", start);
var walkButton = document.getElementById("walkButton");
walkButton.addEventListener("click", walk, false);
var headupButton = document.getElementById("headupButton");
headupButton.addEventListener("click", head, false);
var lookButton = document.getElementById("lookButton");
lookButton.addEventListener("click", lookBehind, false);
//clickable space on the canvas
canvas.addEventListener('click', kick);
canvas.addEventListener('click', guest);
canvas.addEventListener('click', feed);

//execution
start();



