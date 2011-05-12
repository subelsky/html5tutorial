# HTML5: Beyond the Buzzwords

# GOALS

I am aiming to expand your imagination about the kinds of features that can be added to modern web applications without adding any dependencies
or friction to your codebase. I want to provide you with just enough knowledge that you could start to take advantage of these
capabilities in your own apps.

# PREREQUISITES

- These instructions were built using the latest version of Chrome, but will also work with the latest version of Safari or Firefox. Some of the exercises do not work perfectly in Firefox due to limitations in the browser. 
I have not tested them with IE or Opera but much of the code should still work.

- Your browser should have a built-in JavaScript console. Chrome and Safari have a built-in JavaScript console. If you are using Firefox, be sure to install [Firebug](http://getfirebug.com).

- You need some kind of basic text editor (Vi, Emacs, Textmate, Notepad, etc.) to make changes to the project files.

# SETUP

1. Copy the directory named `start` from this project to a new location on your machine. This will form the basis for the game we are building
and includes all necessary dependencies.

2. In your project, examine the index.html file you copied from `start`. This skeleton is heavily stripped down from the [HTML5 Boilerplate project](http://html5boilerplate.com/). The [full template](https://github.com/paulirish/html5-boilerplate/blob/master/index.html) 
is a good way to learn some state of the art HTML5 practices.

    Note the doctype that starts this file. That's all you need to do to indicate to the browser that you want to use the latest, greatest version of HTML. 
    The boilerplate also shows the use of new HTML5 semantic tags `<header>` and `<footer>`. You can use these instead of less semantic code such as `<div id="header"></div>`.

3. Open up the index.html file in your browser. Then activate your JavaScript console (in Chrome, go to the View menu, choose Developer, then choose JavaScript console; in Safari, hit option-Apple-C). You should see the message "You have a working console". If you don't see this message you should install Firebug or switch to a different browser.
You will have a hard time completing this tutorial without a working console.

    That message was created by the file `js/tutorial.js`. I'll be using that file for all of our application code.

# EXERCISE ONE 
## Feature Detection

1. Examine `js/libs/modernizr`. This is the [Modernizr](http://www.modernizr.com/) library that performs browser feature detection and helps style new HTML5 semantic elements. Because you can't yet
rely on users having fully-capable browsers, feature detection is essential for providing useful error messages and fallbacks.

2. To activate Modernizr, use your favorite text editor to add this line to the `<HEAD>` tag of `index.html`.

    `<script src="js/libs/modernizr-1.7.js"></script>`

    Then add the class `no-js` to the `<HTML>` tag on the second line of the index.html file.

3. Open up `index.html` in your browser and inspect the `<HTML>` tag. Notice that `no-js` has been replaced by several CSS declarations that can be used to style fallback content, reveal error messages, etc.

4. Open up a JavaScript console and inspect the Modernizr object. To be able to complete all of the exercises in this tutorial, you'll need to see true values for all of these properties:

    * Modernizr.canvas
    * Modernizr.websockets
    * Modernizr.audio
    * Modernizr.geolocation
    * Modernizr.localstorage

    If you don't see "true" for all of these you should go ahead and install the [Chrome](http://www.google.com/chrome) browser.

## Extra Credit

Using only CSS and HTML, use the `<HTML>` classes `touch` and `no-touch` to reveal a message to the user indicating whether or not they have a touch interface. If you have a mobile OS simulator installed (such as iOS Simulator) you can
test both messages.

# EXERCISE TWO 
## Basic Canvas Drawing

1. Add `<canvas id="main" width="400" height="400"></canvas>` just after the opening of the `<body>` tag in your `index.html` file.

2. To draw a rectangle in the canvas, add this code to js/tutorial.js:
    <pre>var canvas = document.getElementById("main");
    var context = canvas.getContext("2d");
    context.fillRect(0,0,20,20);</pre>

    All drawing operations happen on the canvas context, not the canvas itself. Right now "2d" is the only available context, but a future HTML spec may define a 3d context.

3. Open `index.html` in your browser. You should see a black rectangle!

4. Change the `fillRect` call to `strokeRect` and reload your browser. Now the rectangle is not filled-in.

5. Set the context's `fillStyle` property to a CSS color like "red", then reload the page to see a red rectangle.

    <pre>context.fillStyle = "red";</pre>

6. To draw text, add lines like this to `tutorial.js` and reload.

    <pre>context.font = "bold 24px sans-serif";
    context.fillStyle = "blue";
    context.fillText("HTML5",100,100);</pre>

## Extra Credit

Try filling your rectangle with a gradient. You'll need to create a gradient object as explained in [Dive Into HTML5](http://diveintohtml5.org/canvas.html#gradients), then set your fillStyle to that gradient.

# EXERCISE THREE
## Canvas Image Manipulation

1. Copy the file `media/water.jpg` from the tutorial project to your project's `media` directory. (This image is [Creative Commons-licensed](http://www.flickr.com/photos/50183640@N05/5616041841/))

2. Draw this image using the canvas by adding these lines to your `tutorial.js` file:

    <pre>var img = new Image();
    img.src = "media/water.jpg";
    img.onload = function() {
      context.drawImage(img,0,110);
    };</pre>

3. Reload your browser to see the image.

4. Now add two additional parameters, a destination width and height, after the original 3 parameters:

    <pre>context.drawImage(img,0,110,200,100);</pre>

5. Reload the browser and observe the image scaled to a different size.

6. Copy the sprite file we'll be using for our simple game, `media/characters.jpg` to the `media` folder of your project. (I got this CC-licensed file by David E. Gervais from the [TomeTik](http://pousse.rapiere.free.fr/tome/) project)

7. Use the 9 argument version of drawImage to slice out one character from the characters file and project it onto the canvas:

    <pre>drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);</pre>

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

2. Add a this tag to the bottom of your index.html file, before the `tutorial.js` file is loaded, to load the jQuery library:

    `<script src="js/libs/jquery-1.5.2.js"></script>`

3. Comment out most of the drawing code we had been working with so the page starts clean.  The only working code in your `tutorial.js` should look like this:

    <pre>var canvas = document.getElementById("main");
    var context = canvas.getContext("2d");

    var characters = new Image();
    characters.src = "media/characters.gif";</pre>

4. Initialize two variables, `x` and `y`, to zero. We'll use these to keep track of the user's current position.

5. Initialize variables to store the height and width of the canvas. Later we'll be changing the size of the canvas dynamically so it makes sense to not hard code these values.

     <pre>var height = $(canvas).height();</pre>
     <pre>var width = $(canvas).width();</pre>

5. Setup another onload function for the characters object. When the characters image has loaded, we want to bind keyboard events to a function we'll write next:

    <pre>$(window).keyup(move);</pre>

6. Write a move function that updates the character position on screen based on which arrow key was pressed.  Using the binding from step 5, your move function should 
accept one argument passed by jQuery: an event object. That object has a "which" property containing the code for the key that was pressed.

    The key codes are:

    * Up = 38
    * Down = 40
    * Left = 37
    * Right = 39

    Increment or decrement x or y by 10, depending on which key was pressed. Be sure to guard against x or y going out of bounds (less than zero or greater than the canvas size).

    If you get confused check out `ex4/js/tutorial.js` for an example move function.

7. At the end of your move function, call `context.drawImage` to slice out one of the sprites from our file and project it on the screen at the coordinates stored
in x and y.

    If you get confused check out `ex4/js/tutorial.js` to see what this looks like.

8. Reload your browser and try it out. You should see your character tracking across the screen slowly.

9. Let's make this look nicer by clearing the screen before each draw command.  Add this before your drawImage call:

    <pre>context.clearRect(0,0,width,height);</pre>

10. You may also want to increase the number of pixels that the character travels per key press.

## Extra Credit

Try setting up an animation loop that redraws the screen a few times per second. This will let you decouple the keyboard events from the drawing. You'll need something like this
to start your loop:

`setInterval(runLoopFunction,interval);`

Where runLoopFunction is the name of your function and interval is the number of milliseconds the browser should wait in between calls to that function.

# EXERCISE FIVE
## Fun With Forms

1. When we link this game up with other players we want to know who's who. So let's add a username field that takes advantage of new HTML5 form features. Add this line to your `index.html` file:

    `<input id="username" placeholder="Your name">`
   
2. Reload the page. If you don't see any placerholder text, check the value of `Modernizr.input.placeholder` in your JavaScript console.

3. Now add the `autofocus` attribute to that input field and reload. If your browser supports it, the field will automatically receive the focus. 

4. Let's try out a new form element, a slider we can use to control the size of our character. Add this to your `index.html` file (1):

    `<input id="size" type="range" min="4" max="320" step="8" value="32">`

5. Bind changes to that slider to a function in `tutorial.js` that will control the destination width and height of your drawImage call. The binding should look like this:

    `$('#size').change(function() { ... });`

    To get the value of the slider, use `$('#size').val()`

(1) This element does not render in Firefox. Try it out in Safari or Chrome.

## Extra Credit

Try out some of the other input elements listed in the [Dive Into HTML5 book](http://diveintohtml5.org/forms.html), like the color picker!

# EXERCISE SIX
## Local Storage

**Note**: this exercise will not work well in Firefox because of a bug in the way Firefox handles file:// URLs. If you want this to work in Firefox you'll need to serve up your code from a web server
on your development machine. [Details](https://bugzilla.mozilla.org/show_bug.cgi?id=507361)

1. At your JavaScript console, set a localStorage value:

    <pre>localStorage.setItem('shaz','bot')</pre>

2. Close the page completely, then reopen it in a new window and type this at your JavaScript console:

    <pre>localStorage.getItem('shaz')</pre>

    If your browser supports localStorage, you should get the value of `shaz` back.

3. Try the above steps with the sessionStorage object. How does sessionStorage differ from localStorage?  What about when you merely reload a page?  Do they perform in the same way?

4. Call `localStorage.clear()` and try getting the 'shaz' item again.

5. Bind a new function to the change event of the username input field we added in exercise 5, like this:

    <pre>$('#username').change(function() { ... });</pre>

6. In that bound function, use localStorage to store the user's name. You may need to change the focus by clicking elsewhere on the page to get this event to fire.  To fetch the value of the username field, use `$("#username").val()`.

7. Add a line of code to `tutorial.js` to fetch the user's name from localStorage (which you stored in the above step) when the page loads. If there is a previously-stored username, set the value of the username field
to the pre-stored field like this: `$("#username").val(nameStr)`.

8. Reload the page. Type in a username, tab away from the username field (to make sure the change event fires), then reload the page. Your username should already be filled-in, instead of the placerholder text.

9. Try setting and getting numbers and hashes in localStorage. Does localStorage preserve type?

*Your JavaScript console may also have an inspector for local and session storage. In WebKit's inspector, it's Storage tab.*

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

2. You may also want to increase the width and height of your canvas element.

3. Increase the step size for your character so it moves 5 or 10 pixels at a time.

# EXERCISE 8
## Web Sockets

**Note**: WebSockets are disabled in Firefox. You may be able to get something working by using [socket.io](http://socket.io/).

1. Let's connect to a websocket server in order to exchange information with other players.  Add the following code to your `tutorial.js` file. I noticed that I would sometimes get errors
if this code fired before the `characters.gif` image file loaded, so you may want to stick this in the onload handler for that object. See the exercise 8 solution if this is confusing.

    <pre>var ws = new WebSocket("ws://exp.subelsky.com:8011");
    ws.onmessage = handleMessage;

    function handleMessage(event) {
      console.info(event.data);
    }</pre>

2. Reload your browser. Every 10 seconds you should see a "ping" message from the server.  Note that this is a JSON string that we'll need to unmarshal before we can work with it.

3. Check out the Ruby code in `server/server.rb` to see what you're connecting to with that string.

4. Modify the `handleMessage` function to parse the JSON string. If your browser does not have a native JSON implementation, you'll need to add the script `js/libs/json2.js` to your project for this code to work.

    <pre>var msg = JSON.parse(event.data);
    console.info(msg);</pre>

5. Reload your browser, wait 10 seconds, then check your console. You should see the de-marshalled JSON object displayed.

6. Modify your `move` function to send a JavaScript object out on the websocket every time you move your character. Use the websocket.send method like this:

    <pre>ws.send(JSON.stringify({ name: name, x: x, y: y, type: "move" }));</pre>

7. Check out the server log being tailed on the screen. You should see your movement messages showing up every time you push a key.

If you are thinking of building an app with websockets, definitely check out* [Pusher](http://pusherapp.com/) which may save you the trouble of writing your own server.

## Extra Credit

The server is broadcasting all movement events to the whole class. To display other student positions on your screen, you'll need to keep track of their usernames and x and y positions (probably
with a hash, where the keys are user names and the values are coordinates).  Modify your handleMessage message to display multiple players, displaying a different image for your own sprite vs.
other users. 

Also, we're not doing anything to ensure uniqueness of usernames, so make sure you pick a name that won't collide with anyone else's name.

# EXERCISE 9
## Embedded Media (and Data Attributes)

Let's add some sound effects to our game and take advantage of HTML5's data attributes to simplify our controls.

1. Add this list element to your `index.html` body:

        <ul>
          <li><a href="#" data-soundname='bubble'>Play Bubble</a></li>
          <li><a href="#" data-soundname='ray_gun'>Play Ray Gun</a></li>
        </ul>

2. Use jQuery to bind the `<a>` tag's `click` event. You can figure out which soundname the user wants by inspect the click event's data attribute, as below. I've
included the cross-browser version as well as the version provided for in the [HTML5 spec](http://dev.w3.org/html5/spec/elements.html#embedding-custom-non-visible-data), which only Chrome seems to support.

        $('a').click(function(evt) {
          // this spec version is not as pretty but works across browsers
          $('#'+evt.target.getAttribute('data-soundname'))[0].play();

          // the HTML5 spec provides a nicer API, but this version only seems to work in Chrome
          // $('#'+evt.target.dataset.soundname)[0].play();
        });

    Note that data attributes are different from micro-data, because they are not intended for external consumption.  See* [Dive Into HTML5](http://diveintohtml5.org/extensibility.html) for more details about microdata.

3. Reload the page. Click each link to verify that you can read the `dataset` property and are getting the correct soundname.

4. Playing audio and video in HTML5 involves a lot of codec hassles. You usually have to provide your content in multiple formats. To make things simple, I've included these two 
sound files in four different formats. Copy the sound files from the `media` directory to your project. You may have to fiddle with your dev machine's MIME settings because HTML5 will choke if
your audio files aren't served with the proper MIME type. See [MIME Types](http://diveintohtml5.org/video.html#video-mime-types) for details.

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

    <pre>$('#bubble')[0].play()
    $('#ray_gun')[0].play()</pre>

6. Modify your anchor click event handler to automatically play the requested sound using the above technique.

7. To see what basic HTML5 audio controls look like, remove `display:hidden` from the `<div>` and add the `controls` attribute next to `preload`, then reload the page.

8. Video embedding works the same way. We need to provide multiple versions of video files to ensure compatibility across modern browsers.  Copy the files `short.mov`, `short.mp4`, `short.ogv`, and `short.webm` from the `media` directory to your project's `media` directory.

    These files were created from a QuickTime movie using `ffmpeg2theora`, `ffmpeg` and `HandBrakeCLI`, using settings from [Dive Into HTML5](http://diveintohtml5.org/video.html).

        ffmpeg2theora --videobitrate 200 --max_size 320x240 --output short.ogg short.mov 
        HandBrakeCLI --preset "iPhone & iPod Touch" --vb 200 --width 320 --two-pass --turbo --optimize --input short.mov --output short.mp4

9. Add this to the bottom of your `index.html` page:

          <video width="320" height="240" preload controls>
            <source src="media/short.ogg" type='video/ogg; codecs="theora, vorbis"' />
            <source src="media/short.mp4" />
            <source src="media/short.mov" />
          </video>

10. Reload the page. One of those four formats should display in your browser.

    For a cool example of how to use the canvas to manipulate images from a video, check out [this demo](http://html5demos.com/video-canvas). There's also a good demonstration of using embedded media events to show a timer
    in [this demo](http://html5demos.com/video).

## Extra Credit

Use the [FlowPlayer](http://flowplayer.org/) Flash-based video player as the ultimate fallback for this content (you'll need to embed a `<object>` tag after the `<source>` tags. The technique is explained
at [Video for Everybody](http://camendesign.com/code/video_for_everybody).

# EXERCISE TEN
## Geolocation

1. At the JavaScript console, type the following command:

    <pre>navigator.geolocation.getCurrentPosition(function(loc) { console.info(loc.coords) }, function(err) { console.error(err) })</pre>

2. Inspect the location object in the console. If you lookup those coordinates in Google Maps you should get a result fairly close to the convention center! It's very easy to integrate this info
with Google Maps to show a map at the user's location, but unfortunately this can't be done from localhost due to Google Maps API authentication issues. 
[This link](http://html5demos.com/geo) has a simple demo - be sure to view source on the page.

    The first callback gets fired if the browser can guess its location. The second callback fires if it can't. For me, the second callback fired in
    Safari when I ran it on a machine with an Ethernet connection.

## Extra Credit

Check out [SimpleGeo](https://simplegeo.com/docs/tutorials/javascript) for some examples of other cool things you can do when you know a user's approximate location.

# EXERCISE ELEVEN
## Web Workers

1. Examine the file `js/worker.js` and then copy it to your project. This is a simple brute-force algorithm to find all the factors of a given integer.

2. Reload the page, then type these lines at your JavaScript console:

    <pre>var worker = new Worker('js/worker.js');

    worker.addEventListener('message', function(e) {
      console.info(e.data);
    },false);

    worker.postMessage(100);</pre>

    **If you are using Chrome**, you will get a security exception if you are loading index.html as a file:// URI. You can reopen Chrome with a command-line flag to circumvent the exception, though.
    This is what worked for me on OS X:

    <pre>open -n -a 'Google Chrome.app' --args --allow-file-access-from-files</pre>

    Or just use a different browser.

3. You should see the worker immediately post a response to the console. Try increasing the size of the number you pass to worker.postMessage until you get something that takes awhile to run (like 1,000,000). Notice
that your web page continues to be responsive even as this task runs in the background.

Here's a [more complicated webworker example](http://nerget.com/rayjs-mt/rayjs.html).

# EXERCISE TWELVE
## Offline Apps

1. Examine the `index.html` file in the `manifest` directory. This is a stripped-down version of the exercise 11 solution. Check out the `<html>` tag which now includes a reference to `demo.manifest.`

2. Examine `demo.manifest`.

3. If you have a packet sniffer, start it sniffing on port 80. Otherwise, make sure your JavaScript console is recording network traffic.

4. Now visit <http://files.subelsky.com/manifestdemo/index.html>

5. In your packet sniffer or JavaScript console, note that all files are being downloaded, and note the MIME type of the `demo.manifest` file (`text/cache-manifest`).

6. Now reload the page. If all goes well, the only traffic you'll see moving along the wire is a request to check the demo.manifest file, which doesn't even get downloaded since it is unchanged 
(because of the `304` HTTP response status code).

    This is the same technique you can use to make an HTML5 app "installable" on a smart phone. Unfortunately when I tried this on iOS the audio files do not get stored offline, so the demo is less impressive.

## Extra Credit

Get `manifest/index.html` running on your dev machine. All you need to do is serve up the directory from the webserver (vs. from `file://`), and make sure the manifest file has the right MIME type. In Apache,
I added this directive to `httpd.conf`:

    AddType text/cache-manifest .manifest

# THAT WAS TOO EASY?

Here are some other "HTML5-ish" features that you should be aware of that didn't fit into this tutorial or are too bleeding-edge to be used reliably:

* [Microdata](http://diveintohtml5.org/extensibility.html)

* [WebGL](http://www.queness.com/post/7459/8-stunning-javascript-webgl-demonstrations)

* [HTML5 History API](http://html5demos.com/history/)

* [Alternatives to websockets](http://html5doctor.com/methods-of-communication/)

* [Polyfills to get HTML5 features working across browsers](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills) and also [Uber](http://html5doctor.com/how-to-get-all-the-browsers-playing-ball/)

* [Various CSS3 capabilities like rounded corners, 2D transforms, etc.](http://www.css3.com/)

# USEFUL URLs

* [Dive Into HTML5](http://diveintohtml5.org/)

* [HTML5 Doctor](http://html5doctor.com/)

* [HTML5 Demos](http://html5demos.com/)

* [HTML5 Rocks](http://www.html5rocks.com/)

* [Mozilla Canvas Tutorials](https://developer.mozilla.org/en/Canvas_tutorial)

* [WHATWG Living Standard](http://www.whatwg.org/specs/web-apps/current-work/multipage/)

# ACKNOWLEDGEMENTS

Thanks to [Jeff Casimir](http://jumpstartlab.com/) for helping me organize this material, and to [Mark Pilgrim](http://diveintomark.org/) for writing Dive Into HTML5 which was a big help. Any mistakes are my own of course!

# KEEP IN TOUCH

Thanks for coming to my tutorial.  I'm <mike@subelsky.com> or [@subelsky](http://twitter.com/subelsky)
on Twitter.  I love talking about HTML5, so email me if you have
questions or want to discuss interesting challenges.

Most of the techniques I discuss in this tutorial I learned building
an HTML5-powered game for programmers named EXP.  We're accepting beta
testers now, visit [exp.subelsky.com](http://exp.subelsky.com/) to signup!
