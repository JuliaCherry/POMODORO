import { state } from './state.js';

//сигнал окончания таймера
const audio = {
  work: new Audio('audio/dudu.mp3'),
  break: new Audio('audio/eralash.mp3'),
  relax: new Audio('audio/august.mp3'),
};

export const alarm = () => {
  audio[state.status].play();
};
