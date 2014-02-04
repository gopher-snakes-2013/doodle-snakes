 <canvas id="miniCanvas" width="500" height="500"></canvas>
//above goes in the index.erb file



function getPosition(event){
	// console.log(event);
	var x = event.x; //event has a key x&y we can access
	var y = event.y; 
	x -= jsCanvas.offsetLeft;  //offsetLeft returns the # of pixels of the upper left hand corner of the current element to the upperleftcorner of the offsetParent node.
	y -= jsCanvas.offsetTop;
	//reason for above two lines of code is that there are 2 separate sets of coords. one for the canvas, the other for the window itself.	
	draw(x,y);
}

function draw(x,y){
		var jsContext = jsCanvas.getContext("2d");
		jsContext.fillRect(x,y,3,3); 
}

/////////////////////////////////////////////////////////////////

var jsCanvas = document.getElementById("miniCanvas");
//canvas = button element upon which the event "mousedown" occurs.
//then the func getPosition is run. 
//wtf is false?

jsCanvas.addEventListener("mousemove", newDraw, false);
var jsContext = jsCanvas.getContext("2d");

function newDraw(event){
	console.log(event);
	var x = event.x; 
	var y = event.y; 
	x -= jsCanvas.offsetLeft;
	y -= jsCanvas.offsetTop;

	draw(x,y);

	// jsContext.beginPath();  <-- potentially unnecessary
	// jsContext.moveTo(x,y); <-- mouse position
	// jsContext.lineTo(x+1,y); <-- creates line from mouse position to said position's x coord + 1
	// jsContext.stroke(200); <-- actually makes the line black

}

//overwrites the old canvas with a blank canvas
// function resetCanvas{
// 	var jsCanvas = document.getElementById("miniCanvas");
// 	jsCanvas.width = jsCanvas.width;
// }

