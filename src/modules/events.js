import { saveProject, renderProject } from "./dom";
import { newProject, getLocalStorageInfo } from "./project";
import { newTodo, todolist } from "./todo";

// Make a function to create event listeners
function createEvents() {

    // Define dom variables
    const todoForm = document.querySelector('#todo-form');
    const projectForm = document.querySelector('#project-form');
    const projectList = document.querySelector('.project-list');
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
    });

    buttonTask.addEventListener('click', () => {
        todoForm.style.visibility = 'visible';
    });

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const task = newTodo(todoForm.title.value, todoForm.description.value, todoForm.duedate.value, todoForm.priority.value, todoForm.notes.value);
        console.log(task);
        todolist.push(task);
        todoForm.style.visibility = 'hidden';
    });

    projectList.addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'li') {
            getLocalStorageInfo.activeProjectId = event.target.dataset.listId;
            saveProject();
            renderProject();
        }
    })
}

export default createEvents;

