 var photo_holder=[]
 var c=1
function getData(){

  
    var sol = document.getElementById("sol").value;
    var cam = document.getElementById("cam").value;
    var requestURL="https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera="+cam+"&sol="+sol+"&api_key=TSkGELpa7xcQPZrZL8umXnXvAAqweK0Ec60hcWmj";
    var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

    request.onload = function(response){
         var  data=request.response;
         photo_holder=[]; //array holiding photos
            for(var i = 0;i < data.photos.length;i++){
                
                    photo_holder.push(data.photos[i].img_src);
                }
               
                  addPageImage(photo_holder) 
                 
            };
         


 } //end of function load
 
   function addPageImage(data){
       
       var load_image=document.getElementById('mars_pic').src=data[c];
  
   }
  
   function browseImages(){
     
       c++
      var load_new_image= document.getElementById('mars_pic').src=photo_holder[c];
  }

  
 


