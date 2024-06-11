import { useState } from "react";
import "./App.css";
import Search from "../components/Search";
import axios from "axios";
function App() {
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
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

  return (
    <div>
      <Search onSearch={handleSearch} />
      {message && <p>{message}</p>}
      {countries.length >= 2 && countries.length <= 10 && (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
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
            {countries[0].languages &&
            Object.values(countries[0].languages).length > 0 ? (
              Object.values(countries[0].languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))
            ) : (
              <li>Languages information not available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
