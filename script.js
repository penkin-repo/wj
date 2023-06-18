let swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  // centeredSlides: true,
  spaceBetween: 10,
  pagination: {
    // el: ".swiper-pagination",
    clickable: true,
  },
});
let swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: "auto",
  // centeredSlides: true,
  spaceBetween: 10,
  pagination: {
    // el: ".swiper-pagination",
    clickable: true,
  },
});

// today day
let today = new Date();
let day = today.getDate();
console.log("today is ---> ", day);

const sliders = document.querySelectorAll(".swiper-slide");
sliders.forEach((item)=>{
  item.addEventListener("click", func);
})

function func(e) {
  e.target.classList.toggle("active")
}

const listMain = document.querySelector(".list");
let eventsList = [];

let myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
myHeaders.append("Content-Type", "text/plain");
// myHeaders.append("Access-Control-Allow-Origin", "http://localhost:63342");
// myHeaders.append('Access-Control-Allow-Credentials', 'true');

let raw = JSON.stringify({
  getProgram: "getProgram",
});

let requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("https://white-june.f5-portal.ru/api.php", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(JSON.parse(result).result[0]);
    eventsList = JSON.parse(result).result;
    makeEvents(eventsList);
  })
  .catch((error) => console.log("error", error));

function makeEvents(array) {
  listMain.innerHTML = "";

  array.forEach((item) => {
    let eventInner = "";
    item.events.forEach((item)=> {
      eventInner += `<p>-->${item.description}</p>`
    })
    let li = document.createElement("li");
    li.innerHTML = `<h2>${item.title}</h2>`;
    li.innerHTML += `<p>${item.place}</p>`;
    li.innerHTML += eventInner;
    listMain.appendChild(li);
  });
}
