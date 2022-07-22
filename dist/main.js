/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("function Task(title, description, dueDate, priority, completed, project) {\r\n  this.title = title;\r\n  this.description = description;\r\n  this.dueDate = dueDate;\r\n  this.priority = priority;\r\n  this.completed = false;\r\n  this.project = project;\r\n}\r\n\r\nfunction Project(title, tasks, selected) {\r\n  this.title = title;\r\n  this.tasks = tasks;\r\n  this.selected = selected;\r\n}\r\n\r\nlet projects = [];\r\nconst projectsList = document.getElementById(\"projects-list\");\r\nconst addProjectButton = document.getElementById(\"add-project-button\");\r\nlet projectTitles = document.getElementsByClassName(\"project-title\");\r\nlet projectContainers = document.getElementsByClassName(\"project-container\");\r\nlet selectedProject = null;\r\nconst projectNameHeader = document.getElementById(\"project-name-header\");\r\nconst addTaskButton = document.getElementById(\"add-task-button\");\r\nconst mainContent = document.getElementById(\"main-content\");\r\nlet taskContainer;\r\nlet taskTitles = document.getElementsByClassName(\"task-title\");\r\nlet priority;\r\nlet taskContainers = document.getElementsByClassName(\"task-container\");\r\n\r\n\r\nfunction renderMainContent(index) {\r\n  projectNameHeader.textContent = projectContainers[index].firstChild.textContent;\r\n  addTaskButton.textContent = \"Add task\"\r\n  addTaskButton.style.display = \"block\";\r\n}\r\n\r\n// Use localStorage to store projects\r\nfunction saveProjects() {\r\n  localStorage.setItem(\"projects\", JSON.stringify(projects));\r\n}\r\n\r\nfunction loadProjects() {\r\n  if (localStorage.getItem(\"projects\")) {\r\n    projects = JSON.parse(localStorage.getItem(\"projects\"));\r\n    renderProjects();\r\n    getSelectedProject();\r\n  }\r\n}\r\nloadProjects();\r\n\r\nfunction renderProjects() {\r\n  projectsList.innerHTML = \"\";\r\n  projects.forEach((project) => {\r\n    const projectContainer = document.createElement(\"div\");\r\n    projectContainer.classList.add(\"project-container\");\r\n    projectContainer.innerHTML = `<div class=\"project-title\">${project.title}</div>`;\r\n    projectNameHeader.textContent = '';\r\n    addTaskButton.textContent = '';\r\n    for (let i = 0; i < document.getElementsByClassName(\"task-container\").length; i++) {\r\n      document.getElementsByClassName(\"task-container\")[i].remove();\r\n    }\r\n    projectsList.appendChild(projectContainer);\r\n    saveProjects();\r\n  });\r\n}\r\n\r\nfunction getSelectedProject() {\r\n  for (let i = 0; i < projectContainers.length; i++) {\r\n    projectContainers[i].addEventListener(\"click\", () => {\r\n      for (let j = 0; j < projectContainers.length; j++) {\r\n        projectContainers[j].classList.remove(\"selected-project\");\r\n        for (let k = 0; k < document.getElementsByClassName(\"task-container\").length; k++) {\r\n          document.getElementsByClassName(\"task-container\")[k].remove();\r\n        }\r\n      }\r\n      projectContainers[i].classList.add(\"selected-project\");\r\n      selectedProject = projectContainers[i];\r\n      renderMainContent(i);\r\n      projects[i].tasks.forEach((task) => {\r\n        renderTasks(task);\r\n      })\r\n    }); \r\n  }\r\n}\r\nfunction addProject(title) {\r\n  let project = new Project(title, [], false);\r\n  if (projects.find((project) => project.title === title)) {\r\n    alert(\"Project already exists\");\r\n    return;\r\n  }\r\n  projects.push(project);\r\n  renderProjects();\r\n  getSelectedProject();\r\n}\r\n\r\naddProjectButton.addEventListener(\"click\", () => {\r\n  const title = prompt(\"Project title:\");\r\n  addProject(title);\r\n});\r\n\r\nfunction renderTasks(task) {\r\n  taskContainer = document.createElement(\"div\");\r\n  taskContainer.classList.add(\"task-container\");\r\n  taskContainer.setAttribute(`id`, `task-${task.title}`);\r\n  taskContainer.innerHTML = `<div class=\"task-title\">${task.title}</div>`;\r\n  taskContainer.innerHTML += `<div class=\"task-description\">${task.description}</div>`;\r\n  mainContent.appendChild(taskContainer);\r\n  document.getElementById(`task-${task.title}`).addEventListener(\"click\", () => {\r\n    let project = projects.find((project) => project.title === selectedProject.firstChild.textContent);\r\n    let taskIndex = project.tasks.findIndex((task) => task.title === task.title);\r\n    project.tasks.splice(taskIndex, 1);\r\n    document.getElementById(`task-${task.title}`).remove();\r\n    saveProjects();\r\n    console.log(projects);\r\n  })\r\n  \r\n  if (task.priority === \"high\") {\r\n    document.getElementById(`task-${task.title}`).style.color = \"red\";\r\n  } else if (task.priority === \"medium\") {\r\n    document.getElementById(`task-${task.title}`).style.color = \"orange\";\r\n  } else if (task.priority === \"low\") {\r\n    document.getElementById(`task-${task.title}`).style.color = \"green\";\r\n  }\r\n}\r\n\r\naddTaskButton.addEventListener(\"click\", () => {\r\n  const title = prompt(\"Task title:\");\r\n  const description = prompt(\"Task description:\");\r\n  const dueDate = prompt(\"Task due date (mm/dd/yyyy):\");\r\n  priority = prompt(\"Task priority (low, medium, high):\");\r\n  const completed = false;\r\n  const project = selectedProject.firstChild.textContent;\r\n  if (!title || !description || !dueDate || !priority || !project) {\r\n    alert(\"Please fill in all fields\");\r\n    return;\r\n  }\r\n  if (priority !== \"low\" && priority !== \"medium\" && priority !== \"high\") {\r\n    alert(\"Please enter a valid priority\");\r\n    return;\r\n  }\r\n\r\n  const date = dueDate.split(\"/\");\r\n  if (date.length !== 3) {\r\n    alert(\"Please enter a valid due date\");\r\n    return;\r\n  }\r\n  const task = new Task(title, description, dueDate, priority, completed, project);\r\n  projects.find((project) => project.title === selectedProject.firstChild.textContent).tasks.push(task);\r\n  renderTasks(task);\r\n  saveProjects();\r\n})\n\n//# sourceURL=webpack://odin-to-do/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;