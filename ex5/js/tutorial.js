var canvas = document.getElementById("main");
var context = canvas.getContext("2d");

var characters = new Image();
characters.src = "media/characters.gif";

characters.onload = function() {
  $(window).keyup(move);
};

var x, y;
x = y = 0;
var sizeAmt = 32;

var height = $(canvas).height();
var width = $(canvas).width();

function move(event) {
  switch (event.which) {
    case 38:
      if (y > 0) { y -= 10; }
      break;
    case 40:
      if (y < height) { y += 10; }
      break;
    case 37:
      if (x > 0) { x -= 10; }
      break;
    case 39:
      if (x < width) { x += 10; }
      break;
    default:
      break;
  }

  draw();
}

var sizeEl = $('#size');

sizeEl.change(function() { 
  sizeAmt = Number(sizeEl.val());
  draw();
});

function draw() {
  context.clearRect(0,0,width,height);
  context.drawImage(characters,33,0,32,32,x,y,sizeAmt,sizeAmt);
}
