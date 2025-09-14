import axios from "axios";

const API_URL = "http://localhost:3000/api/statistics";

export const getStatistics = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};
