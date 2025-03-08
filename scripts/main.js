document.addEventListener("DOMContentLoaded", () => {
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("nav");
    hamButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        hamButton.classList.toggle("open");
    });

    // footer
    document.getElementById("currentyear").textContent =
        new Date().getFullYear();
    document.getElementById(
        "lastModified"
    ).textContent = `Last Modified: ${document.lastModified}`;

});




/* Navigation bar active function
var navigation = document.getElementsByTagName('nav');
var options = navigation.getElementsByTagName ('a');

for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    });
}*/