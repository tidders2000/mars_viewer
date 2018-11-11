This project uses the nasa rover API. The point of the project is to allow users to view photos from a given sol (mission day) and choose
a camera view as well. I have tried to make to look spacey and mars like (red rust text). All the graphical elements were built in photoshop.

The idea for this project came from something that is fun and interesting and a little more than clicking
through drop downs. I stumbled across the NASA api's from a google search. I intially played around with the API via the
browser and then wrote some simple JS to check I could access what I felt was needed for the project.

I then used Moqups to wire frame and develop the UI and rough ideas for the UX. I designed three different moq ups
as i was quite keen to have something that was fully optimised for different devices and screen sizes. An area of my skills
that I felt needed development was Photoshop and the design element. I used photoshop to develop most of the elements on screen.
TV screen, heading, buttons, dials were all developed using PS.

I then developed the development enviroment:

Bootstrap 
Font Awsome
JQuery 
Jasmine
SCSS
Jasmine Jquery

I tested each element worked prior to build.

Using bootsrap I then developed the basic layout with the correct elements on screen but with no CSS. I then concentrated on the scripts intially using pure JS
Although i managed to manage the API calls in pure JS it became apparent when I came to DOM manipulation that I was making work for my self. I have kept the script
in files but changed to Jquery. 

After developing the intial script to download the images src into an array and append them to the page I then started to fine tune this more to handle errors
and be more user friendly. At this stage is discarded the dial as it did not really add to the user experince and was code heavy. I replaced this with the 
animated buttons that appear to light up. This is much smoother and I feel has improved the design. I had an issue with resetting the buttons after another was pressed but solved
this with a fairly simple function. At this point i also changed to include mission data and instructions that were responsive to the user interactions. Again I felt
this improved the user experince and fitted n icely with the overall space mission control type of concept

Unfortunaly the sol number did not always match the array number so I needed to write some code to match the user entered sol number to the correct array index, so for instance sol number 400 
may be 375 in the array. If I did not do this then the incorrect mission data is fed back.


CSS

I used SASS for the first time. I laid it out as I would for a much larger project. I use colours whn laying out using bootstrap 
as I find it easier. I have left these in the SCSS and CSS style sheets.



Testing.

Testing was mainly user based testing. Trying to break the UI and then coding to correct it.I did carry out some unit testing at the end of the project
and had a simple test plan. I found this a good learning experince and in future will test as i develop rather than leaving to the end. I appreciate there were plenty
more unit tests I could run but felt the user testing was quite effective. I used Jasmine JQuery and found this much easier to use

https://github.com/velesin/jasmine-jquery 

I found large image numbers slow to load to the array so added a loading message for users. I also found large image sizes an issue and had to reduce some to improve
loading times.

See test plan txt




