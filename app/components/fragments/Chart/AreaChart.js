import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
} from "recharts";

const getColor = (colorClass) => {
  if (!colorClass) return "var(--color-primary)";
  return `var(--color-${colorClass.replace("bg-", "")})`;
};

function AreaChart({
  data = [],
  title = "",
  subTitle = "",
  legends = [],
  xAxisKey = "time",
}) {
  return (
    <section className="bg-surface-container-lowest p-8 rounded-xl space-y-8 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-xl font-bold headline text-on-surface">
            {title}
          </h3>
          <p className="text-sm text-on-surface-variant">{subTitle}</p>
        </div>
        <div className="flex gap-6 items-center">
          {legends.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-4 h-1 ${item.color} rounded-full`}></div>
              <span className="text-xs font-bold text-on-surface-variant">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data}>
            <defs>
              {legends.map((item, index) => (
                <linearGradient
                  key={index}
                  id={`color-${item.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={getColor(item.color)}
                    stopOpacity={0.1}
                  />
                  <stop
                    offset="95%"
                    stopColor={getColor(item.color)}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="5 5"
              vertical={false}
              stroke="#f1f4f3"
            />
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 700, fill: "#414942" }}
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
              <Area
                key={index}
                type="monotone"
                dataKey={item.key}
                stroke={getColor(item.color)}
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#color-${item.key})`}
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default AreaChart;
