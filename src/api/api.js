import axios from "axios";

const BASE_URL =
  "https://8bfad562-d309-492f-b432-c3004afe50d7-00-eohacrud7ym7.sisko.replit.dev";

export async function getFoods(token) {
  const response = await axios.get(`${BASE_URL}/foods/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteFood(id, token) {
  const response = await axios.delete(`${BASE_URL}/foods/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createFood(formData, token) {
  const response = await axios.post(`${BASE_URL}/foods`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function updateFood(id, formData, token) {
  const response = await axios.put(`${BASE_URL}/foods/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
