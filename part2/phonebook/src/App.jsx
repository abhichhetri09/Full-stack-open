import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";
import axios from "axios";
import personService from "./services/persons";
import Notification from "../components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    personService.getAll().then((initialData) => {
      console.log("success!");
      setPersons(initialData);
    });
  }, []);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((updatedPersonData) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPersonData
              )
            );
            setNewName("");
            setNewNumber("");
            alert("Updated!" + updatedPerson.name);
            setSuccessMessage(`Updated ${updatedPerson.name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((personData) => {
        setPersons(persons.concat(personData));
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
    }
  };
  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id != id));
        alert("Deleted " + person.name);
      });
    }
  };
  const personsToShow = persons.filter((person) =>
    person.name?.toLowerCase().includes(filter?.toLowerCase() || "")
  );

  return (
    <div>
      <Notification message={successMessage} />
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
