var apiKey = "76a92fe5a440f98efc6b950d15baa372";

// Tokyo's latitude and longitude
const tokyoLat = 35.6762;
const tokyoLon = 139.6503;

const today = Math.floor(Date.now() / 1000);


for (let i = 0; i < 5; i++) {
  const date = today + i * 86400;

  const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${tokyoLat}&lon=${tokyoLon}&dt=${date}&units=metric&appid=${apiKey}`;
  console.log(url)
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = data.current.weather[0].main;
      const temp = data.current.temp;
      const wind = data.current.wind_speed;
      const humidity = data.current.humidity;
      const dateStr = new Date(date * 1000).toLocaleDateString();
      console.log(`${dateStr}: ${weather}, ${temp}°C, Wind: ${wind}m/s, Humidity: ${humidity}%`);
      console.log(data)
    })
    .catch(error => console.error(error));
}
