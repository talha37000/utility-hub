const formEl = document.querySelector(".form");
const inpEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");
const progressBar = document.getElementById("progress-bar");
const taskCount = document.getElementById("task-count");

let list = JSON.parse(localStorage.getItem("list")) || [];

// Load saved tasks
list.forEach(task => {
    createTodoElement(task);
});
updateStats();

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    if (inpEl.value.trim() === "") return;
    createTodoElement();
    updateLocalStorage();
});

function createTodoElement(task) {
    let taskText = inpEl.value;
    if (task) taskText = task.name;

    const liEl = document.createElement("li");
    if (task && task.checked) liEl.classList.add("checked");

    liEl.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="actions">
            <i class="fa-solid fa-square-check btn-check"></i>
            <i class="fa-solid fa-trash btn-delete"></i>
        </div>
    `;

    ulEl.appendChild(liEl);
    inpEl.value = "";

    // Toggle Check
    liEl.querySelector(".btn-check").addEventListener("click", () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    // Delete with smooth fade
    liEl.querySelector(".btn-delete").addEventListener("click", () => {
        liEl.style.transform = "translateX(20px)";
        liEl.style.opacity = "0";
        setTimeout(() => {
            liEl.remove();
            updateLocalStorage();
        }, 400); // Changed to 400ms for a snappier professional feel
    });
}

function updateStats() {
    const liItems = document.querySelectorAll("li");
    const total = liItems.length;
    const completed = document.querySelectorAll("li.checked").length;

    const percent = total === 0 ? 0 : (completed / total) * 100;
    progressBar.style.width = percent + "%";

    const pending = total - completed;
    taskCount.innerText = `${pending} tasks pending`;
}

function updateLocalStorage() {
    const liEls = document.querySelectorAll("li");
    const updatedList = [];

    liEls.forEach(liEl => {
        updatedList.push({
            name: liEl.querySelector(".task-text").innerText,
            checked: liEl.classList.contains("checked")
        });
    });

    localStorage.setItem("list", JSON.stringify(updatedList));
    updateStats();
}