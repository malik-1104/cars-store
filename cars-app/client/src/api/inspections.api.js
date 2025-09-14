import axios from "axios";

const API_URL = "http://localhost:3000/api/inspections";

export const getInspections = async ({ carId, page = 1, limit = 50 } = {}) => {
  const params = { page, limit };
  if (carId) params.carId = carId;

  const { data } = await axios.get(API_URL, { params });
  return data; // { total, page, limit, data }
};

export const getInspectionById = async (idInspection) => {
  const { data } = await axios.get(`${API_URL}/${idInspection}`);
  return data;
};

export const addInspection = async (inspection) => {
  console.log("Adding inspection:", inspection);
  const { data } = await axios.post(API_URL, inspection);
  return data;
};

export const updateInspection = async (idInspection, inspection) => {
  const { data } = await axios.put(`${API_URL}/${idInspection}`, inspection);
  return data;
};

export const patchInspection = async (idInspection, inspection) => {
  const { data } = await axios.patch(`${API_URL}/${idInspection}`, inspection);
  return data;
};

export const deleteInspection = async (idInspection) => {
  const { data } = await axios.delete(`${API_URL}/${idInspection}`);
  return data;
};
