import { animationNumber, convertStringNumber } from './helper.js';
import { getData, postData } from './service.js';

const financeForm = document.querySelector('.finance__form');
const financeAmount = document.querySelector('.finance__amount');

let amount = 0; //начальный баланс

financeAmount.textContent = amount;

const addNewOpetaration = async e => {
  e.preventDefault();

  const typeOperation = e.submitter.dataset.typeOperation;

  //отпраляем данные на сервер в приведенном формате
  const financeFormDate = Object.fromEntries(new FormData(financeForm));
  financeFormDate.type = typeOperation;

  const newOperation = await postData('/finance', financeFormDate);

  const changeAmount = Math.abs(convertStringNumber(newOperation.amount));
  //определение типа оператора + или -

  if (typeOperation === 'income') {
    amount += changeAmount;
  }

  if (typeOperation === 'expenses') {
    amount -= changeAmount;
  }

  animationNumber(financeAmount, amount);
  financeForm.reset();
};

//получение данных для отображения актуального баланса
export const financeConrtol = async () => {
  const operations = await getData('/finance');

  amount = operations.reduce((acc, item) => {
    if (item.type === 'income') {
      acc += convertStringNumber(item.amount);
    }

    if (item.type === 'expenses') {
      acc -= convertStringNumber(item.amount);
    }
    return acc;
  }, 0);

  animationNumber(financeAmount, amount);

  financeForm.addEventListener('submit', addNewOpetaration);
};
