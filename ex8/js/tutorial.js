var canvas = document.getElementById("main");
var context = canvas.getContext("2d");

var characters = new Image();
characters.src = "media/characters.gif";

var ws = new WebSocket("ws://exp.subelsky.com:8011");

ws.onopen = function() {
  console.info("socket opened");
};

ws.onclose = function() {
  console.info("socket closed");
};

ws.onerror = function(a,b) {
  console.error(a,b);
};

characters.onload = function() {
  $(window).keyup(move);
  draw();

  ws.onmessage = handleMessage;
};

var height = $(canvas).height();
var width = $(canvas).width();

var x = 0;
var y = 0;

function handleMessage(event) {
  var msg = JSON.parse(event.data);
  console.info(msg);
}

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

  ws.send(JSON.stringify({ name: name, x: x, y: y, type: "move" }));
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
