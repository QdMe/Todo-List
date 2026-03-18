import { getActiveProject, getAllProjects } from "../project/projectLogic";

export const createNewTodo = (
  todoTitle,
  description,
  date,
  priority,
  projectUnder,
) => {
  getActiveProject().addTodo(
    todoTitle.value,
    description.value,
    date.value,
    priority.value,
    projectUnder,
  );
  console.log(getActiveProject());
};

export function deleteTodo(todoId) {
  getActiveProject().deleteTodo(todoId);
}

export function getTodos(project) {
  return project.getTodos();
}
export function getAllTodosOfAllProjects() {
  let todos = [];
  for (const project of getAllProjects()) {
    project.getTodos().forEach((todo) => {
      todos.push(todo);
    });
  }
  return todos;
}
export function getTodoById(todoId) {
  return getActiveProject()
    .getTodos()
    .find((todo) => {
      return todoId === todo.id;
    });
}
export function updateActiveTodoDetails(title, description, date, priority) {
  getActiveProject().activeTodo.title = title;
  getActiveProject().activeTodo.description = description;
  getActiveProject().activeTodo.date = date;
  getActiveProject().activeTodo.priority = priority;
}
export function updateActiveTodo(todo) {
  getActiveProject().activeTodo = todo;
}
