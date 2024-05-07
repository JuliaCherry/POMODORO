import { initControl } from './control.js';
import { state } from './state.js';
import { initTodo } from './todo.js';
import { datalistControl } from './datalistControl.js';
import { financeConrtol } from './financeControl.js';
import { reportControl } from './reportControl.js';

const initPomodoro = () => {
  initControl();
  initTodo();
};
initPomodoro();

const init = () => {
  financeConrtol();
  reportControl();
  datalistControl();
};

init();
