const imgEl = document.querySelector(".slider");
const rightEl = document.querySelector(".fa-angles-right");
const leftEl = document.querySelector(".fa-angles-left");
const imgAll = document.querySelectorAll(".slider img");
const dotEl = document.querySelector(".dots");
let indx = 1;
let abc;

imgAll.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
        indx = index + 1;
        clearTimeout(abc);
        updateImg();
    })
    dotEl.appendChild(dot);
})

rightEl.addEventListener("click", () => {
    indx++;
    clearTimeout(abc);
    updateImg();
})
leftEl.addEventListener("click", () => {
    indx--;
    clearTimeout(abc);
    updateImg();
})
updateImg();
function updateImg() {
    if (indx > imgAll.length) {
        indx = 1;
    } else if (indx < 1) {
        indx = imgAll.length;
    }
    imgEl.style.transform = `translateX(-${(indx - 1) * imgEl.clientWidth}px)`;
    const dots1 = document.querySelectorAll(".dot");
    dots1.forEach(dot => dot.classList.remove("active"));
    dots1[indx - 1].classList.add("active");
    abc = setTimeout(() => {
        indx++;
        updateImg();
    }, 4000);
}
window.addEventListener('resize', () => {
    updateImg(); // Re-calculates width on resize
});