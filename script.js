let city;
let dataToSend;

const fetchAndSendData = async (city) => {
  try {
    // receives data from server and if response has status different, than ok it throws an error
    const getData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=2f702ad900272f52c1fdcd082513f7b8`
    );
    if (!getData.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status}`);
    }

    // transforme received data to data, that has to be sent
    const data = await getData.json();
    dataToSend = {
      date: new Date(),
      city: data.name,
      temperatureC: Math.round(data.main.temp - 273.15),
      weatherDescription: data.weather.description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    // sending modified object to a server and if response status is not ok, throws error
    const sendData = await fetch(
      "https://67461282512ddbd807fac125.mockapi.io/weather/",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(dataToSend),
      }
    );

    if (!sendData.ok) {
      throw new Error(`Failed to send data: ${sendData.status}`);
    }

    const result = await sendData.json();
    console.log("Data successfully sent:", result);
  } catch (error) {
    console.error(error.message);
  }
};

// takes value from the input and sends it to server
const submitForm = document.querySelector(".form");
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  city = document.querySelector(".city").value;
  if (city) {
    fetchAndSendData(city);
  }
});
