const apiKey = "76a92fe5a440f98efc6b950d15baa372";

const cityLinks = document.querySelectorAll('a');


function getWeather(city) {
  let lat, lon;
  switch (city) {
    case "New York":
      lat = 40.7128;
      lon = -74.0060;
      break;
    case "London":
      lat = 51.5074;
      lon = -0.1278;
      break;
    case "Paris":
      lat = 48.8566;
      lon = 2.3522;
      break;
    case "Tokyo":
      lat = 35.6762;
      lon = 139.6503;
      break;
    case "Sydney":
      lat = -33.8651;
      lon = 151.2099;
      break;
    default:
      throw new Error(`City "${city}" not found`);
  }

  const today = Math.floor(Date.now() / 1000);

  for (let i = 0; i < 5; i++) {
    const date = today + i * 86400;
    const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&units=metric&appid=${apiKey}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weather = data.current.weather[0].main;
        const temp = data.current.temp;
        const wind = data.current.wind_speed;
        const humidity = data.current.humidity;
        const dateStr = new Date(date * 1000).toLocaleDateString();
        console.log(`${city} - ${dateStr}: ${weather}, ${temp}°C, Wind: ${wind}m/s, Humidity: ${humidity}%`);
      })
      .catch(error => console.error(error));
  }
}

for (let i = 0; i < cityLinks.length; i++) {
    cityLinks[i].addEventListener('click', function(event) {
      event.preventDefault();
      const city = this.textContent;
      getWeather(city);
    });
  }
  
getWeather("Tokyo")