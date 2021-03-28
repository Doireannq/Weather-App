let apiKey = "ae92e2d465304b1ed71966b1f0b13866";

let now = new Date();

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

var minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${now.getHours()}:${minutes}`;

function searchFunction(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-search");

  let searchPlace = document.querySelector("#search-place");
  searchPlace.innerHTML = cityInput.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature).catch(errorTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchFunction);

let searchButton = document.querySelector("#search-weather");
searchButton.addEventListener("click", searchFunction);

function showTemperature(response) {
  let searchPlace = document.querySelector("#search-place");
  searchPlace.innerHTML = `${response.data.name}, `;

  console.log("weather", response.data.weather[0]);

  // let emojiTemp = document.querySelector("#emoji-temp");
  // emojiTemp.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png"/>`;

  // let weatherDescription = document.querySelector("#weather-description");
  // weatherDescription.innerHTML = response.data.weather[0].description;

  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = `Min: ${Math.round(response.data.main.temp_min)}&deg;C`;

  let tempHigh = document.querySelector("#temp-high");
  tempHigh.innerHTML = `Max: ${Math.round(response.data.main.temp_max)}&deg;C`;

  let currentTemp = document.querySelector("#current-temp-number");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}&deg;C - ${response.data.weather[0].description}`;

  let animationIcons = {
    'clear': 'sunny',
    'clouds': 'cloudy',
    'rain': 'rainy',
    'snow': 'snowy',
    'mist': 'foggy',
    'fog': 'foggy'
  }

  let backgroundAnimations = {
    'clear': 'weather-animation-clear',
    'clouds': 'weather-animation-cloudy',
    'rain': 'weather-animation-cloudy',
    'snowy': 'weather-animation-cloudy',
    'foggy': 'weather-animation-cloudy',
    'mist': 'weather-animation-cloudy'
  }

  let animationIcon = animationIcons[response.data.weather[0].main.toLowerCase()];
  let backgroundAnimation = backgroundAnimations[response.data.weather[0].main.toLowerCase()];

  let mainContainer = document.querySelector(".container");
  mainContainer.className = 'container';
  mainContainer.classList.add(backgroundAnimation);
  
  let emojiTemp = document.querySelector("#emoji-temp");
  emojiTemp.className = 'emoji';
  emojiTemp.classList.add(animationIcon);
}

function currentWeatherFunction(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(handlePosition);
}

function errorTemperature(error) {
  console.log(error);

  let searchPlace = document.querySelector("#search-place");
  searchPlace.innerHTML = ``;

  let mainContainer = document.querySelector(".container");
  mainContainer.classList.remove('weather-animations');

  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = ``;

  let tempHigh = document.querySelector("#temp-high");
  tempHigh.innerHTML = ``;

  let currentTemp = document.querySelector("#current-temp-number");
  currentTemp.innerHTML = `Location not found`;

  let emojiTemp = document.querySelector("#emoji-temp");
  emojiTemp.className = 'emoji';
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature).catch(errorTemperature);
}

let currentWeatherButton = document.querySelector("#current-weather");
currentWeatherButton.addEventListener("click", currentWeatherFunction);
