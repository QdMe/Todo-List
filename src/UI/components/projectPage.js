import { displayTodos } from "./todoList";
import { getActiveProject } from "../../project/projectLogic";
import { handleAddNewTodoBtn } from "../handlers/todoHandlers";
import { hasTodos } from "../../project/projectLogic";
const content = document.querySelector(".content");

export const buildProjectPage = () => {
  displayProjectHeader();
  if (hasTodos(getActiveProject())) {
    displayTodos(getActiveProject());
  }
  displayAddNewToDoBtn();
};

function displayProjectHeader() {
  const projectHeader = document.createElement("div");
  projectHeader.className = "project-header";
  const projectTitle = document.createElement("div");
  projectTitle.className = "project-title";
  projectTitle.textContent = `${getActiveProject().title}`;
  projectHeader.appendChild(projectTitle);
  content.appendChild(projectHeader);
}
function displayAddNewToDoBtn() {
  const addTodoBtn = document.createElement("button");
  addTodoBtn.classList.add("add-todo-btn");
  addTodoBtn.textContent = "+ New Task";
  handleAddNewTodoBtn(addTodoBtn);
  content.appendChild(addTodoBtn);
}

export function resetPage() {
  content.innerHTML = "";
}
