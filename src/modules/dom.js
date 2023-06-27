function addProject(projectname, projects) {
    let newproject = document.createElement('li');
    newproject.textContent = projectname;
    projects.appendChild(newproject);
}

export { addProject };