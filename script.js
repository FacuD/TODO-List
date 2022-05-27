// Date info
const dateNumber = document.getElementById("dateNumber");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");
const dateWeekday = document.getElementById("dateWeekday");

// Tasks List
const taskList = document.getElementById("tasksList");

// Set the current date
const date = new Date();
dateNumber.textContent = date.toLocaleString("es", { day: "numeric" });
dateMonth.textContent = date.toLocaleString("es", { month: "short" });
dateYear.textContent = date.toLocaleString("es", { year: "numeric" });
dateWeekday.textContent = date.toLocaleString("es", { weekday: "long" });

const addNewTask = (event) => {
  event.preventDefault(); // Prevent the form from submitting
  const { value } = event.target.taskText; // Get the value of the input
  if (!value) return; // If the value is empty, don't do anything
  // Create the new task
  const task = document.createElement("div");
  const taskText = document.createElement("span");
  taskText.innerText = value;
  task.classList.add("task", "roundBorder");
  task.addEventListener("click", changeTaskStatus);
  task.append(taskText);
  // Create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton", "roundBorder");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", deleteTask);
  task.append(deleteButton);
  // Add the task to the list
  taskList.prepend(task);
  // Reset the form
  event.target.reset();
};

const deleteTask = (event) => {
  taskList.removeChild(event.target.parentElement);
};

const changeTaskStatus = (event) => {
  event.target.classList.toggle("done");
};

var orderUndoneFirst = true;

const orderTasks = () => {
  const done = [];
  const undone = [];
  taskList.childNodes.forEach((task) => {
    task.classList.contains("done") ? done.push(task) : undone.push(task);
  });
  if (orderUndoneFirst) {
    orderUndoneFirst = false;
    return [...undone, ...done];
  } else {
    orderUndoneFirst = true;
    return [...done, ...undone];
  }
};

const renderOrderedTasks = () => {
  orderTasks().forEach((task) => {
    taskList.appendChild(task);
  });
};
