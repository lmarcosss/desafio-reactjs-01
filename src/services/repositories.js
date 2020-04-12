import api from './api'

const URL = 'repositories'

export async function getRepositories() {
    const { data } = await api.get(URL)

    return data
}

export async function createRepository(repository) {
    const { data } = await api.post(URL, repository)

    return data
}

export async function removeRepository(id) {
    return await api.delete(`${URL}/${id}`)
}

export default {
    getRepositories,
    createRepository,
    removeRepository,
}
