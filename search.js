const tools = [
    {
        name: "Age Calculator",
        keywords: ["age", "age calculator", "dob"],
        image: "media/age calculator.png",
        link: "Age Calculator/index.html"
    },
    {
        name: "BMI Calculator",
        keywords: ["bmi", "health", "body mass"],
        image: "media/bmi calculator.png",
        link: "BMI CALCULATOR/INDEX.HTML"
    },
    {
        name: "Currency Converter",
        keywords: ["currency", "money", "exchange"],
        image: "media/currency convertor.png",
        link: "CURRENCY CONVERTER/INDEX.HTML"
    },
    {
        name: "Random Image Generator",
        keywords: ["image", "random", "photos"],
        image: "media/random image.png",
        link: "random-image-generator/index.html"
    },
    {
        name: "Password Generator",
        keywords: ["password", "security"],
        image: "media/random password.png",
        link: "RANDOM PASSWORD GENERATOR/index.html"
    },
    {
        name: "Basic Calculator",
        keywords: ["calculator", "basic calculator"],
        image: "media/basic calculator.png",
        link: "basic calculator/index.html"
    },
    {
        name: "Rock Paper Scissors ",
        keywords: ["game", "rock paper scissors", "rock paper scissors game"],
        image: "media/game.png",
        link: "GAME/index.html"
    },
    {
        name: "Weight Convertor",
        keywords: ["weight convertor", "convert weight", "weight"],
        image: "media/weight convertor.png",
        link: "weight converter/index.html"
    },
    {
        name: "To Do List",
        keywords: ["list", "to do list", "tasks"],
        image: "media/to do list.png",
        link: "To Do List/index.html"
    }
];



const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.toLowerCase() || "";

let results;

if (query === "tools" || query === "") {
    results = tools;
} else {
    results = tools.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.keywords.some(k => k.includes(query))
    );
}

const container = document.querySelector(".results");

if (!container) {
    console.error("No .results container found");
}

if (results.length === 0) {
    container.innerHTML = `
        <div class="no-results">
            <h2>We couldn’t find what you're looking for 🔍</h2>
            <p>Try different keywords or check your spelling.</p>
        </div>
    `;
} else {
    container.innerHTML = results.map(tool => `
        <div class="card">
            <a href="${tool.link}">
                <img src="${tool.image}">
                <h3>${tool.name}</h3>
                <button>Explore Now</button>
            </a>
        </div>
    `).join("");
}
