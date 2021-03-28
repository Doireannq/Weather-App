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

let globalTempMin = null;
let globalTempMax = null;
let globalTemp = null;
let globalDesc = null;

function showTemperature(response) {
  let searchPlace = document.querySelector("#search-place");
  searchPlace.innerHTML = `${response.data.name}, `;

  // let weatherDescription = document.querySelector("#weather-description");
  // weatherDescription.innerHTML = response.data.weather[0].description;

  console.log(response.data);

  let tempLinks = document.querySelector(".temp-links");
  tempLinks.classList.add('show');
  
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;

  let precipitation = document.querySelector(".precipitation");
  precipitation.innerHTML = `Precipitation: ${Math.round(response.data.main.humidity)}%`;

  globalTempMin = Math.round(response.data.main.temp_min);
  globalTempMax = Math.round(response.data.main.temp_max);
  globalTemp = Math.round(response.data.main.temp);
  globalDesc = response.data.weather[0].description;

  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = `Min: ${globalTempMin}&deg;C`;

  let tempHigh = document.querySelector("#temp-high");
  tempHigh.innerHTML = `Max: ${globalTempMax}&deg;C`;

  let currentTemp = document.querySelector("#current-temp-number");
  currentTemp.innerHTML = `${globalTemp}&deg;C - ${globalDesc}`;

  let animationIcons = {
    'clear': 'sunny',
    'clouds': 'cloudy',
    'rain': 'rainy',
    'snow': 'snowy'
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
    
  if (animationIcon) {
    emojiTemp.className = 'emoji';
    emojiTemp.classList.add(animationIcon);
  } else {
    emojiTemp.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png"/>`;
  }
}

function currentWeatherFunction(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(handlePosition);
}

function errorTemperature(error) {
  let tempLinks = document.querySelector(".temp-links");
  tempLinks.classList.add('hide');
  
  let searchPlace = document.querySelector("#search-place");
  searchPlace.innerHTML = ``;

  let mainContainer = document.querySelector(".container");
  mainContainer.classList.remove('weather-animations');

  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = ``;

  let wind = document.querySelector(".wind");
  wind.innerHTML = ``;

  let precipitation = document.querySelector(".precipitation");
  precipitation.innerHTML = ``;

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

function inFahrenheit(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  
  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = `Min: ${((globalTempMin * 9) / 5 + 32)}&deg;C`;

  let tempHigh = document.querySelector("#temp-high");
  tempHigh.innerHTML = `Max: ${((globalTempMax * 9) / 5 + 32)}&deg;C`;

  let currentTemp = document.querySelector("#current-temp-number");
  currentTemp.innerHTML = `${((globalTemp * 9) / 5 + 32)}&deg;C - ${globalDesc}`;
}

function inCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  
  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = `Min: ${globalTempMin}&deg;C`;

  let tempHigh = document.querySelector("#temp-high");
  tempHigh.innerHTML = `Max: ${globalTempMax}&deg;C`;

  let currentTemp = document.querySelector("#current-temp-number");
  currentTemp.innerHTML = `${globalTemp}&deg;C - ${globalDesc}`;
}


let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", inFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", inCelsius);