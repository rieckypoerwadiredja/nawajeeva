# 📋 Dokumentasi Halaman `/admin/production` (User Management)

> Dokumentasi ini menjelaskan alur kerja halaman **User Management / Admin Production Page** — mulai dari alur data pada UI, aturan akses khusus Admin (RBAC), hingga detail struktur koneksi ke API `/api/users` untuk proses CRUD (Create, Read, Update).

---

## 🔄 Alur Data Keseluruhan (Visual)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER BUKA HALAMAN                            │
│                       /admin/production                             │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  page.js (Server Component)                                         │
│                                                                     │
│  1. Panggil getServerSession(authOptions)                           │
│  2. Validasi RBAC (Role-Based Access Control):                      │
│     - HANYA role "ADM" (Admin) yang diizinkan mengakses.            │
│     - Jika gagal: Tolak dengan pesan "Tidak memiliki akses".        │
│  3. Render: <AdminProduction />                                     │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  AdminProduction.js (Client Component Wrapper)                      │
│                                                                     │
│  1. Inisialisasi Fetch ke `GET /api/users`                          │
│  2. Mengelola State Filter (Berdasarkan Role / Greenhouse)          │
│  3. Menampilkan Data Tabel (Daftar Pengguna, Role, Status)          │
│  4. Menyediakan tombol aksi (Create User, Edit User, Delete/Update) │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Form Handler (Create / Edit Modal)                                 │
│                                                                     │
│  1. Kumpulkan input dari Admin (Nama, Email, Role, Access GH).      │
│  2. Submit form -> Trigger fetch API POST/PUT ke `/api/users`.      │
│  3. Refetch table jika mutasi API sukses (Tampilkan Toast/Alert).   │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│  API Backend (/api/users/route.js)                                  │
│  Semua Endpoint Wajib Sesi Admin -> Update/Query Prisma DB ->       │
│  Menyimpan Akses Relasi (Greenhouse_Access) -> Return JSON          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 API Endpoints (CRUD User)

Endpoint yang digunakan semuanya dipusatkan di dalam file routing **`app/api/users/route.js`**. 
Setiap endpoint API di-protect di bawah kode berikut yang memastikan hanya Admin yang bisa menembak request:
```javascript
const session = await getServerSession(authOptions);
  if (!session || session?.user?.roleCode !== "ADM") {
    return NextResponse.json({ status: "error", message: "Forbidden" }, { status: 403 });
  }
```

---

### 1. 🔍 Fetch All Users / List Users
**Endpoint:** `GET /api/users`
**Deskripsi:** Mengambil semua daftar user beserta detail `role`, `status`, dan relasi m2m ke `greenhouse_access`.

#### Query Parameters
| Parameter    | Tipe     | Default | Keterangan                                       |
| ------------ | -------- | ------- | ------------------------------------------------ |
| `role`       | `String` | `"all"` | Filter berdasarkan nama role (cth: "Grower")     |
| `greenhouse` | `String` | `"all"` | Filter berdasarkan nama GH (cth: "Padalarang")   |

#### Response Berhasil
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "code": "GR-PDLG-BDG-240324173500",
      "email": "grower@agrobot.com",
      "name": "Budi Grower",
      "role": { "id": 2, "name": "Grower" },
      "status": { "id": 1, "name": "Active" },
      "greenhouse_access": [
        {
          "greenhouse": { "id": 1, "name": "Padalarang", "location": { "name": "Bandung" } }
        }
      ]
    }
  ]
}
```

---

### 2. 📝 Tambah Pengguna Baru (Create User)
**Endpoint:** `POST /api/users`
**Deskripsi:** Membuat identitas pengguna baru termasuk *Auto-Generate Kode Karyawan*, Hash Password menggunakan `bcrypt`, dan menyimpan relasi akses di `greenhouse_access`.

#### Request Body (JSON)
| Field         | Tipe           | Aturan (API & Prisma)                        | Keterangan                                                    |
| ------------- | -------------- | ------------------------------------------- | ------------------------------------------------------------- |
| `name`        | `String`       | **Required**                                | Nama Karyawan                                                 |
| `email`       | `String`       | **Required** *(Unik)*                       | Email, tidak boleh duplikat (Prisma P2002 error constraint)   |
| `password`    | `String`       | **Required**                                | Raw password yang akan di Hash oleh Next.js Server            |
| `role`        | `String`       | **Required**                                | Nama role literal (misal: "Grower", "Investor")               |
| `greenhouses` | `Array<String>`| **Required** *(Tdk Boleh Kosong)*           | Array kumpulan nama greenhouse (misal: `["Padalarang"]`)      |
| `code`        | `String`       | *Optional* *(Auto generated)*               | Kode identitas. Jika null, akan dibuat otomatis oleh Backend  |
| `statusId`    | `Int / String` | *Optional* *(Default: 1)*                   | ID untuk status aktivasi (1 biasanya "Active")                |

*Sistem akan menggunakan Prisma Transaction (`$transaction`) untuk memastikan User DB entry dan `greenhouse_access` terbuat secara atomik. Bila ada error satu, semua otomatis ter-rollback.*

---

### 3. ✏️ Perbarui Data Pengguna (Edit User)
**Endpoint:** `PUT /api/users`
**Deskripsi:** Mengedit entri karyawan yang ada. Backend menerapkan logika *partial update* (hanya parameter yang dikirim yang akan diubah/diupdate).

#### Request Body (JSON)
| Field      | Tipe     | Aturan (API & Prisma) | Keterangan                                            |
| ---------- | -------- | --------------------- | ----------------------------------------------------- |
| `id`       | `Int`    | **Required**          | Patokan Primary Key user yang ingin di-edit           |
| `name`     | `String` | *Optional*            | Perbarui nama                                         |
| `email`    | `String` | *Optional* *(Unik)*   | Perbarui email login                                  |
| `code`     | `String` | *Optional*            | Perbarui NIK / Kode Akses karyawan                    |
| `status`   | `String` | *Optional*            | String penanda status (cth: "Inactive" / "Resigned")  |
| `role`     | `String` | *Optional*            | Perbarui string role (Backend nge-resolve ke roleId)  |
| `password` | `String` | *Optional*            | Jika diisi + tdk kosong, password ini masuk tahap Hash|

*(Catatan: Endpoint saat ini belum dapat mengubah relasi array Array `greenhouses` yang di-assign lewat API PUT; untuk merombak akses Greenhouse, modifikasi lanjutan ke routing PUT perlu dilakukan).*

---

## 🔐 Spesifikasi dan Validasi Tabel (Prisma View)

Sangat penting untuk memahami bagaimana data dirajut di Database agar tidak ada isu Relasional sewaktu POST.

1. **`user` Table:** Merupakan root utama. Kolom `email` dan `code` di-set bersifat **@unique**. Kesalahan saat CREATE yang mengirim duplikat email memicu response: `400 Bad Request: Duplicate field: email`.
2. **`greenhouse_access` Table:** Sebuah user dapat dikaitkan ke banyak Greenhouse. Tabel jembatan (`bridge table`) `greenhouse_access` di-assign untuk user melalui fitur *transactional* pada fungsi POST saat create.
3. **Roles & Status:** Database mengharapkan Foreign Key `roleId` dan `statusId` bertipe **Int**. API menangani ini secara cerdas (Frontend kirim _nama_ atau _label_ string seperti `role: "Grower"`, kemudian Backend men-translate namanya menjadi Patokan ID lewat koneksi `prisma.role.findFirst()`).

---

## 🗂️ Ringkasan untuk Developer Baru

*Langkah navigasi bila harus mengembangkan/debug fitur ini:*

| Kebutuhan                                           | Lihat File Ini                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------- |
| Merombak Layout UI Tabel & Modal Update Karyawan    | `app/components/layouts/AdminProduction.js` (atau Fragment formnya) |
| Ada Error saat User Registrasi & Generate Code "ID" | `app/api/users/route.js` (Fungsi `POST`)                            |
| Merombak/Menambah Opsi Filter Data GET              | `app/api/users/route.js` (Fungsi `GET`)                             |
| Hak Akses Halaman Terasa Buggy atau Gagal Masuk     | `app/admin/production/page.js`                                      |
