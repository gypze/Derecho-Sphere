const city = document.querySelector('#search-input');
const searchform = document.querySelector('#search-form');
const weathertemp = document.querySelector('#current-weather-temp');
const weatherhumidity = document.querySelector('#current-weather-humidity');
const currentcity = document.querySelector('#current-city');
const weatherwind = document.querySelector('#current-weather-wind');
const currentdate = document.querySelector('#current-date');


async function getWeather (event) {
    event.preventDefault();
    let weatherdata = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial&appid=60c61af32867c8e52f034e587886e777`)
    let weather = await weatherdata.json();
    console.log(weather);
    weathertemp.textContent = weather.main.temp;
    weatherhumidity.textContent = weather.main.humidity;
    currentcity.textContent = weather.name;
    weatherwind.textContent = weather.wind.speed;   
    currentdate.textContent = new Date().toLocaleDateString();
    let forcastdata = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coords.lat}&lon=${weather.coords.lon}&units=imperial&appid=60c61af32867c8e52f034e587886e777`)
    let forcast = await forcastdata.json();
    console.log(forcast);
}
searchform.addEventListener('submit', getWeather);



