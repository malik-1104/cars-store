import React, { useState, useEffect } from "react";
import { addInspection } from "../api/inspections.api";
import { getCars } from "../api/cars.api";

const AddCarInspectionForm = ({ closeModal, onSuccess }) => {
  const [inspection, setInspection] = useState({
    carId: "",
    inspectionDate: "",
    issues: "",
    repairCost: "",
    notes: "",
    mileage: "",
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
    setInspection({ ...inspection, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addInspection(inspection);
    } catch (error) {
      console.log(error);
    }
    onSuccess();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Car Inspection</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="carId"
          value={inspection.carId}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-md"
          required
        >
          <option value="" disabled>Select a Car</option>
          {cars.map((car) => (
            <option key={car.matricule} value={car.matricule}>
              {car.name} (ID: {car.matricule})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="inspectionDate"
          value={inspection.inspectionDate}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-md"
        />
        <textarea
          name="issues"
          value={inspection.issues}
          onChange={handleChange}
          placeholder="Issues"
          rows="4"
          className="w-full p-3 mb-4 border rounded-md"
        />
        <input
          type="text"
          name="repairCost"
          value={inspection.repairCost}
          onChange={handleChange}
          placeholder="Repair Cost"
          className="w-full p-3 mb-4 border rounded-md"
        />
        <textarea
          name="notes"
          value={inspection.notes}
          onChange={handleChange}
          placeholder="Notes"
          rows="4"
          className="w-full p-3 mb-4 border rounded-md"
        />
        <input
          type="text"
          name="mileage"
          value={inspection.mileage}
          onChange={handleChange}
          placeholder="Mileage"
          className="w-full p-3 mb-4 border rounded-md"
        />
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-indigo-600 to-blue-600"
          >
            Add Inspection
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

export default AddCarInspectionForm;
