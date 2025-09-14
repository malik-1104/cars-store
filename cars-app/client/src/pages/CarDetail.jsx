import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CarDetailsSection from "../components/CarDetailsSection";
import InspectionTable from "../components/InspectionTable";
import { getCarByMatricule } from "../api/cars.api";

function CarDetail() {
  const { matricule: id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const fetchedCar = await getCarByMatricule(id);
        setCar(fetchedCar);
      } catch (error) {
        setError("Failed to fetch car details. Please try again.");
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-600">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!car) return <div className="p-8 text-center text-gray-600">Car not found</div>;

  return (
    <div>
      <CarDetailsSection car={car} />
      <InspectionTable carId={car.matricule} />
    </div>
  );
}

export default CarDetail;
