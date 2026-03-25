export default function Message({ success, children }) {
  return (
    <div
      className={`rounded-lg px-4 py-3 text-sm font-medium ${
        success
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      {children}
    </div>
  );
}
