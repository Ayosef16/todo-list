import { LS_PROJECT_KEYS, LS_ACTIVE_PROJECT } from "./dom";

// Initialize varibles project list and active project id
let projectlist = JSON.parse(localStorage.getItem(LS_PROJECT_KEYS)) || [];
let activeProjectId = JSON.parse(localStorage.getItem(LS_ACTIVE_PROJECT));

// Create a factory function for new projects
const newProject = (name) => {
    let tasks = [];
    let id = Date.now().toString();
    return {name, id, tasks}
}

export { newProject, projectlist, activeProjectId };