const addButton = document.querySelector('.add-button');
const beverageTemplate = document.querySelector('.beverage');
const beverageCardTemplate = document.getElementById('beverage-template');
const addButtonWrapper = addButton.parentElement;
const form = document.querySelector('form');
const modalOverlay = document.getElementById('order-modal');
const closeModalButton = document.querySelector('.buttonCloseModal');
const modalButton = document.querySelector('.submit-button');
const modalWindowText = document.querySelector('.modal-text');
const drinkForms = ['напиток', 'напитка', 'напитков'];

function getBeveragesCount() {
  return document.querySelectorAll('.beverage').length;
}

function getWord(value, words) {
  value = Math.abs(value) % 100;
  const num = value % 10;

  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
}

function updateBeverageTitles() {
  const beverages = document.querySelectorAll('.beverage');

  beverages.forEach((beverage, index) => {
    const title = beverage.querySelector('.beverage-count');
    title.textContent = `Напиток №${index + 1}`;
  });
}

function setBeverageFieldNames(beverage, groupId) {
  beverage.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.name = `milk-${groupId}`;
  });

  beverage.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.name = `options-${groupId}`;
  });
}

function removeBeverage(button) {
  const beverage = button.closest('.beverage');

  if (getBeveragesCount() === 1) {
    return;
  }

  beverage.remove();
  updateBeverageTitles();
}

function bindRemoveButton(button) {
  button.addEventListener('click', () => removeBeverage(button));
}

function bindBeverageControls(beverage) {
  const removeButton = beverage.querySelector('.remove-button');
  bindRemoveButton(removeButton);
}

function addBeverage() {
  const clone = beverageCardTemplate.content.firstElementChild.cloneNode(true);
  const groupId = getBeveragesCount() + 1;

  addButtonWrapper.before(clone);
  bindBeverageControls(clone);
  setBeverageFieldNames(clone, groupId);
  updateBeverageTitles();
}

bindBeverageControls(beverageTemplate);
setBeverageFieldNames(beverageTemplate, 1);
updateBeverageTitles();
addButton.addEventListener('click', addBeverage);

modalButton.addEventListener('click', () => {
  const count = getBeveragesCount();
  modalWindowText.textContent = `Вы заказали ${count} ${getWord(count, drinkForms)}`;
  modalOverlay.classList.add('active');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

closeModalButton.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
});
