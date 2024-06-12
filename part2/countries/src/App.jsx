import { useState } from "react";

import Search from "../components/Search";
import axios from "axios";
function App() {
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleSearch = (query) => {
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
            setCountries(filteredCountries);
            console.log("Filtered countries in state:", filteredCountries);
          } else {
            setMessage("");
            setCountries(filteredCountries);
          }
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
            <img
              src={countries[0].flags.png}
              alt={`Flag of ${countries[0].name.common}`}
              width="100"
            />
          </ul>
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
            <img
              src={selectedCountry.flags.png}
              alt={`Flag of ${selectedCountry.name.common}`}
              width="100"
            />
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
