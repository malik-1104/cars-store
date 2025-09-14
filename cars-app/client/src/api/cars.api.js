import axios from "axios";

const API_URL = "http://localhost:3000/api/cars";

export const getCars = async (params = {}) => {
  const { data } = await axios.get(API_URL, { params });
  return data;
};

export const getCarByMatricule = async (matricule) => {
  const { data } = await axios.get(`${API_URL}/${matricule}`);
  return data;
};

export const addCar = async (car) => {
  const { data } = await axios.post(API_URL, car);
  return data;
};

export const updateCar = async (matricule, car) => {
  const { data } = await axios.put(`${API_URL}/${matricule}`, car);
  return data;
};

export const patchCar = async (matricule, car) => {
  const { data } = await axios.patch(`${API_URL}/${matricule}`, car);
  return data;
};

export const deleteCar = async (matricule) => {
  const { data } = await axios.delete(`${API_URL}/${matricule}`);
  return data;
};
