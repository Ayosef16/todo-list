import { LS_PROJECT_KEYS, LS_ACTIVE_PROJECT } from "./dom";


// Initialize varibles project list and active project id
function retrieveLocalStorageInfo () {
    let projectlist = JSON.parse(localStorage.getItem('project.list')) || [];
    let activeProjectId = JSON.parse(localStorage.getItem('active.project'));
    return { projectlist, activeProjectId };
}

const getLocalStorageInfo = retrieveLocalStorageInfo(); 

// Create a factory function for new projects
const newProject = (name) => {
    let tasks = [];
    let id = Date.now().toString();
    return {name, id, tasks}
}

export { newProject, getLocalStorageInfo };