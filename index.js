const PhonesInfo = async (search='samsung', show) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, show)
};

const displayPhone = (phones, show) => {
  const PhonesContainer = document.getElementById('phone-container')
  // clear container
  PhonesContainer.textContent = '';

  // show phones on limit and show btn remove or show
  const showBtn = document.getElementById('showAll');
  if (phones.length >= 12 && !show) {
    showBtn.classList.remove('hidden');
  }
  else {
    showBtn.classList.add('hidden');
  }

  // show all 
  if (!show) {
    phones = phones.slice(0, 12);
  };

  // show phones
  phones.forEach(element => {
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
        <figure><img src="${element.image}" alt="Phone" class=" mt-10 rounded-lg" /></figure>
        <div class="card-body items-center justify-center">
          <h2 class="card-title">${element.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <h1 class = "text-2xl font-extrabold my-1">$999</h1>
          <div class="card-actions justify-center">
            <button class="btn " onclick="detail_modal.showModal() ; detailModel('${element.slug}')">Show Details</button>
          </div>
        </div>
      </div> `;

    PhonesContainer.appendChild(div);
  });
  loading(false);
  if(!phones.length>0){
    ShowError()
  }
  else{
    hideError()
  }
}

// showing details 
const detailModel = (id) => {
  const Phones = async (search, show) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const details = data.data;
    console.log(details)

    //add image
    const phone = document.getElementById('phone-card');
    phone.innerHTML = `
    <figure class="m-auto" > <img src="${details.image}" alt="phone" class="rounded-lg" ></figure>
    <h2 id="PhoneName" class="font-bold text-2xl text-center">${details.name}</h2>
    <h3 class="mt-4">Storage : ${details.mainFeatures.storage}</h3>
    <h3>Display Size : ${details.mainFeatures.displaySize}</h3>
    <h3>Chipset : ${details.mainFeatures.chipSet}</h3>
    <h3>Memory : ${details.mainFeatures.memory}</h3>
    <h3>Slug : ${details.slug}</h3>
    <h3>Release data : ${details.releaseDate}</h3>
    <h3>Brand : ${details.brand}</h3>
    <h3>GPS : ${details.others?.GPS ||'No GPS available in this device'}</h3>
    `;
  };
  Phones();
}

// search button
const handleSearch = (show) => {
  const field = document.getElementById('SearchField');
  const search = field.value;
  PhonesInfo(search, show);
  loading(true);
}

// loading function
const loading = (value) => {
  const loading = document.getElementById('loading')
  if (value) {
    loading.classList.remove('hidden');
  }
  else {
    loading.classList.add('hidden');
  }
}

// show all button 
const showAll = () => {
  handleSearch(true);
}

// Error part 
const errorText = document.getElementById('error')
const hideError = ()=>{
  errorText.classList.add("hidden")
}
const ShowError = ()=>{
  errorText.classList.remove("hidden")
}



PhonesInfo();