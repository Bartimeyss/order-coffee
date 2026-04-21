const addButton = document.querySelector('.add-button');
const beverageTemplate = document.querySelector('.beverage');
const addButtonWrapper = addButton.parentElement;


let idx = 0;
function updateBeverageTitles() {
  const beverages = document.querySelectorAll('.beverage');

  beverages.forEach((beverage, index) => {
    const title = beverage.querySelector('.beverage-count');
    title.textContent = `Напиток №${index + 1}`;
    idx = index;
  });
}

function addBeverage() {
  const clone = beverageTemplate.cloneNode(true);
  addButtonWrapper.before(clone);
  updateBeverageTitles();
}

addButton.addEventListener('click', addBeverage);
updateBeverageTitles();
const form = document.querySelector('form');
const modalOverlay = document.getElementById('order-modal');
const closeModalButton = document.querySelector('.buttonCloseModal');
const modalButton = document.querySelector('.submit-button');

modalButton.addEventListener('click', () => {
    const modalWindowText = document.querySelector('.modal-text');
    modalWindowText.textContent = `Вы заказали ${idx + 1} ${getWord(idx + 1, drinkForms)}`;
    modalOverlay.classList.add('active');
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
});

closeModalButton.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});


function getWord(value, words) {
  value = Math.abs(value) % 100;
  var num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1]; 
  if (num == 1) return words[0]; 
  return words[2]; 
}

const drinkForms = ['напиток', 'напитка', 'напитков'];