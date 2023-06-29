function addProjectDom(projectarray, projectdom) {
    projectarray.forEach(project => {
        let newproject = document.createElement('li');
        newproject.textContent = project.name;
        projectdom.appendChild(newproject);
    })
}

function clear(name) {
    while (name.firstChild) {
        name.removeChild(name.firstChild);
    }
}

export { addProjectDom, clear };