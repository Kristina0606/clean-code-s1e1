const taskInput = document.getElementById("task-input");  
const addButton = document.querySelector(".addTask"); 
const todoTasks = document.querySelector(".todo-tasks");
const completedTasksHolder = document.querySelector(".completed-tasks");

function createNewTaskElement(taskString){
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = 'task';
    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task";
    editButton.innerText = "Edit"; 
    editButton.className = "edit";
    deleteButton.className = "delete";
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.alt = "delete-img";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

 function addTask() {
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);
    todoTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}

function editTask(){
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".edit");

    if (listItem.classList.contains("editMode")) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
};

function deleteTask(){
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
}

function taskCompleted(){
    const listItem = this.parentNode;
    listItem.querySelector('label').classList.add("completed-class");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete(){
    const listItem = this.parentNode;
    todoTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    listItem.querySelector('label').classList.remove("completed-class");
}

for (let i = 0; i < todoTasks.children.length; i++){
    bindTaskEvents(todoTasks.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++){
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler){
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");
    editButton.addEventListener('click', editTask);
    deleteButton.addEventListener('click', deleteTask);
    checkBox.onchange = checkBoxEventHandler;
}

addButton.addEventListener("click", addTask);