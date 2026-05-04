const btnEl = document.querySelector(".fa-angles-right");
const imgEl = document.querySelector(".image-container");
const btnEl2 = document.querySelector(".fa-angles-left");
const imgAll = document.querySelectorAll("img");
const dotsContainer = document.querySelector(".dots-container");

let currentImg = 1;

let abc;

imgAll.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    dot.addEventListener("click", () => {
        currentImg = index + 1;
        clearTimeout(abc);
        updateImg();
    })
    dotsContainer.appendChild(dot);
})


btnEl.addEventListener("click", () => {
    currentImg++;
    clearTimeout(abc);
    updateImg();

})
btnEl2.addEventListener("click", () => {
    currentImg--;
    clearTimeout(abc);
    updateImg();

})

updateImg();

function updateImg() {
    if (currentImg > imgAll.length) {
        currentImg = 1;
    } else if (currentImg < 1) {
        currentImg = imgAll.length;
    }
    imgEl.style.transform = `translateX(-${(currentImg - 1) * imgEl.clientWidth}px)`;
    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"))
    dots[currentImg - 1].classList.add("active");
    abc = setTimeout(() => {
        currentImg++;
        updateImg();
    }, 4000);

}