import { LS_PROJECT_KEYS, renderProject } from './modules/dom';
import createEvents from './modules/events';
import 'normalize.css';
import './style.css';

renderProject();
createEvents();

// const home = document.querySelectorAll('.side-nav-name');

// home.forEach(title => console.log(title.textContent));