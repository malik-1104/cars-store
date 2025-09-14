import React, { useEffect, useState } from "react";
import { addSale } from "../api/sales.api";
import { getCars } from "../api/cars.api";

const AddCarSaleForm = ({ closeModal, onSuccess }) => {
  const [sale, setSale] = useState({
    carId: "",
    saleDate: "",
    saleAmount: "",
  });

  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await getCars();
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale((prevSale) => ({ ...prevSale, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSale(sale);
      onSuccess();
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Car Sale</h2>
        <div className="flex flex-col w-full">
          <select
            name="carId"
            value={sale.carId}
            onChange={handleChange}
            className="bg-gray-200 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Car ID</option>
            {cars.map((car) => (
              <option key={car.matricule} value={car.matricule}>
                {car.matricule}
              </option>
            ))}
          </select>

          <input
            placeholder="Sale Date"
            className="bg-gray-200 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="date"
            name="saleDate"
            value={sale.saleDate}
            onChange={handleChange}
          />

          <input
            placeholder="Sale Amount"
            className="bg-gray-200 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="number"
            name="saleAmount"
            value={sale.saleAmount}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-indigo-600 to-blue-600"
          >
            Add Sale
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-red-400 text-white text-bold rounded-md transition duration-300 ease-in-out hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarSaleForm;
