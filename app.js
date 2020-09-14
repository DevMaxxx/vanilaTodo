const colors = ['blue', '#ffa400', 'green', 'red', '#00d669', '#530cff'];
let selectedColor = colors[0];
const todos = [];

const generateToDoTemplate = (text, color) => {
    const tr = document.createElement("tr");
    tr.style.background = color;

    const tdCheckbox = document.createElement("td");

    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = 'checkbox';
    inputCheckbox.onchange = () => {
        if (inputCheckbox.checked) {
            tr.classList.add("closed");
        } else {
            tr.classList.remove("closed");
        }
    }

    const tdLabel = document.createElement("td");
    tdLabel.innerText = text;

    tdCheckbox.appendChild(inputCheckbox);
    tr.appendChild(tdCheckbox);
    tr.appendChild(tdLabel);
    return tr;
}

const generateColorTemplate = (color) => {
    const inputColor = document.createElement("div");
    inputColor.classList.add("color");
    inputColor.style.background = color;
    inputColor.onclick = () => {
        selectedColor = color;
        document.querySelector(".color.active")?.classList.remove("active");
        inputColor.classList.add("active");
    }
    return inputColor;
}

colors.forEach(color => {
    document.querySelector("#colorsContainer").appendChild(generateColorTemplate(color));
});

document.querySelector("#addForm").onsubmit = (e) => {
    e.preventDefault();
    if( document.querySelector(".color.active")==undefined)
        selectedColor = colors[Math.round(Math.random() * (colors.length - 1))];
    const newTodo = { color: selectedColor, text: document.querySelector("#addText").value };
    const newTodoTemplate = generateToDoTemplate(newTodo.text, newTodo.color);
    document.querySelector("table").appendChild(newTodoTemplate);
    todos.push(newTodo);
    document.querySelector(".color.active")?.classList.remove("active");
    document.querySelector("#addText").value = "";
}