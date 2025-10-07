import { useState, useEffect } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import FilterPerson from './components/FilterPerson';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterPersons, setFilterPersons] = useState(persons);

  const handleSubmit = (e) => {
    e.preventDefault();

    //check to remove duplicate name
    const duplicate = persons.find(person => person.name === newName);
    if (duplicate) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    }

    const personObj = {
      id: persons.length + 1,
      number: newNumber,
      name: newName
    }
    setPersons(persons.concat(personObj));
    setFilterPersons(persons.concat(personObj));
    //clear inputs
    setNewName('');
    setNewNumber('');
  }

  const handleFilter = (e) => {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilterPersons(filtered);
  }

  //get Data
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('http://localhost:3001/persons');
        setPersons(response.data);
        setFilterPersons(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPerson handleFilter={handleFilter} />
      <br /><br />
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={(e) => setNewName(e.target.value)} handleNumberChange={(e) => setNewNumber(e.target.value)} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} />
    </div>
  )
}

export default App