// loads up mission manifest data
var requestURL = "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=TSkGELpa7xcQPZrZL8umXnXvAAqweK0Ec60hcWmj"
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    var manifest = request.response;
    var max_sol = manifest.photo_manifest.max_sol;
    var status = manifest.photo_manifest.status;
    var landing = manifest.photo_manifest.landing_date;
    var total_pics = manifest.photo_manifest.total_photos;
    document.getElementById("info").innerHTML = ("max sol:" + max_sol + "<br/>" +  " status:" + status +"<br/>"+  " Landing Date:" + landing +"<br/>" + " total pictures:" + total_pics)

}
//loads up information for particular sol
function testy() {
    var requestURL = "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=TSkGELpa7xcQPZrZL8umXnXvAAqweK0Ec60hcWmj"
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        // checks the entered sol and returns correct array index
        var choice = request.response;
        var sol = document.getElementById("sol").value;
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
            console.log(cam_id) //change to display on screen

        }

        document.getElementById("info").innerHTML = ("Pictures for Day:" + pics_by_day)



    };

}

//fetchs data based on search criteria
var photo_holder = [];
var c = 0;

function getData() {


    var sol = document.getElementById("sol").value;
    var cam = document.getElementById("cam").value;
    var requestURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=" + cam + "&sol=" + sol + "&api_key=TSkGELpa7xcQPZrZL8umXnXvAAqweK0Ec60hcWmj";
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    //sorts through object and pushes photos into array
    request.onload = function(response) {
        var data = request.response;
        photo_holder = []; //array holiding photos
        for (var i = 0; i < data.photos.length; i++) {

            photo_holder.push(data.photos[i].img_src); // adds to array
        }

        addPageImage(photo_holder);
        document.getElementById("info").innerHTML = ("photos found" + photo_holder.length) //shows amount of photos found for day
    };



} //end of function load and fetch

//displays first image after fetch

function addPageImage(data) {
    c = 0;
    var load_image = document.getElementById('mars_pic').src = data[c];
document.getElementById("info").innerHTML = ("photo number:"+c)
}
//move upwards through array of images
function up() {

    c++;
    var load_new_image = document.getElementById('mars_pic').src = photo_holder[c];

document.getElementById("info").innerHTML = ("photo number:"+c)
}
//move downwards through array of images
function down() {

    c--;
    var load_new_image = document.getElementById('mars_pic').src = photo_holder[c];

document.getElementById("info").innerHTML = ("photo number:"+c)//align numbers

}
