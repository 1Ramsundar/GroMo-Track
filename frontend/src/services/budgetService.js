import api from "./api";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getBudget = async () => {
    const response = await api.get("/budget", getAuthHeader());
    return response.data;
};

export const saveBudget = async (budget) => {
    const response = await api.post("/budget", budget, getAuthHeader());
    return response.data;
};