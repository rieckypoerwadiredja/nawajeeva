"use client";
import {
  ChevronDown,
  Ruler,
  Circle,
  Leaf,
  TrendingUp,
  Thermometer,
  Droplets,
  Sun,
  Filter,
} from "lucide-react";
import { KPICard, WeatherCard } from "../fragments/Cards";
import { TitleSection } from "../fragments/Text";
import { DropdownButton, GeneralButton } from "../elements/Button";
import { GREENHOUSE } from "@/app/constants/type";
import LineChart from "../fragments/Chart/LineChart";
import BarChart from "../fragments/Chart/BarChart";
import AreaChart from "../fragments/Chart/AreaChart";

function KpiProduction() {
  const trendData = [
    { time: "00:00", temp: 25, humidity: 65 },
    { time: "04:00", temp: 23, humidity: 70 },
    { time: "08:00", temp: 26, humidity: 60 },
    { time: "12:00", temp: 29, humidity: 55 },
    { time: "16:00", temp: 28, humidity: 58 },
    { time: "20:00", temp: 26, humidity: 62 },
    { time: "24:00", temp: 25, humidity: 65 },
  ];

  const leafAreaData = [
    { name: "GH-01", current: 70, target: 60 },
    { name: "GH-02", current: 90, target: 75 },
    { name: "GH-03", current: 110, target: 95 },
    { name: "GH-04", current: 120, target: 105 },
    { name: "GH-05", current: 130, target: 115 },
  ];

  const growthData = [
    { week: "WEEK 1", gh03: 40, gh07: 30, gh12: 20 },
    { week: "WEEK 2", gh03: 55, gh07: 45, gh12: 35 },
    { week: "WEEK 3", gh03: 60, gh07: 50, gh12: 40 },
    { week: "WEEK 4", gh03: 85, gh07: 65, gh12: 55 },
    { week: "WEEK 5", gh03: 110, gh07: 80, gh12: 70 },
  ];
  return (
    <>
      <TitleSection title="Dashboard KPI" />

      <section className="flex items-center justify-between">
        <p className="text-[18px] text-secondary-font">
          Greenhouse ID:{" "}
          <span className="font-semibold">GH-03 - Indramayu</span>
        </p>
        <div className="flex items-center gap-3 bg-surface-container-high p-1.5 rounded-xl">
          <DropdownButton
            className="bg-surface-container-lowest shadow-sm text-black! px-4 py-2"
            classNameIcon="text-black!"
            value="PDLG"
            options={GREENHOUSE}
            onSelect={(key) => {
              console.log(key);
            }}
          />
          <GeneralButton
            className="bg-primary"
            icon={<Filter className="text-white" size={18} />}
          ></GeneralButton>
        </div>
      </section>

      {/* KPI Cards Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          icon={Ruler}
          label="Height"
          value="142.4"
          unit="cm"
          trend="+12%"
          colorClass="bg-primary/10 text-primary"
        />
        <KPICard
          icon={Circle}
          label="Stem Circumference"
          value="12.8"
          unit="mm"
          trend="+5.2%"
          colorClass="bg-secondary/10 text-secondary"
        />
        <KPICard
          icon={Leaf}
          label="Avg Leaf Area"
          value="45.2"
          unit="cm²"
          trend="+8.1%"
          colorClass="bg-tertiary/10 text-tertiary"
        />
        <KPICard
          icon={TrendingUp}
          label="Today's Growth"
          value="0.85"
          unit="cm/day"
          trend="+2.4%"
          colorClass="bg-primary/10 text-primary"
        />
      </section>

      {/* Growth Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Pertumbuhan Tanaman */}
        <LineChart
          data={growthData}
          title="Pertumbuhan Tanaman (Height)"
          xAxisKey="week"
          legends={[
            { key: "gh03", label: "GH-03", color: "bg-primary" },
            { key: "gh07", label: "GH-07", color: "bg-secondary" },
            { key: "gh12", label: "GH-12", color: "bg-tertiary" },
          ]}
        />

        {/* Chart 2: Luas Daun */}
        <BarChart
          data={leafAreaData}
          title="Luas Daun (Leaf Area)"
          xAxisKey="name"
          legends={[
            { key: "current", label: "Current", color: "bg-primary" },
            { key: "target", label: "Target", color: "bg-secondary" },
          ]}
        />
      </section>

      {/* Current Weather Section */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold headline text-on-surface">
          Kondisi Cuaca Saat Ini
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WeatherCard
            icon={Thermometer}
            label="Temperature"
            value="27.0"
            unit="°C"
            colorClass="bg-tertiary/10 text-tertiary"
          />
          <WeatherCard
            icon={Droplets}
            label="Humidity"
            value="30.5"
            unit="%"
            colorClass="bg-secondary/10 text-secondary"
          />
          <WeatherCard
            icon={Sun}
            label="Light Intensity"
            value="780"
            unit="W/m²"
            colorClass="bg-primary/10 text-primary"
          />
        </div>
      </section>

      {/* Trend Chart Section */}
      <AreaChart
        data={trendData}
        title="Temperature & Humidity Trend"
        subTitle="Daily observation (24h period)"
        xAxisKey="time"
        legends={[
          { key: "temp", label: "Temp (°C)", color: "bg-tertiary" },
          { key: "humidity", label: "Humidity (%)", color: "bg-secondary" },
        ]}
      />
    </>
  );
}

export default KpiProduction;
