var slides = ["slide1","slide2","slide3","slide4"]
var element = document.getElementById(slides[0])
var i = 0;
setInterval(function myFunction() {
        i++;
        element.classList.remove("active");
        element = document.getElementById(slides[i]);
        element.classList.add("active");
        if (i==3){
            i=-1;
        }
},3000);
