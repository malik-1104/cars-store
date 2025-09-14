import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export function CarBarChart({ chartData }) {
  return (
    <div className="min-h-[200px] w-full p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly Profit & Loss</h3>
      <p className="text-sm text-gray-600 mb-4">
        Profit: Sales revenue per month | Loss: Car purchases + repair costs per month
      </p>
      <BarChart width={1100} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="month" 
          tickFormatter={(value) => value.slice(0, 3)} 
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip 
          formatter={(value, name) => {
            const formatValue = `${parseFloat(value).toLocaleString()}`;
            const labels = {
              profit: 'Profit',
              loss: 'Loss'
            };
            return [formatValue, labels[name] || name];
          }}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Bar 
          dataKey="profit" 
          fill="#2563eb" 
          name="Profit"
          radius={[4, 4, 0, 0]} 
        />
        <Bar 
          dataKey="loss" 
          fill="#8b5cf6" 
          name="Loss"
          radius={[4, 4, 0, 0]} 
        />
      </BarChart>
    </div>
  );
}