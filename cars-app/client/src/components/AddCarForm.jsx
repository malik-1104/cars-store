import React, { useState } from "react";
import { addCar } from "../api/cars.api";

const AddCarForm = ({ addCarToList, closeModal }) => {
  const [car, setCar] = useState({
    name: "",
    year: "",
    entryDate: "",
    carType: "",
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    engine: "",
    matricule: "",
    driveType: "",
    color: "",
    images: [],
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => `/uploads/${file.name}`);
    setCar((prevCar) => ({ ...prevCar, images: imageUrls }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCar(car);
      addCarToList(car);
      closeModal();
    } catch (error) {
      console.error("Error adding car:", error);
      setError(error.response.data.error);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Car</h2>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          {["name", "year", "entryDate", "carType", "price", "color"].map((field, idx) => (
            <div key={idx} className="flex flex-col">
              {field === "carType" ? (
                <select
                  name={field}
                  value={car[field]}
                  onChange={handleChange}
                  className="bg-gray-200 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Car Type</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Economy">Economy</option>
                  <option value="Electric">Electric</option>
                </select>
              ) : (
                <input
                  type={field === "entryDate" ? "date" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={car[field]}
                  onChange={handleChange}
                  className="bg-gray-200 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              )}

              {error && error[field] && (
                <p className="text-red-500 text-sm mb-2 -mt-4">
                  {error[field]}
                </p>
              )}
            </div>
          ))}
        </div>


        <div className="flex flex-col">
          {["mileage", "fuelType", "transmission", "engine", "matricule", "driveType"].map(
            (field, idx) => (
              <>
                <input
                  key={idx}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={car[field]}
                  onChange={handleChange}
                  className="bg-gray-200 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {error && error[field] && (
                  <p key="error" className="text-red-500 text-sm mb-2 -mt-4">
                    {error[field]}
                  </p>
                )}
              </>
            )
          )}
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4 mb-4">
          <label htmlFor="car-images" className="text-gray-800 mb-2 col-span-2">
            Upload Car Images
          </label>
          <input
            type="file"
            className="bg-gray-200 text-gray-800 border-0 rounded-md p-2 focus:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 col-span-2"
            multiple
            onChange={handleImageChange}
            id="car-images"
          />
        </div>

        <div className="w-full col-span-2 flex justify-between gap-4">
          <button
            type="submit"
            className="w-2/3 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-indigo-600 to-blue-600"
          >
            Add Car
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="w-1/3 px-4 py-2 bg-red-400 text-white text-bold rounded-md transition duration-300 ease-in-out hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarForm;
