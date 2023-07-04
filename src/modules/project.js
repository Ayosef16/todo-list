import { LS_PROJECT_KEYS, LS_ACTIVE_PROJECT, clear } from "./dom";
import { format } from "date-fns";


// Initialize varibles project list and active project id
function retrieveLocalStorageInfo () {
    let projectlist = JSON.parse(localStorage.getItem('project.list')) || [];
    let activeProjectId = JSON.parse(localStorage.getItem('active.project'));
    let todolist = [];
    return { projectlist, activeProjectId, todolist };
}

const getLocalStorageInfo = retrieveLocalStorageInfo(); 

// Create a factory function for new projects
const newProject = (name) => {
    let tasks = [];
    let id = Date.now().toString();
    return {name, id, tasks}
}

function isHomeOption () {
    if (getLocalStorageInfo.activeProjectId < 10) {
        return true;
    }
    else {
        return false;
    }
}

function populateTodoList () {
    clearTodoList();
    getLocalStorageInfo.projectlist.forEach(project => {
        project.tasks.forEach(task => getLocalStorageInfo.todolist.push(task));
    });
}

function clearTodoList () {
    while (getLocalStorageInfo.todolist.length > 0) {
        getLocalStorageInfo.todolist.pop();
    }
}

function searchForTodo (todoid) {
    let newTodo;
    getLocalStorageInfo.projectlist.forEach(project => {
        project.tasks.forEach(task => {
            if (task.id === todoid) {
                newTodo = task;
            }
        });
    });
    return newTodo;
}

function searchForProject (todo) {
    let currentProject;
    getLocalStorageInfo.projectlist.forEach(project => {
        project.tasks.forEach(task => {
            if (task.id === todo.id) {
                currentProject = project;
            }
        })
    })
    return currentProject;
}

// Make a function to retrieve the todo list for side nav options
function makeTodoListOption () {
    populateTodoList();
    let newTodoList;
    switch (getLocalStorageInfo.activeProjectId) {
        case '1':
            newTodoList = getLocalStorageInfo.todolist;
            break;
        case '2':
            newTodoList = getLocalStorageInfo.todolist.filter(todo => todo.duedate === format(new Date(), 'yyyy-MM-dd'));
            break;
        case '3':
            newTodoList = getLocalStorageInfo.todolist;
            break;
    }
    return newTodoList;
};

export { newProject, getLocalStorageInfo, isHomeOption, populateTodoList, searchForTodo, searchForProject, makeTodoListOption };