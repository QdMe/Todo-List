import { app } from "../todoApp";
import { buildProjectPage } from "../project/projectLogic";

export const createTodo = (e) => {
  const createTodoDialog = document.querySelector("#create-todo");
  const createTodoForm = document.querySelector("#create-todo form");
  const todoTitle = document.querySelector("#create-todo form #todo-title");
  const description = document.querySelector("#create-todo form #todo-desc");
  const date = document.querySelector("#create-todo form #date");
  const priority = document.querySelector("#priority");
  app
    .getProject(app.activeProject)
    .addTodo(
      todoTitle.value,
      description.value,
      date.value,
      priority.value,
      app.activeProject,
    );

  createTodoDialog.close();
  e.preventDefault();
  createTodoForm.reset();
  buildProjectPage(app.activeProject);
  // Save todo in storage
  saveTodosLocally();
};
export const deleteTodo = (e) => {
  const todoId = e.target.todoId;
  app.getProject(app.activeProject).deleteTodo(todoId);
  buildProjectPage();
  e.stopPropagation();
  // Update todo in storage
  saveTodosLocally();
};

export const editTodo = (e) => {
  const editTodoDialog = document.querySelector("#edit-todo");
  const editTodoForm = document.querySelector("#edit-todo form");

  const todoTitle = document.querySelector("#edit-todo form #todo-title-edit");
  const description = document.querySelector("#edit-todo form #todo-desc-edit");
  const date = document.querySelector("#edit-todo form #date-edit");
  const priority = document.querySelector("#priority-edit");

  const currentTodo = app.getProject(app.activeProject).activeTodo;
  console.log(currentTodo);
  currentTodo.title = todoTitle.value;
  currentTodo.description = description.value;
  currentTodo.dueDate = date.value;
  currentTodo.priority = priority.value;
  editTodoDialog.close();
  e.preventDefault();
  editTodoForm.reset();
  buildProjectPage(app.activeProject);
  // Update todo in storage
  saveTodosLocally();
};
const saveTodosLocally = () => {
  let todosSaved = [];
  for (const project of app.projects) {
    project.getTodos().forEach((todo) => {
      todosSaved.push(todo);
    });
  }
  localStorage.setItem(`todos`, JSON.stringify(todosSaved));
};
export const retriveTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};
