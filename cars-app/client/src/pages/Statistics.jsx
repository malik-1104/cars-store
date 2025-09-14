import { useState, useEffect } from "react";
import { CarBarChart } from "../components/CarBarChart";
import { CarDonutChart } from "../components/CarDonutChart";
import { CarLineChart } from "../components/CarLineChart";
import { getStatistics } from "../api/statistics.api";
import Spinner from "../components/Spinner";

function Statistics() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const data = await getStatistics();
      setStatistics(data);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Failed to load statistics</h2>
          <button
            onClick={fetchStatistics}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 mt-4">Statistics</h1>
        <p className="text-muted-foreground mt-[5px]">
          Charts and trends at a glance, helping drive better business decisions.
        </p>

        <div className="mt-8 rounded-2xl shadow-xl flex items-center justify-center">
          <CarBarChart chartData={statistics?.profitAndLoss} />
        </div>

        <div className="grid grid-cols-5 gap-8 mt-8">
          <div className="col-span-3 rounded-2xl shadow-xl flex items-center justify-center">
            <CarLineChart chartData={statistics?.barChart} />
          </div>
          <div className="col-span-2 rounded-2xl shadow-xl flex items-center justify-center">
            <CarDonutChart chartData={statistics?.circleChart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
