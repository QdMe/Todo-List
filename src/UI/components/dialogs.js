// Dialogs
const projectDialog = document.querySelector("#add-project-dialog");
const todoDialog = document.querySelector("#create-todo");
const editTodoDialog = document.querySelector("#edit-todo");
// Forms
const projectForm = document.querySelector("#add-project-dialog form");
const todoForm = document.querySelector("#create-todo form");
const submit_form_edit = document.querySelector("#edit-todo .add-btn");

// Project dialogs and form handlers
export function showProjectDialog() {
  projectDialog.showModal();
}
export function closeAddProjectDialog() {
  projectDialog.close();
}
export function resetProjectForm() {
  projectForm.reset();
}

// Todo dialog and forms handlers
export function showTodoDialog() {
  todoDialog.showModal();
}
export function closeTodoDialog() {
  todoDialog.close();
}
export function resetTodoForm() {
  todoForm.reset();
}

export function handleEditTodoForm() {
  submit_form_edit.removeEventListener("click", editTodo);
  submit_form_edit.addEventListener("click", editTodo);
}
export function showEditTodoDialog() {
  editTodoDialog.showModal();
}
export function closeEditTodoDialog() {
  editTodoDialog.close();
}
