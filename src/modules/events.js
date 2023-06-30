import { saveProject, render } from "./dom";
import { newProject, getLocalStorageInfo } from "./project";
import { newTodo } from "./todo";

// Make a function to create event listeners
function createEvents() {

    // Define dom variables
    const todoForm = document.querySelector('#todo-form');
    const projectForm = document.querySelector('#project-form');
    const projectList = document.querySelector('.project-list');
    const sideNavList = document.querySelectorAll('.side-nav-name');
    const buttonTask = document.querySelector('.btn-task');
    const buttonDeleteProject = document.querySelector('#btn-delete-project'); 
    const projectTitle = document.querySelector('#js-project-title');

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

    // Add active project status to the project list
    projectList.addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'li') {
            sideNavList.forEach(item => item.classList.remove('active-project'));
            buttonTask.style.display = '';
            getLocalStorageInfo.activeProjectId = event.target.dataset.listId;
            console.log(getLocalStorageInfo.activeProjectId);
            saveProject();
            render();
        }
    })

    // Add and remove active project status on the first section of the side nav
    sideNavList.forEach(sidenavname => sidenavname.addEventListener('click', () => {
        sideNavList.forEach(item => item.classList.remove('active-project'));
        buttonTask.style.display = 'none';
        sidenavname.classList.add('active-project');
        projectTitle.textContent = sidenavname.textContent;
        getLocalStorageInfo.activeProjectId = sidenavname.dataset.listId;
        console.log(getLocalStorageInfo.activeProjectId);
        saveProject();
        render();
    }))

    buttonDeleteProject.addEventListener('click', () => {
        sideNavList.forEach(item => item.classList.remove('active-project'));
        let temp = getLocalStorageInfo.projectlist.filter(project => project.id !== getLocalStorageInfo.activeProjectId);
        getLocalStorageInfo.projectlist = temp;
        getLocalStorageInfo.activeProjectId = null;
        saveProject();
        render();
    })
}

export default createEvents;

