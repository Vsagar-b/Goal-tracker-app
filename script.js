let goals = JSON.parse(localStorage.getItem("goals")) || [];

function addGoal() {
    const text = document.getElementById("goalInput").value;
    const deadline = document.getElementById("deadlineInput").value;
    const image = document.getElementById("imageInput").value;

    if (text === "") {
        alert("Enter a goal");
        return;
    }

    const goal = {
        id: Date.now(),
        text,
        deadline,
        image,
        completed: false
    };

    goals.push(goal);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
}

function renderGoals() {
    const list = document.getElementById("goalList");
    list.innerHTML = "";

    goals.forEach(goal => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="${goal.completed ? 'completed' : ''}">
                <strong>${goal.text}</strong><br>
                📅 ${goal.deadline || "No deadline"}
            </div>

            ${goal.image ? `<img src="${goal.image}" class="goal-img">` : ""}

            <div>
                <button onclick="toggleGoal(${goal.id})">✔</button>
                <button onclick="deleteGoal(${goal.id})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });
}

function toggleGoal(id) {
    goals = goals.map(g =>
        g.id === id ? { ...g, completed: !g.completed } : g
    );
    saveAndRender();
}

function deleteGoal(id) {
    goals = goals.filter(g => g.id !== id);
    saveAndRender();
}

renderGoals();