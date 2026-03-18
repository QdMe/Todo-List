import {
  updateActiveProject,
  getProjectById,
  deleteProject,
  isProjectsEmpty,
} from "../../project/projectLogic";
import { saveProjectsLocally } from "../../Storage/localStorage";
import { updateSideBar } from "../components/sideBar";
import { resetPage, buildProjectPage } from "../components/projectPage"; //

export function handleProjectClick(btn) {
  btn.addEventListener("click", (e) => {
    updateActiveProject(e.target.getAttribute("projectTitle"));
    resetPage();
    buildProjectPage();
  });
}
export function handleDeleteProjectBtn(btn) {
  btn.addEventListener("click", (e) => {
    const projectWillBeDeleted = getProjectById(btn.id);
    deleteProject(projectWillBeDeleted);
    updateSideBar();
    if (isProjectsEmpty()) {
      resetPage();
    }
    saveProjectsLocally();
    e.stopPropagation();
  });
}
