var canvas = document.getElementById("main");
var context = canvas.getContext("2d");

var characters = new Image();
characters.src = "media/characters.gif";

characters.onload = function() {
  $(window).keyup(move);
};

var height = $(canvas).height();
var width = $(canvas).width();

var x = Math.round(Math.random(800) * 1000);
var y = Math.round(Math.random(800) * 1000);
draw();

function move(event) {
  switch (event.which) {
    case 38:
      if (y > 0) { y -= 1; }
      break;
    case 40:
      if (y < height) { y += 1; }
      break;
    case 37:
      if (x > 0) { x -= 1; }
      break;
    case 39:
      if (x < width) { x += 1; }
      break;
    default:
      break;
  }

  draw();
}

function draw() {
  context.clearRect(0,0,width,height);
  context.drawImage(characters,33,0,32,32,x,y,32,32);
}

var nameEl = $('#username');
var name = localStorage.getItem('username');

nameEl.change(function() { 
  name = nameEl.val();
  localStorage.setItem('username',name);
});

if (name !== "null") {
  nameEl.val(name);
}

var ws = new WebSocket("ws://localhost:8080");
ws.onmessage = handleMessage;

function handleMessage(event) {
  console.info(event.data);
}