export function formatIDRThousands(rawDigits) {
  if (!rawDigits) return "";
  const n = Number(rawDigits);
  if (Number.isNaN(n)) return "";
  return new Intl.NumberFormat("id-ID").format(n); // 1.000.000
}

export function formatWIB(date) {
  if (!date) return "-";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "-";

  const formatted = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(d);

  return `${formatted} WIB`;
}
export function formatDate(date) {
  if (!date) return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(d);
}
