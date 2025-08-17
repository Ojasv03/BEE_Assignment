const filtersContainer = document.getElementById("filters");
const form = document.getElementById("task-form");
const todoContainer = document.getElementById("todos-Container");
const clearButton = document.getElementById("clear-btn");

getAllTodos(); // get todos and renders it when js loads

todoContainer.addEventListener("click",async (e)=>{
    const btnClass = e.target.className;
    if(btnClass != "delete" && btnClass != "status") return; 

    const todoId = e.target.parentElement.id;

    if(btnClass == "delete"){
        const res = await axios.delete(`http://localhost:3000/todo/delete/${todoId}`);
    }

    if(btnClass == "status"){
        const res = await axios.put(`http://localhost:3000/todo/update/${todoId}`);
    }

    getAllTodos();
})

async function getAllTodos() {
    const res = await axios.get("http://localhost:3000/todo/all");
    const todos = res.data.todos;
    renderTodos(todos);
}

function renderTodos(todos) {
    todoContainer.innerHTML = "";    // clears the conatiner first and then push the yask in it
    for (let todo of todos){
        const div = document.createElement("div");
        div.className = "todo";
        div.innerHTML = `<h3>${todo.task}</h3> <div id=${todo._id}>
        <button class="status">${todo.status ? "Undo" : "Complete"}</button>
        <button class="delete">Delete</button>
        </div>`
        todoContainer.prepend(div);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();  // to stop page refresh on submit 
    const input = form.children[0];
    const task = input.value;
    const res = await axios.post("http://localhost:3000/todo/create", {
        task: task
    })
    input.value = ""; 
    getAllTodos();
})

async function getFilterTodos(filterName){
    let res = await axios.get(`http://localhost:3000/todo/filter` , {
        params:{
            filterName:filterName
        }
    })

    let todos = res.data.todos;
    renderTodos(todos);
}

filtersContainer.addEventListener("click", (e) => {
    const btnID = e.target.id;
    const allBtns = filtersContainer.children;

    if (btnID == "all") {
        getFilterTodos("all");
        e.target.className = "active";
        allBtns[1].className = "";
        allBtns[2].className = "";
    } else if (btnID == "active") {
        getFilterTodos("active");
        e.target.className = "active";
        allBtns[0].className = "";
        allBtns[2].className = "";
    } else if (btnID == "completed") {
        getFilterTodos("completed");
        e.target.className = "active";
        allBtns[0].className = "";
        allBtns[1].className = "";
    }
})

clearButton.addEventListener("click" , async()=>{
    await axios.delete(`http://localhost:3000/todo/clear`);
    getAllTodos();
})
