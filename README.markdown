# HTML5: Beyond the Buzzwords

These are the solutions for the [HTML5 tutorial](http://en.oreilly.com/rails2011/public/schedule/detail/18321) I am teaching at RailsConf 2011.

# SETUP

1. Copy the directory named `start` from this project to a new location on your machine. This will form the basis for the game we are building
and includes all necessary dependencies.

2. In your project, examine the index.html file you copied from `start`. This skeleton is heavily stripped down from the [HTML5 Boilerplate project](http://html5boilerplate.com/). The [full template](https://github.com/paulirish/html5-boilerplate/blob/master/index.html) 
is a good way to learn the state of the art for HTML5 practices.

Note the doctype that starts this file. That's all you need to do to indicate to the browser that you want to use the latest, greatest version of HTML. 
The boilerplate also shows the use of new HTML5 semantic tags `<header>` and `<footer>`. You can use these instead of less semantic code such as `<div id="header"></div>`.

3. Open up the index.html file in your browser. Then activate your JavaScript console. You should see the message "You have a working console". If you don't see this message you should switch to Firefox or a Webkit-based browser.
You will have a hard time completing this tutorial without a working console.

That message was created by the file `js/tutorial.js`. I'll be using that file for all of our application code.

# EXERCISE ONE 
## Feature Detection

1. Examine `js/libs/modernizr`. This is the [Modernizr](http://www.modernizr.com/) library that performs browser feature detection and helps style new HTML5 semantic elements. Because you can't yet
rely on users having fully-capable browsers, feature detection is essential to providing useful error messages and fallbacks.

2. To activate Modernizr, add this line to the `<HEAD>` tag of index.html.

    <script src="js/libs/modernizr-1.7.js"></script>

Then add the class `no-js` to the `<HTML>` tag on the second line of the index.html file.

3. Open up index.html in your browser and inspect the `<HTML>` tag. Notice that `no-js` has been replaced by several CSS declarations that can be used to style fallback content, reveal error messages, etc.

4. Open up a JavaScript console and inspect the Modernizr object. To be able to complete all of the exercises in this tutorial, you'll need to see true values for all of these properties:

* Modernizr.canvas
* Modernizr.websockets
* Modernizr.audio
* Modernizr.geolocation
* Modernizr.localstorage

## Extra Credit

Using only CSS and HTML, use the `<HTML>` classes `touch` and `no-touch` to reveal a message to the user indicating whether or not they have a touch interface. If you have a mobile OS simulator installed (such as iOS Simulator) you can
test both messages.

# EXERCISE TWO 
## Basic Canvas Drawing

1. Add `<canvas id="main" width="400" height="400"></canvas>` to the body of your index.html file, just after the closing of the `<header>` tag.

2. To draw a rectangle in the canvas, add this code to js/tutorial.js:

    var canvas = document.getElementById("main");
    var context = canvas.getContext("2d");
    context.fillRect(0,0,20,20);

All drawing operations happen on the canvas context, not the canvas itself. Right now "2d" is the only available context, but the HTML5 specification says "A future version of this specification will probably define a 3d context."

3. Open index.html in your browser. You should see a black rectangle!

4. Change the `fillRect` call to `strokeRect` and reload your browser. Now the rectangle is not filled-in.

5. Set the context's `fillStyle` property to a CSS color like "red", then reload the page to see a red rectangle.

    context.fillStyle = "red";

6. To draw text, add lines like this to `tutorial.js` and reload.

    context.font = "bold 24px sans-serif";
    context.fillStyle = "blue";
    context.fillText("HTML5",100,100);

## Extra Credit

Try filling your rectangle with a gradient. You'll need to create a gradient object as explained in [Dive Into HTML5](http://diveintohtml5.org/canvas.html#gradients), then set your fillStyle to that gradient.

# EXERCISE THREE
## Canvas Image Manipulation

1. Copy the file `media/water.jpg` from the tutorial project to your project's `media` directory. (This image is [Creative Commons-licensed](http://www.flickr.com/photos/50183640@N05/5616041841/))

2. Draw this image using the canvas by adding these lines to your `tutorial.js` file:

    var img = new Image();
    img.src = "media/water.jpg";
    img.onload = function() {
      context.drawImage(img,0,110);
    };

3. Reload your browser to see the image.

4. Now add two additional parameters, a destination width and height, after the original 3 parameters:

      context.drawImage(img,0,110,200,100);

5. Reload the browser and observe the image scaled to a different size.

6. Copy the sprite file we'll be using for our simple game, `media/characters.jpg` to the `media` folder of your project. (I got this CC-licensed file by David E. Gervais from the [TomeTik](http://pousse.rapiere.free.fr/tome/) project)

7. Use the 9 argument version of drawImage to slice out one character from the characters file and project it onto the canvas:

    drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);

   The 9 arguments are explained in this image:

   ![drawImage arguments](http://images.whatwg.org/drawImage.png)

Each sprite is 32 pixels wide and 32 pixels high.  So if you want to slice out the 2nd character in the top row, with the red hood, you would start with these parameters:

* sx = 33
* sy = 0
* sw = 32
* sh = 32

Choose dx, dy, dw, and dh to your taste, then reload the browser. Consult the solution in `ex3` if you get confused.

# EXERCISE FOUR
## Basic Animation

1. Copy `js/libs/jquery-1.5.2.js` to the `js/libs` directory in your project. We'll be using jQuery to bind keyboard events and to perform other tasks.

2. Add a `<script>` tag to the bottom of your index.html file, before the `tutorial.js` file is loaded, to load the jQuery library:

    <script src="js/libs/jquery-1.5.2.js"></script>

3. Comment out most of the drawing code we had been working with so the page starts clean.  The only working code in your `tutorial.js` should look like this:

    var canvas = document.getElementById("main");
    var context = canvas.getContext("2d");

    var characters = new Image();
    characters.src = "media/characters.gif";

4. Initialize two variables, `x` and `y`, to zero. We'll use these to keep track of the user's current position.

5. Initialize variables to store the height and width of the canvas. Later we'll be changing the size of the canvas dynamically so it makes sense to not hard code these values.

     var height = $(canvas).height();
     var width = $(canvas).width();

5. Setup another onload function for the characters object. When the characters image has loaded, we want to bind keyboard events to a function we'll write next:

    $(window).keyup(move);

6. Write a move function that updates the character position on screen based on which arrow key was pressed.  Using the binding from step 5, your move function should 
accept one argument passed by jQuery: an event object. That object has a "which" property containing the code for the key that was pressed.

The key codes are:

* Up = 38
* Down = 40
* Left = 37
* Right = 39

Just increment or decrement x or y, depending on which key was pressed. Be sure to guard against x or y going out of bounds (less than zero or greater than the canvas size).

If you get confused check out `ex4/js/tutorial.js` for an example move function.

7. At the end of your move function, call context.drawImage to slice out one of the sprites from our file and project it on the screen at the coordinates stored
in x and y.

If you get confused check out `ex4/js/tutorial.js` to see what this looks like.

8. Reload your browser and try it out. You should see your character tracking across the screen slowly.

9. Let's make this look nicer by clearing the screen before each draw command.  Add this before your drawImage call:

    context.clearRect(0,0,width,height);

10. You may also want to increase the number of pixels that the character travels per key press.

## Extra Credit

Try setting up an animation loop that redraws the screen a few times per second. This will let you decouple the keyboard events from the drawing. You'll need something like this
to start your loop:

    setInterval(runLoopFunction,interval);

Where runLoopFunction is the name of your function and interval is the number of milliseconds the browser should wait in between calls to that function.

# EXERCISE FIVE
## Fun With Forms


