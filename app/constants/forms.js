/**
 * NOTE: DATA - Tabs (button pilihan)
 * - bentuk data array object
 */
export const ADD_REPORT_TABS = [
  { key: "death_plant_vegetative", label: "Death Plant Vegetative" },
  { key: "death_plant_generative", label: "Death Plant Generative" },
  { key: "nutrition_usage", label: "Nutrition Usage" },
  { key: "micro_climate", label: "Micro Climate" },
];

/**
 * NOTE: DATA - Form fields (dipakai untuk looping)
 */
export const ADD_REPORT_FORM_FIELDS_BY_TAB = {
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
      placeholder: "Contoh: EC 1.8 mS, pH 5.8, pemupukan dilakukan sesuai SOP.",
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
      placeholder: "Contoh: EC 1.8 mS, pH 5.8, pemupukan dilakukan sesuai SOP.",
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
      options: [
        // Pupuk
        { label: "Petroganik", value: "petroganik", type: "padat" },
        { label: "NPK Phonska", value: "npk_phonska", type: "padat" },
        {
          label: "Urea Pupuk Indonesia",
          value: "urea_pupuk_indonesia",
          type: "padat",
        },
        { label: "ZA Petrokimia", value: "za_petrokimia", type: "padat" },
        { label: "SP-36", value: "sp36", type: "padat" },
        { label: "KCL Mahkota", value: "kcl_mahkota", type: "padat" },

        // Pestisida
        { label: "Regent", value: "regent", type: "padat" },
        { label: "Curacron", value: "curacron", type: "cair" },
        { label: "Dursban", value: "dursban", type: "cair" },
        { label: "Sidametrin", value: "sidametrin", type: "cair" },
        { label: "Buldok", value: "buldok", type: "cair" },
      ],
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
      placeholder: "Contoh: EC 1.8 mS, pH 5.8, pemupukan dilakukan sesuai SOP.",
    },
  ],
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
    type: "text",
    label: "Role",
    required: true,
    name: "role",
  },
  {
    id: "user_password",
    type: "password",
    label: "Password",
    required: true,
    name: "password",
  },
];
