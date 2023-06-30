import { newProject, getLocalStorageInfo } from './modules/project';
import { newTodo } from './modules/todo';
import { renderProject, saveProject } from './modules/dom';
import 'normalize.css';
import './style.css';


const todoForm = document.querySelector('#todo-form');
const projectForm = document.querySelector('#project-form');
const projectDomList = document.querySelector('.project-list');
const buttonTask = document.querySelector('.btn-task');

projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let project = newProject(projectForm.project.value);
    console.log(project);
    getLocalStorageInfo.projectlist.push(project);
    projectForm.project.value = '';
    saveProject();
    renderProject();
    console.log(getLocalStorageInfo.projectlist);
})

buttonTask.addEventListener('click', () => {
    todoForm.style.visibility = 'visible';
})

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let task = newTodo(todoForm.title.value, todoForm.description.value, todoForm.duedate.value, todoForm.priority.value, todoForm.notes.value);
    console.log(task);
    todolist.push(task);
    todoForm.style.visibility = 'hidden';
})

renderProject();