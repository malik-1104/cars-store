import { Link } from 'react-router-dom';

export default function CarCard({ matricule, images, name, year, price, carType, mileage, fuelType, transmission, engine, driveType, color, entryDate }) {
  return (
    <Link 
      to={`/Car-Detail/${matricule}`} 
      state={{ 
        car: { matricule, images, name, year, price, carType, mileage, fuelType, transmission, engine, driveType, color, entryDate }
      }} 
      className="flex items-center justify-center bg-gray-50"
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-80 group hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img
            src={images[0]}
            alt={name}
            className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {carType || "Luxury"}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
              ({year})
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="w-full flex items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="text-xl font-bold text-gray-900">{price}</p>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:shadow-md active:scale-95">
            View Details
          </button>
        </div>

        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </div>
    </Link>
  );
}
