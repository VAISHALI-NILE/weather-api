document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("search-btn");
    const time = document.getElementById("time");
    const temp = document.getElementById("temp");
    const cityInput = document.getElementById("city-input");
    const windDetail = document.getElementById("wind-detail");
    const humidityDetail = document.getElementById("humidity-detail");
    const windSpeedDetail = document.getElementById("wind-speed-detail");
    const weatherIcon = document.getElementById("weather-icon");
    const desc = document.querySelector(".desc");

    async function getData(city) {
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=df7fa61081a544708ac122349243103&q=${city}&aqi=yes`);
            if (!response.ok) {
                throw new Error(`An error occurred: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch weather data. Please try again.");
        }
    }

    async function getLocation() {
        const city = cityInput.value.trim(); // Get the city name from the input field
        if (!city) {
            alert("Please enter a city name.");
            return;
        }
        const data = await getData(city);
        if (data) {
            const dateObj = new Date(data.location.localtime);
            const options = { weekday: 'long', day: 'numeric', month: 'long' };
            const formattedTime = dateObj.toLocaleDateString('en-US', options);
            time.innerText = formattedTime;
            
            temp.innerText = data.current.temp_c + "°C";

            // Update details dynamically
            windDetail.innerHTML = `<img src="images/wind-icon.png" style="width: 25px;" alt=""> ${data.current.wind_kph} km/h`;
            humidityDetail.innerHTML = `<img src="images/drop-icon.png" style="width: 25px;" alt=""> ${data.current.humidity}%`;
            windSpeedDetail.innerHTML = `<img src="images/clock-icon.png" style="width: 25px;" alt=""> ${data.current.wind_mph} m/s`;

            
            // Update weather description dynamically
            desc.innerText = data.current.condition.text;
            let iconUrl ="images/Cloud.png" ;
            if(data.current.condition.text.toLowerCase().includes("cloud"))
            {
                iconUrl = "images/cloud.png";
            }
            else if(data.current.condition.text.toLowerCase().includes("rain"))
            {
                iconUrl = "images/Rain.png";
            }
            else if(data.current.condition.text.toLowerCase().includes("clear") || data.current.condition.text.toLowerCase().includes("sunny"))
            {
                iconUrl = "images/sun.png";
            }
            else if(data.current.condition.text.toLowerCase().includes("rain") && !data.current.condition.text.toLowerCase().includes("light"))
            {
                iconUrl = "images/storm.png";
            }

            weatherIcon.style.background = `url(${iconUrl}) no-repeat center/contain`;
        }
    }

    btn.addEventListener("click", async () => {
        await getLocation();
    });
});
