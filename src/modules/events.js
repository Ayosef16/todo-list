import dom from "./dom";
import { newProject, retrieveLocalStorageInfo } from "./project";
import { newTodo, todolist } from "./todo";

// Make a function to create event listeners
function createEvents() {
    const todoForm = document.querySelector('#todo-form');
    const projectForm = document.querySelector('#project-form');
    const projectList = document.querySelector('.project-list');
    const buttonTask = document.querySelector('.btn-task');

    projectForm.addEventListener('submit', (event) => {

        // Prevents the form from submitting
        event.preventDefault();
        // Get the project name from the form
        const projectname = projectForm.project.value;
        // Check that the project name is not blank
        if (projectname === '') return;
        const project = newProject(projectname);
        retrieveLocalStorageInfo.projectlist.push(project);
        projectForm.project.value = '';
        dom.saveProject();
        dom.renderProject();
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
        console.log(projectList);
        console.log(retrieveLocalStorageInfo.getActiveProjectId());
        if (event.target.tagName.toLowerCase() === 'li') {
            console.log(event.target.dataset.listId);
            retrieveLocalStorageInfo.changeActiveProjectId(event.target.dataset.listId);
            console.log(retrieveLocalStorageInfo.getActiveProjectId());
            dom.saveProject();
            dom.renderProject();
        }
    })
}

export default createEvents;

