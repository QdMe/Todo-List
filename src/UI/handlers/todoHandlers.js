import { showEditTodoDialog, showTodoDialog } from "../components/dialogs";
import {
  deleteTodo,
  getTodoById,
  updateActiveTodo,
} from "../../todo/todoLogic";
import { buildProjectPage, resetPage } from "../components/projectPage";
import { saveTodosLocally } from "../../Storage/localStorage";
import { displayTodoDetailsInForm } from "../components/todoList";

export function handleAddNewTodoBtn(btn) {
  btn.addEventListener("click", showTodoDialog);
}

export function handleDeleteTodoBtn(btn) {
  btn.addEventListener("click", (e) => {
    deleteTodo(e.currentTarget.todoId);
    resetPage();
    buildProjectPage();
    saveTodosLocally();
  });
}
export function handleTodoCheckBox(checkbox) {
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked === true) {
      deleteTodo(e.target.todoId);
      resetPage();
      buildProjectPage();
      e.stopPropagation();
      saveTodosLocally();
    }
  });
}
export function handelEditTodoBtn(btn) {
  btn.addEventListener("click", (e) => {
    const todoToBeEdited = getTodoById(e.currentTarget.todoId);
    updateActiveTodo(todoToBeEdited);
    displayTodoDetailsInForm(todoToBeEdited);
    showEditTodoDialog();
  });
}
