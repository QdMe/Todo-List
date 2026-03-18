export class Todo {
  constructor(title, description, date, priority, projectUnder) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.projectUnder = projectUnder;
  }
}
