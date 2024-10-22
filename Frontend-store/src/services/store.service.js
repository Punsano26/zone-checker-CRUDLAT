import api from "./api"
const STO_AIP = import.meta.env.VITE_STO_API;

//get all Libraries
const getAllStore = async () => {
    return await api.get(STO_AIP);
};

const getstoreById = async (id) => {
    return await api.get(`${STO_AIP}/${id}`);
}

const updatestore  = async (id, store) => {
    return await api.put(STO_AIP + `/${id}`, store);
}

const deletestore = async (id) => {
    return api.delete(STO_AIP + `/${id}`);
};

const addstore = async (store) => {
    return await api.post(STO_AIP, store);
};

const StoreService = {
    getAllStore,
  getstoreById,
  updatestore,
  deletestore,
  addstore,
};

export default StoreService;