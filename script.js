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
  const task = document.createElement("div");
  task.classList.add("task", "roundBorder");
  task.addEventListener("click", changeTaskStatus);
  task.textContent = value;
  taskList.prepend(task);
  event.target.reset(); // Reset the form
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
