import { getLocalStorageInfo, isHomeOption, populateTodoList, makeTodoListOption } from "./project";
import { format } from "date-fns";

// Define local storage keys
const LS_PROJECT_KEYS = 'project.list';
const LS_ACTIVE_PROJECT = 'active.project';

// Get dom variables
const projectList = document.querySelector('.project-list');
const todoList = document.querySelector('#todo-list');
const todoContainer = document.querySelector('#todo-container');
const todoCount = document.querySelector('#todo-count');
const projectTitle = document.querySelector('#js-project-title');
const todoTemplate = document.querySelector('#todo-template');
const inbox = document.querySelector('#inbox-option');
const today = document.querySelector('#today-option');
const week = document.querySelector('#week-option');
const buttonDeleteProject = document.querySelector('#btn-delete-project');
const buttonTask = document.querySelector('.btn-task');

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
    clear(todoContainer);
    const activeProject = getLocalStorageInfo.projectlist.find(project => project.id === getLocalStorageInfo.activeProjectId);
    // Check when the active project is inbox, today, week
    if (activeProject === undefined) {
        populateTodoList();
        switch (getLocalStorageInfo.activeProjectId) {
            case '1':
                projectTitle.textContent = 'Inbox';
                inbox.classList.add('active-project');
                renderInboxTodos(getLocalStorageInfo.todolist);
                renderTodoCount(getLocalStorageInfo.todolist);
                break;
            case '2':
                projectTitle.textContent = 'Today';
                today.classList.add('active-project');
                const todayTodos = makeTodoListOption();
                renderInboxTodos(todayTodos);
                renderTodoCount(todayTodos);
                break;
            case '3':
                projectTitle.textContent = 'Week';
                week.classList.add('active-project');
                const weekTodos = makeTodoListOption();
                renderInboxTodos(weekTodos);
                renderTodoCount(weekTodos);
                break;
        }
        buttonDeleteProject.style.display = 'none';
        buttonTask.style.display = 'none';
        return;
    }
    projectTitle.textContent = activeProject.name;
    renderTodoCount(activeProject);
    renderTodo(activeProject);
}

// Make a function to render todo count
function renderTodoCount(project) {
    // Check if it's inbox, today or week
    if (isHomeOption()) {
        const incompleteTodo = project.filter(task => !task.checklist).length;
        const todoString = incompleteTodo === 1 ? 'task' : 'tasks';
        todoCount.textContent = `${incompleteTodo} ${todoString} left`;
    }
    // Check for only projects
    else {
        const incompleteTodo = project.tasks.filter(task => !task.checklist).length;
        const todoString = incompleteTodo === 1 ? 'task' : 'tasks';
        todoCount.textContent = `${incompleteTodo} ${todoString} left`;
    }
}

// Make a function to render tasks
function renderTodo(project) {
    project.tasks.forEach(task => {
        const newTask = document.importNode(todoTemplate.content, true);
        const checkbox = newTask.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.checklist;
        const label = newTask.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.title);
        const editIcon = newTask.querySelector('.edit-icon');
        editIcon.dataset.todoId = task.id;
        const deleteIcon = newTask.querySelector('.delete-icon');
        deleteIcon.dataset.todoId = task.id;
        todoContainer.appendChild(newTask);
    })
}

// Make a function to render all todos from a list
function renderInboxTodos (list) {
    list.forEach(task => {
        const newTask = document.importNode(todoTemplate.content, true);
        const checkbox = newTask.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.checklist;
        const label = newTask.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.title);
        const editIcon = newTask.querySelector('.edit-icon');
        editIcon.dataset.todoId = task.id;
        const deleteIcon = newTask.querySelector('.delete-icon');
        deleteIcon.dataset.todoId = task.id;
        todoContainer.appendChild(newTask);
})};

// Make a function to clear, render projects and render task
function render() {
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


export { render, saveProject, clear, renderTodoCount, renderInboxTodos, renderTodoContainer, LS_PROJECT_KEYS, LS_ACTIVE_PROJECT };