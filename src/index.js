import { newTodo, newProject} from './modules/app';
import { addProjectDom, clear } from './modules/dom';
import 'normalize.css';
import './style.css';

let projectlist = [];
let todolist = [];
let todo1 = newTodo('Eat', 'Do it with wife', '26/06/2023', 'High', 'asasasasa');
let todo2 = newTodo('Sex', 'Do it with wife butt', '28/06/2023', 'High', 'asdasdasdad');

const todoForm = document.querySelector('#todo-form');
const projectForm = document.querySelector('#project-form');
const projectDomList = document.querySelector('.project-list');
const buttonTask = document.querySelector('.btn-task');

projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let project = newProject(projectForm.project.value);
    console.log(project);
    projectlist.push(project);
    projectForm.project.value = '';
    clear(projectDomList);
    addProjectDom(projectlist, projectDomList);
    console.log(projectlist);
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

