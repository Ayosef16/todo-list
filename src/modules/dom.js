import { getLocalStorageInfo } from "./project";

// Define local storage keys
const LS_PROJECT_KEYS = 'project.list';
const LS_ACTIVE_PROJECT = 'active.project';

// Get dom variables
const projectList = document.querySelector('.project-list');
const todoList = document.querySelector('#todo-list');
const projectTitle = document.querySelector('#js-project-title');
// Make a function to render the new project to the website
function renderProject() {
    clear(projectList);
    getLocalStorageInfo.projectlist.forEach(project => {
        let newproject = document.createElement('li');
        if (project.id === getLocalStorageInfo.activeProjectId) {
            newproject.classList.add('active-project');
        }
        newproject.classList.add('project-name');
        newproject.textContent = project.name;
        newproject.dataset.listId = project.id;
        projectList.appendChild(newproject);
    })
}

// Make a function to render todos
function renderTodo() {
    // Get current active project
    const activeProject = getLocalStorageInfo.projectlist.find(project => project.id === getLocalStorageInfo.activeProjectId);
    if (getLocalStorageInfo.activeProjectId === null) {
        todoList.style.visibility = 'hidden';
    }
    else {
        todoList.style.visibility = 'visible';
        projectTitle.textContent = activeProject.name;
    }
}

// Make a function to clear, render projects and render task
function render() {
    clear(projectList);
    renderProject();
    renderTodo();
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


export { render, saveProject, clear, LS_PROJECT_KEYS, LS_ACTIVE_PROJECT };