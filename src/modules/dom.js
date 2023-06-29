import { projectlist } from "./project";

// Define local storage keys
const LS_PROJECT_KEYS = 'project.list';
const LS_ACTIVE_PROJECT = 'active.project';

// Get dom variables
const projectList = document.querySelector('.project-list');

// Make a function to render the new project to the website
function renderProject() {
    clear(projectList);
    projectlist.forEach(project => {
        let newproject = document.createElement('li');
        newproject.classList.add('project-name');
        newproject.textContent = project.name;
        newproject.dataset.listId = project.id;
        projectList.appendChild(newproject);
    })
}

// Make a function to save information into the local storage
function saveProject() {
    let newsave = JSON.stringify(projectlist);
    localStorage.setItem(LS_PROJECT_KEYS, newsave);
}

// Make a function to clear dom elements
function clear(name) {
    while (name.firstChild) {
        name.removeChild(name.firstChild);
    }
}

export { renderProject, saveProject, clear, LS_PROJECT_KEYS, LS_ACTIVE_PROJECT };