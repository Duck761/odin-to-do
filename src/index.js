function Task(title, description, dueDate, priority, completed, project) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.completed = false;
  this.project = project;
}

function Project(title, tasks, selected) {
  this.title = title;
  this.tasks = tasks;
  this.selected = selected;
}

let projects = [];
const projectsList = document.getElementById("projects-list");
const addProjectButton = document.getElementById("add-project-button");
let projectTitles = document.getElementsByClassName("project-title");
let projectContainers = document.getElementsByClassName("project-container");
let selectedProject = null;
const projectNameHeader = document.getElementById("project-name-header");
const addTaskButton = document.getElementById("add-task-button");
const mainContent = document.getElementById("main-content");
let taskContainer;
let taskTitles = document.getElementsByClassName("task-title");
let priority;
let taskContainers = document.getElementsByClassName("task-container");


function renderMainContent(index) {
  projectNameHeader.textContent = projectContainers[index].firstChild.textContent;
  addTaskButton.textContent = "Add task"
  addTaskButton.style.display = "block";
}


function renderProjects() {
  projectsList.innerHTML = "";
  projects.forEach((project) => {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    projectContainer.innerHTML = `<div class="project-title">${project.title}</div>`;
    projectNameHeader.textContent = '';
    addTaskButton.textContent = '';
    for (let i = 0; i < document.getElementsByClassName("task-container").length; i++) {
      document.getElementsByClassName("task-container")[i].remove();
    }
    projectsList.appendChild(projectContainer);
  });
}
function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}
function loadProjects() {
  let projectsString = localStorage.getItem("projects");
  if (projectsString) {
    projects = JSON.parse(projectsString);
    saveProjects();
    renderProjects();
    getSelectedProject();
  }
}
loadProjects();

function setPriorityColor() {
  for (let i = 0; i < taskTitles.length; i++) {
    if (priority === "low") {
      taskTitles[i].style.color = "lightgreen";
    } else if (priority === "medium") {
      taskTitles[i].style.color = "yellow";
    } else if (priority === "high") {
      taskTitles[i].style.color = "red";
    }
  }
}

function getSelectedProject() {
  for (let i = 0; i < projectContainers.length; i++) {
    projectContainers[i].addEventListener("click", () => {
      for (let j = 0; j < projectContainers.length; j++) {
        projectContainers[j].classList.remove("selected-project");
        // Remove all tasks from main content
        for (let k = 0; k < document.getElementsByClassName("task-container").length; k++) {
          document.getElementsByClassName("task-container")[k].remove();
        }
      }
      projectContainers[i].classList.add("selected-project");
      selectedProject = projectContainers[i];
      renderMainContent(i);
      // Render tasks
      projects[i].tasks.forEach((task) => {
        renderTasks(task);
        setPriorityColor();
      })
    }); 
  }
}
function addProject(title) {
  let project = new Project(title, [], false);
  if (projects.find((project) => project.title === title)) {
    alert("Project already exists");
    return;
  }
  projects.push(project);
  renderProjects();
  getSelectedProject();
}

addProjectButton.addEventListener("click", () => {
  const title = prompt("Project title:");
  addProject(title);
  saveProjects();
});
function completeTask() {
  for (let i = 0; i < taskContainers.length; i++) {
    taskContainers[i].addEventListener("click", () => {
      taskContainers[i].remove();
    })
  }
}

function renderTasks(task) {
  taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  taskContainer.innerHTML += `<h2 class="task-title">${task.title}</h2>`;
  taskContainer.innerHTML += `<div class="task-description">${task.description}</div>`;
  taskContainer.innerHTML += `<div class="task-due-date">${task.dueDate}</div>`;
  mainContent.appendChild(taskContainer);
  completeTask();
}

addTaskButton.addEventListener("click", () => {
  const title = prompt("Task title:");
  const description = prompt("Task description:");
  const dueDate = prompt("Task due date (mm/dd/yyyy):");
  priority = prompt("Task priority (low, medium, high):");
  const completed = false;
  const project = selectedProject.firstChild.textContent;
  if (!title || !description || !dueDate || !priority || !project) {
    alert("Please fill in all fields");
    return;
  }
  if (priority !== "low" && priority !== "medium" && priority !== "high") {
    alert("Please enter a valid priority");
    return;
  }

  const date = dueDate.split("/");
  if (date.length !== 3) {
    alert("Please enter a valid due date");
    return;
  }
  const task = new Task(title, description, dueDate, priority, completed, project);
  projects.find((project) => project.title === selectedProject.firstChild.textContent).tasks.push(task);
  renderTasks(task);
  setPriorityColor();
  saveProjects();
})

