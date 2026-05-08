export async function fetchForecast(location) {
  const url = new URL("https://api.weatherapi.com/v1/forecast.json");

  const forecastDays = 7;

  url.search = new URLSearchParams({
    q: location,
    days: forecastDays,
    key: process.env.WEATHER_API_KEY,
  });

  try {
    const res = await fetch(url);
    const data = await res.json();

    const city = data.location.name;
    const country = data.location.country;
    const locationName = `${city}, ${country}`;

    const weatherData = data.forecast.forecastday.map((day) => ({
      date: day.date,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
    }));

    return { locationName, weatherData };
  } catch (error) {
    console.error(error);
    return null;
  }
}
