import { app } from "../todoApp";
import { addProjectDialog } from "../index";
import { deleteTodo, createTodo } from "../todo/todoLogic";
export const deleteProject = (e) => {
  const projectId = e.target.id;
  app.deleteProject(projectId);
  updateSideBar();
  e.stopPropagation();
  // Switch to the first project after deleting a project and if there is no projects left just clear the display
  if (app.projects.length > 0) {
    app.activeProject = app.projects[0].title;
    buildProjectPage();
  } else {
    const content = document.querySelector(".content");
    content.innerHTML = "";
  }
};
export const buildProjectPage = () => {
  //   // Saving the title in a variable to be used to displyTodos
  //   //   Selecting the content then displaying todos of the caller of the buildProjectPage function after resting the content
  const content = document.querySelector(".content");
  content.innerHTML = "";
  //   content.dataset.activeProject = projectTitle;
  displayTodos();

  //   Handling the createTodoDialog
  const createTodoDialog = document.querySelector("#create-todo");
  //  Handling "add to do btn"
  const addTodoBtn = document.createElement("button");
  content.appendChild(addTodoBtn);
  addTodoBtn.className = "add-todo-btn";
  addTodoBtn.textContent = "+ Add Todo";
  addTodoBtn.addEventListener("click", () => {
    createTodoDialog.showModal();
  });

  // Handling the createTodoDialog form
  const addTodoBtn_form = document.querySelector("#create-todo .add-btn");
  addTodoBtn.removeEventListener("click", createTodo);
  addTodoBtn_form.addEventListener("click", createTodo);
};
export const displayProject = (e) => {
  const projectsList = document.querySelector("#projects-list");
  const projectTitle = document.querySelector("#project-title");
  const addProjectForm = document.querySelector("#add-project-dialog form");

  if (projectTitle.value.length > 1) {
    app.addProject(projectTitle.value);
    const project = document.createElement("div");
    project.classList.add("project");
    project.textContent = `# ${projectTitle.value}`;
    project.setAttribute("projectTitle", `${projectTitle.value}`);

    project.addEventListener("click", (e) => {
      app.activeProject = e.target.getAttribute("projectTitle");
      buildProjectPage(app.activeProject);
    });

    // Create delete project btn
    const delProjBtn = document.createElement("button");
    delProjBtn.textContent = "Del";
    delProjBtn.id = `${app.getProjectId(projectTitle.value)}`;
    project.appendChild(delProjBtn);
    delProjBtn.addEventListener("click", deleteProject);

    projectsList.appendChild(project);
    e.preventDefault();
    addProjectDialog.close();
    addProjectForm.reset();
  }
};

export const updateSideBar = () => {
  const sideBar = document.querySelector(".side-bar #projects-list");
  sideBar.innerHTML = "";
  if (app.projects.length > 0) {
    for (const project of app.projects) {
      const projectsList = document.querySelector("#projects-list");
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project");
      projectDiv.textContent = `# ${project.title}`;
      projectDiv.setAttribute("projectTitle", `${project.title}`);

      projectDiv.addEventListener("click", (e) => {
        app.activeProject = e.target.getAttribute("projectTitle");
        buildProjectPage(app.activeProject);
      });

      // Create delete project btn
      const delProjBtn = document.createElement("button");
      delProjBtn.textContent = "Del";
      delProjBtn.id = `${app.getProjectId(project.title)}`;
      projectDiv.appendChild(delProjBtn);
      delProjBtn.addEventListener("click", deleteProject);

      projectsList.appendChild(projectDiv);
    }
  }
};

export function displayTodos() {
  const content = document.querySelector(".content");
  const todoItems = document.createElement("div");

  todoItems.className = "todos";
  const todoObjects = app.getProject(app.activeProject).getTodos();
  let todo;
  todoObjects.forEach((todoObj) => {
    todo = document.createElement("div");
    todo.className = "todo";

    // header
    const header = document.createElement("div");
    header.className = "header";
    // Title
    const titleWrapper = document.createElement("div");
    titleWrapper.className = "title";
    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "title";
    checkbox.name = "title";
    checkbox.todoId = `${todoObj.id}`;

    checkbox.addEventListener("click", (e) => {
      if (e.target.checked == true) {
        deleteTodo(e);
      }
    });

    // lable for checkbox which is the title of todo
    const title = document.createElement("label");
    title.htmlFor = "title";
    title.textContent = todoObj.title;

    // Buttons
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.className = "buttonsWrapper";
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    const trashBtn = document.createElement("button");
    trashBtn.textContent = "Delete";
    trashBtn.className = "trash-btn";
    trashBtn.todoId = `${todoObj.id}`;
    trashBtn.addEventListener("click", deleteTodo);

    // appending
    titleWrapper.append(checkbox, title);
    buttonsWrapper.append(editBtn, trashBtn);
    header.append(titleWrapper, buttonsWrapper);

    // Description
    const description = document.createElement("div");
    description.className = "desc";
    description.textContent = todoObj.description;
    // specifics
    const specifics = document.createElement("div");
    // Date
    const dateWrapper = document.createElement("div");
    dateWrapper.className = "dateWrapper";
    const dateLabel = document.createElement("label");
    dateLabel.htmlFor = "date-select";
    dateLabel.textContent = "Due date:";

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "date-select";
    dateInput.name = "date-select";
    // Priority
    const priorityWrapper = document.createElement("div");
    priorityWrapper.className = "priorityWrapper";
    const priorityLabel = document.createElement("label");
    priorityLabel.htmlFor = "priority-select";
    priorityLabel.textContent = "Priority:";
    // Priority-selects
    const priorities = document.createElement("select");
    priorities.name = "priorities";
    priorities.id = "priority-select";
    // Options
    const optHigh = document.createElement("option");
    optHigh.value = "high";
    optHigh.textContent = "High";
    const optMedium = document.createElement("option");
    optMedium.value = "medium";
    optMedium.textContent = "Medium";
    const optLow = document.createElement("option");
    optLow.value = "low";
    optLow.textContent = "Low";

    // appending
    priorities.append(optHigh, optMedium, optLow);
    dateWrapper.append(dateLabel, dateInput);
    priorityWrapper.append(priorityLabel, priorities);
    specifics.append(dateWrapper, priorityWrapper);
    // Final appending
    todoItems.append(header, description, specifics);
    content.appendChild(todoItems);
  });
}
