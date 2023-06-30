// Create factory function for new todos
const newTodo = (title, description, duedate, priority, notes) => {
    let id = Date.now().toString();
    let checklist = false;
    return {title, description, duedate, priority, notes, checklist, id}
};

export { newTodo }