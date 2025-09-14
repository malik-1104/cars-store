import React from 'react';
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find Your Perfect Used Car
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              As the owner, you have complete control over your dealership’s operations.
              Track sales performance, monitor customer engagement, and manage your inventory with confidence.
              This platform empowers you to grow your business, strengthen your brand, and make data-driven decisions with ease.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/Cars"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700"
              >
                Browse Cars
              </Link>
              <Link
                to="/Statistics"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
              >
                Show Statistics
              </Link>
            </div>
          </div>

          <div>
            <img
              src="/assets/home.jpg"
              alt="Used Cars"
              className="w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
