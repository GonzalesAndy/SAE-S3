var button = document.getElementById("playButton");
var navbar = document.getElementById('nav')
var footer = document.getElementById('footerButton');
button.onclick = function() {
    button.style.display = "none";
    navbar.style.display = "none";
    footer.style.display = "none";
    document.querySelectorAll("canvas").forEach(function(elem) {
        elem.style.visibility = "visible";
    });
};