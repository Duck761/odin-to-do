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

eval("function Task(title, description, dueDate, priority, notes, completed) {\r\n  this.title = title;\r\n  this.description = description;\r\n  this.dueDate = dueDate;\r\n  this.priority = priority;\r\n  this.notes = notes;\r\n  this.completed = completed;\r\n}\r\n\r\nfunction Project(title, tasks, selected) {\r\n  this.title = title;\r\n  this.tasks = tasks;\r\n  this.selected = selected;\r\n}\r\n\r\nlet projects = [];\r\nconst projectsList = document.getElementById(\"projects-list\");\r\nconst addProjectButton = document.getElementById(\"add-project-button\");\r\nlet projectTitle = document.getElementsByClassName(\"project-title\");\r\nlet projectContainers = document.getElementsByClassName(\"project-container\");\r\n\r\nfunction renderProjects() {\r\n  projectsList.innerHTML = \"\";\r\n  projects.forEach((project) => {\r\n    const projectContainer = document.createElement(\"div\");\r\n    projectContainer.classList.add(\"project-container\");\r\n    projectContainer.innerHTML = `<div class=\"project-title\">${project.title}</div>`;\r\n    projectsList.appendChild(projectContainer);\r\n  });\r\n}\r\n\r\nfunction addProject(title) {\r\n  let newProject = new Project(title, [], false);\r\n  if (projects.find((project) => project.title === title)) {\r\n    alert(\"Project already exists\");\r\n    return;\r\n  }\r\n  projects.push(newProject);\r\n  renderProjects();\r\n  for (let i = 0; i < projectContainers.length; i++) {\r\n    projectContainers[i].addEventListener(\"click\", () => {\r\n      for (let j = 0; j < projectContainers.length; j++) {\r\n        projectContainers[j].classList.remove(\"selected-project\");\r\n      }\r\n      projectContainers[i].classList.add(\"selected-project\");\r\n    }); \r\n  }\r\n}\r\n\r\naddProjectButton.addEventListener(\"click\", () => {\r\n  const title = prompt(\"Project title:\");\r\n  addProject(title);\r\n});\n\n//# sourceURL=webpack://odin-to-do/./src/index.js?");

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