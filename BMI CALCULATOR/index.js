const btnEL = document.getElementById("btn");
const inpEl = document.getElementById("bmivalue");
const condition = document.getElementById("weightCONDITION");
function calculateBmi() {
    const Cweight = document.getElementById("weight").value;
    const Cheight = document.getElementById("height").value / 100;

    const bmi = Cweight / (Cheight * Cheight);
    inpEl.value = bmi;

    if (bmi < 18.5) {
        condition.innerText = "Under Weight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        condition.innerText = "Normal Weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
        condition.innerText = "Over Weight";
    } else if (bmi >= 30) {
        condition.innerText = "obesity";
    }
}

btnEL.addEventListener("click", calculateBmi);