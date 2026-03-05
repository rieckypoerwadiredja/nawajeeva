export function formatIDRThousands(rawDigits) {
  if (!rawDigits) return "";
  const n = Number(rawDigits);
  if (Number.isNaN(n)) return "";
  return new Intl.NumberFormat("id-ID").format(n); // 1.000.000
}
