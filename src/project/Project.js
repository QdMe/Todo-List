import { Todo } from "../todo/Todo";
export class Project {
  #toDos = [];
  constructor(title) {
    this.title = title;
    this.id = crypto.randomUUID();
    this.activeTodo;
  }
  addTodo(title, description, dueDate, priority, projectUnder) {
    this.#toDos.push(
      new Todo(title, description, dueDate, priority, projectUnder),
    );
  }
  getTodos() {
    return this.#toDos;
  }
  deleteTodo(todoId) {
    // Loop over all todos of current project if a todo with the same to id given found
    // Find the index of that todo and delete it

    // Option one
    // const todoToDelete = this.#toDos.find((todo) => todo.id === todoId);
    // this.#toDos.splice(this.#toDos.findIndex(todoToDelete), 1);

    // Option two (cleaner)
    this.#toDos = this.#toDos.filter((todo) => todo.id !== todoId);
  }
  updateTitle(newTitle) {
    this.title = newTitle;
  }
}
