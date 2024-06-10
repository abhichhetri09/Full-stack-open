import { useState } from "react";
import "./App.css";
import Search from "../components/Search";
import axios from "axios";
function App() {
  const [countries, setCountries] = useState([]);
  const handleSearch = (query) => {
    if (query) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          console.log(response.data); // Check the response data
          const filteredCountries = response.data.filter((country) =>
            country.name.common.toLowerCase().startsWith(query.toLowerCase())
          );

          setCountries(filteredCountries);
        })
        .catch((error) => {
          console.error("Error fetching countries:", error);
          setCountries([]);
        });
    } else {
      setCountries([]);
    }
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
