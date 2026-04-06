import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts";

const getColor = (colorClass) => {
  if (!colorClass) return "var(--color-primary)";
  return `var(--color-${colorClass.replace("bg-", "")})`;
};

function BarChart({ data = [], title = "", legends = [], xAxisKey = "name" }) {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl space-y-6 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold headline text-on-surface">{title}</h3>
        <div className="flex gap-4 items-center">
          {legends.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-xs font-bold text-on-surface-variant">
                {item.label}
              </span>
            </div>
          ))}
          <button className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full ml-2">
            Monthly View
          </button>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data}>
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 700, fill: "#414942" }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "#f7faf9" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            {legends.map((item, index) => (
              <Bar
                key={index}
                dataKey={item.key}
                fill={getColor(item.color)}
                opacity={index === 1 ? 0.5 : 1}
                radius={[4, 4, 0, 0]}
                barSize={15}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChart;
