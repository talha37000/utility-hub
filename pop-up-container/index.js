const containerEl = document.querySelector(".container");

const btnEl = document.querySelector(".btn");

const popupEl = document.querySelector(".popup-container");

const crossEl = document.querySelector(".fa-solid");

btnEl.addEventListener("click", () => {
    containerEl.classList.add("active");
    popupEl.classList.remove("active");
})

crossEl.addEventListener("click", () => {
    containerEl.classList.remove("active");
    popupEl.classList.add("active");
})