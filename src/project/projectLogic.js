import { app } from "../app/todoApp";
export function createNewProject(projectTitle) {
  app.addProject(projectTitle);
}
export function deleteProject(project) {
  app.deleteProject(project.id);
}
export function updateActiveProject(projectTitle) {
  app.activeProject = projectTitle;
}
export function getActiveProject() {
  return app.getProjectByTitle(app.activeProject);
}
export function getProjectById(projectId) {
  return app.getProjectById(projectId);
}
export function getProjectByTitle(projectTitle) {
  return app.getProjectByTitle(projectTitle);
}
export function getAllProjects() {
  return app.projects;
}
export function isProjectsEmpty() {
  return getAllProjects().length < 1;
}
export function hasTodos(project) {
  return project.getTodos().length > 0;
}
