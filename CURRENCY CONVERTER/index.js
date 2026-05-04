const firstCurr = document.getElementById("currency-first");
const secondCurr = document.getElementById("currency-second");
const firstInp = document.getElementById("inp-first");
const secondInp = document.getElementById("inp-second");
const exchangeRate = document.getElementById("exchange-rate");
const swapBtn = document.getElementById("swap-btn");

// Your API Key
const API_KEY = "7dcc4f8b8caaaad5352b8481";

async function updateRate() {
    exchangeRate.innerText = "Updating...";

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${firstCurr.value}`);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.conversion_rates[secondCurr.value];
            exchangeRate.innerText = `1 ${firstCurr.value} = ${rate.toFixed(4)} ${secondCurr.value}`;
            secondInp.value = (firstInp.value * rate).toFixed(2);
        } else {
            exchangeRate.innerText = "Error fetching rates.";
        }
    } catch (error) {
        exchangeRate.innerText = "Connection lost.";
    }
}

// Swap currencies functionality
swapBtn.addEventListener("click", () => {
    const temp = firstCurr.value;
    firstCurr.value = secondCurr.value;
    secondCurr.value = temp;
    updateRate();
});

firstCurr.addEventListener("change", updateRate);
secondCurr.addEventListener("change", updateRate);
firstInp.addEventListener("input", updateRate);

// Initialize
updateRate();