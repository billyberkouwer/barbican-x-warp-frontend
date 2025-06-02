let temperature = document.getElementById("temp") as HTMLElement;
let wind = document.getElementById("wind") as HTMLElement;
let summary = document.getElementById("summary") as HTMLElement;
let humidity = document.getElementById("humidity") as HTMLElement;
const kelvin = 273;

export default function initWeatherData() {
    window.addEventListener("load", () => {
        const weather = `https://api.openweathermap.org/data/2.5/weather?lat=51.50&lon=0.12&appid=1060eb6b25640497e465adc3dac61e24`;

        // fetch from API
        fetch(weather)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // convert kelvin to deg
                temperature.textContent = "TEMP: " + Math.floor(data.main.temp - kelvin) + "°C";
                wind.textContent = "WIND SPEED: " + data.wind.speed;
                summary.textContent = data.weather[0].main + ", " + data.weather[0].description;
                humidity.textContent = "HUMIDITY: " + data.main.humidity;
            });
    });
}
