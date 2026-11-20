const cityInput = document.getElementById("city");
const result = document.getElementById("result");

document.getElementById("searchBtn").addEventListener("click", getWeather);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    result.textContent = "Please enter a city name.";
    return;
  }
  result.textContent = "Loading...";
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    const geo = await geoRes.json();
    if (!geo.results) {
      result.textContent = "City not found.";
      return;
    }
    const { latitude, longitude, name, country } = geo.results[0];
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
    );
    const data = await res.json();
    const c = data.current;
    result.innerHTML = `
      <h2>${name}, ${country}</h2>
      <p>Temperature: ${c.temperature_2m} °C</p>
      <p>Humidity: ${c.relative_humidity_2m}%</p>
      <p>Wind: ${c.wind_speed_10m} km/h</p>`;
  } catch (err) {
    result.textContent = "Something went wrong. Try again.";
  }
}
