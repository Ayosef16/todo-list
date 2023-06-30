import { getLocalStorageInfo } from "./project";

// Define local storage keys
const LS_PROJECT_KEYS = 'project.list';
const LS_ACTIVE_PROJECT = 'active.project';

// Get dom variables
const projectList = document.querySelector('.project-list');
const todoList = document.querySelector('#todo-list');
const todoCount = document.querySelector('#todo-count');
const projectTitle = document.querySelector('#js-project-title');
const todoTemplate = document.querySelector('#todo-template');

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
function renderTodoContainer() {
    // Get current active project
    console.log(getLocalStorageInfo.projectlist);
    console.log(getLocalStorageInfo.activeProjectId);
    const activeProject = getLocalStorageInfo.projectlist.find(project => project.id === getLocalStorageInfo.activeProjectId);
    // If active project is undefined, it means is not on the project list, it's inbox, today or week
    if (activeProject === undefined) {
        // If there is not active project
        if (getLocalStorageInfo.activeProjectId === null) {
            todoList.style.visibility = 'hidden';
        }
        // If there an active project that's inbox, today or week
        else {
            todoList.style.visibility = 'visible';
            return;
        }
    }
    // This is the case when the active project is on the project list
    else {
        // Check if there is an active project
        if (getLocalStorageInfo.activeProjectId === null) {
            todoList.style.visibility = 'hidden';
        }
        // This is when there a an active projects
        else {
            todoList.style.visibility = 'visible';
            projectTitle.textContent = activeProject.name;
            renderTodoCount(activeProject);
        }
    }
}

// Make a function to render todo count
function renderTodoCount(project) {
    const incompleteTodo = project.tasks.filter(task => !task.checklist);
    if (incompleteTodo === 1) {
        todoCount.textContent = `${incompleteTodo} task left`;
    }
    else {
        todoCount.textContent = `${incompleteTodo} tasks left`;
    }
}

// Make a function to render tasks
function renderTodo(project) {
    project.tasks.forEach(task => {
        const newTask = document.importNode(todoTemplate.textContent, true);
        const checkbox = newTask.querySelector('input[type=checkbox]');
        console.log(checkbox);
        checkbox.id = task.id;
        checkbox.checked = project
        const label = newTask.querySelector('label');
        console.log(label);
        label.Htmlfor = task.id;
    })
}

// Make a function to clear, render projects and render task
function render() {
    clear(projectList);
    renderProject();
    renderTodoContainer();
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