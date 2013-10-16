//page will not be manipulated unless document is "ready". also called a "ready event". encapsulates all the jquery.
$( document ).ready(function() {
  var canvas = document.getElementById('canvas');
//context refers to a canvas' drawing context, AKA where all the drawing methods and properties will be defined.
if (canvas.getContext){
  var ctx = canvas.getContext('2d');
//if the canvas does have a context, set it to 2d. apparently 3d is a possible future feature or some shit.
} else {
  console.log("no canvas context found");
  alert("no canvas context found");
}


//on the mousedown event, begin the startMoving function.
canvas.addEventListener("mousedown",startMoving,false);

function startMoving(){
  //sets our initial position on the canvas && registers where the drawing is going to begin.
  var x = event.x; 
  var y = event.y; 
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  //moves the "pen" to the paper
  ctx.moveTo(x,y);

  //waits until the mousemove event occurs--then run draw
  canvas.addEventListener("mousemove",draw,false);
}


function draw(event){
  var x = event.x; 
  var y = event.y; 
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  //from our initialized position on the canvas, draw a line to the x,y coords of a mousemove event. then move the "pen" to that spot. stroke is just so that we dont make an invisible line
  ctx.lineTo(x,y);
  ctx.moveTo(x,y);
  ctx.stroke();
}

//wait for the drag to stop, run stopMoving
canvas.addEventListener("mouseup",stopMoving,false);

//removes the mousemove listener on mouseup. now you can move the mouse freely without the draw function being called
function stopMoving(){
  canvas.removeEventListener("mousemove",draw,false)
}

});


