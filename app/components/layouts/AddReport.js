"use client";

import React, { useMemo, useState } from "react";
import { TabsButton } from "../elements/Button";
import { ChecklistRow } from "../fragments/Lists";
import { ADD_REPORT_TABS } from "@/app/constants/forms";
import { TitleSection } from "../fragments/Text";
import { GeneralCard } from "../fragments/Cards";
import LayoutWithSidebar from "./LayoutWithSidebar";
import AddReportForm from "../fragments/Form/AddReportForm";

function AddReport({ data }) {
  const [activeTab, setActiveTab] = useState("death_plant_generative");

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const greenhouse = useMemo(
    () => ({
      id: "GH-03",
      location: "Indramayu",
      name: "Kak Budi",
      role: "GR - Grower",
      area: "GR Indramayu",
      greenhouseId: "ISI_UUID_GREENHOUSE_DI_SINI",
      userId: "ISI_UUID_USER_DI_SINI",
    }),
    [],
  );

  return (
    <>
      <TitleSection title="Add Daily Reports" />

      <section>
        <p className="text-[18px] text-secondary-font">
          Greenhouse ID:{" "}
          <span className="font-semibold">
            {greenhouse.id} - {greenhouse.location}
          </span>
        </p>
      </section>

      <LayoutWithSidebar
        primary={
          <>
            <TabsButton
              tabs={ADD_REPORT_TABS}
              activeTab={activeTab}
              setActiveTab={handleTabChange}
            />
            <AddReportForm customeData={data} activeTab={activeTab} />
          </>
        }
        aside={
          <>
            <GeneralCard>
              <h3 className="text-base font-semibold text-secondary-font">
                Informasi Greenhouse {data.user.greenhouse.code}
              </h3>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-black/20" />
                <div>
                  <p className="text-sm font-semibold text-primary-font">
                    {data.user.name}
                  </p>
                  <p className="text-xs text-primary-font/60">
                    {data.user.role.name} - {data.user.greenhouse.name}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3 rounded-lg border border-black/10 bg-white p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-font/70">Code</span>
                  <span className="font-medium text-primary-font">
                    {data.user.code}
                  </span>
                </div>
              </div>
            </GeneralCard>

            <GeneralCard>
              <h3 className="text-base font-semibold text-secondary-font">
                Laporan Hari ini
              </h3>

              <div className="mt-4 rounded-lg border border-black/10 bg-white p-4">
                <div className="space-y-3">
                  <ChecklistRow label="Death Plant Vegetative" checked />
                  <ChecklistRow
                    label="Death Plant Generative"
                    checked={false}
                  />
                  <ChecklistRow label="Nutrition Usage" checked={false} />
                  <ChecklistRow label="Micro Climate" checked={false} />
                </div>

                <div className="mt-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
                    <div className="h-full w-1/4 bg-primary" />
                  </div>
                  <p className="mt-2 text-xs text-primary-font/60">
                    1/4 laporan terisi
                  </p>
                </div>
              </div>
            </GeneralCard>
          </>
        }
      />
    </>
  );
}

export default AddReport;
