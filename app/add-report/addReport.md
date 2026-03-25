# 📋 Dokumentasi Halaman `/add-report`

> Dokumentasi ini menjelaskan alur kerja halaman **Add Report Page** — mulai dari alur data UI, validasi role akses (RBAC), hingga detail struktur Request & Response pada setiap API untuk submit laporan.

---

## 🔄 Alur Data Keseluruhan (Visual)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER BUKA HALAMAN                            │
│                          /add-report                                │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  page.js (Server Component)                                         │
│                                                                     │
│  1. Cek Sesi: getServerSession(authOptions)                         │
│  2. Validasi RBAC (Role-Based Access Control):                      │
│     HANYA role "GR", "WE", dan "FA" yang divalidasi.                │
│     Jika gagal → return pesan "Tidak memiliki akses".               │
│  3. Ambil referensi Brand Nutrisi: GET /api/brands                  │
│  4. Render: <AddReport data={{ brands, user }} />                   │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  AddReport.js (Client Component Wrapper)                            │
│                                                                     │
│  1. Simpan state `activeTab` (default: "death_plant_generative")    │
│  2. Sediakan TabsButton untuk mengganti mode spesifik               │
│  3. Lewatkan data user & brand ke `<AddReportForm />`               │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  AddReportForm.js (Form Handler Utama)                              │
│                                                                     │
│  1. Render dynamic form inputs sesuai nilai `activeTab`             │
│  2. Kumpulkan field dinamis + data dari Session (userId, location,  │
│     greenhouse) menjadi satu JSON payload.                          │
│  3. Saat Submit: Lakukan fetch POST ke URI yang sesuai tab aktif    │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  API Backend (POST API)                                             │
│  Validasi Token JWT & Role -> Validasi Payload -> Simpan ke DB ->   │
│  Return Response Sukses/Gagal ke Frontend                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 Masing-Masing API Endpoint (Detailed Payload)

Halaman form ini melayani 4 jenis pelaporan harian yang ditembakkan ke endpoint terpisah. **Setiap Endpoint Server-Side juga wajib memvalidasi `session.user.roleCode` dan menolak dengan statur `403` jika role tidak sesuai.**

Setiap report yang di-submit akan secara otomatis diberikan `status=submitted` pada database.

---

### 1. 🌱 Death Plant Vegetative

**Endpoint:** `POST /api/reports/report-death-plant-vegetative`
**Deskripsi:** Melaporkan jumlah tanaman mati pada fase vegetatif beserta alasannya.

#### Request Body (JSON)

| Field            | Tipe     | Aturan (API & Prisma)                  | Keterangan                                       |
| ---------------- | -------- | -------------------------------------- | ------------------------------------------------ |
| `location`       | `Int`    | **Required**                           | ID Lokasi (di-parse ke `locationId`)             |
| `greenhouse`     | `Int`    | **Required**                           | ID Greenhouse (di-parse ke `greenhouseId`)       |
| `createdBy`      | `Int`    | **Required**                           | ID User pelapor (di-parse ke `createdById`)      |
| `reportDate`     | `String` | **Required**                           | Tanggal pelaporan (disimpan sbg `date` DateTime) |
| `title`          | `String` | **Required**                           | Judul laporan kematian                           |
| `reason`         | `String` | **Required**                           | Alasan / penyebab                                |
| `deadPlantCount` | `Int`    | **Required**                           | Jumlah tanaman mati target laporan               |
| `reportDate`     | `String` | **Required** _(Wajib di tabel Prisma)_ | Tanggal pelaporan (disimpan sbg `date` DateTime) |
| `note`           | `String` | **Required** _(Wajib di tabel Prisma)_ | Catatan laporan kematian vegetation              |
| `photo`          | `String` | _Optional_                             | Bukti foto / link URL gambar                     |

---

### 2. 🍎 Death Plant Generative

**Endpoint:** `POST /api/reports/report-death-plant-generative`
**Deskripsi:** Melaporkan tanaman yang dikorbankan / gagal saat fase generatif dengan menyertakan timbangan buah.

#### Request Body (JSON)

| Field             | Tipe     | Aturan (API & Prisma)                  | Keterangan                                       |
| ----------------- | -------- | -------------------------------------- | ------------------------------------------------ |
| `location`        | `Int`    | **Required**                           | ID Lokasi                                        |
| `greenhouse`      | `Int`    | **Required**                           | ID Greenhouse                                    |
| `createdBy`       | `Int`    | **Required**                           | ID User pelapor                                  |
| `title`           | `String` | **Required**                           | Judul laporan                                    |
| `reason`          | `String` | **Required**                           | Penyebab laporan/buang                           |
| `fruitWeightGram` | `Float`  | **Required**                           | Disimpan sbg `fruitWeight` (`Float`) di DB.      |
| `reportDate`      | `String` | **Required** _(Wajib di tabel Prisma)_ | Tanggal pelaporan (disimpan sbg `date` DateTime) |
| `note`            | `String` | **Required** _(Wajib di tabel Prisma)_ | Catatan laporan kematian generative              |
| `photo`           | `String` | _Optional_                             | Foto Bukti                                       |

---

### 3. 💧 Nutrition Usage

**Endpoint:** `POST /api/reports/report-nutrition-usage`
**Deskripsi:** Mencatat kebutuhan jumlah nutrisi/merek yang digunakan di hari itu.

#### Request Body (JSON)

| Field        | Tipe     | Aturan (API & Prisma) | Keterangan                                                    |
| ------------ | -------- | --------------------- | ------------------------------------------------------------- |
| `location`   | `Int`    | **Required**          | ID Lokasi (`locationId`)                                      |
| `greenhouse` | `Int`    | **Required**          | ID Greenhouse (`greenhouseId`)                                |
| `createdBy`  | `Int`    | **Required**          | ID User pelapor (`createdById`)                               |
| `reportDate` | `String` | **Required**          | Tanggal laporan penggunaan nutrisi (disimpan sbg `date`)      |
| `brandId`    | `Int`    | **Required**          | ID referensi brand nutrisi (disimpan sbg `nutrition_brandId`) |
| `quantity`   | `Int`    | **Required**          | Kuantitas takaran nutrisi                                     |
| `note`       | `String` | _Optional_            | Catatan opsional penggunaan nutrisi                           |

---

### 4. 🌡️ Micro Climate

**Endpoint:** `POST /api/reports/report-micro-climate`
**Deskripsi:** Menginformasikan statistik cuaca harian di Greenhouse (Suhu, Kelembaban, dan Sinar/Lux).

#### Request Body (JSON)

| Field         | Tipe     | Aturan (API & Prisma) | Keterangan                                 |
| ------------- | -------- | --------------------- | ------------------------------------------ |
| `location`    | `Int`    | **Required**          | ID Lokasi (`locationId`)                   |
| `greenhouse`  | `Int`    | **Required**          | ID Greenhouse (`greenhouseId`)             |
| `createdBy`   | `Int`    | **Required**          | ID User pelapor (`createdById`)            |
| `reportDate`  | `String` | **Required**          | Tanggal iklim ukuran (disimpan sbg `date`) |
| `temperature` | `Float`  | **Required**          | Nilai suhu (°C) yang dikonversi ke DB      |
| `humidity`    | `Float`  | **Required**          | Nilai kelembaban / Humidity                |
| `light`       | `Float`  | **Required**          | Nilai intensitas cahaya / penerangan       |
| `note`        | `String` | _Optional_            | Catatan opsi tentang micro climate         |

---

## 📩 Standardisasi Response API

Hampir seluruh API di atas memiliki output / response standard dari sisi JSON yang sama. Developer UI Frontend `AddReportForm.js` hanya perlu meng-handle 3 tipe status berikut:

#### 1. Success Response (`200 OK`)

Sukses tersimpan secara atomik, dan tabel prisma terkait selesai di insert.

```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Report created successfully",
  "data": null
}
```

#### 2. Validation / Bad Request Error (`400 Bad Request`)

Frontend melempar salah satu isian form secara kosong, API mencegah data corrupt.

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "All fields are required",
  "data": null
}
```

#### 3. RBAC Forbidden Error (`403 Forbidden`)

Server menolak API ditembak oleh orang yang login selain Role GR/FA/WE.

```json
{
  "status": "error",
  "statusCode": 403,
  "message": "Forbidden: Staff access required",
  "data": null
}
```

#### 4. Internal Processing Error (`500 Server Error`)

Terjadi kegagalan seperti hilangnya _Seed ID status 'submitted'_ atau putusnya pool ke DB.

```json
{
  "status": "error",
  "statusCode": 500,
  "message": "Status 'submitted' not found", // Bisa pesan error Prisma lainnya
  "data": null
}
```

---

## 🔒 Proteksi Akses Sisi Klien vs Server

**Client:** Form akan dirender HANYA jika sesi Valid.
**Server (`/api/reports/.../route.js`)**: Di awal fungsi `POST`, Next.js membaca JWT Session Token. Developer jangan sekadar percaya verifikasi di Frontend karena `User API` bisa ditembak melalu Postman.
Inilah alasan kami meletakkan validasi ini di semua endpoint Backend:

```javascript
const session = await getServerSession(authOptions);
  if (!session || !["GR", "WE", "FA"].includes(session?.user?.roleCode)) {
...
```

---

## 🗂️ Ringkasan untuk Developer Baru

_Panduan cepat untuk kamu yang akan maintenance:_

| Kebutuhan                                       | Lihat File Ini                                   |
| ----------------------------------------------- | ------------------------------------------------ |
| Mengubah Data Payload Frontend (Sisi React)     | `app/components/fragments/Form/AddReportForm.js` |
| Mendapat Payload Input Baru dlm Validasi DB     | `app/api/reports/report-[TIPE_REPORT]/route.js`  |
| Peraturan Keamanan Access Khusus AddReport      | `app/add-report/page.js`                         |
| Menambahkan opsi "Tabs" Untuk Report Baru 5 dst | `app/constants/forms.js` + `AddReport.js`        |
