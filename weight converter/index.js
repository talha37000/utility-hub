const inpEl = document.getElementById("number");
const errorEl = document.getElementById("error");


const kgRes = document.getElementById("kg-res");
const gmRes = document.getElementById("gm-res");
const ozRes = document.getElementById("oz-res");

let errorTimeout;

function updateWeight() {
    const pounds = parseFloat(inpEl.value);

    if (isNaN(pounds) || pounds === 0) {
        clearResults();
        errorEl.innerText = "";
        return;
    }

    if (pounds < 0) {
        errorEl.innerText = "Value cannot be negative!";
        clearResults();

        clearTimeout(errorTimeout);
        errorTimeout = setTimeout(() => {
            errorEl.innerText = "";
            inpEl.value = "";
        }, 2000);
    } else {
        errorEl.innerText = "";

        kgRes.innerText = (pounds * 0.453592).toFixed(2);

        gmRes.innerText = Math.round(pounds * 453.592);

        ozRes.innerText = (pounds * 16).toFixed(2);
    }
}

function clearResults() {
    kgRes.innerText = "0.00";
    gmRes.innerText = "0";
    ozRes.innerText = "0.00";
}

inpEl.addEventListener("input", updateWeight);