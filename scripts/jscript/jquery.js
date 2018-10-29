  var cam = 'fhaz';


  // this gets the manifest data and uses the function to display
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
    $('#instructions').append("<p class='red'>Enter a sol Dayin the field above then press return</p>");

  }
  //this function is run when the user types in a sol  
  function testy(data) {

    $("#info").empty(); // clears data from info

    var url = "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=TSkGELpa7xcQPZrZL8umXnXvAAqweK0Ec60hcWmj";
    $.getJSON(url, null, function(data) {

      var sol = $("#sol").val(); // gets sol number entered

      if ((sol > data.photo_manifest.max_sol) || (sol < 1)) {
        alert('nump balls')
      } // checks it is a valid sol number

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
      for (var x = 0; x < choice.photo_manifest.photos[pop].cameras.length; x++) {
        var cam_id = choice.photo_manifest.photos[pop].cameras[x];
        $('#info').append(cam_id + "<br/>"); //change to display on screen

      }

      $("#info").append("<br/> Pictures for Day:" + pics_by_day)
      $('#instructions').empty()
      $('#instructions').append("<p class='red'>click a cam button</p>");

    });

  }



  var photo_holder = [];
  var c = 0;
  $("#pan").click(function() {
    reset_light()

    $('#pan').attr("src", "Assets/images/pan-yellow.png");
    var cam = 'pan'
    getData(cam)
  })

  $("#mast").click(function() {

    reset_light()

    $('#mast').attr("src", "Assets/images/pan-yellow.png");
    var cam = 'mast'
    getData(cam)
  })


  $("#nav").click(function() {
    reset_light()

    $('#nav').attr("src", "Assets/images/pan-yellow.png");
    var cam = 'navcam'
    getData(cam)
  })

  $("#fhaz").click(function() {
    reset_light()

    $('#fhaz').attr("src", "Assets/images/pan-yellow.png");
    var cam = 'fhaz'
    getData(cam)
  })

  $("#rhaz").click(function() {

    reset_light()
    $('#rhaz').attr("src", "Assets/images/pan-yellow.png");
    var cam = 'rhaz'
    getData(cam)
  })

  $("#chem").click(function() {
    reset_light()

    $('#chem').attr("src", "Assets/images/pan-yellow.png");
    var cam = 'chemcam'
    getData(cam)
  })

  function getData(cam) {

 $('#instructions').append("<p class='red'>Loading...</p>");

    var sol = $("#sol").val();

    var requestURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=" + cam + "&sol=" + sol + "&api_key=TSkGELpa7xcQPZrZL8umXnXvAAqweK0Ec60hcWmj";

    $.getJSON(requestURL, null, function(data) {

      //sorts through object and pushes photos into array

      photo_holder = []; //array holiding photos
      for (var i = 0; i < data.photos.length; i++) {

        photo_holder.push(data.photos[i].img_src); // adds to array

      }
      $("#info").empty(); // clears data from info

      // $("#info").append("photos found" + photo_holder.length) //shows amount of photos found for day

      addPageImage(photo_holder); // add image to page




    }) //end of function load and fetch
  }
  //displays first image after fetch

  function addPageImage(data) {
    c = 0;
   $('#instructions').empty()
    $('#mars_pic').attr('src', data[c])
    $("#info").append("photo number:" + c + "/" + photo_holder.length)
    $('#instructions').append("<p class='red'>Use buttons to browse</p>");
  }


  //move upwards through array of images
  function up() {
    if (photo_holder.length < 1) {
      alert('select a sol and cam')
    }else if (c<photo_holder.length){
      c++;
      $('#mars_pic').attr('src', photo_holder[c])
      $("#info").empty();
       $('#instructions').empty()
      $("#info").append("photo number:" + c + "/" + photo_holder.length); //align numbers
      
    }
    else {

      c=photo_holder.length
    }
  }


  //move downwards through array of images
  function down() {

    if (photo_holder.length == 0) {
      alert('select a sol and cam')
    }
    else if  (c <= 0){

      {
$('#info').empty();
        $('#mars_pic').attr('src', 'Assets/images/tv-screen2.png')

      $('#instructions').empty();
        $("#instructions").append("<p class='red'>Press up arrow or change selections</p>")
      }
    }else{

    c--;
    $('#info').empty();
    $('#mars_pic').attr('src', photo_holder[c])
    $("#info").append("photo number:" + c + "/" + photo_holder.length) //align numbers

}

  }

  function reset_light() {

    $('#pan').attr("src", "Assets/images/pan.png")

    $('#mast').attr("src", "Assets/images/mast.png")
    $('#fhaz').attr("src", "Assets/images/fhaz.png")
    $('#rhaz').attr("src", "Assets/images/rhaz.png")
    $('#chem').attr("src", "Assets/images/chem.png")
    $('#nav').attr("src", "Assets/images/nav.png")
  }
  