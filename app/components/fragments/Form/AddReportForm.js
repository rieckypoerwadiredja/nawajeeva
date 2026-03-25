import React, { useState } from "react";
import { GeneralCard } from "../Cards";
import FormField from "../../elements/Form";
import {
  ADD_REPORT_FORM_FIELDS_BY_TAB,
  ADD_REPORT_TABS,
} from "@/app/constants/forms";
import { GeneralButton } from "../../elements/Button";
import { API_BASE_URL } from "@/app/constants/env";
import imageCompression from "browser-image-compression";
import {
  FILE_FIELD_MAP_PHOTO_REPORT,
  FOLDER_MAP_PHOTO_REPORT,
} from "@/app/constants/upload";
import { uploadImage } from "@/app/utils/uploadImage";

function AddReportForm({ customeData = {}, activeTab }) {
  const [formValues, setFormValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeFields =
    ADD_REPORT_FORM_FIELDS_BY_TAB(customeData)[activeTab] ?? [];
  const activeFormUrl =
    ADD_REPORT_TABS.find((report) => report.id === activeTab)?.url ?? "";
  const handleChange = (fieldId, value) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const resetFormByTab = () => {
    setFormValues({});
  };

  const buildPayload = (imageUrl) => {
    switch (activeTab) {
      case "micro_climate":
        return {
          location: customeData.user.location.id,
          greenhouse: customeData.user.greenhouse.id,
          createdBy: customeData.user.id,
          reportDate: formValues.reportDate_micro_climate,
          status: "submited",
          temperature: formValues.temperature_micro_climate
            ? Number(formValues.temperature_micro_climate)
            : null,
          humidity: formValues.humidity_micro_climate
            ? Number(formValues.humidity_micro_climate)
            : null,
          light: formValues.light_micro_climate
            ? Number(String(formValues.light_micro_climate).replace(/,/g, ""))
            : null,
          note: formValues.note_micro_climate || null,
        };

      case "death_plant_vegetative":
        return {
          location: customeData.user.location.id,
          greenhouse: customeData.user.greenhouse.id,
          createdBy: customeData.user.id,
          reportDate: formValues.reportDate_death_plant_vegetative,
          title: formValues.title_death_plant_vegetative,
          status: "submited",
          reason: formValues.reason_death_plant_vegetative,
          deadPlantCount: formValues.count_death_plant_vegetative
            ? Number(formValues.count_death_plant_vegetative)
            : 0,
          photo: imageUrl || null,
          note: formValues.note_death_plant_vegetative || null,
        };

      case "death_plant_generative":
        return {
          location: customeData.user.location.id,
          greenhouse: customeData.user.greenhouse.id,
          createdBy: customeData.user.id,
          reportDate: formValues.reportDate_death_plant_generative,
          title: formValues.title_death_plant_generative,
          status: "submited",
          reason: formValues.reason_death_plant_generative,
          fruitWeightGram: formValues.weight_death_plant_generative
            ? Number(
                String(formValues.weight_death_plant_generative).replace(
                  /,/g,
                  "",
                ),
              )
            : 0,
          photo: imageUrl || null,
          note: formValues.note_death_plant_generative || null,
        };

      case "nutrition_usage":
        return {
          location: customeData.user.location.id,
          greenhouse: customeData.user.greenhouse.id,
          createdBy: customeData.user.id,
          reportDate: formValues.reportDate_nutrition_report,
          status: "submited",
          brandId: formValues.brand_nutrition_report,
          quantity: formValues.quantity_nutrition_report
            ? Number(formValues.quantity_nutrition_report)
            : 0,
          // note: formValues.note_nutrition_report || null,
        };

      default:
        return {};
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      let imageUrl = null;

      const fileField = FILE_FIELD_MAP_PHOTO_REPORT[activeTab];
      const folder = FOLDER_MAP_PHOTO_REPORT[activeTab];

      if (fileField && folder) {
        let file = formValues[fileField];

        if (file) {
          // validasi
          if (!file.type.startsWith("image/")) {
            throw new Error("File must be an image");
          }

          if (file.size > 1 * 1024 * 1024) {
            file = await imageCompression(file, {
              maxSizeMB: 1,
              maxWidthOrHeight: 1280,
            });
          }

          // upload to supabase
          imageUrl = await uploadImage(file, folder);
        }
      }

      const payload = buildPayload(imageUrl);
      // console.log(payload);

      const res = await fetch(activeFormUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // console.log(activeFormUrl);

      if (!res.ok) {
        console.error("Submit error:", body);
        alert(body.message || "failed to submit report");
        return;
      }

      const body = await res.json();

      console.log("Submit success:", body);
      alert(body.message || "Report submitted successfully");
      resetFormByTab();
    } catch (error) {
      console.error("Unexpected submit error:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GeneralCard>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-[22px] font-semibold text-secondary-font">
          Report Form
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {activeFields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            value={formValues[field.id] ?? ""}
            onChange={(value) => handleChange(field.id, value)}
          />
        ))}

        <div className="pt-2">
          <GeneralButton
            type="submit"
            label={isSubmitting ? "Mengirim..." : "Kirim Laporan"}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </GeneralCard>
  );
}

export default AddReportForm;
