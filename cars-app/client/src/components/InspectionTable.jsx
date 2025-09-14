import { useEffect, useState } from 'react';
import { getInspections } from '../api/inspections.api';
import { FileText } from 'lucide-react';

const InspectionTable = ({ carId }) => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (carId) {
      getInspections({ carId })
        .then((res) => {
          setInspections(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [carId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading inspections...</div>;
  }

  if (!inspections.length) {
    return <div className="p-8 text-center text-gray-600">No inspections found</div>;
  }

  return (
    <div className="bg-white overflow-hidden">
      
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl xl:text-4xl font-bold text-gray-900">Inspection History</h2>
            </div>
            <p className="text-gray-600 text-lg">Complete maintenance and inspection records</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Date</th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Issues</th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Repair Cost</th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Mileage</th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inspections.map((inspection) => (
              <tr key={inspection.idInspection} className="hover:bg-gray-50 transition-all duration-300">
                <td className="px-8 py-6">
                  <div className="text-sm font-bold text-gray-900">
                    {new Date(inspection.inspectionDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </td>
                <td className="px-8 py-6">{inspection.issues}</td>
                <td className="px-8 py-6">{inspection.repairCost}</td>
                <td className="px-8 py-6">{inspection.mileage}</td>
                <td className="px-8 py-6">
                  <p className="text-sm text-gray-700 leading-relaxed" title={inspection.notes}>
                    {inspection.notes}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InspectionTable;
