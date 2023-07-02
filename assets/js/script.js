let apiKey = "938b5f6bb7e5bccaf0bebce340c61317";

let historyArray = [];

let getForecastBtn = document.querySelector("#get-forecast");
let searchResult = document.querySelector("#search");

getForecastBtn.addEventListener("click", function (event) {
    event.preventDefault();

    //  delete created elements that are displayed

    let dayArray = ["#day0", "#day1", "#day2", "#day3", "#day4", "#day5"];
    for (let l = 0; l < dayArray.length; l++) {

        let dayRemove = document.querySelector(dayArray[l]);
        while (dayRemove.firstChild) {
            dayRemove.removeChild(dayRemove.lastChild);
        };
    };

    //api to convert city name to geo coordinates

    let searchBarEl = document.querySelector("#userSearch");
    let cityName = searchBarEl.value;
    if (!historyArray.includes(cityName)) {

        let displaySearchResult = document.createElement('button');
        displaySearchResult.classList.add("btn", "btn-secondary", "history-button", `${cityName}`);
        displaySearchResult.textContent = cityName;
        searchResult.appendChild(displaySearchResult);
        historyArray.push(cityName);
        localStorage.setItem("history", JSON.stringify(historyArray));
    }

    getWeather(cityName);
});



function getWeather(cityName) {
    let cityNameConvert = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(cityNameConvert)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let location = data.name;
            location = location.split(" ").join("");
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            console.log(location, lat, lon);


            // fetch request for weather data

            let requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";

            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    // slice out values 0, 8, 16, 24, 32, 40 from data array
                    let dataArray = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32], data.list[39]];

                    let cityEl = document.querySelector("#day0");
                    cityEl.textContent = data.city.name;

                    //for 5 day forecast use loop and creating elements in loop

                    for (let i = 0; i < dataArray.length; i++) {

                        let date = dataArray[i].dt_txt;
                        date = (date.slice(0, 11));
                        let icon = dataArray[i].weather[0].icon;
                        let iconDisplay = document.createElement("img")
                        iconDisplay.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);


                        let temperature = "Temp: " + dataArray[i].main.temp + "\u00B0C";
                        let humidity = "Humidity: " + dataArray[i].main.humidity + "%";

                        let wind = dataArray[i].wind.speed * 1.60934;
                        let windConvert = wind.toFixed(2);
                        let windSpeed = "Wind: " + windConvert + " Kph";

                        let day = document.querySelector(`#day${i}`);
                        let infoArray = [date, temperature, humidity, windSpeed];

                        for (let j = 0; j < infoArray.length; j++) {

                            let newDiv = document.createElement('div');
                            newDiv.textContent = infoArray[j];
                            newDiv.appendChild(iconDisplay);
                            day.appendChild(newDiv);
                        };
                    };
                });

        });
}


function getElementFromLocalStorage() {
    let localStorageArray = JSON.parse(localStorage.getItem("history"));
    console.log(localStorageArray);
    if (localStorageArray !== null) {
        historyArray = localStorageArray;
        for (let m = 0; m < historyArray.length; m++) {
            // searchResult.appendChild(historyArray[m]);
            let displaySearchResult = document.createElement('button');
            displaySearchResult.classList.add("btn", "btn-secondary", "history-button", `${historyArray[m]}`);
            displaySearchResult.textContent = historyArray[m];
            displaySearchResult.addEventListener("click", function (event) {
                event.preventDefault();
                getWeather(displaySearchResult.textContent);
            })
            searchResult.appendChild(displaySearchResult);
        }
    }
}
getElementFromLocalStorage();


//tutor help - convert codes to images, clear child elements on button click, add event listener to search history



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