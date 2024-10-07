const container = document.getElementById("container");
const searchInput = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");
const currLocation = document.getElementById("currLocation");
const weatherIcon = document.getElementById("iconContainer");
const weatherInfo = document.getElementById("weatherInfo");
const temp = document.getElementById("temp");
const cityName = document.getElementById("cityName");
const humidityInfo = document.getElementById("humidityInfo");
const wsInfo = document.getElementById("wsInfo");
const weatherBg = document.body;

const apiKey = "b9e3e743931981100173fb29f83501b1";  
let city;

function showData(url){
    weatherInfo.innerHTML = "Loading...";
    fetch(url)
      .then(response => {
        if (!response.ok) {
        throw new Error("Weather data not found");
    }
    return response.json();
})
      .then(data => {
        const mainInfo = data.weather[0].main;  
        const temperature = data.main.temp - 273.15;  
        const city = data.name;  
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed; 
    
        weatherInfo.innerHTML = `${mainInfo}`;
        temp.innerHTML = `${temperature.toFixed(0)}°c`;  
        cityName.innerHTML = `${city}`;
        humidityInfo.innerHTML = `${humidity}%`;
        wsInfo.innerHTML = `${windSpeed} km/h`;

        const weatherIcons = {
            "Clear": "SunIcon.png",
            "Clouds": "CloudIcon.png",
            "Rain": "Rain-CloudIcon.png",
            "Drizzle": "Rain-CloudIcon.png",
            "Thunderstorm": "Thunder-Rain-CloudIcon.png",
            "Snow": "SnowIcon.png",
            "Haze": "HazeIcon.png",
            "Fog": "HazeIcon.png",
            "Mist": "HazeIcon.png",
            "Smoke": "HazeIcon.png"
        };

        if (weatherIcons[mainInfo]) {
            weatherIcon.innerHTML = `<img src="${weatherIcons[mainInfo]}" id="icon" alt="${mainInfo}">`;
        } else {
            weatherIcon.innerHTML = `<img src="Sun-Cloud.png" id="icon" alt="Unknown Weather">`;
        }

        const weatherBgs = {
            "Clear": "ClearBg.jpg",
            "Clouds": "CloudBg.jpg",
            "Rain": "RainBg.jpg",
            "Drizzle": "RainBg.jpg",
            "Thunderstorm": "Thunderstorm.jpg",
            "Snow": "SnowBg.jpg",
            "Haze": "HazeBg.jpg",
            "Fog": "HazeBg.jpg",
            "Mist": "HazeBg.jpg",
            "Smoke": "HazeBg.jpg"
        };

        if (weatherBgs[mainInfo]) {
            weatherBg.style.backgroundImage = `url('${weatherBgs[mainInfo]}')`;
        } else {
            weatherBg.style.backgroundImage = `url('Background.jpg')` ;
        }
        
      })
      .catch(error => {
          console.error("Error fetching data:", error);
          weatherInfo.innerHTML = "Error fetching data.";
      }); 
}

searchBtn.addEventListener("click", function(){
    city = searchInput.value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    showData(url);
})
currLocation.addEventListener("click", function(){
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        showData(url);
    },
    (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please ensure location services are enabled.");
    });
})


// Clouds, haze, clear, rain, thunderstorm