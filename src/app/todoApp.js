import { Project } from "../project/Project";
class TodoApp {
  #projects = [];
  constructor() {
    this.activeProject = "Get started";
  }
  addProject(projectTitle) {
    this.#projects.push(new Project(projectTitle));
  }
  set project(newProject) {
    this.#projects.push(newProject);
  }
  getProjectByTitle(projectTitle) {
    return this.#projects.find((project) => project.title === projectTitle);
  }
  getProjectById(projectId) {
    return this.#projects.find((projct) => projct.id === projectId);
  }

  getProjectId(projectTitle) {
    return this.#projects.find((project) => project.title === projectTitle).id;
  }
  get projects() {
    return this.#projects;
  }
  deleteProject(projectId) {
    const projectToDelet = this.#projects.find(
      (projct) => projct.id === projectId,
    );
    this.#projects.splice(this.#projects.indexOf(projectToDelet), 1);
  }
}
export const app = new TodoApp();
