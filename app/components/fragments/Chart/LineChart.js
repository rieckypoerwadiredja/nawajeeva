import React from "react";
import {
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart as RechartsLineChart,
} from "recharts";

const getColor = (colorClass) => {
  if (!colorClass) return "var(--color-primary)";
  return `var(--color-${colorClass.replace("bg-", "")})`;
};

function LineChart({ data = [], title = "", legends = [], xAxisKey = "time" }) {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl space-y-6 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold headline text-on-surface">{title}</h3>
        <div className="flex gap-4">
          {legends.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-xs font-bold text-on-surface-variant">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f4f3"
            />
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 700, fill: "#414942" }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            {legends.map((item, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={item.key}
                stroke={getColor(item.color)}
                strokeWidth={index === 0 ? 3 : 2}
                strokeDasharray={index === 0 ? "" : index === 1 ? "5 5" : "2 2"}
                dot={false}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChart;
