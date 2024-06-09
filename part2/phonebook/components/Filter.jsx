const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <div>
        filter shown with: <input onChange={handleFilterChange} />
      </div>
    </div>
  );
};
export default Filter;
