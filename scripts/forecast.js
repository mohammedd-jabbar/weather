const key = "W4iUzzuTrxQg6BRd8De0ALPG5Vco3BeY";

// Get weather information
const getWeather = async (id) => {
  const base = "https://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}&q=${city}`;

  const res = await fetch(base + query);
  const data = await res.json();
  return data[0];
};

// Get city infromation
const getCity = async (city) => {
  base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  query = `?apikey=${key}&q=${city}`;

  const res = await fetch(base + query);
  const data = await res.json();

  return data[0];
};
