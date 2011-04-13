console.info("You have a working console")

var canvas = document.getElementById("main");
var context = canvas.getContext("2d");
context.fillStyle = "red";
context.fillRect(0,0,20,20);

context.font = "bold 24px sans-serif";
context.fillStyle = "blue";
context.fillText("HTML5",100,100);
