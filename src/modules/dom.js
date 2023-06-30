import { getLocalStorageInfo } from "./project";

// Define local storage keys
const LS_PROJECT_KEYS = 'project.list';
const LS_ACTIVE_PROJECT = 'active.project';

// Get dom variables
const projectList = document.querySelector('.project-list');
const projectTitle = document.querySelector('#js-project-title');
// Make a function to render the new project to the website
function renderProject() {
    clear(projectList);
    getLocalStorageInfo.projectlist.forEach(project => {
        let newproject = document.createElement('li');
        if (project.id === getLocalStorageInfo.activeProjectId) {
            newproject.classList.add('active-project');
            projectTitle.textContent = project.name;
        }
        newproject.classList.add('project-name');
        newproject.textContent = project.name;
        newproject.dataset.listId = project.id;
        projectList.appendChild(newproject);
    })
}

// Make a function to save information into the local storage
function saveProject() {
    localStorage.setItem(LS_PROJECT_KEYS, JSON.stringify(getLocalStorageInfo.projectlist));
    localStorage.setItem(LS_ACTIVE_PROJECT, JSON.stringify(getLocalStorageInfo.activeProjectId));
}

// Make a function to clear dom elements
function clear(name) {
    while (name.firstChild) {
        name.removeChild(name.firstChild);
    }
}

export { renderProject, saveProject, clear, LS_PROJECT_KEYS, LS_ACTIVE_PROJECT };