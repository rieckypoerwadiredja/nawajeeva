# 📋 Dokumentasi Halaman `/admin/production/reports`

> Dokumentasi ini menjelaskan alur kerja halaman **Reports Page** — mulai dari alur data, API yang digunakan, hingga cara approval report.

---

## 🔄 Alur Data Keseluruhan (Visual)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER BUKA HALAMAN                            │
│                  /admin/production/reports                           │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  page.js                                                            │
│  - Cuma render: <DailyReportProduction />                           │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  DailyReportProduction.js                                           │
│                                                                     │
│  1. Baca query params dari URL (searchParams):                      │
│     - startDate, endDate, location, status, greenhouse              │
│                                                                     │
│  2. Panggil useFetch() dengan URL:                                  │
│     GET /api/reports?startDate=...&endDate=...&location=...         │
│                      &status=...&greenhouse=...                     │
│                                                                     │
│  3. Tampilkan filter (SelectDate, SelectOptions)                    │
│  4. Tombol "Terapkan" → push URL baru dengan query params          │
│  5. Render daftar ReportCard dari data response                     │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  useFetch.js (Custom Hook)                                          │
│                                                                     │
│  - Terima URL + dependencies                                        │
│  - Panggil callApi() → fetch ke URL                                 │
│  - Return: { data, loading, error, refetch }                        │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  callApi.js (Fetch Wrapper)                                         │
│                                                                     │
│  - Lakukan fetch() biasa dengan JSON headers                        │
│  - Kalau response.ok = false → throw Error                          │
│  - Kalau sukses → return response.json()                            │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  API: GET /api/reports/route.js (Server-side)                       │
│                                                                     │
│  - Terima query params: startDate, endDate, location,               │
│    status, greenhouse                                               │
│  - Query 4 tabel Prisma sekaligus:                                  │
│    1. report_death_plant_vegetative                                  │
│    2. report_death_plant_generative                                  │
│    3. report_nutrition_usage                                         │
│    4. report_micro_climate                                           │
│  - Return gabungan semua report + data filter                       │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Response JSON dikembalikan ke DailyReportProduction                │
│                                                                     │
│  {                                                                  │
│    status: "success",                                               │
│    data: {                                                          │
│      deathPlantVegetative: [...],                                   │
│      deathPlantGenerative: [...],                                   │
│      nutritionUsage: [...],                                         │
│      microClimate: [...],                                           │
│      filters: { greenhouse, location, status }                      │
│    }                                                                │
│  }                                                                  │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  DailyReportProduction me-render setiap array jadi <ReportCard />   │
│  masing-masing dengan data yang sudah di-mapping                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 API Endpoints

### 1. `GET /api/reports`

**Fungsi:** Ambil semua report berdasarkan filter.

**File:** `app/api/reports/route.js`

#### Query Parameters:

| Parameter    | Tipe     | Default  | Keterangan                                 |
| ------------ | -------- | -------- | ------------------------------------------ |
| `startDate`  | `string` | hari ini | Tanggal awal (format: `YYYY-MM-DD`)        |
| `endDate`    | `string` | hari ini | Tanggal akhir (format: `YYYY-MM-DD`)       |
| `location`   | `string` | `"all"`  | Kode lokasi (`BDG`, `BGR`, atau `all`)     |
| `status`     | `string` | `"all"`  | Kode status (`submitted`, `approved`, dll) |
| `greenhouse` | `string` | `"all"`  | Kode greenhouse (`PDLG`, `KPGL`, dll)      |

#### Contoh Request:

```
GET /api/reports?startDate=2026-03-01&endDate=2026-03-19&location=BDG&status=all&greenhouse=PDLG
```

#### Response Sukses (200):

```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Reports fetched successfully",
  "data": {
    "deathPlantVegetative": [
      {
        "id": 1,
        "date": "2026-03-10",
        "title": "...",
        "reason": "...",
        "deadPlantCount": 5,
        "status": { "code": "submitted", "name": "Submitted" },
        "location": { "name": "Bandung", "code": "BDG" },
        "greenhouse": { "name": "Padalarang", "code": "PDLG" },
        "createdBy": { "name": "John" },
        "approvedBy": null,
        "createdAt": "...",
        "updatedAt": "..."
      }
    ],
    "deathPlantGenerative": [ ... ],
    "nutritionUsage": [ ... ],
    "microClimate": [ ... ],
    "filters": {
      "greenhouse": [ ... ],
      "location": [ ... ],
      "status": [ ... ]
    }
  }
}
```

#### Response Error (400 / 500):

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Start date tidak boleh lebih besar dari end date",
  "data": null
}
```

---

### 2. `PUT /api/reports/:id/approvement`

**Fungsi:** Ubah status approval sebuah report.

**File:** `app/api/reports/[id]/approvement/route.js`

#### Request Body:

```json
{
  "status": "approved",
  "type": "micro_climate"
}
```

| Field    | Tipe     | Keterangan                                                        |
| -------- | -------- | ----------------------------------------------------------------- |
| `status` | `string` | Kode status baru (`submitted`, `approved`, `rejected`, `revised`) |
| `type`   | `string` | Tipe report (lihat tabel di bawah)                                |

#### Tipe Report yang Valid:

| Nilai `type`             | Tabel Prisma                    |
| ------------------------ | ------------------------------- |
| `death_plant_vegetative` | `report_death_plant_vegetative` |
| `death_plant_generative` | `report_death_plant_generative` |
| `nutrition_usage`        | `report_nutrition_usage`        |
| `micro_climate`          | `report_micro_climate`          |

#### Response Sukses:

```json
{
  "status": "success",
  "message": "Report updated successfully",
  "data": { ... }
}
```

---

## 🔍 Alur Filter (Visual)

```
User pilih filter di UI
        │
        ▼
┌──────────────────────────────────┐
│ State `filters` di-update        │
│ (startDate, endDate, location,   │
│  status, greenhouse)             │
└──────────────┬───────────────────┘
               │
     User klik "Terapkan"
               │
               ▼
┌──────────────────────────────────┐
│ router.push() → URL baru        │
│ contoh:                          │
│ /admin/production/reports        │
│   ?startDate=2026-03-01          │
│   &endDate=2026-03-19            │
│   &location=BDG                  │
│   &status=approved               │
│   &greenhouse=PDLG               │
└──────────────┬───────────────────┘
               │
        URL berubah →
        searchParams berubah →
        useFetch auto-refetch
               │
               ▼
┌──────────────────────────────────┐
│ Data baru ditampilkan di UI      │
└──────────────────────────────────┘
```

**Penjelasan simpel:**

1. User mengubah dropdown/datepicker → state `filters` di-update
2. User klik tombol **"Terapkan"** → `router.push()` mengubah URL dengan query params baru
3. `searchParams` berubah → `useFetch` otomatis refetch karena dependensi-nya berubah
4. Data baru dari API ditampilkan

---

## ✅ Alur Approval Report (Visual)

```
Admin klik dropdown status di ReportCard
        │
        ▼
┌──────────────────────────────────────────────────┐
│ DropdownButton memicu handleStatusChange(key)    │
│  key = "approved" / "rejected" / "revised"       │
└──────────────────────────┬───────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────┐
│ callApi()                                        │
│  PUT /api/reports/{id}/approvement               │
│  body: { status: "approved", type: "micro_..." } │
└──────────────────────────┬───────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────┐
│ API Server:                                      │
│  1. Cari statusId dari tabel report_status       │
│  2. Update statusId di tabel report yg sesuai    │
│  3. Return response sukses/error                 │
└──────────────────────────┬───────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────┐
│ Client:                                          │
│  - alert(response.message)                       │
│  - refetchReports() → muat ulang semua data      │
└──────────────────────────────────────────────────┘
```

---

## 📦 4 Jenis Report

Halaman ini menampilkan **4 jenis report** yang berbeda, masing-masing dari tabel database yang terpisah:

### 1. 🌱 Death Plant Vegetative (`report_death_plant_vegetative`)

Laporan tanaman mati fase vegetatif.

| Field            | Keterangan            |
| ---------------- | --------------------- |
| `deadPlantCount` | Jumlah tanaman mati   |
| `reason`         | Penyebab kematian     |
| `title`          | Judul laporan         |
| `image`          | Foto bukti (opsional) |

### 2. 🍎 Death Plant Generative (`report_death_plant_generative`)

Laporan tanaman mati fase generatif.

| Field         | Keterangan            |
| ------------- | --------------------- |
| `fruitWeight` | Berat buah (Kg)       |
| `reason`      | Penyebab kematian     |
| `title`       | Judul laporan         |
| `image`       | Foto bukti (opsional) |

### 3. 💧 Nutrition Usage (`report_nutrition_usage`)

Laporan penggunaan nutrisi (pupuk/obat).

| Field      | Keterangan                |
| ---------- | ------------------------- |
| `quantity` | Jumlah penggunaan (ml/gr) |
| `brand`    | Merek + tipe nutrisi      |
| `title`    | Judul laporan             |
| `image`    | Foto bukti (opsional)     |

### 4. 🌡️ Micro Climate (`report_micro_climate`)

Laporan kondisi iklim mikro di greenhouse.

| Field         | Keterangan              |
| ------------- | ----------------------- |
| `temperature` | Suhu (°C)               |
| `humidity`    | Kelembaban (%)          |
| `light`       | Intensitas cahaya (lux) |
| `title`       | Judul laporan           |
| `image`       | Foto bukti (opsional)   |

**Field yang sama di semua jenis report:**

| Field        | Keterangan                         |
| ------------ | ---------------------------------- |
| `id`         | ID unik report                     |
| `date`       | Tanggal laporan                    |
| `createdAt`  | Waktu laporan dibuat               |
| `updatedAt`  | Waktu terakhir di-update           |
| `status`     | Status approval (`{ code, name }`) |
| `location`   | Lokasi (`{ name, code }`)          |
| `greenhouse` | Greenhouse (`{ name, code }`)      |
| `createdBy`  | Nama pembuat laporan               |
| `approvedBy` | Nama yang approve (bisa `null`)    |
| `note`       | Catatan tambahan                   |

---

## 🧩 Penjelasan Komponen

### `page.js`

Cuma 1 baris — import dan render `<DailyReportProduction />`. Ini adalah entry point Next.js untuk route `/admin/production/reports`.

### `DailyReportProduction.js`

Komponen utama. Yang dilakukan:

- **Baca URL params** → ambil filter dari URL
- **Fetch data** → panggil API lewat `useFetch`
- **Render filter** → dropdown lokasi, status, greenhouse + date picker
- **Render reports** → looping 4 array report, render `<ReportCard />`
- **Handle filter** → tombol "Terapkan" push URL baru → auto refetch

### `ReportCard` (di `Cards.js`)

Komponen untuk menampilkan satu report card:

- Menampilkan info: greenhouse, lokasi, pelapor, tanggal
- Menampilkan konten spesifik (HTML dari `reportContent`)
- Menampilkan gambar bukti (klik untuk preview + zoom)
- **Dropdown approval** di pojok kanan atas → ubah status report

### `useFetch.js`

Custom hook yang:

1. Terima `url` dan `deps` (dependencies)
2. Auto-fetch saat pertama kali mount ATAU saat `deps` berubah
3. Return `{ data, loading, error, refetch }`
4. Loading hanya tampil saat pertama kali load

### `callApi.js`

Wrapper sederhana untuk `fetch()`:

- Set header `Content-Type: application/json`
- Otomatis stringify body jika ada
- Throw error jika `response.ok` = false
- Return `response.json()` jika sukses

---

## 📌 Opsi Filter

### Lokasi (`LOCATION_FILTER`)

| Label   | Kode  |
| ------- | ----- |
| Semua   | `all` |
| Bandung | `BDG` |
| Bogor   | `BGR` |

### Status Report (`REPORT_STATUS_FILTER`)

| Label     | Kode        |
| --------- | ----------- |
| Semua     | `all`       |
| Submitted | `submitted` |
| Approved  | `approved`  |
| Rejected  | `rejected`  |
| Revised   | `revised`   |

### Greenhouse (`GREENHOUSE_FILTER`)

| Label              | Kode   |
| ------------------ | ------ |
| Padalarang - BDG   | `PDLG` |
| Klapanunggal - BDG | `KPGL` |
| Lido - BGR         | `LIDO` |
| Indramayu - BGR    | `IDMY` |

---

## 🗂️ Ringkasan untuk Developer Baru

**Kalau kamu mau:**

| Ingin...                         | Lihat file ini                                                                |
| -------------------------------- | ----------------------------------------------------------------------------- |
| Ubah tampilan halaman            | `DailyReportProduction.js`                                                    |
| Ubah tampilan per-report         | `Cards.js` → `ReportCard`                                                     |
| Tambah/ubah opsi filter          | `constants/filters.js`                                                        |
| Tambah/ubah opsi status approval | `constants/type.js` → `REPORT_STATUS`                                         |
| Ubah logic fetch data            | `hooks/useFetch.js` + `utils/callApi.js`                                      |
| Ubah query database report       | `api/reports/route.js`                                                        |
| Ubah logic approval              | `api/reports/[id]/approvement/route.js`                                       |
| Tambah jenis report baru         | Tambah query di `api/reports/route.js` + render di `DailyReportProduction.js` |
