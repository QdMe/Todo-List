export class TodoItem {
  constructor(title, description, dueDate, priority, projectUnder) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.projectUnder = projectUnder;
  }
}
