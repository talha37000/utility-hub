const buttons = document.querySelectorAll("button");
const display = document.getElementById("result");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            display.value = "";
        }
        else if (value === "=") {
            calculate();
        }
        else if (value === "DEL") {
            display.value = display.value.slice(0, -1);
        }
        else {
            // Limit characters to prevent screen overflow
            if (display.value.length < 12) {
                display.value += value;
            }
        }
    });
});

function calculate() {
    try {
        // eval can be dangerous, but for a basic calculator it works.
        // We ensure it only handles valid math characters.
        const result = eval(display.value);

        if (result === Infinity || isNaN(result)) {
            display.value = "Error";
        } else {
            // Handle long decimals
            display.value = Number.isInteger(result) ? result : result.toFixed(4);
        }
    } catch (error) {
        display.value = "Syntax Error";
        setTimeout(() => display.value = "", 1500);
    }
}