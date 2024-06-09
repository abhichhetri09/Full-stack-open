const Perosns = ({ persons, handleDelete }) => {
  const handleOnClick = () => {};
  return (
    <div>
      <div>
        {persons.map((person, index) => (
          <div key={index}>
            {" "}
            {person.name} {person.number}
            <button type="button" onClick={() => handleDelete(person.id)}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Perosns;
