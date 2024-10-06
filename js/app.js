// All Elements
const spinner = document.getElementById('spinner');
const cardsContainer = document.getElementById('cardsContainer');
const displayModal = document.getElementById('myModal');
const rightSideContainer = document.getElementById('rightSideContainer');
const categoriesContainer = document.getElementById('categoriesContainer');
const noDataContainer = document.getElementById('noDataContainer');
const petsDisplayContainer = document.getElementById('petsDisplayContainer');
const handleSortByPrice = document.getElementById('handleSortByPrice');
const adoptedModal = document.getElementById('adoptedModal');
const countDownText = document.getElementById('countDownText');


// Display Spinner
const displaySpinner = () => {
  petsDisplayContainer.style.display = 'none';
  spinner.classList.remove('hidden');
  spinner.classList.add('flex');
}

// Hide Spinner
const hideSpinner = () => {
  petsDisplayContainer.style.display = 'grid';
   spinner.classList.remove('flex');
   spinner.classList.add('hidden');
}