import { handleDeleteProjectBtn } from "../handlers/projectHandlers";
import { getAllProjects, getProjectByTitle } from "../../project/projectLogic";
import { handleProjectClick } from "../handlers/projectHandlers";
import trashIcon from "../../assests/icons/trash.png";

const sideBar = document.querySelector(".side-bar #projects-list");
const projectsList = document.querySelector("#projects-list");

export function displaySavedProjects() {
  getAllProjects().forEach((project) => {
    displayProject(getProjectByTitle(project.title));
  });
}
export const displayProject = (project) => {
  // The holder of the project title and the delete button
  const projectWrapper = document.createElement("div");
  projectWrapper.classList.add("project");

  // displayProjectNameInSideBar(project);
  const projectTitle = document.createElement("div");
  projectTitle.classList.add("project-name");
  projectTitle.textContent = `${project.title}`; // *
  projectTitle.setAttribute("projectTitle", `${project.title}`); // *
  handleProjectClick(projectTitle);

  // The delete button
  const delProjBtn = document.createElement("button");
  delProjBtn.className = "trash-icon";
  delProjBtn.id = `${project.id}`; // *
  handleDeleteProjectBtn(delProjBtn);
  const trash_icon = document.createElement("img");
  trash_icon.src = trashIcon;

  // Add # before project title
  const hashSign = document.createElement("div");
  hashSign.id = "hash";
  hashSign.textContent = "# ";

  // Appending
  delProjBtn.appendChild(trash_icon);
  projectWrapper.append(hashSign, projectTitle, delProjBtn);
  projectsList.appendChild(projectWrapper);
};
export const updateSideBar = () => {
  sideBar.innerHTML = "";
  getAllProjects().forEach((project) => {
    displayProject(project);
  });
};
