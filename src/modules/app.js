const newTodo = (title, description, duedate, priority, notes) => {
    // const getTitle = () => title;
    // const getDescription = () => description;
    // const getdueDate = () => duedate;
    // const getPriority = () => priority;
    // const getNotes = () => notes;
    // const getChecklist = () => checklist;
    // return {getTitle, getDescription, getdueDate, getPriority, getNotes, getChecklist};
    let checklist = false;
    return {title, description, duedate, priority, notes, checklist}
};

const newProject = (name) => {
    let tasks = [];
    return {name, tasks}
}

export { newTodo, newProject };