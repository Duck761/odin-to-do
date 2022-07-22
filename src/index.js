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

// Use localStorage to store projects
function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
  if (localStorage.getItem("projects")) {
    projects = JSON.parse(localStorage.getItem("projects"));
    renderProjects();
    getSelectedProject();
  }
}
loadProjects();

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
    saveProjects();
  });
}

function getSelectedProject() {
  for (let i = 0; i < projectContainers.length; i++) {
    projectContainers[i].addEventListener("click", () => {
      for (let j = 0; j < projectContainers.length; j++) {
        projectContainers[j].classList.remove("selected-project");
        for (let k = 0; k < document.getElementsByClassName("task-container").length; k++) {
          document.getElementsByClassName("task-container")[k].remove();
        }
      }
      projectContainers[i].classList.add("selected-project");
      selectedProject = projectContainers[i];
      renderMainContent(i);
      projects[i].tasks.forEach((task) => {
        renderTasks(task);
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
});

function renderTasks(task) {
  taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  taskContainer.setAttribute(`id`, `task-${task.title}`);
  taskContainer.innerHTML = `<div class="task-title">${task.title}</div>`;
  taskContainer.innerHTML += `<div class="task-description">${task.description}</div>`;
  mainContent.appendChild(taskContainer);
  document.getElementById(`task-${task.title}`).addEventListener("click", () => {
    let project = projects.find((project) => project.title === selectedProject.firstChild.textContent);
    let taskIndex = project.tasks.findIndex((task) => task.title === task.title);
    project.tasks.splice(taskIndex, 1);
    document.getElementById(`task-${task.title}`).remove();
    saveProjects();
    console.log(projects);
  })
  
  if (task.priority === "high") {
    document.getElementById(`task-${task.title}`).style.color = "red";
  } else if (task.priority === "medium") {
    document.getElementById(`task-${task.title}`).style.color = "orange";
  } else if (task.priority === "low") {
    document.getElementById(`task-${task.title}`).style.color = "green";
  }
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
  saveProjects();
})