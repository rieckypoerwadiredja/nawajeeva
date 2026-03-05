"use client";

import React from "react";
import { GeneralButton } from "../elements/Button";
import { ReportCard } from "../fragments/Cards";
import { SelectDate, SelectOptions } from "../elements/Filters";
import { IMAGES } from "@/app/constants/images";
import { TitleSection } from "../fragments/Text";
import { LOCATION_FILTER, STATUS_FILTER } from "@/app/constants/filters";

function DailyReportProduction() {
  return (
    <>
      <TitleSection title="Reports Overview" />

      <div className="flex flex-col gap-4 mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <div className="w-full sm:w-auto">
            <SelectDate
              onChange={(e) => console.log("asd")}
              defaultValue={new Date().toISOString().split("T")[0]}
              label="Dari Tanggal"
            />
          </div>

          <div className="w-full sm:w-auto">
            <SelectDate
              onChange={(e) => console.log("asd")}
              defaultValue={new Date().toISOString().split("T")[0]}
              label="Sampai Tanggal"
            />
          </div>

          <div className="w-full sm:w-auto">
            <SelectOptions
              onChange={(e) => console.log("asd")}
              defaultValue="Semua"
              label="Lokasi"
              options={LOCATION_FILTER}
            />
          </div>

          <div className="w-full sm:w-auto">
            <SelectOptions
              onChange={(e) => console.log("asd")}
              defaultValue="Semua"
              label="Status"
              options={STATUS_FILTER}
            />
          </div>
        </div>

        {/* Kanan: tombol */}
        <div className="w-full lg:w-auto">
          <GeneralButton
            label="Filter"
            className="w-full lg:w-auto sm:max-w-[150px] mx-auto"
          />
        </div>
      </div>

      {/* Report Items */}
      <div className="space-y-6 min-h-screen">
        <ReportCard
          data={{
            greenhouseId: "GH-01",
            location: "Indramayu",
            reportedBy: "Siti Nua Agan",
            reportedTitle: "grower",
            time: "10:15",
            reportTitle: "Penemuan Hama tanaman",
            reportContent: "Hama bercak putih",
            image: IMAGES.CONTOH_LAPORAN_HAMA,
            approved: {
              status: false,
              approvedBy: "",
              time: "",
            },
            note: "Ada 2 tanaman terinfeksi kutu aphid, sudah dilakukan penyemprotan.",
          }}
        />
        <ReportCard
          data={{
            greenhouseId: "GH-01",
            location: "Indramayu",
            reportedBy: "Maman sugaman",
            reportedTitle: "grower",
            time: "10:15",
            reportTitle: "Penemuan Hama tanaman",
            reportContent: "Hama bercak putih",
            image: null,
            approved: {
              status: false,
              approvedBy: "",
              time: "",
            },
            note: "Ada 2 tanaman terinfeksi kutu aphid, sudah dilakukan penyemprotan.",
          }}
        />

        <ReportCard
          data={{
            greenhouseId: "GH-01",
            location: "Indramayu",
            reportedBy: "otong surotong",
            reportedTitle: "grower",
            time: "10:15",
            reportTitle: "Penemuan Hama tanaman",
            reportContent: "Hama bercak putih",
            image: IMAGES.CONTOH_LAPORAN_HAMA,
            approved: {
              status: true,
              approvedBy: "",
              time: "",
            },
            note: "Ada 2 tanaman terinfeksi kutu aphid, sudah dilakukan penyemprotan.",
          }}
        />
      </div>

      <div className="mt-6 flex justify-between">
        <GeneralButton label="Previous" />
        <GeneralButton label="Next" />
      </div>
    </>
  );
}

export default DailyReportProduction;
