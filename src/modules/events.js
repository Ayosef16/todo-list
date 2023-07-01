import { saveProject, render, renderTodoCount } from "./dom";
import { newProject, getLocalStorageInfo } from "./project";
import { newTodo } from "./todo";

// Make a function to create event listeners
function createEvents() {

    // Define dom variables
    const todoForm = document.querySelector('#todo-form');
    const todoList = document.querySelector('#todo-list');
    const projectForm = document.querySelector('#project-form');
    const projectList = document.querySelector('.project-list');
    const sideNavList = document.querySelectorAll('.side-nav-name');
    const buttonTask = document.querySelector('.btn-task');
    const buttonDeleteProject = document.querySelector('#btn-delete-project'); 
    const projectTitle = document.querySelector('#js-project-title');

    // Handle project form
    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let project = newProject(projectForm.project.value);
        console.log(project);
        getLocalStorageInfo.projectlist.push(project);
        projectForm.project.value = '';
        saveProject();
        render();
        console.log(getLocalStorageInfo.projectlist);
    });

    // Show todo form when click on button
    buttonTask.addEventListener('click', () => {
        todoForm.style.visibility = 'visible';
    });

    // Event to handle todo form
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const task = newTodo(todoForm.title.value, todoForm.description.value, todoForm.duedate.value, todoForm.priority.value, todoForm.notes.value);
        const activeProject = getLocalStorageInfo.projectlist.find(project => project.id === getLocalStorageInfo.activeProjectId);
        console.log(activeProject);
        console.log(task);
        activeProject.tasks.push(task);
        console.log(activeProject);
        todoForm.style.visibility = 'hidden';
        todoForm.title.value = '';
        todoForm.description.value = '';
        todoForm.duedate.value = '';
        todoForm.priority.value = 'Select';
        todoForm.notes.value = '';
        saveProject();
        render();
    });

    // Add support for escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            todoForm.style.visibility = 'hidden';
        }
    });

    // Change the checklist status on the todo
    todoList.addEventListener('change', (event) => {
        if (event.target.tagName.toLowerCase() === 'input') {
            const activeProject = getLocalStorageInfo.projectlist.find(project => project.id === getLocalStorageInfo.activeProjectId);
            const currentTask = activeProject.tasks.find(todo => todo.id === event.target.id);
            currentTask.checklist = event.target.checked;
            saveProject();
            renderTodoCount(activeProject);
        }
    })

    // Add active project status to the project list
    projectList.addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'li') {
            sideNavList.forEach(item => item.classList.remove('active-project'));
            buttonTask.style.display = '';
            buttonDeleteProject.style.display = '';
            todoList.style.display = '';
            getLocalStorageInfo.activeProjectId = event.target.dataset.listId;
            console.log(getLocalStorageInfo.activeProjectId);
            saveProject();
            render();
        }
    });

    // Add and remove active project status on the first section of the side nav
    sideNavList.forEach(sidenavname => sidenavname.addEventListener('click', () => {
        sideNavList.forEach(item => item.classList.remove('active-project'));
        buttonTask.style.display = 'none';
        buttonDeleteProject.style.display = 'none';
        todoList.style.display = '';
        sidenavname.classList.add('active-project');
        projectTitle.textContent = sidenavname.textContent;
        getLocalStorageInfo.activeProjectId = sidenavname.dataset.listId;
        console.log(getLocalStorageInfo.activeProjectId);
        saveProject();
        render();
    }));
    
    // Event for deleting only the projects
    buttonDeleteProject.addEventListener('click', () => {
        sideNavList.forEach(item => item.classList.remove('active-project'));
        let temp = getLocalStorageInfo.projectlist.filter(project => project.id !== getLocalStorageInfo.activeProjectId);
        getLocalStorageInfo.projectlist = temp;
        getLocalStorageInfo.activeProjectId = null;
        todoList.style.display = 'none';
        saveProject();
        render();
    });
}

export default createEvents;

