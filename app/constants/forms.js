import { capitalizeWords } from "../utils/text";
import { API_BASE_URL } from "./env";

/**
 * NOTE: DATA - Tabs (button pilihan)
 * - bentuk data array object
 */
export const ADD_REPORT_TABS = [
  {
    id: "death_plant_vegetative",
    label: "Death Plant Vegetative",
    url: `${API_BASE_URL}/reports/report-death-plant-vegetative`,
  },
  {
    id: "death_plant_generative",
    label: "Death Plant Generative",
    url: `${API_BASE_URL}/reports/report-death-plant-generative`,
  },
  {
    id: "nutrition_usage",
    label: "Nutrition Usage",
    url: `${API_BASE_URL}/reports/report-nutrition-usage`,
  },
  {
    id: "micro_climate",
    label: "Micro Climate",
    url: `${API_BASE_URL}/reports/report-micro-climate`,
  },
];

/**
 * NOTE: DATA - Form fields (dipakai untuk looping)
 */
export const ADD_REPORT_FORM_FIELDS_BY_TAB = (customeData = {}) => {
  return {
    micro_climate: [
      {
        id: "reportDate_micro_climate",
        type: "date",
        label: "Tanggal Laporan",
        required: true,
      },
      {
        id: "temperature_micro_climate",
        type: "number",
        label: "Suhu",
        required: true,
        placeholder: "Contoh: 25",
        rightAddon: "°C",
      },
      {
        id: "humidity_micro_climate",
        type: "number",
        label: "Kelembaban",
        placeholder: "Contoh: 80",
        required: true,
        rightAddon: "%",
      },
      {
        id: "light_micro_climate",
        type: "number",
        label: "Intensitas Cahaya",
        placeholder: "Contoh: 10000",
        format: "thousand",
        required: true,
        rightAddon: "Lux",
      },
      {
        id: "note_micro_climate",
        type: "textarea",
        label: "Catatan Tambahan",
        required: false,
        placeholder:
          "Contoh: EC 1.8 mS, pH 5.8, pemupukan dilakukan sesuai SOP.",
      },
    ],
    death_plant_vegetative: [
      {
        id: "reportDate_death_plant_vegetative",
        type: "date",
        label: "Tanggal Laporan",
        required: true,
      },
      {
        id: "title_death_plant_vegetative",
        type: "text",
        label: "Judul",
        required: true,
      },
      {
        id: "reason_death_plant_vegetative",
        type: "text",
        label: "Penyebab kematian tanaman",
        placeholder: "Contoh: Hama kutu putih",
        required: true,
      },
      {
        id: "count_death_plant_vegetative",
        type: "number",
        label: "Jumlah tanaman mati",
        required: true,
      },

      {
        id: "photo_death_plant_vegetative",
        type: "upload",
        label: "Foto Hama / Penyakit",
        required: false,
      },
      {
        id: "note_death_plant_vegetative",
        type: "textarea",
        label: "Keterangan Tanaman Mati",
        required: true,
        placeholder:
          "Contoh: 2 tanaman terinfeksi kutu aphid, sudah dilakukan penyemprotan.",
      },
    ],
    death_plant_generative: [
      {
        id: "reportDate_death_plant_generative",
        type: "date",
        label: "Tanggal Laporan",
        required: true,
      },
      {
        id: "title_death_plant_generative",
        type: "text",
        label: "Judul",
        required: true,
      },
      {
        id: "reason_death_plant_generative",
        type: "text",
        label: "Penyebab kematian tanaman",
        placeholder: "Contoh: Hama kutu putih",
        required: true,
      },
      {
        id: "weight_death_plant_generative",
        type: "number",
        label: "Berat buah per tanaman mati",
        rightAddon: "gram",
        format: "thousand",
        required: true,
      },
      {
        id: "photo_death_plant_generative",
        type: "upload",
        label: "Foto Hama / Penyakit",
        required: false,
      },
      {
        id: "note_death_plant_generative",
        type: "textarea",
        label: "Catatan Tambahan",
        required: true,
        placeholder:
          "Contoh: EC 1.8 mS, pH 5.8, pemupukan dilakukan sesuai SOP.",
      },
    ],
    nutrition_usage: [
      {
        id: "reportDate_nutrition_report",
        type: "date",
        label: "Tanggal Laporan",
        required: true,
      },
      {
        id: "brand_nutrition_report",
        type: "select",
        label: "Merek",
        options: (customeData.brands || []).map((item) => ({
          label: `${capitalizeWords(item.name)} (${item.type?.name ?? "-"})`,
          value: item.id,
        })),
        required: true,
      },
      {
        id: "quantity_nutrition_report",
        type: "number",
        label: "Jumlah dalam ml / gram",
        required: true,
        rightAddon: "gr / ml",
      },
      {
        id: "note_nutrition_report",
        type: "textarea",
        label: "Catatan Tambahan",
        required: false,
        placeholder:
          "Contoh: EC 1.8 mS, pH 5.8, pemupukan dilakukan sesuai SOP.",
      },
    ],
  };
};

export const UPDATE_USER_FORM = [
  {
    id: "user_name",
    type: "text",
    label: "Nama",
    required: true,
    name: "name",
  },
  {
    id: "user_email",
    type: "text",
    label: "Email",
    required: true,
    name: "email",
  },
  {
    id: "user_role",
    type: "select",
    label: "Role",
    required: true,
    name: "role",
    options: [
      { label: "Grower", value: "grower" },
      { label: "Water Expert", value: "water expert" },
      { label: "Field Assistant", value: "field assistant" },
    ],
  },
  {
    id: "user_status",
    type: "select",
    label: "Status",
    required: true,
    name: "status",
    options: [
      { label: "Active", value: "active" },
      { label: "On Leave", value: "on leave" },
      { label: "Resigned", value: "resigned" },
    ],
  },
  {
    id: "user_password",
    type: "password",
    label: "Password Baru (kosongkan jika tidak ingin mengubah)",
    required: false,
    name: "password",
  },
];

export const CREATE_USER_FORM = [
  {
    id: "user_name",
    type: "text",
    label: "Nama",
    required: true,
    name: "name",
  },
  {
    id: "user_email",
    type: "text",
    label: "Email",
    required: true,
    name: "email",
  },
  {
    id: "user_role",
    type: "select",
    label: "Role",
    required: true,
    name: "role",
    options: [
      { label: "Grower", value: "grower" },
      { label: "Water Expert", value: "water expert" },
      { label: "Field Assistant", value: "field assistant" },
    ],
  },
  {
    id: "user_greenhouses",
    type: "checkbox-group",
    label: "Akses Greenhouse",
    required: true,
    name: "greenhouses",
    options: [
      { label: "Klapanunggal - BDG", value: "klapanunggal" },
      { label: "Lido - BGR", value: "lido" },
      { label: "Padalarang - BDG", value: "padalarang" },
      { label: "Indramayu - BGR", value: "indramayu" },
    ],
  },
  {
    id: "user_password",
    type: "password",
    label: "Password",
    required: true,
    name: "password",
  },
];
