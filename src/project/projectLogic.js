import { app } from "../todoApp";
import trashIcon from "../assests/icons/trash.png";
import pencilIcon from "../assests/icons/pencil.png";
import { deleteTodo, createTodo } from "../todo/todoLogic";
const projectsList = document.querySelector("#projects-list");

export const deleteProject = (btnId) => {
  const projectId = btnId;
  app.deleteProject(projectId);
  updateSideBar();
  // Switch to the first project after deleting a project and if there is no projects left just clear the display
  if (app.projects.length > 0) {
    app.activeProject = app.projects[0].title;
    buildProjectPage();
  } else {
    const content = document.querySelector(".content");
    content.innerHTML = "";
  }
  saveProjectsLocally();
};
// Create a div project element to hold the projct title and the delete button inside
const displayProjectElements = () => {
  // The holder of the project title and the delete button
  const project = document.createElement("div");
  project.classList.add("project");

  // The project title
  const projectTitle = document.createElement("div");
  projectTitle.classList.add("project-name");
  projectTitle.addEventListener("click", (e) => {
    app.activeProject = e.target.getAttribute("projectTitle");
    buildProjectPage();
  });

  // The delete button
  const delProjBtn = document.createElement("button");
  delProjBtn.className = "trash-icon";
  delProjBtn.addEventListener("click", (e) => {
    deleteProject(delProjBtn.id);
    e.stopPropagation();
  });
  const trash_icon = document.createElement("img");
  trash_icon.src = trashIcon;

  // Add # before project title
  const hashSign = document.createElement("div");
  hashSign.id = "hash";
  hashSign.textContent = "# ";

  // Appending
  delProjBtn.appendChild(trash_icon);
  project.append(hashSign, projectTitle, delProjBtn);
  projectsList.appendChild(project);

  return { projectTitle, delProjBtn };
};

// Display project function for saved projects
export const displaySavedProjects = (project) => {
  const { projectTitle, delProjBtn } = displayProjectElements();
  projectTitle.textContent = `${project.title}`;
  projectTitle.setAttribute("projectTitle", `${project.title}`);
  delProjBtn.id = `${app.getProjectId(project.title)}`;
};

// Display project function for user inputed data using form
export const displayProject = () => {
  // Select the project title input in the form to later extract its value
  const project_title_form = document.querySelector("#project-title");
  // If a non empty value is entered as a project title, go ahead and create a new project
  if (project_title_form.value.length > 1) {
    app.addProject(project_title_form.value);
    saveProjectsLocally(); // *
    const { projectTitle, delProjBtn } = displayProjectElements();
    projectTitle.textContent = `${project_title_form.value}`; // *
    projectTitle.setAttribute("projectTitle", `${project_title_form.value}`); // *
    delProjBtn.id = `${app.getProjectId(project_title_form.value)}`; // *
    // Set active project to the newly created project and display it
    app.activeProject = project_title_form.value;
    buildProjectPage();
  }
};

// Used inside deleteProject() to update project listed
export const updateSideBar = () => {
  const sideBar = document.querySelector(".side-bar #projects-list");
  sideBar.innerHTML = "";

  if (app.projects.length > 0) {
    for (const project of app.projects) {
      const { projectTitle, delProjBtn } = displayProjectElements();
      projectTitle.textContent = `${project.title}`;
      projectTitle.setAttribute("projectTitle", `${project.title}`);
      delProjBtn.id = `${app.getProjectId(project.title)}`;
    }
  }
};
export const buildProjectPage = () => {
  // displaying todos of the caller of the buildProjectPage function after resting the content
  const content = document.querySelector(".content");
  content.innerHTML = "";
  // Displaying the name of the project in the top
  const projectHeader = document.createElement("div");
  projectHeader.className = "project-header";
  const projectTitle = document.createElement("div");
  projectTitle.className = "project-title";
  projectTitle.textContent = `${app.activeProject}`;
  projectHeader.appendChild(projectTitle);
  content.appendChild(projectHeader);

  displayTodos();

  const createTodoDialog = document.querySelector("#create-todo");

  //  Handling "add to do btn"
  const addTodoBtn = document.createElement("button");

  // If project has no todos, show button at the bottom,else at the top
  if (app.getProject(app.activeProject).getTodos().length == 0) {
    content.appendChild(addTodoBtn);
  } else {
    projectHeader.appendChild(addTodoBtn);
    addTodoBtn.classList.add("top-corner");
  }
  addTodoBtn.classList.add("add-todo-btn");
  addTodoBtn.textContent = "+ New Task";
  addTodoBtn.addEventListener("click", () => {
    createTodoDialog.showModal();
  });

  // Handling the createTodoDialog form
  const addTodoBtn_form = document.querySelector("#create-todo .add-btn");
  addTodoBtn.removeEventListener("click", createTodo);
  addTodoBtn_form.addEventListener("click", createTodo);
};

// Those for the edit btn down
const editTodoDialog = document.querySelector("#edit-todo");

const todoTitle_form = document.querySelector(
  "#edit-todo form #todo-title-edit",
);
const description_form = document.querySelector(
  "#edit-todo form #todo-desc-edit",
);
const date_form = document.querySelector("#edit-todo form #date-edit");
const priority_form = document.querySelector("#priority-edit");

// Disply todos of a project
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
    const checkboxContainer = document.createElement("div");
    checkboxContainer.className = "custom-checkbox";
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

    // Edit todo btn
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.todoId = `${todoObj.id}`;
    const pencil_icon = document.createElement("img");
    pencil_icon.src = pencilIcon;
    editBtn.appendChild(pencil_icon);

    editBtn.addEventListener("click", (e) => {
      //This is just to show the current details of the todo before editing
      const todoEdit = app
        .getProject(app.activeProject)
        .getTodos()
        .find((todo) => {
          return todo.id === todoObj.id;
        });
      app.getProject(app.activeProject).activeTodo = todoEdit;
      todoTitle_form.value = todoEdit.title;
      description_form.value = todoEdit.description;
      date_form.value = todoEdit.dueDate;
      priority_form.value = todoEdit.priority;
      // Show the form for the edit
      editTodoDialog.showModal();
    });

    // Delete todo btn
    const trashBtn = document.createElement("button");
    trashBtn.className = "trash-btn";
    const trash_icon = document.createElement("img");
    trash_icon.src = trashIcon;
    trashBtn.appendChild(trash_icon);
    trashBtn.todoId = todoObj.id;
    trashBtn.addEventListener("click", deleteTodo);

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
    description.textContent = todoObj.description;
    // specifics
    const specifics = document.createElement("div");
    specifics.className = "specifics";
    // Date
    const dateWrapper = document.createElement("div");
    dateWrapper.className = "dateWrapper";
    // const dateLabel = document.createElement("div");
    // dateLabel.htmlFor = "date-select";
    // dateLabel.textContent = "Date:";
    const dateValue = document.createElement("div");
    dateValue.textContent = todoObj.dueDate;
    // Priority
    const priorityWrapper = document.createElement("div");
    priorityWrapper.className = "priorityWrapper";
    // const priorityLabel = document.createElement("div");
    // priorityLabel.textContent = "Priority: ";
    const priorityValue = document.createElement("div");
    priorityValue.textContent = todoObj.priority;
    if (todoObj.dueDate !== "") {
      dateWrapper.append(dateValue);
      specifics.appendChild(dateWrapper);
    }
    if (todoObj.priority !== "") {
      priorityWrapper.append(priorityValue);
      specifics.appendChild(priorityWrapper);
    }

    // Final appending
    details.append(description, specifics);
    todo.append(header, details);
    todoItems.appendChild(todo);
    content.appendChild(todoItems);
  });
}

const saveProjectsLocally = () => {
  localStorage.setItem(`projects`, JSON.stringify(app.projects));
};
export const retriveProjects = () => {
  return JSON.parse(localStorage.getItem("projects")) || [];
};
