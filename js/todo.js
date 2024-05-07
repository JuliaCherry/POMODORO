import { changeActiveBtn, stop } from './control.js';
import { state } from './state.js';

const titleElem = document.querySelector('.title');
const countNum = document.querySelector('.count_num');
const todoListElem = document.querySelector('.todo__list');
const todoFinanceBtn = document.querySelector('.todo__finance_btn');
const financeManager = document.querySelector('.finance');

todoFinanceBtn.onclick = function () {
  financeManager.style.display === 'block'
    ? (financeManager.style.display = 'none')
    : (financeManager.style.display = 'block');
};

const li = document.createElement('li');
li.classList.add('todo__item');

const todoAdd = document.createElement('button');
todoAdd.classList.add('todo__add');
todoAdd.textContent = 'Добавить новую задачу';
li.append(todoAdd);

const getTodo = () => {
  const todoList = JSON.parse(localStorage.getItem('pomodoro') || '[]');

  return todoList;
};

const addTodo = title => {
  const todo = {
    title,
    pomodoro: 0,
    id: Math.random().toString(16).substring(2, 8),
  };

  const todoList = getTodo();
  todoList.push(todo);

  localStorage.setItem('pomodoro', JSON.stringify(todoList));
  return todo;
};

export const updateTodo = todo => {
  const todoList = getTodo();
  if (!todoList.length) {
    return;
  }
  const todoItem = todoList.find(item => item.id === todo.id);
  todoItem.title = todo.title;
  todoItem.pomodoro = todo.pomodoro;
  localStorage.setItem('pomodoro', JSON.stringify(todoList));
};

const deleteTodo = todo => {
  const todoList = getTodo();
  const newTodoList = todoList.filter(item => item.id !== todo.id);
  if (todo.id === state.activeTodo.id) {
    state.activeTodo = newTodoList[newTodoList.length - 1];
  }

  localStorage.setItem('pomodoro', JSON.stringify(newTodoList));
};

const createTodoListItem = todo => {
  if (todo.id !== 'default') {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo__item');

    const todoItemWrapper = document.createElement('div');
    todoItemWrapper.classList.add('todo__item-wrapper');
    todoItem.append(todoItemWrapper);

    const todoBtn = document.createElement('button');
    todoBtn.classList.add('todo__btn');
    todoBtn.textContent = todo.title;

    const todoEdit = document.createElement('button');
    todoEdit.classList.add('todo__edit');
    todoEdit.ariaLabel = 'Редактировать задачу';

    const todoDel = document.createElement('button');
    todoDel.classList.add('todo__del');
    todoDel.ariaLabel = 'Удалить задачу';

    todoItemWrapper.append(todoBtn, todoEdit, todoDel);

    todoListElem.prepend(todoItem);

    todoBtn.addEventListener('click', () => {
      state.activeTodo = todo;
      showTodo();
      changeActiveBtn('work');
      stop();
    });

    todoEdit.addEventListener('click', () => {
      todo.title = prompt('Название задачи', todo.title);
      todoBtn.textContent = todo.title;
      updateTodo(todo);
      showTodo();
    });

    todoDel.addEventListener('click', () => {
      const title = confirm('Вы действительно хотите удалить задачу?');
      deleteTodo(todo);
      showTodo();
      todoItem.remove();
    });
  }
};

const renderTodoList = list => {
  todoListElem.textContent = '';
  list.forEach(createTodoListItem);

  todoListElem.append(li);
};

export const showTodo = () => {
  if (state.activeTodo) {
    titleElem.textContent = state.activeTodo.title;
    countNum.textContent = state.activeTodo.pomodoro;
  } else {
    titleElem.textContent = '';
    countNum.textContent = 0;
  }
};

export const initTodo = () => {
  const todoList = getTodo();

  if (!todoList.length) {
    state.activeTodo = {
      id: 'default',
      pomodoro: 0,
      title: 'Помодоро',
    };
  } else {
    state.activeTodo = todoList[todoList.length - 1];
  }

  showTodo();

  renderTodoList(todoList);

  todoAdd.addEventListener('click', () => {
    const title = prompt('Введите имя задачи');
    const todo = addTodo(title);
    createTodoListItem(todo);
  });
};
