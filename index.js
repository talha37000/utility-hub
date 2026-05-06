const imgEl = document.querySelector(".slider");
const imgAll = document.querySelectorAll(".slider img");
const dotContainer = document.querySelector(".dots");
const rightBtn = document.querySelector(".fa-angles-right");
const leftBtn = document.querySelector(".fa-angles-left");

let indx = 0;
let timer;

// 1. Generate the dots based on the number of images
function initDots() {
    dotContainer.innerHTML = ""; // Ensure it's empty before starting
    imgAll.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active"); // First dot starts active

        // Add click event to each dot
        dot.addEventListener("click", () => {
            indx = i;
            updateSlider();
        });
        dotContainer.appendChild(dot);
    });
}

// 2. The main update function
function updateSlider() {
    // Handle boundaries
    if (indx >= imgAll.length) indx = 0;
    if (indx < 0) indx = imgAll.length - 1;

    // Use percentage move for smooth responsiveness
    imgEl.style.transform = `translateX(-${indx * 100}%)`;

    // Update Dot active states
    const allDots = document.querySelectorAll(".dot");
    allDots.forEach((dot, i) => {
        if (i === indx) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });

    // Reset the auto-play timer whenever a move happens
    startAutoPlay();
}

// 3. Controls
function startAutoPlay() {
    clearInterval(timer);
    timer = setInterval(() => {
        indx++;
        updateSlider();
    }, 5000); // 5 seconds per slide
}

rightBtn.addEventListener("click", () => {
    indx++;
    updateSlider();
});

leftBtn.addEventListener("click", () => {
    indx--;
    updateSlider();
});

// INITIALIZE
initDots();
startAutoPlay();