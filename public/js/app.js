
  $( document ).ready(function() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext){
      var ctx = canvas.getContext('2d');
    } else {
      console.log("no canvas context found");
      alert("no canvas context found");
    }

    $( "#canvas" )

      .mouseup(function(event) {
      console.log("scribe stop");
      $("#canvas").unbind('mousemove');
    })

      .mousedown(function(event) {
      console.log("scribe start");

      ctx.moveTo(event.pageX,event.pageY);
      //on mouse move
            $("#canvas").mousemove(function(event) {
              ctx.lineTo(event.pageX,event.pageY);
              ctx.stroke();
              ctx.moveTo(event.pageX,event.pageY);
              console.log("moving...");
            });

    });


  });

  var save = function(){
    console.log("saving...");
    var dataURL = canvas.toDataURL();
    var imageData = canvas.getImageData();
    return imageData;
  };

  var load = function(data){
    console.log("loading...");
    var IMG = document.createElement('img');
    IMG.src = data;
    IMG.width = canvas.width;
    IMG.height = canvas.height;
    document.body.appendChild(IMG);

  };

  var grab =  function() {
    load(save());
  }
