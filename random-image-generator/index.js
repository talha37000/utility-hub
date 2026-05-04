const imgEl = document.querySelector(".img-container");

const btnEl = document.querySelector(".btn");
let abc = 10;
btnEl.addEventListener("click", () => {
    updateimg();
    abc;
})

function updateimg() {
    for (let index = 0; index < abc; index++) {

        const newImgs = document.createElement("img");
        newImgs.src = `https://picsum.photos/300/300?random=${(Math.floor(Math.random() * 2000))}`

        imgEl.appendChild(newImgs);
    }

}