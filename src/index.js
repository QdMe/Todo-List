import { app } from "./todoApp";
import { Project } from "./project";
import { TodoItem } from "./todoItem";

app.addProject("Default");
app.addProject("My first project");
const firstTodo = new TodoItem(
  "Default",
  "My first todo!",
  "Hey, this is my first task here.",
  "today",
  "high",
);
const firstTodoInFirstProject = new TodoItem(
  "My first project",
  "My first todo in this new project!",
  "Hey, this is my first task here.",
  "tomorrow",
  "medium",
);
app.projects[0].deleteTodo(firstTodoInFirstProject);
app.projects.forEach((project) => {
  project.showAllTodos();
});
console.log(firstTodoInFirstProject.projectUnder);
