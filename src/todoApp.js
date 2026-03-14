import { Project } from "./project/project";
class TodoApp {
  constructor() {
    this.activeProject = "Default";
  }
  #projects = [];
  addProject(projectTitle) {
    this.#projects.push(new Project(projectTitle));
  }
  set project(newProject) {
    this.#projects.push(newProject);
  }
  getProject(projectTitle) {
    for (const project of this.#projects) {
      if (project.title == projectTitle) {
        return project;
      }
    }
    throw Error("There is no project by this name!");
  }
  getProjectId(projectTitle) {
    for (const project of this.#projects) {
      if (project.title == projectTitle) {
        return project.id;
      }
    }
    throw Error("There is no project by this name!");
  }
  get projects() {
    return this.#projects;
  }
  deleteProject(projectId) {
    for (const project of this.#projects) {
      if (project.id == projectId) {
        let projectIndex = this.#projects.findIndex(
          (project) => projectId == project.id,
        );
        console.log(this.#projects);
        // Remove one project from the project found
        this.#projects.splice(projectIndex, 1);
      }
    }
  }
}
export const app = new TodoApp();
