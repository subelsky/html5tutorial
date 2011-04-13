console.info("You have a working console");

var canvas = document.getElementById("main");
var context = canvas.getContext("2d");
context.fillStyle = "red";
context.fillRect(0,0,20,20);

context.font = "bold 24px sans-serif";
context.fillStyle = "blue";
context.fillText("HTML5",100,100);

var img = new Image();
img.src = "media/water.jpg";
img.onload = function() {
  context.drawImage(img,0,110);
};

var characters = new Image();
characters.src = "media/characters.gif";
characters.onload = function() {
  context.drawImage(characters,33,0,32,32,30,20,64,64);
};
