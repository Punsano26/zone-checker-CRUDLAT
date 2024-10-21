import api from "./api"
const LIB_API = import.meta.env.VITE_LIB_API;

//get all Libraries
const getAllLibrary = async () => {
    return await api.get(LIB_API);
};

const getLibraryById = async (id) => {
    return await api.get(`${LIB_API}/${id}`);
}

const updateLibrary  = async (id, library) => {
    return await api.put(LIB_API + `/${id}`, library);
}

const deleteLibrary = async (id) => {
    return api.delete(LIB_API + `/${id}`);
};

const addLibrary = async (library) => {
    return await api.post(LIB_API, library);
};

const LibrariesService = {
    getAllLibrary,
    getLibraryById,
    updateLibrary,
    deleteLibrary,
    addLibrary,
};

export default LibrariesService;