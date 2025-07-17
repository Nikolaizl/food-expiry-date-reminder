import axios from "axios";

const BASE_URL =
  "https://8bfad562-d309-492f-b432-c3004afe50d7-00-eohacrud7ym7.sisko.replit.dev";

export async function getFoods() {
  const response = await axios.get(`${BASE_URL}/foods`);
  return response.data;
}

export async function deleteFood(id) {
  const response = await axios.delete(`${BASE_URL}/foods/${id}`);
  return response.data;
}

export async function createFood(formData) {
  const response = await axios.post(`${BASE_URL}/foods`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function updateFood(id, data) {
  const response = await axios.put(`${BASE_URL}/foods/${id}`, data);
  return response.data;
}
