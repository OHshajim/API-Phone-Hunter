const PhonesInfo = async (search, show) => {
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
  if (phones.length >= 15 && !show) {
    showBtn.classList.remove('hidden');
  }
  else {
    showBtn.classList.add('hidden');
  }

  // show all 
  if (!show) {
    phones = phones.slice(0, 15);
  };

  // show phones
  phones.forEach(element => {
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
        <figure><img src="${element.image}" alt="Phone" class=" mt-10 rounded-lg" /></figure>
        <div class="card-body">
          <h2 class="card-title">${element.phone_name}</h2>
          <p>If a men need phones whose phones does he choose?</p>
          <div class="card-actions justify-center">
            <button class="btn ">Show Details</button>
          </div>
        </div>
      </div>
        `;
    PhonesContainer.appendChild(div);
  });
  loading(false);
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