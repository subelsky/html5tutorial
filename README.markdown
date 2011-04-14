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

Just increment or decrement x or y by 10, depending on which key was pressed. Be sure to guard against x or y going out of bounds (less than zero or greater than the canvas size).

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

1. When we link this game up with other players we want to know who's who. So let's add a username field that takes advantage of new HTML5 form features. Add this line to your `index.html` file:

    <input id="username" placeholder="Your name">
   
2. Reload the page. If you don't see any placerholder text, check the value of `Modernizr.input.placeholder` in your JavaScript console.

3. Now add the `autofocus` attribute to that input field and reload. If your browser supports it, the field will automatically receive the focus! 

4. Let's try out a new form element, a slider we can use to control the size of our character. Add this to your `index.html` file:

    <input id="size" type="range" min="4" max="320" step="8" value="32">

5. Bind changes to that slider to a function in `tutorial.js` that will control the destination width and height of your drawImage call. The binding should look like this:

    $('#size').change(function() { ... });

To get the value of the slider, use `$('#size').val()`

## Extra Credit

Try out some of the other input elements listed in the [Dive Into HTML5 book](http://diveintohtml5.org/forms.html), like the color picker!

# EXERCISE SIX
## Local Storage

1. At your JavaScript console, set a localStorage value:

    localStorage.setItem('shaz','bot')

2. Close the page completely, then reopen it in a new window and type this at your JavaScript console:

    localStorage.getItem('shaz')

If your browser supports localStorage, you should get the value of `shaz` back.

3. Try the above steps with the sessionStorage object. How does sessionStorage differ from localStorage?  What about when you merely reload a page?  Do they perform in the same way?

4. Call localStorage.clear() and try getting the 'shaz' item again.

5. Bind a new function to the change event of the username input field we added in exercise 5, like this:

    $('#username').change(function() { ... });

6. In that bound function, use localStorage to record the user's name. You may need to change the focus by clicking elsewhere on the page to get this event to fire.  To fetch the value of the username field, use `$("#username").val()`.

7. Add a line of code to `tutorial.js` to fetch the user's name from localStorage. If that value is not null, set the value of the username to the pre-stored field like this: `$("#username").val(nameStr)`.

8. Reload the page. Type in a username, tab away from the username field (to make sure the change event fires), then reload the page. Your username should already be filled-in, instead of the placerholder text.

9. Try setting and getting numbers and hashes in localStorage. Does localStorage preserve type?

## Extra Credit

1. Bind the window object's `storage` event to keep track of when new items are added to localStorage. See [Dive Into HTML5](http://diveintohtml5.org/storage.html#storage-event) if you get stuck.

2. What happens when you try to get an item that has not been previously set from localStorage?

# EXERCISE 7
## Canvas Cleanup

1. Let's make things a little nicer before we add multi-player features to this "game". First, let's set a dark background for our canvas. Add this declaration to the `<head>` section of `index.html`:

    <style>
      canvas { 
        background-color: black;
      }

      input { display: block; }
    </style>

2. Also in `index.html`, increase the width and height of your canvas to the maximum comfortable size for your display.

3. Instead of initialize your player's x and white coordinates to zero, set them to random values within the bounds of your canvas, using something like:

    Math.round(Math.random(width) * 1000)

That will help us avoid bunching up in the same spots. **Be sure to round these numbers**. At least in Chrome, floating point values used for canvas drawing can cause a big performance hit.

# EXERCISE 8
## Web Sockets

1. Let's connect to a websocket server in order to exchange information with other players.  Add this code to your `tutorial.js` file:

    var ws = new WebSocket("ws://########:80");
    ws.onmessage = handleMessage;

    function handleMessage(event) {
      console.info(event.data);
    }

2. Reload your browser. Every 10 seconds you should see a "ping" message from the server.  Note that this is a JSON string that we'll need to unmarshal before we can work with it.

3. Check out the Ruby code in `server/server.rb` to see what you're connecting to with that string.

4. Modify the `handleMessage` function to parse the JSON string. If your browser does not have a native JSON implementation, you'll need to add the script `js/libs/json2.js` to your project for this code to work.

    var msg = JSON.parse(event.data);
    console.info(msg);

5. Reload your browser, wait 10 seconds, then check your console. You should see the de-marshalled JSON object displayed.

6. Modify your `move` function to send a JavaScript object out on the websocket every time you move your character. Use the websocket.send method like this:

    ws.send(JSON.stringify({ name: name, x: x, y: y, type: "move" }));

7. Check out the server log being tailed on the screen. You should see your movement messages showing up every time you push a key.

## Extra Credit

The server is broadcasting all movement events to the whole class. To display other student positions on your screen, you'll need to keep track of their usernames and x and y positions (probably
with a hash, where the keys are user names and the values are coordinates).  Modify your handleMessage message to display multiple players, displaying a different image for your own sprite vs.
other users. We're not doing anything to ensure uniqueness of usernames, so make sure you pick a name that won't collide with anyone else's name.

# EXERCISE 9
## Embedded Media (and Data Attributes)

Let's add some sound effects to our game and take advantage of HTML5's data attributes to simplify our controls.

1. Add this list element to your `index.html` body:

    <ul>
      <li><a href="#" data-soundname='bubble'>Play Bubble</a></li>
      <li><a href="#" data-soundname='ray_gun'>Play Ray Gun</a></li>
    </ul>

2. Use jQuery to bind the `<a>` tag's `click` event. You can figure out which soundname the user wants by inspect the click event's `target.dataset.soundname` data attribute property, like so:

    $('a').click(function(evt) {
      console.info(evt.target.dataset.soundname);
    });

*Note that data attributes are different from micro-data, because they are not intended for external consumption.  See* [Dive Into HTML5](http://diveintohtml5.org/extensibility.html) *for more details about microdata.*

3. Reload the page. Click each link to verify that you can read the `dataset` property and are getting the correct soundname.

4. Playing audio and video in HTML5 involves a lot of codec hassles. You generally have to provide your content in multiple formats. To make things simple, I've included these two 
sound files in four different formats. Copy the sound files from the `media` directory to your project. *You may have to fiddle with your dev machine's MIME settings. HTML5 will choke if
your audio files aren't served with the proper MIME type. See* [MIME Types](http://diveintohtml5.org/video.html#video-mime-types) *for details.*

The following audio embed should work for most people, though. The spec says that the browser should pick the first listed source that it can play.

    <div style="display:hidden">
      <audio id="bubble" preload>
        <source src="media/bubble.ogg">
        <source src="media/bubble.mp3">
        <source src="media/bubble.wav">
      </audio>

      <audio id="ray_gun" preload>
        <source src="media/ray_gun.ogg">
        <source src="media/ray_gun.mp3">
        <source src="media/ray_gun.wav">
      </audio>
    </div>

I chose to embed these directly on the page so we could take advantage of the browser's content fallback selection. You can also create audio objects just like we did with Image objects earlier:

    var audio = new Audio;
    audio.src = "http://...";

5. Reload your page, then try playing both sounds at the console:

    $('#bubble')[0].play()
    $('#ray_gun')[0].play()

6. Modify your anchor click event handler to automatically play the requested sound using the above technique.

7. To see what basic HTML5 audio controls look like, remove `display:hidden` from the `<div>` and add the `controls` attribute next to `preload`, then reload the page.

*The HTML5 audio tag works exactly like the audio tag, but the codec issues are worse. See* [Dive Into HTML5](http://diveintohtml5.org/video.html) *for full details.*

## Extra Credit

For a cool example of how to embed video, and use the canvas to manipulate images from that video, check out [this HTML5 demo](http://html5demos.com/video-canvas).

# EXERCISE TEN
## Geolocation

1. At the JavaScript console, type the following command:

    navigator.geolocation.getCurrentPosition(function(loc) { console.info(loc.coords) })

2. Inspect the location object in the console. If you lookup those coordinates in Google Maps you should get a result fairly close to the convention center! It's very easy to integrate this info
with Google Maps to show a map at the user's location, but unfortunately this can't be done from localhost due to Google Maps API authentication issues. [This link](http://code.google.com/apis/maps/documentation/javascript/examples/map-geolocation.html)
has a simple demo of that feature - be sure to view source on it

## Extra Credit

Check out [SimpleGeo](https://simplegeo.com/docs/tutorials/javascript) for some examples of other cool things you can do when you know a user's approximate location.


