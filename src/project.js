import { TodoItem } from "./todoItem";
export class Project {
  #toDos = [];
  constructor(title) {
    this.title = title;
  }
  addTodo(todo) {
    this.#toDos.push(todo);
    console.log(`Task added to ${this.title}`);
  }
  showAllTodos() {
    this.#toDos.forEach((todo) => console.table(todo));
  }
  deleteTodo(todo) {
    const todosAfterDeletion = this.#toDos.filter((todoInArray) => {
      todoInArray !== todo;
    });
    this.#toDos = todosAfterDeletion;
  }
}
