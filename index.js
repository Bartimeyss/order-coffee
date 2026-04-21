const addButton = document.querySelector('.add-button');
const beverageTemplate = document.querySelector('.beverage');
const beverageCardTemplate = document.getElementById('beverage-template');
const addButtonWrapper = addButton.parentElement;
const form = document.querySelector('form');
const modalOverlay = document.getElementById('order-modal');
const closeModalButton = document.querySelector('.buttonCloseModal');
const modalButton = document.querySelector('.submit-button');
const modalWindowText = document.querySelector('.modal-text');
const orderTableBody = document.querySelector('.order-table-body');


const drinkForms = ['напиток', 'напитка', 'напитков'];
const milkLabels = {
  usual: 'обычное',
  'no-fat': 'обезжиренное',
  soy: 'соевое',
  coconut: 'кокосовое',
};
const optionLabels = {
  'whipped cream': 'взбитые сливки',
  marshmallow: 'зефирки',
  chocolate: 'шоколад',
  cinnamon: 'корица',
};
const beverageLabels = {
  espresso: 'Эспрессо',
  capuccino: 'Капучино',
  cacao: 'Какао',
};
const urgentPattern = /(очень\s+нужно|срочно|быстрее|побыстрее|скорее|поскорее)/gi;


function highlightUrgentWords(value) {
  return value.replace(urgentPattern, '<b>$1</b>');
}

function bindCommentPreview(beverage) {
  const commentField = beverage.querySelector('.comment');
  const preview = beverage.querySelector('.comment-preview');

  if (!commentField || !preview) {
    return;
  }

  const renderPreview = () => {
    preview.innerHTML = highlightUrgentWords(commentField.value);
  };

  commentField.addEventListener('input', renderPreview);
  renderPreview();
}




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

  document.querySelectorAll('.beverage').forEach((item, index) => {
    setBeverageFieldNames(item, index + 1);
  });
}

function bindRemoveButton(button) {
  button.addEventListener('click', () => removeBeverage(button));
}

function bindBeverageControls(beverage) {
  const removeButton = beverage.querySelector('.remove-button');
  bindRemoveButton(removeButton);
  bindCommentPreview(beverage);
}

function addBeverage() {
  const clone = beverageCardTemplate.content.firstElementChild.cloneNode(true);
  const groupId = getBeveragesCount() + 1;

  addButtonWrapper.before(clone);
  bindBeverageControls(clone);
  setBeverageFieldNames(clone, groupId);
  updateBeverageTitles();
}

function getSelectedRadioValue(beverage) {
  const selectedRadio = beverage.querySelector('input[type="radio"]:checked');
  return selectedRadio ? milkLabels[selectedRadio.value] : '';
}

function getSelectedCheckboxValues(beverage) {
  return [...beverage.querySelectorAll('input[type="checkbox"]:checked')]
    .map((input) => optionLabels[input.value])
    .join(', ');
}

function buildOrderTable() {
  orderTableBody.innerHTML = '';

  document.querySelectorAll('.beverage').forEach((beverage) => {
    const drink = beverage.querySelector('select').value;
    const milk = getSelectedRadioValue(beverage);
    const options = getSelectedCheckboxValues(beverage);
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${beverageLabels[drink] ?? drink}</td>
      <td>${milk}</td>
      <td>${options}</td>
    `;

    orderTableBody.appendChild(row);
  });
}

bindBeverageControls(beverageTemplate);
setBeverageFieldNames(beverageTemplate, 1);
updateBeverageTitles();
addButton.addEventListener('click', addBeverage);

modalButton.addEventListener('click', () => {
  const count = getBeveragesCount();
  modalWindowText.textContent = `Вы заказали ${count} ${getWord(count, drinkForms)}`;
  buildOrderTable();
  modalOverlay.classList.add('active');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

closeModalButton.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
});
