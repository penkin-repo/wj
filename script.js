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

// получить дату
function getDay(number) {
  let date = new Date(number);
  return date.getDate();
}
// получить время
function getTime(str) {
  const dateTimeParts = str.split(" ");
  const timeParts = dateTimeParts[1].split(":");
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const seconds = parseInt(timeParts[2]);
  return (hours + ":" + minutes); // 14:48:0
}

function startAlarms() {
  const linksAlarm = document.querySelectorAll(".event__link");
  linksAlarm.forEach((item)=> {
    item.addEventListener("click", func);
  })
  function func(e) {
    console.log(e.target.getAttribute("data-event"));
    if (!e.target.classList.contains("no-active")) {
      e.target.classList.add("no-active")
    }
  }
}



// запрос
let rawGet = JSON.stringify({
  getProgram: "getProgram",
});



function fetchToApi(raw) {
  let myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Content-Type", "text/plain");
  // myHeaders.append("Access-Control-Allow-Origin", "http://localhost:63342");
  // myHeaders.append('Access-Control-Allow-Credentials', 'true');

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://white-june.f5-portal.ru/api.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(JSON.parse(result).result);
      eventsList = JSON.parse(result).result;
      makeEvents(eventsList, 30);
      startAlarms();
    })
    .catch((error) => console.log("error", error));
}

fetchToApi(rawGet);

// global vars
let dayToday = new Date().getDate();
let dayDisplay = 30;

console.log("today is ---> ", dayToday);

const sliders = document.querySelectorAll(".swiper-slide");
sliders.forEach((item) => {
  item.addEventListener("click", addRemoveActiveFromOptions);
});

function addRemoveActiveFromOptions(e) {
  e.target.classList.toggle("active");
}

const listMain = document.querySelector(".list");
let eventsList = [];

function makeEvents(array, day = 30, event = "test") {
  listMain.innerHTML = `<h1 class="main-date container">${day} июня</h1>`;
  let eventInner = ""

  array.forEach((item) => {
    const dateDay = getDay(item.date);
    if (day === dateDay) {
      eventInner += `<h2>${item.title}</h2>`;

      // события
      item.events.forEach((item) => {
        const timeString = `${getTime(item.date_start)}-${getTime(item.date_stop)}`
        eventInner += `
            <div class="list-events__place container">
                ${item.place}
            </div>
            <div class="list-events__event event container">
            <div class="event__top">
                <div class="event__time">${timeString}</div>
                <div class="event__link" data-event="${item.id}">Напомнить мне</div>
            </div>
            <div class="event__body">
                ${item.description}
            </div>
            </div>
        `;
      });

      listMain.innerHTML += eventInner;
    }
  });
}
