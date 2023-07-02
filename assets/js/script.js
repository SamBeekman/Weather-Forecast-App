let apiKey = "938b5f6bb7e5bccaf0bebce340c61317";

let historyArray = [];

let getForecastBtn = document.querySelector("#get-forecast");
let searchResult = document.querySelector("#search");

getForecastBtn.addEventListener("click", function (event) {
    event.preventDefault();

    //  delete created elements that are displayed
    clearDay();


    // create button elements and search history
    let searchBarEl = document.querySelector("#userSearch");
    let cityName = searchBarEl.value;
    if (!historyArray.includes(cityName)) {

        let displaySearchResult = document.createElement('button');
        displaySearchResult.classList.add("btn", "btn-secondary", "display", "history-button", `${cityName.split(" ").join("")}`);
        displaySearchResult.textContent = cityName;
        searchResult.appendChild(displaySearchResult);
        historyArray.push(cityName);
        localStorage.setItem("history", JSON.stringify(historyArray));
    };

    getWeather(cityName);
});

//api to convert city name to geo coordinates

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

                    // slice out values for consecutive days from data array
                    let dataArray = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32], data.list[39]];

                    let cityEl = document.querySelector("#day0");
                    cityEl.textContent = data.city.name;

                    // 5 day forecast using loop to create elements, pull out data from fetch and append to appropriate section

                    for (let i = 0; i < dataArray.length; i++) {

                        let date = dataArray[i].dt_txt;
                        date = "Date: " + (date.slice(0, 11));

                        let icon = dataArray[i].weather[0].icon;
                        let iconDisplay = document.createElement("img")
                        iconDisplay.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);

                        let temperature = "Temp: " + dataArray[i].main.temp.toFixed(1) + "\u00B0C";
                        let humidity = "Humidity: " + dataArray[i].main.humidity + "%";
                        let wind = dataArray[i].wind.speed * 1.60934;
                        let windConvert = wind.toFixed(2);
                        let windSpeed = "Wind: " + windConvert + " Kph";

                        let day = document.querySelector(`#day${i}`);
                        let infoArray = [date, temperature, humidity, windSpeed];

                        for (let j = 0; j < infoArray.length; j++) {

                            let newDiv = document.createElement('div');
                            newDiv.textContent = infoArray[j];
                            day.appendChild(newDiv);
                        };

                        for (let n = 0; n < 6; n++) {
                            day.prepend(iconDisplay);

                        };
                    };
                });
        });
};

if (localStorage.getItem("history")) {
    getElementFromLocalStorage();
};


// get local storage elements
function getElementFromLocalStorage() {
    let localStorageArray = JSON.parse(localStorage.getItem("history"));
    console.log(localStorageArray);
    if (localStorageArray !== null) {
        historyArray = localStorageArray;
        for (let m = 0; m < historyArray.length; m++) {

            let displaySearchResult = document.createElement('button');
            displaySearchResult.classList.add("btn", "btn-secondary", "display", "history-button", `${historyArray[m].split(" ").join("")}`);
            displaySearchResult.textContent = historyArray[m];

            displaySearchResult.addEventListener("click", function (event) {
                event.preventDefault();
                clearDay();
                getWeather(displaySearchResult.textContent);
            })
            searchResult.appendChild(displaySearchResult);
        };
    };
};

// function to clear created elements so nothing is displayed
function clearDay() {
    let dayArray = ["#day0", "#day1", "#day2", "#day3", "#day4", "#day5"];
    for (let l = 0; l < dayArray.length; l++) {

        let dayRemove = document.querySelector(dayArray[l]);
        while (dayRemove.firstChild) {
            dayRemove.removeChild(dayRemove.lastChild);
        };
    };
};

// button to clear history
let clearButton = document.querySelector("#clear-history");
clearButton.addEventListener("click", function () {
    localStorage.setItem("history", "");
})
