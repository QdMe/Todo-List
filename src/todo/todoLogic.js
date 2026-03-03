import { app } from "../todoApp";
import { buildProjectPage } from "../project/projectLogic";

export const createTodo = (e) => {
  const createTodoDialog = document.querySelector("#create-todo");
  const createTodoForm = document.querySelector("#create-todo form");
  const todoTitle = document.querySelector("#todo-title");
  const description = document.querySelector("#todo-desc");
  const date = "Tomorrow";
  const priority = document.querySelector("#priority");
  app
    .getProject(app.activeProject)
    .addTodo(todoTitle.value, description.value, date, priority.value, true);
  createTodoDialog.close();
  e.preventDefault();
  createTodoForm.reset();
  buildProjectPage(app.activeProject);
};
export const deleteTodo = (e) => {
  const todoId = e.target.todoId;
  app.getProject(app.activeProject).deleteTodo(todoId);
  buildProjectPage();
  e.stopPropagation();
};
