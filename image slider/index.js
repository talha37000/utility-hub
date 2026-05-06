const btnEl = document.querySelector(".fa-angle-right");
const btnEl2 = document.querySelector(".fa-angle-left");
const imgEl = document.querySelector(".image-container");
const imgAll = document.querySelectorAll(".image-container img");
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
    });

    dotsContainer.appendChild(dot);
});

btnEl.addEventListener("click", () => {
    currentImg++;
    clearTimeout(abc);
    updateImg();
});

btnEl2.addEventListener("click", () => {
    currentImg--;
    clearTimeout(abc);
    updateImg();
});

updateImg();

function updateImg() {
    if (currentImg > imgAll.length) {
        currentImg = 1;
    } else if (currentImg < 1) {
        currentImg = imgAll.length;
    }

    const imgWidth = imgAll[0].clientWidth;

    imgEl.style.transform = `translateX(-${(currentImg - 1) * imgWidth}px)`;

    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));

    if (dots[currentImg - 1]) {
        dots[currentImg - 1].classList.add("active");
    }

    abc = setTimeout(() => {
        currentImg++;
        updateImg();
    }, 4000);
}