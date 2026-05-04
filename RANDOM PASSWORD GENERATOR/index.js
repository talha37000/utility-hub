const btnEl = document.querySelector(".btn-generate");
const inpEl = document.getElementById("input");
const copyBtn = document.querySelector(".copy-btn");
const alertEl = document.getElementById("alert");
const slider = document.getElementById("length-slider");
const lengthVal = document.getElementById("length-val");
const strengthBar = document.getElementById("strength-bar");

// Update length text on slider move
slider.addEventListener("input", (e) => {
    lengthVal.innerText = e.target.value;
});

btnEl.addEventListener("click", () => {
    createPassword();
});

copyBtn.addEventListener("click", () => {
    if (inpEl.value) {
        copyPassword();
        showNotification();
    }
});

function createPassword() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+?:{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passLength = slider.value;
    let password = "";

    for (let i = 0; i < passLength; i++) {
        const random = Math.floor(Math.random() * chars.length);
        password += chars[random];
    }

    inpEl.value = password;
    updateStrength(passLength);
}

function updateStrength(len) {
    let width = (len / 32) * 100;
    strengthBar.style.width = width + "%";

    if (len < 12) {
        strengthBar.style.background = "#ff4d4d"; // Weak
    } else if (len < 20) {
        strengthBar.style.background = "#ffd900"; // Medium
    } else {
        strengthBar.style.background = "#00ff88"; // Strong
    }
}

function copyPassword() {
    inpEl.select();
    navigator.clipboard.writeText(inpEl.value);
}

function showNotification() {
    alertEl.classList.add("active");
    setTimeout(() => {
        alertEl.classList.remove("active");
    }, 2500);
}