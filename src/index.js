const task = (title, description, dueDate, priority, notes) => {
  return { title, description, dueDate, priority, notes };
};
const defaultProject = document.getElementById("default-project");
const newProjectButton = document.getElementById("new-project-button");

let projectsList = [];
let selectedProject = "Inbox";

let allProjectTitles = document.getElementsByClassName("project-item-title");

newProjectButton.addEventListener("click", () => {
  newProjectButton.style.display = "none";

  const newProjectConfigContainer = document.createElement("div");
  newProjectConfigContainer.style.marginTop = "10px";
  document
    .getElementById("projects-list")
    .appendChild(newProjectConfigContainer);

  const newProjectNameInput = document.createElement("input");
  newProjectNameInput.setAttribute("type", "text");
  newProjectNameInput.setAttribute("placeholder", "Project name");
  newProjectNameInput.setAttribute("class", "new-project-name");
  newProjectNameInput.style.padding = "10px";
  newProjectNameInput.style.width = "100%";
  newProjectNameInput.style.fontSize = "15px";
  newProjectNameInput.style.border = "0px";
  newProjectNameInput.style.borderRadius = "7.5px";
  newProjectConfigContainer.appendChild(newProjectNameInput);

  const newProjectButtonsContainer = document.createElement("div");
  newProjectButtonsContainer.style.display = "flex";
  newProjectButtonsContainer.style.gap = "10px";
  newProjectConfigContainer.appendChild(newProjectButtonsContainer);

  const addButton = document.createElement("button");
  addButton.innerHTML = "Add";
  addButton.setAttribute("class", "add-button");
  addButton.style.backgroundColor = "#86efac";
  newProjectConfigContainer.appendChild(addButton);

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("class", "cancel-button");
  cancelButton.innerHTML = "Cancel";
  cancelButton.style.backgroundColor = "#fca5a5";
  let projectButtons = [addButton, cancelButton];
  for (let i = 0; i < projectButtons.length; i++) {
    projectButtons[i].style.width = "50%";
    projectButtons[i].style.marginTop = "10px";
    projectButtons[i].style.height = "35px";
    projectButtons[i].style.fontSize = "15px";
    projectButtons[i].style.borderRadius = "7.5px";
    projectButtons[i].style.border = "0px";
    projectButtons[i].style.color = "white";
    projectButtons[i].style.fontWeight = "bold";
    projectButtons[i].style.cursor = "pointer";
    projectButtons[i].style.outline = "none";
    newProjectButtonsContainer.appendChild(projectButtons[i]);
  }
  cancelButton.addEventListener("click", () => {
    newProjectConfigContainer.remove();
    newProjectButton.style.display = "block";
  });

  addButton.addEventListener("click", () => {
    const projectName = newProjectNameInput.value;
    if (projectName === "") {
      newProjectNameInput.style.border = "1px solid red";
      return;
    } else {
      newProjectNameInput.style.border = "0px";
    }
    // Check if the project name exists
    for (let i = 0; i < projectsList.length; i++) {
      if (projectName.toUpperCase() === projectsList[i].toUpperCase()) {
        newProjectNameInput.style.border = "1px solid red";
        return;
      }
    }
    newProjectConfigContainer.remove();
    newProjectButton.style.display = "block";
    const newProject = document.createElement("li");
    newProject.setAttribute("class", "project-item");
    document.getElementById("projects-list").appendChild(newProject);

    const newProjectTitle = document.createElement("h3");
    newProjectTitle.setAttribute(`id`, `${projectName}-title`);
    newProjectTitle.textContent = projectName;
    newProjectTitle.setAttribute("class", "project-item-title");
    newProject.appendChild(newProjectTitle);
    projectsList.push(projectName);
    console.log(`projects: ${projectsList}`);
    for (let i = 0; i < allProjectTitles.length; i++) {
      allProjectTitles[i].addEventListener("click", () => {
        selectedProject = allProjectTitles[i].id.split("-")[0];
        console.log(`selected project: ${allProjectTitles[i].id}`);
        // Change the selected project background color to green and the others to white
        for (let j = 0; j < allProjectTitles.length; j++) {
          allProjectTitles[j].style.backgroundColor = "#f1f1f1";
        }
        allProjectTitles[i].style.backgroundColor = "#e6e6e6";

        let mainContentProjectTitle = document.getElementById('project-title')
        mainContentProjectTitle.textContent = selectedProject;
      });
    }
  });
});
