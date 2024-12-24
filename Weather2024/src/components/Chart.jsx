import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#82ca9d" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        {/* Chart Grid */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255, 255, 255, 0.2)"
        />

        {/* X and Y Axes */}
        <XAxis
          dataKey="time"
          stroke="#ffffff"
          tick={{ fontSize: 12, fill: "#ffffff" }}
          tickLine={false}
        />
        <YAxis
          label={{
            value: "°C",
            angle: -90,
            position: "insideLeft",
            fill: "#ffffff",
          }}
          stroke="#ffffff"
          tick={{ fontSize: 12, fill: "#ffffff" }}
          tickLine={false}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: "#1a202c",
            border: "none",
            color: "#ffffff",
          }}
          formatter={(value) => `${value}°C`}
        />

        {/* Gradient-Filled Area */}
        <Area
          type="monotone"
          dataKey="temperature"
          stroke="none"
          fill="url(#temperatureGradient)"
        />

        {/* Line */}
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#82ca9d"
          strokeWidth={3}
          dot={{ r: 4, stroke: "#82ca9d", strokeWidth: 2, fill: "#ffffff" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
