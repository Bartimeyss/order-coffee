const addButton = document.querySelector('.add-button');
const beverageTemplate = document.querySelector('.beverage');
const addButtonWrapper = addButton.parentElement;

function updateBeverageTitles() {
  const beverages = document.querySelectorAll('.beverage');

  beverages.forEach((beverage, index) => {
    const title = beverage.querySelector('.beverage-count');
    title.textContent = `Напиток №${index + 1}`;
  });
}

function addBeverage() {
  const clone = beverageTemplate.cloneNode(true);
  addButtonWrapper.before(clone);
  updateBeverageTitles();
}

addButton.addEventListener('click', addBeverage);
updateBeverageTitles();
