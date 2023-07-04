import { saveProject, render, renderTodoCount, renderInboxTodos, renderTodoContainer } from "./dom";
import { newProject, getLocalStorageInfo, populateTodoList, searchForTodo, searchForProject, makeTodoListOption } from "./project";
import { newTodo } from "./todo";
import { format } from "date-fns";

// Make a function to create event listeners
function createEvents() {

    // Define dom variables
    const todoForm = document.querySelector('#todo-form');
    const todoList = document.querySelector('#todo-list');
    const projectForm = document.querySelector('#project-form');
    const projectList = document.querySelector('.project-list');
    const sideNavList = document.querySelectorAll('.side-nav-name');
    const buttonTask = document.querySelector('.btn-task');
    const buttonConfirmTask = document.querySelector('.btn-confirm-task');
    const buttonConfirmEdit = document.querySelector('.btn-confirm-edit');
    const buttonDeleteProject = document.querySelector('#btn-delete-project');
    const buttonClearTodo = document.querySelector('#btn-clear-todo');
    const projectTitle = document.querySelector('#js-project-title');
    const inbox = document.querySelector('#inbox-option');
    const today = document.querySelector('#today-option');
    const week = document.querySelector('#week-option');
    const duedate = document.querySelector('#duedate');
    const overlay = document.querySelector('.overlay');

    // Define a min date for the date picket
    duedate.min = format(new Date(), 'yyyy-MM-dd');

    // Handle project form
    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let project = newProject(projectForm.project.value);
        getLocalStorageInfo.projectlist.push(project);
        projectForm.project.value = '';
        saveProject();
        render();
    });

    // Show todo form when click on button
    buttonTask.addEventListener('click', () => {
        todoForm.style.visibility = 'visible';
        overlay.style.display = 'block';
        buttonConfirmEdit.style.display = 'none';
        buttonConfirmTask.style.display = 'block';
    });

    // Event to handle todo form
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Check that form value is not empty
        if (todoForm.title.value === '') return;
        if (todoForm.description.value === '') return;
        if (todoForm.duedate.value === '') return;
        if (todoForm.priority.value === 'Select') return;
        const task = newTodo(todoForm.title.value, todoForm.description.value, todoForm.duedate.value, todoForm.priority.value, todoForm.notes.value);
        const activeProject = getLocalStorageInfo.projectlist.find(project => project.id === getLocalStorageInfo.activeProjectId);
        activeProject.tasks.push(task);
        todoForm.style.visibility = 'hidden';
        overlay.style.display = 'none';
        todoForm.title.value = '';
        todoForm.description.value = '';
        todoForm.duedate.value = '';
        todoForm.priority.value = 'Select';
        todoForm.notes.value = '';
        saveProject();
        render();
    });

    // Prevent the todoform from submitting when using enter key
    todoForm.addEventListener('keypress', (event) => {
        if (event.keycode === 13) {
            event.preventDefault();
        }
    });

    // Add support for escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            todoForm.style.visibility = 'hidden';
            overlay.style.display = 'none';
        }
    });

    // Change the checklist status on the todo
    todoList.addEventListener('change', (event) => {
        if (event.target.tagName.toLowerCase() === 'input') {
            const activeProject = getLocalStorageInfo.projectlist.find(project => project.id === getLocalStorageInfo.activeProjectId);
            // Check for home options
            if (activeProject === undefined) {
                const currentTask = searchForTodo(event.target.id);
                currentTask.checklist = event.target.checked;
                saveProject();
                renderTodoCount(makeTodoListOption());
            }
            // Check for projects
            else {
                const currentTask = activeProject.tasks.find(todo => todo.id === event.target.id);
                currentTask.checklist = event.target.checked;
                saveProject();
                renderTodoCount(activeProject);
            }
        }
    })

    // Add an event to edit and delete todos
    todoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-icon')) {
            populateTodoList();
            const newTodo = getLocalStorageInfo.todolist.find(todo => todo.id === event.target.dataset.todoId);
            todoForm.style.visibility = 'visible';
            overlay.style.display = 'block';
            buttonConfirmTask.style.display = 'none';
            buttonConfirmEdit.style.display = 'block';
            buttonConfirmEdit.dataset.currentTodoId = event.target.dataset.todoId;
            todoForm.title.value = newTodo.title;
            todoForm.description.value = newTodo.description;
            todoForm.duedate.value = newTodo.duedate;
            todoForm.priority.value = newTodo.priority;
            todoForm.notes.value = newTodo.notes;
        }
        else if (event.target.classList.contains('delete-icon')) {
            const newTodo = searchForTodo(event.target.dataset.todoId);
            const newProject = searchForProject(newTodo);
            let temp = newProject.tasks.filter(todo => todo.id !== newTodo.id);
            newProject.tasks = temp;
            saveProject();
            render();
        }
    })

    // Edit the task into the projects and memory
    buttonConfirmEdit.addEventListener('click', () => {
        if (todoForm.title.value === '') return;
        if (todoForm.description.value === '') return;
        if (todoForm.duedate.value === '') return;
        if (todoForm.priority.value === 'Select') return;
        todoForm.style.visibility = 'hidden';
        overlay.style.display = 'none';
        const newTodo = searchForTodo(buttonConfirmEdit.dataset.currentTodoId);
        newTodo.title = todoForm.title.value;
        newTodo.description = todoForm.description.value;
        newTodo.duedate = todoForm.duedate.value;
        newTodo.priority = todoForm.priority.value;
        newTodo.notes = todoForm.notes.value;
        todoForm.title.value = '';
        todoForm.description.value = '';
        todoForm.duedate.value = '';
        todoForm.priority.value = 'Select';
        todoForm.notes.value = '';
        saveProject();
        render();
    });

    // Add active project status to the project list
    projectList.addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'li') {
            sideNavList.forEach(item => item.classList.remove('active-project'));
            buttonTask.style.display = '';
            buttonDeleteProject.style.display = '';
            todoList.style.display = '';
            getLocalStorageInfo.activeProjectId = event.target.dataset.listId;
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

    // Event for clearing todo task mark as complete
    buttonClearTodo.addEventListener('click', () => {
        const activeProject = getLocalStorageInfo.projectlist.find(project => project.id === getLocalStorageInfo.activeProjectId);
        if (activeProject === undefined) {
            populateTodoList();
            const newTodoList = getLocalStorageInfo.todolist.filter(task => task.checklist);
            newTodoList.forEach(task => {
                const currentProject = searchForProject(task);
                currentProject.tasks = currentProject.tasks.filter(todo => todo.id !== task.id);
            })
            saveProject();
            render();
        }
        else {
            activeProject.tasks = activeProject.tasks.filter(task => !task.checklist);
            saveProject();
            render();
        }
    });

    // Add an event listener for showing every todo
    inbox.addEventListener('click', () => {
        renderTodoContainer();
    });

    // Add am event listener for today option
    today.addEventListener('click', () => {
        renderTodoContainer();
    });

     // Add am event listener for week option
     week.addEventListener('click', () => {
        renderTodoContainer();
    });
}

export default createEvents;

