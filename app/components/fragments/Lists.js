import { FaCheck } from "react-icons/fa";

export function ChecklistRow({ label, checked }) {
  return (
    <div className="flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-2 text-sm">
        <FaCheck
          className={[
            "transition-colors",
            checked ? "text-success" : "text-text-muted",
          ].join(" ")}
        />
        <span
          className={[
            "transition-colors",
            checked ? "text-text-primary" : "text-text-muted",
          ].join(" ")}
        >
          {label}
        </span>
      </div>

      {/* Right Indicator */}
      <FaCheck
        className={[
          "transition-colors",
          checked ? "text-success" : "text-text-muted",
        ].join(" ")}
      />
    </div>
  );
}
