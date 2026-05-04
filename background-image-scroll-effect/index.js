const bgImgEl = document.getElementById("bg-image");

window.addEventListener("scroll", () => {
    updateimg();
})

function updateimg() {
    bgImgEl.style.opacity = 1 - window.pageYOffset / 800;
    bgImgEl.style.backgroundSize = 120 - window.pageYOffset / 12 + "%";
}