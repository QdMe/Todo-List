import "./styles.css";
import { displaySavedProjects } from "./UI/components/sideBar";
import {
  hydrateProjectsWithTodos,
  retriveSavedProjects,
} from "./Storage/localStorage";
import { createNewProject, isProjectsEmpty } from "./project/projectLogic";
import { activateFormEventListeners } from "./UI/components/forms";
activateFormEventListeners();
retriveSavedProjects();
hydrateProjectsWithTodos();
if (isProjectsEmpty()) {
  createNewProject("Get started");
}
displaySavedProjects();
