// Get submit form
const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUi = (data) => {
  const { cityDets, cityWeather } = data;

  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${cityWeather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${cityWeather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

  // Update the night and day icons

  let iconSrc = `img/icons/${cityWeather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  //
  let timeSrc = cityWeather.IsDayTime ? "./img/day.svg" : "./img/night.svg";

  time.setAttribute("src", timeSrc);

  // Remove display
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const cityUpdate = async (city) => {
  const cityDets = await getCity(city);
  const cityWeather = await getWeather(cityDets.Key);

  return { cityDets, cityWeather };
};

// Get data from user
cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //   Get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //   Update the UI with new city
  cityUpdate(city)
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));

  // Set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  cityUpdate(localStorage.getItem("city"))
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));
}
