function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.getElementById("btnScrollToTop").addEventListener("click", scrollToTop);

window.addEventListener("scroll", function() {
    var button = document.getElementById("btnScrollToTop");
    if (window.scrollY > 700) {
        button.classList.remove("hidden");
        button.classList.add("show");
    } else {
        button.classList.remove("show");
        button.classList.add("hidden");
    }
});