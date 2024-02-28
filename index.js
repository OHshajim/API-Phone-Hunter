const PhonesInfo = async (search) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones)
};

const displayPhone = (phones) => {
  const PhonesContainer = document.getElementById('phone-container')

  // clear container
  PhonesContainer.textContent = '';

  phones.forEach(element => {
    console.log(element);
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
        <figure><img src="${element.image}" alt="Phone" class=" mt-10" /></figure>
        <div class="card-body">
          <h2 class="card-title">${element.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button class="btn ">Buy Now</button>
          </div>
        </div>
      </div>
        `;
    PhonesContainer.appendChild(div);
  });
}

// search button
const handleSearch = () => {
  const field = document.getElementById('SearchField');
  const search = field.value;
  PhonesInfo(search);
}



