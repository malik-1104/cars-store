import axios from "axios";

const API_URL = "http://localhost:3000/api/sales";

export const getSales = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const addSale = async (sale) => {
  const { data } = await axios.post(API_URL, sale);
  return data;
};

export const updateSale = async (id, sale) => {
  const { data } = await axios.patch(`${API_URL}/${id}`, sale);
  return data;
};

export const deleteSale = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
