import {
  createNewProject,
  getActiveProject,
  getProjectByTitle,
  updateActiveProject,
} from "../../project/projectLogic";
import {
  saveProjectsLocally,
  saveTodosLocally,
} from "../../Storage/localStorage";
import { createNewTodo, updateActiveTodoDetails } from "../../todo/todoLogic";
import {
  closeAddProjectDialog,
  closeEditTodoDialog,
  closeTodoDialog,
  resetProjectForm,
  resetTodoForm,
  showProjectDialog,
} from "./dialogs";
import { buildProjectPage, resetPage } from "./projectPage";
import { displayProject } from "./sideBar";

const projectForm = document.querySelector("#add-project-dialog form");
const todoForm = document.querySelector("#create-todo form");
const submit_form_edit = document.querySelector("#edit-todo .add-btn");

// Variables
const project_title = document.querySelector("#project-title");
// New todos
const todoTitle = document.querySelector("#create-todo form #todo-title");
const description = document.querySelector("#create-todo form #todo-desc");
const date = document.querySelector("#create-todo form #date");
const priority = document.querySelector("#priority");
// edit todo
const todoTitleEdit = document.querySelector(
  "#edit-todo form #todo-title-edit",
);
const descriptionEdit = document.querySelector(
  "#edit-todo form #todo-desc-edit",
);
const dateEdit = document.querySelector("#edit-todo form #date-edit");
const priorityEdit = document.querySelector("#priority-edit");
// Buttons
const newProjectBtnPlus = document.querySelector(".add-project-btn");
const newProjectBtnForm = document.querySelector(
  "#add-project-dialog .add-btn",
);
const submitNewTodoBtn_Form = document.querySelector("#create-todo .add-btn");
const editTodoSaveBtn = document.querySelector("#edit-todo .add-btn");

export function activateFormEventListeners() {
  newProjectBtnPlus.addEventListener("click", showProjectDialog);

  newProjectBtnForm.addEventListener("click", (e) => {
    e.preventDefault();
    if (isValidProjectTitle(project_title)) {
      createNewProject(project_title.value);
      saveProjectsLocally();
      displayProject(getProjectByTitle(project_title.value));
      updateActiveProject(project_title.value);
      resetPage();
      buildProjectPage();
      closeAddProjectDialog();
      resetProjectForm();
    } else {
      projectForm.reportValidity();
    }
  });
  submitNewTodoBtn_Form.addEventListener("click", (e) => {
    e.preventDefault();
    if (todoForm.checkValidity()) {
      createNewTodo(
        todoTitle,
        description,
        date,
        priority,
        getActiveProject().title,
      );
      saveTodosLocally();
      resetPage();
      buildProjectPage();
      closeTodoDialog();
      resetTodoForm();
    } else {
      todoForm.reportValidity();
    }
  });
  editTodoSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    updateActiveTodoDetails(
      todoTitleEdit.value,
      descriptionEdit.value,
      dateEdit.value,
      priorityEdit.value,
    );
    saveTodosLocally();
    resetPage();
    buildProjectPage();
    closeEditTodoDialog();
  });
}
function isValidProjectTitle(title) {
  return title.validity.valid;
}
