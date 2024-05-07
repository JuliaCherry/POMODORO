export const convertStringNumber = str => {
  const noSpaceStr = String(str).replace(/\s+/g, ''); //убираем пробелы в сумме
  const num = parseFloat(noSpaceStr); // приводим сумму к числовому значению

  if (!isNaN(num) && isFinite(num)) {
    return num;
  } else {
    return false;
  }
};

//форматирование даты под дд.мм.гггг
export const reformatDate = dateStr => {
  const [year, month, day] = dateStr.split('-');
  return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
};

//анимация баланса
export const animationNumber = (element, number) => {
  const fps = 60; //плавность
  const duration = 1000;
  const frameDuration = duration / fps; //количество анимаций
  const totalFrame = Math.round(duration / frameDuration);

  let curentFrame = 0;

  const initialNumber = parseInt(element.textContent.replace(/[^0-9.-]+/g, '')); //приводим у числу и убираем лишние символы

  const increment = Math.trunc((number - initialNumber) / totalFrame);

  const animate = () => {
    curentFrame += 1;
    const newNumber = initialNumber + increment + curentFrame;
    element.textContent = `${newNumber.toLocaleString('RU-ru')} ₽`;

    if (curentFrame < totalFrame) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = `${number.toLocaleString('RU-ru')} ₽`;
    }
  };
  requestAnimationFrame(animate);
};
