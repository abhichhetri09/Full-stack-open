const Perosns = ({ persons }) => {
  return (
    <div>
      <div>
        {persons.map((person, index) => (
          <div key={index}>
            {" "}
            {person.name} {person.number}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Perosns;
