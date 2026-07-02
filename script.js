const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const weatherResult = document.getElementById("weatherResult");

const apiKey = "9fb38f45c826643cc0829298a4442d11";

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
       const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
    throw new Error(data.message);
    }


        console.log(data);

        weatherResult.innerHTML = `
            <h2>${data.name}</h2>
            <p>🌡️ Temperature: ${data.main.temp} °C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
            <p>☁️ Weather: ${data.weather[0].main}</p>
        `;

    } catch (error) {
        weatherResult.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
});

cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});