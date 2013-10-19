function colorSelector(){
  color = document.getElementById("color_id");
  console.log(color.value);
}

var saveImage = function(e){
  //prevent the actual form from submitting
  e.preventDefault();

  var canvas = document.getElementById('canvas');
  console.log("what");

  //turn image into URL for doodle_data
  var dataURL = canvas.toDataURL();
  var input = document.getElementsByName("doodle_data")[0];
  input.value = dataURL;
  console.log(input);

  //run the submit that the we blocked initially
  // this.submit();
  $.ajax({
      url: '/save',
      type: 'POST',
      data: $(this).serialize()
  })
  .done(function(response,a,b,c){
      created_doodle = document.createElement("img");
      created_doodle.src = dataURL;
      created_doodle.height = canvas.height;
      created_doodle.width = canvas.width;
      document.body.appendChild(created_doodle);
      canvas.remove();
  })
  .fail(function(){
    console.log("you fucked up");
  });


};

var loadImage = function(){
  var input = document.getElementsByName("doodle_data")[0];
  var data = input.value;
  var saved_doodle = document.createElement("img");
  saved_doodle.src = data;
  saved_doodle.height = "500";
  saved_doodle.width = "800";
  document.body.appendChild(saved_doodle);
}

//page will not be manipulated unless document is "ready". also called a "ready event". encapsulates all the jquery.
$( document ).ready(function() {


  //listen for posting
  var save_form = document.getElementById("form_doodle_submit");
  save_form.addEventListener("submit",saveImage,false);


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
  ctx.beginPath();


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

  //from our initialized position on the canvas,
  //draw a line to the x,y coords of a mousemove event. then move the "pen" to that spot.
  //stroke is just so that we dont make an invisible line

  ctx.lineTo(x,y);
  ctx.moveTo(x,y);
  ctx.stroke();
  ctx.strokeStyle = color.value;


}

//wait for the drag to stop, run stopMoving
canvas.addEventListener("mouseup",stopMoving,false);

//removes the mousemove listener on mouseup. now you can move the mouse freely without the draw function being called
function stopMoving(){
  canvas.removeEventListener("mousemove",draw,false);
  ctx.closePath();
}



});








