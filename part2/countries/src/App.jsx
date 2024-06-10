import { useState } from "react";
import "./App.css";
import Search from "../components/Search";

function App() {
  const [countries, setCountries] = useState([]);
  const handleSearch = (query) => {
    if (query) {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/name")
        .then((response) => {
          setCountries(response.data);
        });
    }
  };
  return (
    <div>
      <Search onSearch={handleSearch} />
    </div>
  );
}

export default App;
