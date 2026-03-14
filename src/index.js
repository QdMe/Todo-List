import "./styles.css";
import { app } from "./todoApp";
import { displayProject } from "./project/projectLogic";
import { editTodo } from "./todo/todoLogic";
import { displaySavedProjects } from "./project/projectLogic";
import { retriveProjects } from "./project/projectLogic";
import { retriveTodos } from "./todo/todoLogic";
import { buildProjectPage } from "./project/projectLogic";

// Retrieve saved projects and save it to projects under app
retriveProjects().forEach((item) => {
  app.addProject(item.title);
});

// Display saved projects
app.projects.forEach((project) => {
  displaySavedProjects(app.getProject(project.title));
});

// Retrieve todos
retriveTodos().forEach((todo) => {
  app.projects.forEach((project) => {
    if (todo.projectUnder == project.title) {
      project.addTodo(
        todo.title,
        todo.description,
        todo.dueDate,
        todo.priority,
        todo.projectUnder,
      );
    }
  });
});

// Set up event listener on the plus sign to create a new project
const addProjectBtn = document.querySelector(".add-project-btn");
export const addProjectDialog = document.querySelector("#add-project-dialog");
const addProjectForm = document.querySelector("#add-project-dialog form");
const addBtn_form = addProjectDialog.querySelector(".add-btn");

addProjectBtn.addEventListener("click", () => addProjectDialog.showModal());

addBtn_form.addEventListener("click", (e) => {
  displayProject();
  e.preventDefault();
  addProjectDialog.close();
  addProjectForm.reset();
});

// Handling the editTodoDialog form
const submit_form_edit = document.querySelector("#edit-todo .add-btn");
submit_form_edit.removeEventListener("click", editTodo);
submit_form_edit.addEventListener("click", editTodo);

// Setting up a default project
app.addProject("Get started");
displaySavedProjects(app.getProject("Get started"));
buildProjectPage();
