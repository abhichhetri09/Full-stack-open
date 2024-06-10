import { useState } from "react";
const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };
  return (
    <div>
      <input type="text" value={query} onChange={handleChange}>
        {onSearch}
      </input>
    </div>
  );
};
export default Search;
