import { Project } from "./project";
class TodoApp {
  #projects = [];
  //   constructor(project) {
  //     this.project = project;
  //   }
  addProject(projectTitle) {
    this.#projects.push(new Project(projectTitle));
  }
  set project(newProject) {
    this.#projects.push(newProject);
  }
  get projects() {
    return this.#projects;
  }
}
export const app = new TodoApp();
