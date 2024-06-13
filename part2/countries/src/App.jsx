import { useState } from "react";
import Search from "../components/Search";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const APIKEY = import.meta.env.VITE_API_KEY;
  const handleSearch = (query) => {
    setSelectedCountry(null);
    setWeather(null);
    if (query) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          // Check the response data
          console.log("API response:", response.data);
          const filteredCountries = response.data.filter((country) =>
            country.name.common.toLowerCase().startsWith(query.toLowerCase())
          );
          console.log("Filtered countries:", filteredCountries);
          if (filteredCountries.length > 10) {
            setMessage("Too many matches, specify another filter");

            console.log("Filtered countries in state:", filteredCountries);
          } else {
            setMessage("");
          }
          setCountries(filteredCountries);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
          setMessage("Error fetching data");
          setCountries([]);
        });
    } else {
      setCountries([]);
      setMessage("");
    }
  };
  const handleOnClick = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capitalInfo.latlng);
  };
  const fetchWeather = (latlng) => {
    const [lat, lon] = latlng;

    console.log(latlng);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
        console.log("response", response.data);
      })
      .catch((error) => {
        console.log("Error fetching weather data", error);
        setWeather(null);
      });
  };
  return (
    <div>
      <Search onSearch={handleSearch} />
      {message && <p>{message}</p>}
      {countries.length >= 2 && countries.length <= 10 && (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => handleOnClick(country)}>show</button>
            </li>
          ))}
        </ul>
      )}
      {countries.length === 1 && (
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>capital {countries[0].capital}</p>
          <p>area {countries[0].area}</p>
          <h2>languages</h2>
          <ul>
            {Object.values(countries[0].languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img
            src={countries[0].flags.png}
            alt={`Flag of ${countries[0].name.common}`}
            width="100"
          />
          {weather && (
            <div>
              <h2>Weather in {countries[0].capital}</h2>
              <p>Temperature: {weather.main.temp} °C</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={`Weather icon`}
              />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
      {selectedCountry && (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p>capital {selectedCountry.capital}</p>
          <p>area {selectedCountry.area}</p>
          <h2>languages</h2>
          <ul>
            {Object.values(selectedCountry.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img
            src={selectedCountry.flags.png}
            alt={`Flag of ${selectedCountry.name.common}`}
            width="100"
          />
          {weather && (
            <div>
              <h2>Weather in {selectedCountry.capital}</h2>
              <p>Temperature: {weather.main.temp} °C</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={`Weather icon`}
              />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
