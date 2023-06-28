function addProjectDom(projectlist, projectdom) {
    let length = projectlist.length;
    for (let i = 0; i < length; i++) {
        let newproject = document.createElement('li');
        newproject.textContent = projectlist[i];
        projectdom.appendChild(newproject);
    }
}

function clearProjectDom(projectdom) {
    projectdom.innerHTML = '';
}

function addTaskButton(projectdom) {
    let button = document.createElement('button');
    button.textContent = '+ Add Task';
}

export { addProjectDom, clearProjectDom };