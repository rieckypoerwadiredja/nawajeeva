function AvatarMini({ name = "A", size = 40 }) {
  const initial = (name || "A")
    .split(" ") // Pisahkan berdasarkan spasi
    .map((word) => word[0].toUpperCase()) // Ambil huruf pertama dan ubah ke kapital
    .slice(0, 2) // Ambil hanya 2 huruf pertama
    .join(""); // Gabungkan jadi string lagi

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full bg-secondary/20 font-bold text-secondary"
    >
      <span style={{ fontSize: size / 2.5 }}>{initial}</span>
    </div>
  );
}

export default AvatarMini;
