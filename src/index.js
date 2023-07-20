let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let timeElement = document.querySelector("#time");
timeElement.innerHTML = `${day} ${date} ${year} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let cityElement = document.querySelector("#city");
  if (searchInput.value) {
    searchCity(searchInput.value);
    cityElement.innerHTML = `${searchInput.value}`;
  } else {
    cityElement.innerHTML = null;
    alert("please type a city");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showWeather(response) {
  
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#day-details");
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  let humidity =Math.round(response.data.main.humidity);
  let humidityElement =document.querySelector(".humidity");
  humidityElement.innerHTML =`Humidity:${humidity}%`;
  let windElement =document.querySelector(".wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML =`Wind:${wind}km/h`;
}

function searchCity(city) {
  let apiKey = "14a80ec33e9f3373eb4f34a24db3f886";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function showPosition(position) {
  let apiKey = "14a80ec33e9f3373eb4f34a24db3f886";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let newButton = document.querySelector("#current-button");
newButton.addEventListener("click", getPosition);