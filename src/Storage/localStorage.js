import { app } from "../app/todoApp";
import { createNewProject, getAllProjects } from "../project/projectLogic";
import { getAllTodosOfAllProjects } from "../todo/todoLogic";

export function saveProjectsLocally() {
  localStorage.setItem(`projects`, JSON.stringify(app.projects));
}
export function retriveSavedProjects() {
  const retrivedProjects = JSON.parse(localStorage.getItem("projects")) || [];
  retrivedProjects.forEach((project) => {
    createNewProject(project.title);
  });
}
export function saveTodosLocally() {
  localStorage.setItem(`todos`, JSON.stringify(getAllTodosOfAllProjects()));
}
function retriveTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}
export function hydrateProjectsWithTodos() {
  retriveTodos().forEach((todo) => {
    getAllProjects().forEach((project) => {
      if (todo.projectUnder === project.title) {
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
}
