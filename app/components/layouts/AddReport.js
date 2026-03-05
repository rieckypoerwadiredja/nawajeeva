"use client";

import React, { useMemo, useState } from "react";
import { GeneralButton, TabsButton } from "../elements/Button";
import { ChecklistRow } from "../fragments/Lists";
import {
  ADD_REPORT_FORM_FIELDS_BY_TAB,
  ADD_REPORT_TABS,
} from "@/app/constants/forms";
import FormField from "../elements/Form";
import { TitleSection } from "../fragments/Text";
import { GeneralCard } from "../fragments/Cards";
import LayoutWithSidebar from "./LayoutWithSidebar";

function AddReport() {
  const [activeTab, setActiveTab] = useState("death_plant_generative");

  const greenhouse = useMemo(
    () => ({
      id: "GH-03",
      location: "Indramayu",
      name: "Kak Budi",
      role: "GR - Grower",
      area: "GR  Indramayu",
    }),
    [],
  );

  /**
   * NOTE: Data fields untuk tab yang aktif
   */
  const activeFields = ADD_REPORT_FORM_FIELDS_BY_TAB[activeTab] ?? [];

  return (
    <>
      {/* NOTE: PAGE HEADER (Title + divider) */}
      <TitleSection title="Add Daily Reports" />

      {/* NOTE: GREENHOUSE INFO LINE */}
      <section className="">
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
              setActiveTab={setActiveTab}
            />
            <GeneralCard className="">
              {/* NOTE: FORM TITLE */}
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-[22px] font-semibold text-secondary-font">
                  Report Form
                </h2>
              </div>

              {/* NOTE: FORM FIELDS - di-loop dari array object */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 space-y-4"
              >
                {activeFields.map((field) => (
                  <FormField key={field.id} field={field} />
                ))}

                {/* NOTE: SUBMIT BUTTON */}
                <div className="pt-2">
                  <GeneralButton
                    type="submit"
                    label="Kirim Laporan"
                    onClick={() => {}}
                  />
                </div>
              </form>
            </GeneralCard>
          </>
        }
        aside={
          <>
            <GeneralCard>
              <h3 className="text-base font-semibold text-secondary-font">
                Informasi Greenhouse {greenhouse.id}
              </h3>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-black/20" />
                <div>
                  <p className="text-sm font-semibold text-primary-font">
                    {greenhouse.name}
                  </p>
                  <p className="text-xs text-primary-font/60">
                    {greenhouse.role}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3 rounded-lg border border-black/10 bg-white p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-font/70">Role</span>
                  <span className="font-medium text-primary-font">
                    {greenhouse.area}
                  </span>
                </div>
              </div>
            </GeneralCard>

            {/* NOTE: CARD - Laporan Hari Ini (checklist + progress) */}
            <GeneralCard className="">
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
                  <ChecklistRow label="Nutrition Usag" checked={false} />
                  <ChecklistRow label="Micro Climate" checked={false} />
                </div>

                {/* progress */}
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
