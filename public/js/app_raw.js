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
  this.submit();
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

function createCanvasView() {
  var save_form, canvas, ctx

  function loadElements() {
    save_form = document.getElementById("form_doodle_submit");
    canvas = document.getElementById('canvas');
  }

  function bindEventListeners() {
    save_form.addEventListener("submit",saveImage,false);
    canvas.addEventListener("mousedown",startMoving,false);
    canvas.addEventListener("mouseup",stopMoving,false);
  }


  function setupCanvas() {
    loadElements();

    // context refers to a canvas' drawing context, AKA where all the drawing
    // methods and properties will be defined.

    if (canvas.getContext){
      ctx = canvas.getContext('2d');
      // Retrieve the 2d canvas context.
    } else {
      console.log("no canvas context found");
      alert("no canvas context found");
    }
    bindEventListeners();
  }




  function startMoving(event){
    ctx.beginPath();

    //sets our initial position on the canvas && registers where the drawing is going to begin.
    var position = adjustPosition(event);

    //moves the "pen" to the paper
    ctx.moveTo(position.x,position.y);

    // run draw each time the mousemove event fires
    canvas.addEventListener("mousemove",draw,false);
  }


  function draw(event){
    var position = adjustPosition(event)

    ctx.lineTo(position.x,position.y);
    ctx.moveTo(position.x,position.y);
    ctx.stroke();
    ctx.strokeStyle = colorSelector();
  }


  //removes the mousemove listener on mouseup. now you can move the mouse freely without the draw function being called
  function stopMoving(){
    canvas.removeEventListener("mousemove",draw,false);
    ctx.closePath();
  }

  function colorSelector(){
    var color = document.getElementById("color_id");
    return color.value;
  }

  function adjustPosition(position) {
    return {
      x: position.x - canvas.offsetLeft,
      y: position.y - canvas.offsetTop
    }
  }


  setupCanvas();
}

// page will not be manipulated unless document is "ready". also called a
// "ready event". encapsulates all the jquery.
$( document ).ready(function() {
  createCanvasView();
});

