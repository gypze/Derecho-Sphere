const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const currentCity = document.querySelector('#current-city');
const currentDate = document.querySelector('#current-date');
const weatherTemp = document.querySelector('#current-weather-temp');
const weatherWind = document.querySelector('#current-weather-wind');
const weatherHumidity = document.querySelector('#current-weather-humidity');
const forecastContainer = document.querySelector('#forecast-container');
const searchHistory = document.querySelector('#search-history');

const apiKey = '60c61af32867c8e52f034e587886e777';

async function getWeather(event) {
    event.preventDefault();

    const city = searchInput.value.trim();
    if (!city) return;

    // Fetch current weather
    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    );
    const weatherData = await weatherResponse.json();

    if (weatherData.cod !== 200) {
        alert('City not found!');
        return;
    }

    // Update Current Weather
    currentCity.textContent = `${weatherData.name}`;
    currentDate.textContent = `(${new Date().toLocaleDateString()})`;
    weatherTemp.textContent = `Temp: ${weatherData.main.temp} °F`;
    weatherWind.textContent = `Wind: ${weatherData.wind.speed} MPH`;
    weatherHumidity.textContent = `Humidity: ${weatherData.main.humidity}%`;

    // Fetch 5-Day Forecast
    const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    );
    const forecastData = await forecastResponse.json();

    // Update Forecast
    forecastContainer.innerHTML = '';
    forecastData.list.forEach((forecast, index) => {
        if (index % 8 === 0) {
            const forecastDate = new Date(forecast.dt_txt).toLocaleDateString();
            const forecastEl = document.createElement('div');
            forecastEl.classList.add('forecast-day');
            forecastEl.innerHTML = `
                <p>${forecastDate}</p>
                <p>Temp: ${forecast.main.temp} °F</p>
                <p>Wind: ${forecast.wind.speed} MPH</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
            `;
            forecastContainer.appendChild(forecastEl);
        }
    });

    // Add to Search History
    const historyButton = document.createElement('button');
    historyButton.textContent = city;
    historyButton.addEventListener('click', () => {
        searchInput.value = city;
        getWeather(new Event('submit'));
    });
    searchHistory.appendChild(historyButton);

    searchInput.value = '';
}

// Event Listener
searchForm.addEventListener('submit', getWeather);




