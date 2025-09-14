import CarCard from "./CarCard";

export default function GridCars({ cars }) {
  if (!cars || cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
        <p className="text-lg font-medium mb-2">No cars found</p>
        <p className="text-sm">Add your first car to get started</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <CarCard key={car.matricule} {...car} />
        ))}
      </div>
    </div>
  );
}
