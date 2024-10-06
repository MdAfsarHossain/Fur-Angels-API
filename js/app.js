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


// Display all categories
const displayAllCategories = (categories) => {
    
  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = `category-btn flex-1 flex flex-row gap-3 border-2 px-10 py-3 rounded-lg justify-center items-center`;
    button.onclick = () => loadSpecificCategories(category.category, category.id);
    button.setAttribute('id', 'activeBtn-'+category.id); 
    button.innerHTML = `
    <img class="w-12" src=${category.category_icon} alt="" />
    <h1 class="font-bold text-2xl">${category.category}</h1>
    `;
    categoriesContainer.appendChild(button);
  })
}

// Thumbs Up
const thumbsUp = (petImage) => {
  const div = document.createElement("div");
  div.className = `rounded-xl`;
  div.innerHTML = `
  <img
    class="rounded-lg"
    src=${petImage}
    alt=""
  />
  `;

  rightSideContainer.appendChild(div);
}


// Handle Adpot pet
const adoptPet = (petId) => {
  const adoptPetId = document.getElementById(`adpot-pet-${petId}`)

  adoptedModal.showModal();

  let count = 3;
  countDownText.innerText = count;
  let time = setInterval(() => {
    count--;
    if(count>0) {
      countDownText.innerText = count;
    }
  }, 1000);

  setTimeout(() => {
    clearInterval(time);
    adoptedModal.close();
  }, 3000);

  adoptPetId.disabled = true;
  adoptPetId.innerText = 'Adopted';
  
  adoptPetId.classList.remove('cursor-pointer', 'hover:border-[#0E7A81]');
  adoptPetId.classList.add('bg-gray-400', 'border-gray-400');
}


// Display All Pets
const displayAllPets = (pets) => {

  // Spinner
  hideSpinner();

  // Create HTML elements
  cardsContainer.textContent = '';

  if(pets.length === 0) {
    noDataContainer.classList.remove('hidden');
    noDataContainer.classList.add('flex');
    return;
  }

  noDataContainer.classList.add('hidden');
  
  handleSortByPrice.addEventListener('click', () => {
    pets.sort((a, b) => {
      const priceA = Number(a.price);
      const priceB = Number(b.price);
      return priceB - priceA;
    });
    displayAllPets(pets);
  })

  pets.forEach((pet) => {
      const div = document.createElement('div');
      div.className = `border-2 p-5 rounded-xl flex flex-col gap-5 pet-card`
      div.innerHTML = `
      <div class="h-44">
              <img
              class="rounded-lg h-full w-full"
              src=${pet.image}
              alt=""
            />        
      </div>     

            <div class="">
              <h1 class="font-bold text-xl text-[#131313]">${pet.pet_name ? pet.pet_name : "Not Available"}</h1>
              <div class="flex flex-row justify-start items-center gap-2">
                <i class="fa-solid fa-sliders"></i>
                <h1 class="text-[#131313B3]">Breed: ${pet.breed ? pet.breed : "Not Available"}</h1>
              </div>
              <div class="flex flex-row gap-2 justify-start items-center">
                <i class="fa-regular fa-calendar"></i>

                <h1 class="text-[#131313B3]">Birth: ${pet.date_of_birth ? pet.date_of_birth.split('-')[0] : "Not Available"}</h1>
              </div>
              <div class="flex flex-row justify-start items-center gap-2">
                <i class="fa-solid fa-mercury"></i>
                <h1 class="text-[#131313B3]">Gender: ${pet.gender ? pet.gender : "Not Available"}</h1>
              </div>
              <div class="flex flex-row justify-start items-center gap-2">
                <i class="fa-solid fa-dollar-sign"></i>
                <span class="price">${pet.price ? pet.price+'$' : "Not Available"}</span>
              </div>
            </div>
            <!-- Border -->
            <div class="border-[1px]"></div>
            <div class="flex flex-row justify-between">
              <button
                onclick="thumbsUp('${pet.image}')"
                class="border-2 px-4 py-2 rounded-xl cursor-pointer hover:border-[#0E7A81]"
              >
                <i class="fa-regular fa-thumbs-up"></i>
              </button>
              <button
                id="adpot-pet-${pet.petId}"
                onclick="adoptPet(${pet.petId})"
                class="border-2 px-4 py-2 rounded-xl cursor-pointer hover:border-[#0E7A81] font-bold text-[#0E7A81]"
              >
                Adopt
              </button>
              <button
              onclick="loadSinglePets(${pet.petId})"
                class="border-2 px-4 py-2 rounded-xl cursor-pointer hover:border-[#0E7A81]"
              >
                <p class="text-[#0E7A81] font-bold">Details</p>
              </button>
            </div>
      `
      cardsContainer.appendChild(div);
  })
}


loadAllPets();
loadPetCategories();