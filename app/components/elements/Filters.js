import React from "react";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";

export function SelectOptions({
  label,
  options = [],
  className,
  customSelect,
  onChange,
  defaultValue,
  required = false,
  rightIcon,
}) {
  return (
    <div className="flex gap-x-2 text-base! text-secondary items-center">
      {label ? (
        <label className="font-semibold text-black">{label}</label>
      ) : null}
      <div
        className={`flex items-center gap-2 rounded-md border-secondary border-2 bg-secondary-soft px-3 py-1 text-sm${className}`}
      >
        <select
          className={`w-full px-2 cursor-pointer bg-transparent font-semibold text-secondary text-base outline-none appearance-none ${customSelect}`}
          onChange={(e) => onChange?.(e)}
          defaultValue={defaultValue}
          required={required}
        >
          {options.map((option, idx) => (
            <option key={idx} value={option.id} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="ml-auto text-[var(--color-secondary)]/80">
          {rightIcon || <FaChevronDown />}
        </span>
      </div>
    </div>
  );
}

export function SelectDate({
  label,
  className,
  customeDate,
  required = false,
  defaultValue,
  onChange,
}) {
  return (
    <div className="flex gap-x-2 items-center text-base! text-secondary">
      {label ? (
        <span className="font-semibold text-black">
          {label} {required && <span className="text-unapproved">*</span>}
        </span>
      ) : null}

      <div
        className={`relative flex items-center gap-2 rounded-md border-secondary border-2 bg-secondary-soft px-3 py-1 ${className}`}
      >
        <input
          type="date"
          defaultValue={defaultValue}
          required={required}
          className={`w-full px-2 cursor-pointer bg-transparent font-semibold outline-none appearance-none ${customeDate}`}
          onChange={(e) => onChange?.(e)}
        />
      </div>
    </div>
  );
}
