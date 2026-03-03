import "./styles.css";
import { displayProject } from "./project/projectLogic";
// Listening for a new project creation
const addProjectBtn = document.querySelector(".add-project-btn");
export const addProjectDialog = document.querySelector("#add-project-dialog");
const addBtn_form = addProjectDialog.querySelector(".add-btn");
addProjectBtn.addEventListener("click", () => addProjectDialog.showModal());
addBtn_form.addEventListener("click", displayProject);

// app.addProject("Default");
// app
//   .getProject("Default")
//   .addTodo("Welcome", "This is my first todo", "today", "high", true);
// // console.table(app.getProject("Default").getTodos());
// //
// app.addProject("Hi");
// app
//   .getProject("Hi")
//   .addTodo("Hi", "This is my first todo", "today", "Low", true);

// app
//   .getProject("Hi")
//   .addTodo("Hi", "This is my first todo", "today", "Low", true);
// console.table(app.getProject("Hi").getTodos());
