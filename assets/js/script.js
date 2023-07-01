let apiKey = "938b5f6bb7e5bccaf0bebce340c61317";


// let lat =
// let lon =

//api to convert city name to geo coordinates

let getForecastBtn = document.querySelector("#get-forecast");

getForecastBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let searchBarEl = document.querySelector("#userSearch");
    let cityName = searchBarEl.value;
    let cityNameConvert = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(cityNameConvert)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let location = data.name;
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            console.log(location, lat, lon);
            // localStorage.setItem(`${location}-lat`, lat);
            // localStorage.setItem(`${location}-lon`, lon);

            // let latitude = localStorage.getItem(`${location}-lat`);
            // let longitude = localStorage.getItem(`${location}-lon`);
            let requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    let currentCityName = data.city.name;
                    let date = data.list[0].dt_txt;
                    let icon = data.list[0].weather[0].icon;
                    let temperature = data.list[0].main.temp;
                    let humidity = data.list[0].main.humidity;
                    let windSpeed = data.list[0].wind.speed;
                    console.log(currentCityName, date, icon, temperature, humidity, windSpeed);

                    let todaysForecast = document.querySelector("#")

                });
        });
})





//     AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history


// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city