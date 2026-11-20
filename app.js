sync function getweather() {
    let city = document.getElementById("city").value;

    if (city === "") {
        document.getElementById("result").innerHTML = "please enter city";
        return;
    }

    let apikey = "0eff84072beb7022af32004f366750b7";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod === 404) {
            document.getElementById("result").innerHTML = "city not found";
            return;
        }
        let temp = data.main.temp;
        let weather = data.weather[0].main;
        let humidity = data.main.humidity;

        document.getElementById("result").innerHTML =
            `Temperature: ${temp}°C <br> Weather: ${weather} <br> Humidity: ${humidity}%`;
            if(weather ==="clouds"){
        document.body.style.background = "gray";
    }else if(weather ===  "clear") {
        document.body.style.background = "yellow";
    }else {
        document.body.style.background = "lightblue";
    }

    } catch (error) {
        console.log("ERROR:", error);
        document.getElementById("result").innerHTML = "error fetching data";
    }
    }
    
