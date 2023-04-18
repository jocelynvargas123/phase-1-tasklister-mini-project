//type task,click submit, and task string appears.

document.addEventListener("DOMContentLoaded", () =>{ 
  addingEventListeners()
})

let taskObjArr = []
//get form and attach listener event
function addingEventListeners(){
  document
    .getElementById("create-task-form")
    .addEventListener("submit", handleFormSubmit)
  document.getElementById("sort-tasks").addEventListener("change",sortTasks)
}


function handleFormSubmit(e) {
  e.preventDefault()
  // console.log (e)
  const task = e.target[0].value
  const priorityLevel = parseInt(e.target.priority.value)

  const taskObj = {task,priorityLevel}
  taskObjArr.push(taskObj)
  sortTasks()
  displayTasks(task, priorityLevel)
  
}


//get task to display
function displayTasks(){
  const taskUl = document.getElementById("tasks")
  taskUl.innerHTML = ""

  taskObjArr.forEach((task) => {
      const taskLi = document.createElement("li")
      const deleteBtn = document.createElement("button")

      deleteBtn.textContent = "x"
      deleteBtn.addEventListener("click", (e) => deleteTask(e,task))

      taskLi.textContent = task.task + " "
      taskLi.style.color = getPriorityColor(task.priorityLevel)
      taskLi.appendChild(deleteBtn)
      taskUl.appendChild(taskLi)
  })
}


// Delete button
function deleteTask(e, task){
  console.log(e)
  taskObjArr = taskObjArr.filter((element) => element.task !== task.task)
  e.target.parentNode.remove() 
}

//colors based on priority
function getPriorityColor(priorityLevel){
  if (priorityLevel === 1){
    return "purple"
  } else if (priorityLevel === 2){
    return "blue"
  } else { 
    return "red"
  }
}

function sortTasks() {
  console.log("in sortTasks")
  const sortTasksSelect = document.getElementById("sort-tasks")
  if (sortTasksSelect.value === "l-h"){
    taskObjArr.sort((a,b) => a.priorityLevel - b.priorityLevel)
  } else {
    taskObjArr.sort((a,b) => b.priorityLevel - a.priorityLevel)
  }
  console.log(taskObjArr)
  displayTasks()
}