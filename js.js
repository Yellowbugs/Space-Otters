

returnHome = function(){

    var url = document.URL, 
        index = url.indexOf("#"),
        hash = index != -1 ? url.substring(index+1) : "";
        console.log(hash);

    if(hash != ""){
        location.hash = "#Home";
        window.scrollTo(0,0);
        
    }
}

function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("nftPics").src = images[x];
}
var images = [], x = -1;
          images[0] = "pink.png";
          images[1] = "orange.png";
          images[2] = "purple.png";
          images[3] = "yellow.png";
          images[4] = "green.png";

function startTimer() {
    setInterval(displayNextImage, 500);
}



function mintClicked (){
    alert("hello");
}
