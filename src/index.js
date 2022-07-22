function Task(title, description, dueDate, priority, notes, completed) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.notes = notes;
  this.completed = completed;
}

function Project(title, tasks, selected) {
  this.title = title;
  this.tasks = tasks;
  this.selected = selected;
}

let projects = [];
const projectsList = document.getElementById("projects-list");
const addProjectButton = document.getElementById("add-project-button");
let projectTitle = document.getElementsByClassName("project-title");
let projectContainers = document.getElementsByClassName("project-container");

function renderProjects() {
  projectsList.innerHTML = "";
  projects.forEach((project) => {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    projectContainer.innerHTML = `<div class="project-title">${project.title}</div>`;
    projectsList.appendChild(projectContainer);
  });
}

function addProject(title) {
  let newProject = new Project(title, [], false);
  if (projects.find((project) => project.title === title)) {
    alert("Project already exists");
    return;
  }
  projects.push(newProject);
  renderProjects();
  for (let i = 0; i < projectContainers.length; i++) {
    projectContainers[i].addEventListener("click", () => {
      for (let j = 0; j < projectContainers.length; j++) {
        projectContainers[j].classList.remove("selected-project");
      }
      projectContainers[i].classList.add("selected-project");
    }); 
  }
}

addProjectButton.addEventListener("click", () => {
  const title = prompt("Project title:");
  addProject(title);
});