import api from "./api";

export const updateProfile = async (full_name) => {
  const response = await api.put("/profile", {
    full_name
  });

  return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    "/profile/change-password",
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};