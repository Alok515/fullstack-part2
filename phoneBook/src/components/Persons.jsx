const Person = ({person, handleDelete}) => {
  return (
    <li>
      {person.name} {person.number} <button onClick={() =>handleDelete(person.id)}>delete</button>
    </li>
  )
}
const Persons = ({persons, handleDelete}) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.id} person={person} handleDelete={handleDelete} />)}
    </ul>
  )
}

export default Persons;