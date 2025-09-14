import React, { useState, useEffect } from "react";
import SidebarFilters from "../components/SidebarFilters";
import GridCars from "../components/GridCars";
import { Plus } from "lucide-react";
import AddCarForm from "../components/AddCarForm";
import { getCars } from "../api/cars.api";
import { useSearchParams } from "react-router-dom";

function CarsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const categories = searchParams.get("category");

  const closeModal = () => setIsModalOpen(false);

  const addCarToList = (newCar) => {
    setCars((prevCars) => [newCar, ...prevCars]); 
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const res = await getCars({ search, categories });
        if (res?.data && Array.isArray(res.data)) {
          setCars(res.data);
        } else {
          setCars([]);
        }
      } catch (err) {
        console.error("Error fetching cars:", err);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 mt-4">Cars</h1>
        <p className="text-muted-foreground mt-1">
          A comprehensive view of available vehicles, allowing easy filtering and efficient browsing.
        </p>

        <div className="flex gap-6">
          <div className="w-1/5 sticky top-20 max-h-screen overflow-y-auto">
            <SidebarFilters />
          </div>

          <div className="w-4/5">
            <div className="m-4 flex justify-between items-center">
              <p className="text-muted-foreground text-m text-gray-800">
                {cars.length} {cars.length === 1 ? "car" : "cars"} found
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:shadow-md active:scale-95"
                >
                  <Plus className="w-6 h-6 text-white" />
                  <span className="font-medium">Add Car</span>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <GridCars cars={cars} />
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-4xl bg-white rounded-lg p-6">
            <AddCarForm addCarToList={addCarToList} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CarsPage;
