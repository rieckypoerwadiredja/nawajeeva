"use client";

import React, { useEffect, useState } from "react";
import { GeneralButton } from "../elements/Button";
import { ReportCard } from "../fragments/Cards";
import { SelectDate, SelectOptions } from "../elements/Filters";
import { IMAGES } from "../../constants/images";
import { TitleSection } from "../fragments/Text";
import {
  GREENHOUSE_FILTER,
  LOCATION_FILTER,
  REPORT_STATUS_FILTER,
} from "../../constants/filters";
import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/app/constants/env";
import useFetch from "@/app/hooks/useFetch";
import { FaQuestion } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";

function DailyReportProduction() {
  const searchParams = useSearchParams();

  const startDate =
    searchParams.get("startDate") || new Date().toISOString().split("T")[0];
  const endDate =
    searchParams.get("endDate") || new Date().toISOString().split("T")[0];
  const location = searchParams.get("location") || "all";
  const status = searchParams.get("status") || "all";
  const greenhouse = searchParams.get("greenhouse") || "all";

  const {
    data: reports,
    loading,
    error,
    refetch,
  } = useFetch({
    url: `${API_BASE_URL}/reports?startDate=${startDate}&endDate=${endDate}&location=${location}&status=${status}&greenhouse=${greenhouse}`,
    deps: [startDate, endDate, location, status, greenhouse],
  });

  // console.log(reports);

  const [filters, setFilters] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    location: "all",
    status: "all",
    greenhouse: "all",
  });

  const router = useRouter();

  const handleFilter = () => {
    router.push(
      `/admin/production/reports?startDate=${filters.startDate}&endDate=${filters.endDate}&location=${filters.location}&status=${filters.status}&greenhouse=${filters.greenhouse}`,
    );
  };

  return (
    <>
      <TitleSection title="Reports Overview" />

      <div className="flex flex-col gap-4 mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <div className="w-full sm:w-auto">
            <SelectDate
              defaultValue={new Date().toISOString().split("T")[0]}
              label="Dari Tanggal"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
          </div>

          <div className="w-full sm:w-auto">
            <SelectDate
              defaultValue={new Date().toISOString().split("T")[0]}
              label="Sampai Tanggal"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
          </div>

          <div className="w-full sm:w-auto">
            <SelectOptions
              defaultValue="Semua"
              label="Lokasi"
              options={LOCATION_FILTER}
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />
          </div>

          <div className="w-full sm:w-auto">
            <SelectOptions
              defaultValue="All"
              label="Status"
              options={REPORT_STATUS_FILTER}
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            />
          </div>
          <div className="w-full sm:w-auto">
            <SelectOptions
              defaultValue="Padalarang"
              label="Greenhouse"
              options={GREENHOUSE_FILTER}
              value={filters.greenhouse}
              onChange={(e) =>
                setFilters({ ...filters, greenhouse: e.target.value })
              }
            />
          </div>
        </div>

        {/* Kanan: tombol */}
        <div className="w-full lg:w-auto">
          <GeneralButton
            label="Terapkan"
            className="w-full lg:w-auto sm:max-w-[150px] mx-auto"
            onClick={handleFilter}
          />
        </div>
      </div>

      {/* Report Items */}
      <div className="space-y-6 min-h-[50vh]">
        {loading ? (
          <div className="flex items-center justify-center h-[50vh] w-full">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col gap-y-2 items-center justify-center h-[50vh] w-full">
            <RiErrorWarningLine className="text-gray-500 text-4xl" />
            <p className="text-gray-500">Error: {error.message}</p>
          </div>
        ) : reports.deathPlantVegetative.length < 1 &&
          reports.deathPlantGenerative.length < 1 &&
          reports.nutritionUsage.length < 1 &&
          reports.microClimate.length < 1 ? (
          <div className="flex flex-col gap-y-2 items-center justify-center h-[50vh] w-full">
            <FaQuestion className="text-gray-500 text-4xl" />
            <p className="text-gray-500">No Report Found</p>
          </div>
        ) : (
          <>
            {reports.deathPlantVegetative.map((report) => (
              <ReportCard
                key={report.id}
                refetchReports={refetch}
                data={{
                  id: report.id,
                  type: "death_plant_vegetative",
                  greenhouseId: report.greenhouse.name,
                  location: report.location.name,
                  reportedBy: report.createdBy.name,
                  time: report.date,
                  createdAt: report.createdAt,
                  reportTitle: report.title,
                  reportContent: `
                <p><b>Jumlah Tanaman Mati:</b> ${report.deadPlantCount}</p>
                <p><b>Penyebab:</b> ${report.reason}</p>
                `,
                  image: report.photo || "",
                  approved: {
                    status: report.status,
                    approvedBy: report.approvedBy?.name || "Not Approved Yet",
                    time: report.updatedAt,
                  },
                  note: report.note || "No Note",
                }}
              />
            ))}
            {reports.deathPlantGenerative.map((report) => (
              <ReportCard
                key={report.id}
                refetchReports={refetch}
                data={{
                  id: report.id,
                  type: "death_plant_generative",
                  greenhouseId: report.greenhouse.name,
                  location: report.location.name,
                  reportedBy: report.createdBy.name,
                  time: report.date,
                  createdAt: report.createdAt,
                  reportTitle: report.title,
                  reportContent: `
                  <p><b>Jumlah Tanaman Mati:</b> ${report.fruitWeight} Kg</p>
                  <p><b>Penyebab:</b> ${report.reason}</p>
                  `,
                  image: report.photo || "",
                  approved: {
                    status: report.status,
                    approvedBy: report.approvedBy?.name || "Not Approved Yet",
                    time: report.updatedAt,
                  },
                  note: report.note || "No Note",
                }}
              />
            ))}
            {reports.nutritionUsage.map((report) => (
              <ReportCard
                key={report.id}
                refetchReports={refetch}
                data={{
                  id: report.id,
                  type: "nutrition_usage",
                  greenhouseId: report.greenhouse.name,
                  location: report.location.name,
                  reportedBy: report.createdBy.name,
                  time: report.date,
                  createdAt: report.createdAt,
                  reportTitle: report.title,
                  reportContent: `
                  <p><b>Penggunaan Nutrisi:</b> ${report.quantity} ml/gr</p>
                  <p><b>Brand:</b> ${report.brand.name} (${report.brand.type.name})</p>
                  `,
                  image: "",
                  approved: {
                    status: report.status,
                    approvedBy: report.approvedBy?.name || "Not Approved Yet",
                    time: report.updatedAt,
                  },
                  note: report.note || "No Note",
                }}
              />
            ))}
            {reports.microClimate.map((report) => (
              <ReportCard
                key={report.id}
                refetchReports={refetch}
                data={{
                  id: report.id,
                  type: "micro_climate",
                  greenhouseId: report.greenhouse.name,
                  location: report.location.name,
                  reportedBy: report.createdBy.name,
                  time: report.date,
                  createdAt: report.createdAt,
                  reportTitle: report.title,
                  reportContent: `
                  <p><b>Suhu:</b> ${report.temperature}°C</p>
                  <p><b>Kelembaban:</b> ${report.humidity}%</p>
                  <p><b>Pencahayaan:</b> ${report.light} lux</p>
                  `,
                  image: "",
                  approved: {
                    status: report.status,
                    approvedBy: report.approvedBy?.name || "Not Approved Yet",
                    time: report.updatedAt,
                  },
                  note: report.note || "No Note",
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <GeneralButton label="Previous" />
        <GeneralButton label="Next" />
      </div>
    </>
  );
}

export default DailyReportProduction;
