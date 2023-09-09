import axios from "axios";
const baseUrl = "https://upgraded-xylophone-746g466p9jj2p576-3001.app.github.dev/persons";

const getAll = () => {
    return axios.get(baseUrl);
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject);
}

const deletePerson = (id) => {
    return axios.delete(`https://upgraded-xylophone-746g466p9jj2p576-3001.app.github.dev/persons/${id}`)
}

const updatePerson = (id, newObject) => {
    return axios.put(`https://upgraded-xylophone-746g466p9jj2p576-3001.app.github.dev/persons/${id}`, newObject)
}

export default { getAll,create,deletePerson,updatePerson };