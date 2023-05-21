// Store the API key and base URL for OpenWeatherMap
const apiKey = 'c772193d20ebd1a6637706f8598ffd49';
const apiUrl = 'https://api.openweathermap.org/data/2.5';

// Function to fetch weather data for a given city
async function fetchWeatherData(city) {
  const currentWeatherUrl = `${apiUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `${apiUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Fetch current weather data
    const currentWeatherResponse = await fetch(currentWeatherUrl);
    const currentWeatherData = await currentWeatherResponse.json();

    // Fetch forecast data
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    return { currentWeatherData, forecastData };
  } catch (error) {
    console.log('Error fetching weather data:', error);
    return null;
  }
}

// Function to display the current weather
function displayCurrentWeather(weatherData) {
  // Extract relevant data from the weatherData object
  const { name, dt, weather, main, wind } = weatherData;

  // Format the date
  const date = new Date(dt * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Display the current weather information
  const cityNameElement = document.querySelector('#city-name');
  cityNameElement.textContent = name;

  const dateElement = document.querySelector('#date');
  dateElement.textContent = date;

  const iconElement = document.querySelector('#today-forecast i');
  iconElement.className = `wi wi-owm-${weather[0].id}`;

  const temperatureElement = document.querySelector('#temperature');
  temperatureElement.textContent = `Temperature: ${main.temp}°C`;

  const windElement = document.querySelector('#wind');
  windElement.textContent = `Wind: ${wind.speed} m/s`;

  const humidityElement = document.querySelector('#humidity');
  humidityElement.textContent = `Humidity: ${main.humidity}%`;
}

// Function to display the forecast
function displayForecast(forecastData) {
  // Extract the list of forecast items from the forecastData object
  const forecastItems = forecastData.list;

  // Select the forecast container
  const forecastContainer = document.getElementById('5-day-forecast');

  // Clear previous forecast data
  forecastContainer.innerHTML = '';

  // Display the forecast information for each item in the list
  forecastItems.forEach((item, index) => {
    // Extract relevant data for each forecast item
    const { dt, weather, main, wind } = item;

    // Format the date
    const date = new Date(dt * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Create forecast item elements
    const forecastItem = document.createElement('div');
    forecastItem.innerHTML = `
      <h3>${date}</h3>
      <i class="wi wi-owm-${weather[0].id}"></i>
      <p>Temperature: ${main.temp}°C</p>
      <p>Wind: ${wind.speed} m/s</p>
      <p>Humidity: ${main.humidity}%</p>
    `;

    // Add the forecast item to the forecast container
    forecastContainer.appendChild(forecastItem);

    // Only display the first 5 forecast items (5 days)
    if (index === 4) {
      return;
    }
  });
}

// Function to handle search form submission
async function handleSearchFormSubmit(event) {
  event.preventDefault();

  // Get the city name from the search input
  const cityInput = document.getElementById('city-search');
  const city = cityInput.value.trim();

  // Clear the search input
  cityInput.value = '';

  // Fetch weather data for the given city
  const weatherData = await fetchWeatherData(city);

  if (weatherData) {
    // Display the current weather
    displayCurrentWeather(weatherData.currentWeatherData);

    // Display the forecast
    displayForecast(weatherData.forecastData);

    // Add the city to the search history
    addToSearchHistory(city);
  } else {
    // Show an error message if weather data couldn't be fetched
    console.log('Error: Weather data not found');
  }
}

// Function to handle search history click
async function handleSearchHistoryClick(event) {
  event.preventDefault();

  // Get the clicked city name
  const cityName = event.target.textContent;

  // Fetch weather data for the clicked city
  const weatherData = await fetchWeatherData(cityName);

  if (weatherData) {
    // Display the current weather
    displayCurrentWeather(weatherData.currentWeatherData);

    // Display the forecast
    displayForecast(weatherData.forecastData);
  } else {
    // Show an error message if weather data couldn't be fetched
    console.log('Error: Weather data not found');
  }
}

// Function to add a city to the search history
function addToSearchHistory(city) {
  // Get the search history list
  const searchHistoryList = document.getElementById('search-history');

  // Create a new list item
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  link.href = '#';
  link.textContent = city;
  listItem.appendChild(link);

  // Add an event listener to the list item
  link.addEventListener('click', handleSearchHistoryClick);

  // Add the list item to the search history list
  searchHistoryList.appendChild(listItem);
}

// Add event listener to the search form
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', handleSearchFormSubmit);

// Attach event listeners to the search history links
const searchHistoryLinks = document.querySelectorAll('#search-history li a');
searchHistoryLinks.forEach((link) => {
  link.addEventListener('click', handleSearchHistoryClick);
});