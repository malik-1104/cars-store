import React from 'react';
import { DollarSign, Star, Battery } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'Economy Cars',
    description: 'Fuel-efficient and affordable.',
    icon: DollarSign,
    image: '/assets/eco.png',
    color: 'green',
  },
  {
    id: 2,
    title: 'Luxury Cars',
    description: 'Premium vehicles with advanced features.',
    icon: Star,
    image: '/assets/lux.png',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Electric Cars',
    description: 'Eco-friendly and innovative.',
    icon: Battery,
    image: '/assets/electric.png',
    color: 'yellow',
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-gray-600">
            Find the perfect car that matches your needs and budget
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const { icon: IconComponent, title, description, image, color } = category;
            return (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className={`bg-${color}/10 p-2 rounded-lg mr-3`}>
                      <IconComponent className={`h-5 w-5 text-${color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
