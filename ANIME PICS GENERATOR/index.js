const btnEl = document.getElementById("btn");
const animeEl = document.querySelector(".anime-container");
const imageEl = document.querySelector(".anime-image");
const nameEl = document.querySelector(".anime-name");

btnEl.addEventListener("click", async function () {
    try {
        btnEl.innerText = "loading....."
        btnEl.disabled = true;
        nameEl.innerText = "Generating...."
        imageEl.src = "spinner.svg";
        const response = await fetch("https://nekos.best/api/v2/neko");
        const data = await response.json();
        imageEl.src = data.results[0].url;
        nameEl.innerText = data.results[0].artist_name;

        animeEl.style.display = "block";
        btnEl.innerText = "Generate Now";
        btnEl.disabled = false;

    } catch (error) {
        btnEl.innerText = "Generate Now";
        btnEl.disabled = false;
        nameEl.innerText = "Something Went Wrong";
        imageEl.src = "spinner.svg";
    }
})