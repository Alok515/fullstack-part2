import axios from 'axios';
const baseUrl = 'api/persons';

export async function getAllPersons() {
    const response = await axios.get(baseUrl);
    return response.data;
}

export async function createPerson(person) {
    const response = await axios.post(baseUrl, person);
    return response.data;
}

export async function deletePerson(id) {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.status;
}

export async function updatePerson(id, person) {
    const response = await axios.put(`${baseUrl}/${id}`, person);
    return response.data;
}

