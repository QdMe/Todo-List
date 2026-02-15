import { app } from "./todoApp";
export class TodoItem {
  #completed = false;
  constructor(projectUnder, title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectUnder = projectUnder;
  }
  isCompleted() {
    this.#completed = true;
    console.log("Task completed!");
  }
  get projectUnder() {
    return this._projectUnder;
  }

  set projectUnder(project_title) {
    if (this.#projectExisits(project_title)) {
      app.projects.forEach((project) => {
        if (project_title == project.title) {
          project.addTodo(this);
          this._projectUnder = project.title;
        }
      });
    } else {
      throw Error(`There exsist no project called ${projectName} `);
    }
  }

  // This is a private function used when
  // creating a new todo task to check if the project name given already exists
  #projectExisits(projectName) {
    for (let i = 0; i < app.projects.length; i++) {
      if (app.projects[i].title == projectName) {
        return true;
      }
    }
    return false;
  }
}
