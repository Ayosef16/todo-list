import { render } from './modules/dom';
import { searchForProject, getLocalStorageInfo, populateTodoList } from './modules/project';
import createEvents from './modules/events';
import 'normalize.css';
import './style.css';

render();
createEvents();

// const home = document.querySelectorAll('.side-nav-name');

// home.forEach(title => console.log(title.textContent));