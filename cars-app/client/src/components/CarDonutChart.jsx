import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#2563eb", "#8b5cf6", "#f72585"];

export function CarDonutChart({ chartData = [] }) {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x}
          y={y - 8}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="15"
          fontWeight="bold"
          style={{ textShadow: "0px 0px 5px rgba(0,0,0,0.7)" }}
        >
          {name}
        </text>
        <text
          x={x}
          y={y + 8}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="16"
          fontWeight="bold"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
        >
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      </g>
    );
  };

  return (
    <div className="p-4 min-h-[200px] w-full">
      <h3 className="w-full text-xl font-semibold mb-2 text-gray-800">
        Car Distribution by Type
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        A relative pie chart showing the proportion of cars categorized as
        <span className="font-medium"> Luxury</span>,
        <span className="font-medium"> Economy</span>,
        and <span className="font-medium"> Electric</span>.
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            stroke="#fff"
            strokeWidth={3}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value.toLocaleString()}`, name]} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: entry.color, fontWeight: "bold" }}>
                {value}: {entry.payload.percentage}%
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
