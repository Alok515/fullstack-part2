import { useState, useEffect } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import FilterPerson from './components/FilterPerson';
import Notification from './components/Notification';
import { getAllPersons, createPerson, updatePerson, deletePerson } from './services/api';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterPersons, setFilterPersons] = useState(persons);
  const [message, setMessage] = useState({ isSuccess: false, value: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check to remove duplicate name
    const duplicate = persons.find(person => person.name === newName);
    if (duplicate) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        try {
          const updatedPerson = await updatePerson(duplicate.id, { ...duplicate, number: newNumber });
          if (updatedPerson) {
            console.log("User updated:", updatedPerson);
            setPersons(persons.map(person => person.id !== duplicate.id ? person : updatedPerson));
            setFilterPersons(persons.map(person => person.id !== duplicate.id ? person : updatedPerson));
            notifier(true, "User Phone number updated");
          }
        } catch (error) {
          console.log(error);
          notifier(false, "Error updating user");
        }
      }
      setNewName('');
      setNewNumber('');
      return;
    }

    const randomId = Math.floor(Math.random() * 1000000);

    const personObj = {
      id: String(randomId),
      number: newNumber,
      name: newName
    }
    //add user To backend
    try {
      const addedPerson = await createPerson(personObj);
      if (addedPerson) {
        console.log("User added:", addedPerson);
        setPersons(persons.concat(personObj));
        setFilterPersons(persons.concat(personObj));
        notifier(true, `User ${addedPerson.name} added`);
      }
    } catch (error) {
      console.log(error);
      notifier(false, "Failed to add user, Please try again!");
      return;
    }

    //clear inputs
    setNewName('');
    setNewNumber('');
  }

  const handleFilter = (e) => {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilterPersons(filtered);
  }

  function notifier(isSuccess, value) {
    setMessage({ isSuccess, value });
    setTimeout(() => {
      setMessage({ isSuccess: false, value: '' });
    }, 5000);
  }

  //get Data
  useEffect(() => {
    async function getData() {
      try {
        const presonsData = await getAllPersons();
        setPersons(presonsData);
        setFilterPersons(presonsData);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const deletePersonHandler = async (id) => {
    const person = persons.find(person => person.id === id);
    try {
      if (!person) throw new Error("Person not found");
      if (confirm(`Delete ${person.name}?`)) {
        const deletedPerson = await deletePerson(id);
        if (deletedPerson) {
          setPersons(persons.filter(person => person.id !== id));
          setFilterPersons(filterPersons.filter(person => person.id !== id));
          console.log("User deleted:", deletedPerson);
          notifier(true, `User ${deletedPerson.name} deleted`);
        }
      }
    } catch (error) {
      console.log(error);
      notifier(false, `Information of ${person.name} has already been removed from server`);
      return;
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      { message.value && <Notification message={message} /> }
      <FilterPerson handleFilter={handleFilter} />
      <br /><br />
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={(e) => setNewName(e.target.value)} handleNumberChange={(e) => setNewNumber(e.target.value)} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} handleDelete={deletePersonHandler} />
    </div>
  )
}

export default App