import { render } from './modules/dom';
import createEvents from './modules/events';
import { isThisWeek, parseISO, nextMonday } from 'date-fns';
import { getLocalStorageInfo } from './modules/project';
import 'normalize.css';
import './style.css';

render();
createEvents();