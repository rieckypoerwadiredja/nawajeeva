# 📊 Dokumentasi Komponen Chart (Grafik)

Dokumen ini menjelaskan cara menggunakan dan mengonfigurasi komponen grafik (Chart) yang ada di dalam folder `app/components/fragments/Chart`.

Terdapat 3 komponen grafik utama yang dibangun menggunakan *library* **Recharts**, yaitu:
1. **`LineChart.js`** (Grafik Garis)
2. **`BarChart.js`** (Grafik Batang)
3. **`AreaChart.js`** (Grafik Area)

Tujuan utama dari komponen-komponen ini adalah mempermudah pembuatan grafik agar dapat di-*reuse* (dipakai berulang kali) di seluruh halaman cukup dengan mengirimkan data aslinya dan pengaturannya, tanpa perlu mengatur warna atau styling grafik secara manual.

---

## 🛠️ Properti Utama (Props)

Setiap komponen grafik membutuhkan beberapa *props* dasar untuk dapat berfungsi dengan baik:

### 1. `data` (Array of Objects)
Data asli yang akan digambar oleh grafik. Setiap objek di dalam array mewakili satu titik di sumbu X.
**Contoh Format:**
```javascript
const myData = [
  { nama_bulan: "Jan", suhu: 28, air: 40 },
  { nama_bulan: "Feb", suhu: 29, air: 45 }
];
```

### 2. `title` (String)
Judul dari grafik yang ditampilkan di pojok kiri atas komponen.

### 3. `subTitle` (String) - *Khusus AreaChart*
Teks deskripsi tambahan atau subjek waktu yang ditampilkan di bawah judul (Misal: "Daily observation (24h period)").

### 4. `xAxisKey` (String)
Menentukan data apa yang akan dipakai sebagai pijakan Sumbu X (Garis bawah horizontal grafik).
⚠️ **SANGAT PENTING:** Nama parameter ini **HARUS SAMA PERSIS** dengan salah satu nama *key* (properti) yang ada di dalam variabel `data`.
*Contoh:* Jika di data di atas ingin menjadikan "Jan", "Feb" sebagai titik bawah grafik, maka parameternya adalah `xAxisKey="nama_bulan"`.

### 5. `legends` (Array of Objects)
Mengatur bagian data mana (misal: "suhu" saja, atau "suhu" dan "air") yang akan digambar garis/batangnya sekaligus untuk menampilkan indikator warna (Legend) di pojok kanan atas grafik.
Struktur propertinya:
- `key`: ⚠️ **HARUS SAMA PERSIS** dengan nama nilai data di dalam variabel `data` (misal: "suhu", atau "air").
- `label`: Teks biasa bebas untuk ditampilkan dan dibaca oleh user (misal: "Suhu Udara", "Kadar Air").
- `color`: Kelas warna dari Tailwind (contoh: `bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-warning`, dll). Sistem sudah mencocokkan ini otomatis melalui variabel warna di `globals.css` sehingga warna garis pada diagram dan warna titik pada keterangan legend akan **sinkron/sama secara otomatis**.

---

## 💻 Cara Penggunaan (Contoh Code)

Ini adalah cara termudah dan paling standar untuk memanggil dan merender ketiga grafik ini di file halaman Anda.

### 📈 1. Penggunaan LineChart (Grafik Garis)
Sangat cocok untuk data yang terus berlanjut seperti pertumbuhan tinggi tanaman.
```jsx
import LineChart from "../fragments/Chart/LineChart";

const growthData = [
  { minggu: "WEEK 1", greenhouseA: 40, greenhouseB: 30 },
  { minggu: "WEEK 2", greenhouseA: 55, greenhouseB: 45 },
];

<LineChart
  title="Pertumbuhan Tanaman (Height)"
  data={growthData}
  xAxisKey="minggu"  // 🟢 Cocokkan dengan nama "minggu" di dalam growthData
  legends={[
    { key: "greenhouseA", label: "Greenhouse A", color: "bg-primary" },    // 🟢 Key cocok dgn "greenhouseA"
    { key: "greenhouseB", label: "Greenhouse B", color: "bg-secondary" },  // 🟢 Key cocok dgn "greenhouseB"
  ]}
/>
```

### 📊 2. Penggunaan BarChart (Grafik Batang)
Sangat cocok untuk perbandingan nilai yang punya batas dan target tertentu seperti Luas Daun.
```jsx
import BarChart from "../fragments/Chart/BarChart";

const leafAreaData = [
  { area: "GH-01", aktual: 70, target: 60 },
  { area: "GH-02", aktual: 90, target: 75 },
];

<BarChart 
  title="Luas Daun (Leaf Area)"
  data={leafAreaData} 
  xAxisKey="area" 
  legends={[
     { key: "aktual", label: "Nilai Saat Ini", color: "bg-primary" },
     { key: "target", label: "Target Dicapai", color: "bg-secondary" },
  ]}
/>
```

### 🌊 3. Penggunaan AreaChart (Grafik Area Bawahnya Diwarnai)
Sangat cocok dipakai untuk *trend* yang pergerakannya rapat (seperti suhu dari jam ke jam).
```jsx
import AreaChart from "../fragments/Chart/AreaChart";

const trendData = [
  { jam: "00:00", temp: 25, lembab: 65 },
  { jam: "04:00", temp: 23, lembab: 70 },
];

<AreaChart
  title="Temperature & Humidity Trend"
  subTitle="Daily observation (24h period)"
  data={trendData}
  xAxisKey="jam"
  legends={[
    { key: "temp", label: "Temp (°C)", color: "bg-tertiary" },
    { key: "lembab", label: "Humidity (%)", color: "bg-secondary" },
  ]}
/>
```

---

## 💡 Tips & Catatan Penting Tambahan

1. **Tentang Warna Chart Murni Otomatis**
   Komponen `Line`, `Area`, dan `Bar` di balik sistem sudah difilter untuk menangkap kata awalan `bg-` (seperti `bg-primary`) lalu mengubahnya menjadi `var(--color-primary)` milik CSS global agar dimengerti oleh Recharts. Usahakan untuk **selalu menggunakan class standard yang ada di *globals.css*** (contohnya `bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-warning`, dll).

2. **Error `dataKey is not defined` atau `NaN` di Grafik**
   - **Tindakan Pencegahan 1**: Cek apakah Anda salah ketik/huruf kapital pada `xAxisKey`. Sering memanggil `xAxisKey="Time"` padahal di data kecil semua `time`. **Harus case-sensitive.**
   - **Tindakan Pencegahan 2**: Cek apakah parameter property nama di fungsi bernama `key`. (Misal: `{ key: "suhu" }` BUKAN `{ dataKey: "suhu" }` di dalam map legends).

3. **Tampilan Responsif**
   Ketiga grafik ini sudah dibungkus dengan komponen `<ResponsiveContainer width="100%" height="100%">` dari Recharts. Ini artinya mereka akan membesar dan mengecil mengikuti "wadah pembungkus (`div`)" yang Anda atur. Secara *default*, komponen mendefinisikan kontainer setinggi layar `h-64` atau `h-80` di masing-masing file agar stabil.
