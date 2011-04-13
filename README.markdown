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

1. Copy the file `media/water.jpg` from the tutorial project to your directory. (This image is [Creative Commons-licensed](http://www.flickr.com/photos/50183640@N05/5616041841/))

2. Draw this image using the canvas by adding these lines to your `tutorial.js` file:

    var img = new Image();
    img.src = "media/water.jpg";
    img.onload = function() {
      context.drawImage(img,0,110);
    };

3. Reload your browser to see the image.

4. Now try using one of the more complex drawImage API calls.  Modify the drawImage call to accept two additional parameters, a width and height for the new image, after the original 3 parameters.

5. Reload the browser and observe the image scaled to a different size.

## Extra Credit

Use the full-blown most complicate drawImage call to slice a portion of the original image and project it onto the canvas. The arguments are:

    drawImage(image,sourceX,sourceY,sourceWidth,sourceHeight,destinationX,destinationY,destinationWidth,destinationHeight)

Check out the file `media/drawImage.png` for a visual explanation.
