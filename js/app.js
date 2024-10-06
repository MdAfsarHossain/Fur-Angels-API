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


// Load all pets
const loadAllPets = async () => {
  // Spinner
  displaySpinner();

  const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
  const data = await res.json();
  const pets = data.pets;

  setTimeout(() => {
      displayAllPets(pets);
  }, 2000)
}


// Load single pets
const loadSinglePets = async (petId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
  const data = await res.json();
  const petData = data.petData;

  const div = document.createElement("div");
  div.className = `modal-box flex flex-col gap-4`;
  div.innerHTML = `
  <!-- Image -->
  <div class="h-60">
    <img
      class="w-full h-full rounded-lg"
      src=${petData.image}
      alt=""
    />
  </div>

  <!-- Info -->
  <div class="">
    <h1 class="font-bold text-lg">${petData.pet_name ? petData.pet_name : "Not Available"}</h1>
    <div class="grid grid-cols-2 gap-1">
      <div class="flex flex-row justify-start items-center gap-2">
        <i class="fa-solid fa-sliders"></i>
        <h1 class="text-[#131313B3]">Breed: ${petData.breed ? petData.breed : "Not Available"}</h1>
      </div>
      <div class="flex flex-row gap-2 justify-start items-center">
        <i class="fa-regular fa-calendar"></i>

        <h1 class="text-[#131313B3]">Birth: ${petData.date_of_birth ? petData.date_of_birth.split('-')[0] : "Not Available"}</h1>
      </div>
      <div class="flex flex-row justify-start items-center gap-2">
        <i class="fa-solid fa-mercury"></i>
        <h1 class="text-[#131313B3]">Gender: ${petData.gender ? petData.gender : "Not Available"}</h1>
      </div>
      <div class="flex flex-row justify-start items-center gap-2">
        <i class="fa-solid fa-dollar-sign"></i>
        <h1 class="text-[#131313B3]">Price : ${petData.price ? petData.price+"$" : "Not Available"}</h1>
      </div>
      <div class="flex flex-row justify-start items-center gap-2">
        <i class="fa-solid fa-syringe"></i>
        <h1 class="text-[#131313B3]">Vaccinated Status: ${petData.vaccinated_status ? petData.vaccinated_status : "Not Available"}</h1>
      </div>
    </div>
  </div>

  <!-- Details -->
  <div class="">
    <h1 class="font-bold">Details Information</h1>
    <p>
    ${petData.pet_details ? petData.pet_details : "Not Available"}
    </p>
  </div>

  <div class="w-full">
    <form method="dialog">
      <!-- if there is a button in form, it will close the modal -->
      <button
        class="btn text-[#0E7A81] bg-[#0E7A811A] w-full hover:bg-[#0E7A8133]"
      >
        Cancel
      </button>
    </form>
  </div>
  `;

  // Append to body
  displayModal.appendChild(div);
  // Display modal
  displayModal.showModal();
}


// Load pet categories
const loadPetCategories = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
  const data = await res.json();
  const categories = data.categories;
  displayAllCategories(categories);
}

// Remove all active button class
const revomeAllActiveButtonsDesign = () => {
  const buttons = document.getElementsByClassName('category-btn');

  for(let btn of buttons) {
    btn.classList.remove('rounded-full', 'border-[#0E7A81]', 'bg-[#0E7A811A]');
  }
}


// Load specific categories
const loadSpecificCategories = async (categoryName, categoryId) => {
  // Spinner
  displaySpinner();

  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`);
  const data = await res.json();

  // Remove all active button class
  revomeAllActiveButtonsDesign();

  // Add Active button class
  const activeBtn = document.getElementById(`activeBtn-${categoryId}`);
  activeBtn.classList.add('rounded-full', 'border-[#0E7A81]', 'bg-[#0E7A811A]');

  setTimeout(() => {
    displayAllPets(data.data);
}, 2000)
}