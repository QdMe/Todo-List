export class TodoItem {
  isCompleted = false;
  constructor(title, description, dueDate, priority, isCompleted) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.id = crypto.randomUUID();
  }
  set isCompleted(state) {
    if (state == true) {
      this.isCompleted = "Completed";
    } else if (state == false) {
      this.isCompleted = "Not yet";
    } else {
      throw Error("Completetion state can only be true or false!");
    }
  }
  get isCompleted() {
    return this.isCompleted;
  }
}
