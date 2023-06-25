import todoFactory from './modules/app';

let todo1 = todoFactory('Eat', 'Do it with wife', '26/06/2023', 'High', '', false);

console.log(todo1.getDescription());