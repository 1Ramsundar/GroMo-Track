import api from "./api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getSettings = async () => {
  const response = await api.get(
    "/settings",
    getAuthHeader()
  );

  return response.data;
};

export const updateSettings = async (settings) => {
  const response = await api.put(
    "/settings",
    settings,
    getAuthHeader()
  );

  return response.data;
};