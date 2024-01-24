import { initControl } from './control.js';
import { state } from './state.js';
import { InitTodo } from './todo.js';

const initPomodoro = () => {
  initControl();

  InitTodo();
};

initPomodoro();
