const PhonesInfo = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones)
};

const displayPhone = (phones) => {
    const PhonesContainer = document.getElementById('phone-container')
    phones.forEach(element => {
        console.log(element);
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img src="${element.image}" alt="Phone" class=" mt-10" /></figure>
        <div class="card-body">
          <h2 class="card-title">${element.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn ">Buy Now</button>
          </div>
        </div>
      </div>
        `;
        PhonesContainer.appendChild(div);
    });
}

PhonesInfo()