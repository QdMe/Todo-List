import { TodoItem } from "../todo/todoItem";
export class Project {
  #toDos = [];
  constructor(title) {
    this.title = title;
    this.id = crypto.randomUUID();
  }
  addTodo(title, description, dueDate, priority, isCompleted) {
    this.#toDos.push(
      new TodoItem(title, description, dueDate, priority, isCompleted),
    );
    // console.log(`Task added to ${this.title}`);
  }
  getTodos() {
    return this.#toDos;
  }
  deleteTodo(todoId) {
    // Loop over all todos of current project if a todo with the same to id given found
    // Find the index of that todo and delete it
    for (const todo of this.#toDos) {
      if (todoId == todo.id) {
        const todoIndex = this.#toDos.findIndex((item) => {
          return todoId === item.id; // Gotchaa: u need to use return in arrow functions
        });
        this.#toDos.splice(todoIndex, 1); // starting from the index fount, remove 1 item
      }
    }
  }
  updateTitle(newTitle) {
    this.title = newTitle;
  }
}
