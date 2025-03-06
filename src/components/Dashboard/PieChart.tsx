import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface PieChartComponentProps {
  data: { category: string; value: number }[];
  onPieClick: (category: string) => void;
}

export const PieChartComponent = ({ data, onPieClick }: PieChartComponentProps) => {
  return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            onClick={(entry) => onPieClick(entry.category)} // Pass category when clicked
            label={({ name, value }) => `${name}: ${value}`} // Label with category and percentage
          >
            {data.map((entry, index) => (
              <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
  );
};
