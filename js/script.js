const box = document.querySelector(".box");
const inputText = document.querySelector(".todo__text");
let todos = null;

const initApp = () => {
    getTodos().then((data) => {
        if (data) {
            todos = data;
            todos.forEach((todo) => renderToPage(todo));
        }
    });
};
const renderToPage = (todo) => {
    const todoItemEl = document.createElement("div");
    todoItemEl.classList.add("todo__item");
    todoItemEl.dataset.id = todo.id;

    const textEl = document.createElement("p");
    textEl.classList.add("todo__text");
    textEl.textContent = todo.title;

    const checkBoxEl = document.createElement("input");
    checkBoxEl.classList.add("todo__checkbox");
    checkBoxEl.type = "checkbox";
    checkBoxEl.checked = todo.completed;
    checkBoxEl.addEventListener("change", changeStatus);

    const delBtnEl = document.createElement("button");
    delBtnEl.classList.add("todo__del-btn");
    delBtnEl.textContent = "DELETE";

    todoItemEl.appendChild(checkBoxEl);
    todoItemEl.appendChild(textEl);
    todoItemEl.appendChild(delBtnEl);

    box.prepend(todoItemEl);
};

const getTodos = async () => {
    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (err) {
        box.innerHTML = "Error: unable to fetch data";
        throw new Error(err);
    }
};

const delTodo = async (e) => {
    const parentEl = e.target.closest(".todo__item");
    if (parentEl && e.target.classList.contains("todo__del-btn")) {
        const todoId = parentEl.dataset.id;
        try {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/todos/" + todoId,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.ok) {
                delTodoFromUI(todoId);
            }
        } catch (err) {
            throw new Error(err);
        }
    }
};
const delTodoFromUI = (todoId) => {
    todos = todos.filter((todo) => todo.id !== +todoId);
    const todo = document.querySelector(`[data-id="${todoId}"]`);
    todo.remove();
};
/* function changeStatus() {
    console.log(this);
} */
const changeStatus = async (e) => {
    const todoId = e.target.parentElement.dataset.id;
    const completed = e.target.checked;
    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/todos/" + todoId,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed,
                }),
            }
        );
        if (res.ok) {
            todos = todos.map((todo) => {
                if (todo.id === +todoId) {
                    return { ...todo, completed };
                } else {
                    return todo;
                }
            });
        }
        console.log(await res.json());
    } catch (err) {
        console.error(err);
    }
};

const addTodo = async () => {
    const text = inputText.value;
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({ title: text, completed: false, userId: 4 }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const newTodo = await res.json();
    renderToPage(newTodo);
    inputText.value = "";
};
document.querySelector(".todo__add-btn").addEventListener("click", addTodo);
box.addEventListener("click", delTodo);
document.addEventListener("DOMContentLoaded", initApp);
