import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export function CarLineChart({ chartData }) {
  const chartConfig = {
    Electric: { label: "Electric", color: "#2563eb" },
    Luxury: { label: "Luxury", color: "#8b5cf6" },
    Economy: { label: "Economy", color: "#f72585" },
  };

  return (
    <div className="p-4 min-h-[200px] w-full flex flex-col items-center justify-center">
      <h3 className="w-full text-xl font-semibold mb-2 text-gray-800">
        Monthly Car Sales by Type
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        A line chart illustrating the number of cars sold each month,
        categorized by <span className="font-medium">Luxury</span>,
        <span className="font-medium">Economy</span>, and
        <span className="font-medium">Electric</span>.
      </p>


      <LineChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
        <YAxis />
        <Tooltip />
        <Legend />

        {Object.keys(chartConfig).map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={chartConfig[key].color}
            strokeWidth={3}
            dot={{ fill: chartConfig[key].color, strokeWidth: 2, r: 4 }}
          />
        ))}
      </LineChart>
    </div>
  );
}
