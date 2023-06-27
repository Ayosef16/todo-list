import todoItems from './modules/app';
import { addProject } from './modules/dom';
import 'normalize.css';
import './style.css';

let todo1 = todoItems('Eat', 'Do it with wife', '26/06/2023', 'High', '', false);
let todo2 = todoItems('Sex', 'Do it with wife butt', '28/06/2023', 'High', '', false);

const todoForm = document.querySelector('#todo-form');
const projectForm = document.querySelector('#project-form');
const buttonShowProjectForm = document.querySelector('#btn-show-project-form');

buttonShowProjectForm.addEventListener('click', () => {
    projectForm.style.visibility = 'visible';
})
