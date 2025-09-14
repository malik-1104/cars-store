import { useState } from "react";
import { Gauge, Fuel, Settings, Zap, Hash, Car, Palette } from "lucide-react";
import UpdateCarModal from "./UpdateCarModal";
import DeleteModal from "./DeleteModal";
import { deleteCar } from "../api/cars.api";

const CarDetailsSection = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const images = car.images || [car.image];

  const specifications = [
    { icon: Gauge, label: "Mileage", value: car.mileage, color: "text-blue-600" },
    { icon: Fuel, label: "Fuel Type", value: car.fuelType, color: "text-green-600" },
    { icon: Settings, label: "Transmission", value: car.transmission, color: "text-purple-600" },
    { icon: Zap, label: "Engine", value: car.engine, color: "text-red-600" },
    { icon: Hash, label: "Registration No.", value: car.matricule, color: "text-teal-600" },
    { icon: Car, label: "Drive Type", value: car.driveType, color: "text-indigo-600" },
    { icon: Palette, label: "Color", value: car.color, color: "text-purple-600" },
  ];

  const handleDeleteCar = async () => {
    try {
      await deleteCar(car.matricule); 
      window.location.href = "/cars";
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="relative">
          <div className="relative h-96 xl:h-[600px] group">
            <img
              src={images[currentImageIndex]}
              alt={car.name}
              className="w-full h-full object-cover transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {images.length}
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 rounded-full hover:scale-110 transition"
                >
                  &lt;
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 rounded-full hover:scale-110 transition"
                >
                  &gt;
                </button>
              </>
            )}
          </div>
        </div>

        <div className="py-3 px-6 xl:py-4 px-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="mb-2">
            <div className="flex justify-between">
              <h1 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-3 leading-tight">{car.name}</h1>
              <div className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {car.price}KDZ
              </div>
            </div>
            <p className="text-xl text-gray-600 ">{car.year} • {car.entryDate} • {car.carType}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Specifications</h3>
            <div className="grid grid-cols-1 gap-4">
              {specifications.map((spec, index) => (
                <div key={index} className="bg-white rounded-xl py-3 px-5 border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <spec.icon className={`w-5 h-5 ${spec.color} mr-3`} />
                      <span className="text-gray-600 font-medium">{spec.label}</span>
                    </div>
                    <div className="font-bold text-gray-900">{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Update Car
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Delete Car
            </button>
          </div>
        </div>
      </div>

      {isUpdateModalOpen && (
        <UpdateCarModal
          car={car}
          closeModal={() => setIsUpdateModalOpen(false)}
          onUpdate={() => window.location.reload()}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          title="Delete Car"
          message="Are you sure you want to delete this car?"
          deleteAction={handleDeleteCar}
          closeModal={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CarDetailsSection;
