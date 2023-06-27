const todoItems = (title, description, duedate, priority, notes, checklist) => {
    const getTitle = () => title;
    const getDescription = () => description;
    const getdueDate = () => duedate;
    const getPriority = () => priority;
    const getNotes = () => notes;
    const getChecklist = () => checklist;

    return {getTitle, getDescription, getdueDate, getPriority, getNotes, getChecklist};
};



export default todoItems;