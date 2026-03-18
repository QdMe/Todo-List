import pencilIcon from "../../assests/icons/pencil.png";
import trashIcon from "../../assests/icons/trash.png";
import {
  handelEditTodoBtn,
  handleDeleteTodoBtn,
  handleTodoCheckBox,
} from "../handlers/todoHandlers";

const content = document.querySelector(".content");
// Those for the edit btn down
const todoTitle_form = document.querySelector(
  "#edit-todo form #todo-title-edit",
);
const description_form = document.querySelector(
  "#edit-todo form #todo-desc-edit",
);
const date_form = document.querySelector("#edit-todo form #date-edit");
const priority_form = document.querySelector("#priority-edit");

export function displayTodos(project) {
  const todoItems = document.createElement("div");
  todoItems.className = "todos";
  const todos = project.getTodos();
  todos.forEach((todo) => {
    const todoElem = document.createElement("div");
    todoElem.className = "todo";
    // header
    const header = document.createElement("div");
    header.className = "header";
    // Title
    const titleWrapper = document.createElement("div");
    titleWrapper.className = "title";
    // Checkbox
    const checkboxContainer = document.createElement("div");
    checkboxContainer.className = "custom-checkbox";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "title";
    checkbox.todoId = `${todo.id}`;
    handleTodoCheckBox(checkbox);

    // lable for checkbox which is the title of todo
    const title = document.createElement("label");
    title.htmlFor = "title";
    title.textContent = todo.title;

    // Buttons
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.className = "buttonsWrapper";

    // Edit todo btn
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.todoId = `${todo.id}`;
    const pencil_icon = document.createElement("img");
    pencil_icon.src = pencilIcon;
    editBtn.appendChild(pencil_icon);
    handelEditTodoBtn(editBtn);

    // Delete todo btn
    const trashBtn = document.createElement("button");
    trashBtn.className = "trash-btn";
    const trash_icon = document.createElement("img");
    trash_icon.src = trashIcon;
    trashBtn.appendChild(trash_icon);
    trashBtn.todoId = todo.id;
    handleDeleteTodoBtn(trashBtn);
    // appending
    checkboxContainer.appendChild(checkbox);
    titleWrapper.append(checkboxContainer, title);
    buttonsWrapper.append(editBtn, trashBtn);
    header.append(titleWrapper, buttonsWrapper);

    // Details
    const details = document.createElement("div");
    details.className = "details";
    // Description
    const description = document.createElement("div");
    description.className = "desc";
    description.textContent = todo.description;
    // specifics
    const specifics = document.createElement("div");
    specifics.className = "specifics";
    // Date
    const dateWrapper = document.createElement("div");
    dateWrapper.className = "dateWrapper";
    const dateValue = document.createElement("div");
    dateValue.textContent = todo.date;
    // Priority
    const priorityWrapper = document.createElement("div");
    priorityWrapper.className = "priorityWrapper";
    const priorityValue = document.createElement("div");
    priorityValue.textContent = todo.priority;
    if (todo.dueDate !== "") {
      dateWrapper.append(dateValue);
      specifics.appendChild(dateWrapper);
    }
    if (todo.priority !== "") {
      priorityWrapper.append(priorityValue);
      specifics.appendChild(priorityWrapper);
    }

    // Final appending
    details.append(description, specifics);
    todoElem.append(header, details);
    todoItems.appendChild(todoElem);
    content.appendChild(todoItems);
  });
}
export function displayTodoDetailsInForm(todo) {
  todoTitle_form.value = todo.title;
  description_form.value = todo.description;
  date_form.value = todo.date;
  priority_form.value = todo.priority;
}
