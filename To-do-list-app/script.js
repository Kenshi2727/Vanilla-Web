// select dom eles
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];


//save todos
function saveTodos() {
    // localstorage logic
    localStorage.setItem('todos', JSON.stringify(todos));
}

// create a dom node <li></li> for todo object and append it to list 
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    // checkbox toggle for completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // !!->operator used to convert values(like string) to boolean
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        //visual feedback: Strike-through when todo completed
        textSpan.style.textDecoration = todo.completed ? 'line-through' : "";

        saveTodos();//saving todos
    });

    // text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';

    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }
    // double click event listener to edit todo
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // delete todo
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();//rendering updated list
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;//returning the node
}

// render todos list
function render() {
    list.innerHTML = '';//removes old list so that new list can be addded for render

    // recreate each item that is adding items to render list
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index)
        list.appendChild(node)
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return;
    }

    // push new todo object
    todos.push({
        text,
        completed: false,
    });
    input.value = '';
    render();
    saveTodos();
}


addBtn.addEventListener("click", addTodo);// calling add todo
input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
})
render();// initial render