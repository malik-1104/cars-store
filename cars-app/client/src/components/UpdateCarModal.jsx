import React, { useState, useEffect } from "react";
import { updateCar } from "../api/cars.api";

const InputField = ({ name, type = "text", value, onChange, placeholder }) => (
  <input
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="bg-gray-200 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
  />
);

const UpdateCarModal = ({ car, closeModal, onUpdate }) => {
  const [updatedCar, setUpdatedCar] = useState({ ...car });
  const [error, setError] = useState("");

  useEffect(() => {
    setUpdatedCar({ ...car });
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCar(updatedCar.matricule, updatedCar);
      onUpdate();
      closeModal();
    } catch (error) {
      setError("Failed to update car, please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center z-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Car</h2>
        
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <InputField name="name" value={updatedCar.name} onChange={handleChange} placeholder="Car Name" />
            <InputField name="year" type="number" value={updatedCar.year} onChange={handleChange} placeholder="Car Year" />
            <InputField name="entryDate" type="date" value={updatedCar.entryDate} onChange={handleChange} placeholder="Entry Date" />
            <select name="carType" value={updatedCar.carType} onChange={handleChange} className="bg-gray-200 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150">
              <option value="">Select Car Type</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
              <option value="Economical">Economical</option>
            </select>
            <InputField name="price" value={updatedCar.price} onChange={handleChange} placeholder="Price" />
            <InputField name="color" value={updatedCar.color} onChange={handleChange} placeholder="Color" />
          </div>

          <div className="flex flex-col">
            <InputField name="mileage" value={updatedCar.mileage} onChange={handleChange} placeholder="Mileage" />
            <InputField name="fuelType" value={updatedCar.fuelType} onChange={handleChange} placeholder="Fuel Type" />
            <InputField name="transmission" value={updatedCar.transmission} onChange={handleChange} placeholder="Transmission" />
            <InputField name="engine" value={updatedCar.engine} onChange={handleChange} placeholder="Engine" />
            <InputField name="matricule" value={updatedCar.matricule} onChange={handleChange} placeholder="Matricule" />
            <InputField name="driveType" value={updatedCar.driveType} onChange={handleChange} placeholder="Drive Type" />
          </div>

          <div className="w-full col-span-2 flex justify-between gap-4">
            <button type="submit" className="w-2/3 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-indigo-600 to-blue-600">
              Update Car
            </button>
            <button type="button" onClick={closeModal} className="w-1/3 px-4 py-2 bg-red-400 text-white text-bold rounded-md transition duration-300 ease-in-out hover:bg-red-600">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCarModal;
