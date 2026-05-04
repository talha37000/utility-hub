const btnEl = document.getElementById("calculate");
const inpEl = document.getElementById("birthday");
const resultContainer = document.getElementById("result-container");


const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");

function updateAge() {
    const birthValue = inpEl.value;

    if (birthValue === "") {
        alert("Please enter your birthday");
        return;
    }

    const { years, months, days } = calculateDetailedAge(birthValue);


    yearsEl.innerText = years;
    monthsEl.innerText = months;
    daysEl.innerText = days;


    resultContainer.classList.remove("hidden");
}

function calculateDetailedAge(birthValue) {
    const today = new Date();
    const birthDate = new Date(birthValue);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // If day difference is negative, borrow days from the previous month
    if (days < 0) {
        months--;

        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    // If month difference is negative, borrow months from the year
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

btnEl.addEventListener("click", updateAge);

inpEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") updateAge();
});