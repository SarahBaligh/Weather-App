var cards = document.querySelector(".row");
var searchInput = document.getElementById("searchInput");

async function getWeather(city) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4a69453bb8de40cc9f3224929240712&q=${city}&days=3`
  );
  console.log(response.status);
  
  if (response.status >= 200 && response.status < 300) {
    var data = await response.json();
    displayWeather(data);
  }
}

searchInput.addEventListener("input", function (e) {
  getWeather(e.target.value);
});

getWeather("October");

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getDayname(dateNum) {
  var day = dateNum;
  var date = new Date(day);
  var dateIndex = date.getDay();
  var dateName = days[dateIndex];
  return dateName;
}

function getDate(dateNum) {
  var day = dateNum;
  var date = new Date(day);
  var dayDate = date.getDate();
  var dateText = date.getMonth();
  var monthName = months[dateText];
  return dayDate + " " + monthName;
}

var data = [];
function displayWeather(data) {
  var cartona = `
  <!-- --------------------- 1st Card ----------------------- -->
                  <div class="col-lg-4">
                    <div class="card border-0 ">
                        <div class="card-header d-flex justify-content-between main-text-color rounded-0 card-header-color">
                          <span>${getDayname(
                            data.forecast.forecastday[0].date
                          )}</span>
                          <span>${getDate(
                            data.forecast.forecastday[0].date
                          )}</span>
                        </div>
                        <div class="card-body py-4 card-body-color">
                          <p class="fs-5 main-text-color">${
                            data.location.name
                          }</p>
                        <span class="temp fw-bold text-white">${
                          data.current.temp_c
                        }<sup>o</sup>C</span>
                        <figure class="card1-img">
                            <img src="${
                              data.current.condition.icon
                            }" class="w-100" alt="">
                        </figure>
                          
                          <p class="text-color">${
                            data.current.condition.text
                          }</p>
                          <div class="d-flex gap-4 ">
                            <div >
                                <i class="fa-solid fa-umbrella text-secondary"></i>
                                <span class="main-text-color">${
                                  data.current.feelslike_c
                                }</span>
                            </div>
                            <div>
                                <i class="fa-solid fa-wind text-secondary"></i>
                                <span class="main-text-color">${
                                  data.current.wind_kph
                                }km/h</span>
                            </div>
                            <div>
                                <i class="fa-solid fa-compass text-secondary"></i>
                                <span class="main-text-color">${
                                  data.current.wind_dir
                                }</span>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>

<!-- --------------------- 2nd Card ----------------------- -->
                <div class="col-lg-4 text-center">
                    <div class="card border-0 ">
                        <div class="card-header main-text-color rounded-0 mid-card-header">
                        ${getDayname(data.forecast.forecastday[1].date)}
                        </div>
                        <div class="card-body py-5 mid-card-body">
                          <figure>
                            <img src="${
                              data.forecast.forecastday[1].day.condition.icon
                            }" alt="">
                          </figure>
                          <h3 class="fw-bold fs-2 text-white">${
                            data.forecast.forecastday[1].day.maxtemp_c
                          }<sup>o</sup>C</h3>
                          <span class="main-text-color">${
                            data.forecast.forecastday[1].day.mintemp_c
                          }<sup>o</sup>C</span>
                          <p class="text-color mt-4">${
                            data.forecast.forecastday[1].day.condition.text
                          }</p>
                        </div>
                      </div>
                </div>

<!-- --------------------- 3rd Card ----------------------- -->
                <div class="col-lg-4 text-center">
                    <div class="card border-0 ">
                        <div class="card-header main-text-color rounded-0 card-header-color">
                        ${getDayname(data.forecast.forecastday[2].date)}
                        </div>
                        <div class="card-body py-5 card-body-color">
                          <figure>
                            <img src="${
                              data.forecast.forecastday[2].day.condition.icon
                            }" alt="">
                          </figure>
                          <h3 class="fw-bold fs-2 text-white">${
                            data.forecast.forecastday[2].day.maxtemp_c
                          }<sup>o</sup>C</h3>
                          <span class="main-text-color">${
                            data.forecast.forecastday[2].day.mintemp_c
                          }<sup>o</sup>C</span>
                          <p class="text-color mt-4">${
                            data.forecast.forecastday[2].day.condition.text
                          }</p>
                        </div>
                      </div>
                </div>`;

  cards.innerHTML = cartona;
}

const successCallback = function (position) {
  console.log(position);
};

const errorCallback = function (error) {
  console.error(error.message);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
  enableHighAccuracy: true,
  timeout: 5000,
});
