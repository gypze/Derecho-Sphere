const city = document.querySelector('#search-input');
const searchform = document.querySelector('#search-form');

async function getWeather (event) {
    event.preventDefault();
    let weatherdata = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=60c61af32867c8e52f034e587886e777`)
    let weather = await weatherdata.json();
    console.log(weather);
}
searchform.addEventListener('submit', getWeather);


