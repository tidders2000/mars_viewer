



// Sets global variables

 var cam = 'fhaz';
 var photo_holder = [];
 var picCounter = 0;
 
// changes the cursor to a pointer for the camera buttons 

 $('#pan,#mast,#fhaz,#rhaz,#nav,#chem').css('cursor', 'pointer');
 
//checks a sol is a number and returns an alert

function nancheck(number){
      
      if(isNaN(number)){
        alert('PLEASE ENTER A NUMBER')
      }
  
}
 
 // returns lights to their resting function

  function reset_light() {

    $('#pan').attr("src", "Assets/images/pan.png")

    $('#mast').attr("src", "Assets/images/mast.png")
    $('#fhaz').attr("src", "Assets/images/fhaz.png")
    $('#rhaz').attr("src", "Assets/images/rhaz.png")
    $('#chem').attr("src", "Assets/images/chem.png")
    $('#nav').attr("src", "Assets/images/nav.png")
  }
  


// this gets the manifest data and uses the function to display missino info

  var url = "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=TSkGELpa7xcQPZrZL8umXnXvAAqweK0Ec60hcWmj";
  $.getJSON(url, null, function(data) {

    manifest(data);

  });

  function manifest(data) {
    // this adds manifest data to the screen
    var max_sol = data.photo_manifest.max_sol;
    var status = data.photo_manifest.status;
    var landing = data.photo_manifest.landing_date;
    var total_pics = data.photo_manifest.total_photos;
    $("#info").append("max sol:" + max_sol + " status:" + status + "<br>Landing Date:" + landing + "</br> Total photos:" + total_pics)
    $('#instructions').append("<p id='instruct' class='red'>Enter a sol Day (no higher than the max sol in mission info) in the field above then press return</p>");

  }
//this function is run when the user types in a sol  

  function testy(data) {

// clears data from info
   
   $("#info").empty(); 

// get data from API

    var url = "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=TSkGELpa7xcQPZrZL8umXnXvAAqweK0Ec60hcWmj";
    $.getJSON(url, null, function(data) {

// gets sol number entered and warns if nan
     
      var sol = $("#sol").val();
      nancheck(sol)
  
      
// checks it is a valid sol number

      if ((sol > data.photo_manifest.max_sol) || (sol < 1)) {
        alert('Please enter a sol number 0 or higher but less than the max sol')
      } 

// checks the entered sol and returns correct array index

      var choice = data;

      for (var k = 0; k < choice.photo_manifest.photos.length; k++) {

        if (choice.photo_manifest.photos[k].sol == sol) {
          var pop = k; //correct array index number

        }
      }

      var pics_by_day = choice.photo_manifest.photos[pop].total_photos;
      var sol_day = choice.photo_manifest.photos[pop].sol;
      
//sorts through cameras for the day and logs to console

      for (var camcount = 0; camcount < choice.photo_manifest.photos[pop].cameras.length; camcount++) {
        var cam_id = choice.photo_manifest.photos[pop].cameras[camcount];
        $('#info').append(cam_id + "-"); 

      }
// add cams and pics for day to the mission info screen to enable cam selection

      $("#info").append("<br/> Pictures for Day:" + pics_by_day)
      $('#instructions').empty()
      $('#instructions').append("<p class='red'>Total photos for the day and avaiable cams are shown in mission info.click a cam button</p>");

    });

  }



// Button functions that swap the image to a highlighted version, set the cam value then run get data


  $("#pan").click(function() {
    reset_light()

    $('#pan').attr("src", "Assets/images/pan-yellow.png");
    var cam = 'pan'
    getData(cam)
  })

  $("#mast").click(function() {

    reset_light()

    $('#mast').attr("src", "Assets/images/mast-yellow.png");
    var cam = 'mast'
    getData(cam)
  })


  $("#nav").click(function() {
    reset_light()

    $('#nav').attr("src", "Assets/images/nav-yellow.png");
    var cam = 'navcam'
    getData(cam)
  })

  $("#fhaz").click(function() {
    reset_light()

    $('#fhaz').attr("src", "Assets/images/fhaz-yellow.png");
    var cam = 'fhaz'
    getData(cam)
  })

  $("#rhaz").click(function() {

    reset_light()
    $('#rhaz').attr("src", "Assets/images/rhaz-yellow.png");
    var cam = 'rhaz'
    getData(cam)
  })

  $("#chem").click(function() {
    reset_light()

    $('#chem').attr("src", "Assets/images/chem-yellow.png");
    var cam = 'chemcam'
    getData(cam)
  })
  
//Get data queries the API on sol and cam selected by user and then puts images found into an array

  function getData(cam) {
  
// Adds a loading instruction to the instructions display
  
    $('#instructions').append("<p class='red'>Loading...</p>");
    
// Gets the sol value
    var sol = $("#sol").val();
    
// calls the API
 
    var requestURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=" + cam + "&sol=" + sol + "&api_key=TSkGELpa7xcQPZrZL8umXnXvAAqweK0Ec60hcWmj";

    $.getJSON(requestURL, null, function (data) {

//sorts through object and pushes photos into array

      photo_holder = []; //array holiding photos
      for (var i = 0; i < data.photos.length; i++) {

        photo_holder.push(data.photos[i].img_src); // adds to array

      }
// clears data from info
  
      $("#info").empty(); 

// Runs function to add first image from the array to the page

      addPageImage(photo_holder); 

    }) 
  }
 
//displays first image after fetch

  function addPageImage(data) {
    picCounter = 0;
    $('#instructions').empty()
    $('#mars_pic').attr('src', data[picCounter])
    $("#info").append("photo number:" + picCounter + "/" + photo_holder.length)
    $('#instructions').append("<p class='red'>Use buttons to browse</p>");

  }


//move upwards through array of images
  function up() {
    if (photo_holder.length < 1) {
      $('#instructions').empty()
      $('#instructions').append("<p class='red'>Enter a sol Day in the field above then press return</p><p class='red'>select a sol and cam</p>")

    }
    else if (picCounter < photo_holder.length) {
      picCounter++;
      $('#mars_pic').attr('src', photo_holder[picCounter])
      $("#info").empty();
      $('#instructions').empty()
      $("#info").append("photo number:" + picCounter + "/" + photo_holder.length); //align numbers

    }
    else {

      picCounter = photo_holder.length
       $('#instructions').append("<p class='red'>Max images reached for this cam select again</p>")
    }
  }


//move downwards through array of images
  function down() {

    if (photo_holder.length == 0) {
      alert('select a sol and cam')
    }
    else if (picCounter <= 0) {

      {
        $('#info').empty();
        $('#mars_pic').attr('src', 'Assets/images/tv-screen2.png')

        $('#instructions').empty();
        $("#instructions").append("<p class='red'>Press up arrow or change selections</p>")
      }
    }
    else {

      picCounter--;
      $('#info').empty();
        $('#instructions').empty();
      $('#mars_pic').attr('src', photo_holder[picCounter])
      $("#info").append("photo number:" + picCounter + "/" + photo_holder.length) //align numbers

    }

  }

