import todoItems from './modules/app';
import 'normalize.css';
import './style.css';

let todo1 = todoItems('Eat', 'Do it with wife', '26/06/2023', 'High', '', false);

console.log(todo1.getDescription());