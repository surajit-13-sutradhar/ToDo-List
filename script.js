document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput")
    const addTaskButton = document.getElementById("addTaskButton")
    const todoList = document.getElementById("todoList")

    // An empty array for storing the tasks
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    // Loop through the array and fill in tasks from localStorage
    tasks.forEach(task => renderTask(task))

    addTaskButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim()   //trim removes extTra spaces
        if(taskText === "") return
        
        // Object for tasks, has parameters like task, id, and completed or not status
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newTask)
        saveTasks()
        renderTask(newTask)
        todoInput.value = ""  //clear input
        console.log(tasks)  //returns 
        // : 
        // {id: 1729706103305, text: 'gello', completed: false}
        // length
        // : 
        // 1
        // [[Prototype]]
        // : 
        // Array(0)
    })

    // Rendering tasks in UI
    // As the page loads for the first time, we need to take the tasks from localstorage and store them in the task array. Then call this function in a loop and render those tasks  
    function renderTask(task) {
        console.log(task.text)
        const li = document.createElement("li")
        li.setAttribute("dataId", task.id)
        // 
        if(task.completed) li.classList.add("completed")
        li.innerHTML = `
        <span class="taskText">${task.text}</span>
        <button class="deleteButton">Delete</button>
        <button class="updateButton">Update</button>
        `
        // Con
        li.addEventListener("click", (e) => {
            if(e.target.tagName === "BUTTON") return
            task.completed = !task.completed
            li.classList.toggle("completed")
            saveTasks()
        })

        li.querySelector(".deleteButton").addEventListener("click", (e) => {
            e.stopPropagation    //event bubbling, prevent toggle from firing
            // filter array
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTasks()
        })
        todoList.appendChild(li)
    }

    li.querySelector(".updateButton").addEventListener("click", (e) => {
        e.stopPropagation()
        const newTaskText = prompt("Update your task:", task.text)
        if(newTaskText && newTaskText.trim() !== "") {
            task.text = newTaskText.trim()
            li.querySelector(".taskText").textContent = task.text
            saveTasks()
        }

    })


    // function to add tasks array to localStorage

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks))  //this writes the array into the local storage each time it is called
    }
})