"use client";
import { formatIDRThousands } from "../../utils/number";
import React, { useMemo, useRef, useState } from "react";
import { FaLock } from "react-icons/fa";
import { FiUpload, FiX } from "react-icons/fi";

export function SelectOptionsForm({
  label,
  value,
  required = false,
  options = [],
  onChange,
}) {
  return (
    <div>
      <div className="mb-2">
        {label} {required && <span className="text-cancel">*</span>}
      </div>
      <div className="rounded-lg border border-black/10 bg-white px-4 py-3 shadow-sm">
        <select
          required={required}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full cursor-pointer rounded px-2 py-1 outline-0"
        >
          <option value="">Pilih opsi</option>
          {options.map((option, index) => (
            <option value={option.value} className="cursor-pointer" key={index}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function PasswordForm({ label, value, required = false, onChange, disabled }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold text-primary-font">
        {label}
        {required && <span className="text-cancel">*</span>}
      </div>
      <input
        type="password"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        disabled={disabled}
        placeholder="Masukkan password baru"
        className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-primary-font shadow-sm outline-none placeholder:text-primary-font/40 focus:border-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}

export function TextAreaForm({
  label,
  value,
  placeholder,
  required = false,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary-font">
        {label} {required ? <span className="text-unapproved">*</span> : null}
      </label>
      <textarea
        required={required}
        rows={4}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full resize-none rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-primary-font shadow-sm outline-none placeholder:text-primary-font/40 focus:border-primary/40"
        placeholder={placeholder}
      />
    </div>
  );
}

export function TextForm({
  label,
  value,
  placeholder,
  required = false,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary-font">
        {label} {required ? <span className="text-unapproved">*</span> : null}
      </label>
      <input
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        type="text"
        className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-primary-font shadow-sm outline-none placeholder:text-primary-font/40 focus:border-primary/40"
        placeholder={placeholder}
      />
    </div>
  );
}

export function NumberForm({
  label,
  placeholder,
  required = false,
  rightAddon,
  format = "plain",
  value,
  onChange,
  name,
}) {
  const [inner, setInner] = useState("");

  const isControlled = typeof onChange === "function";
  const raw = isControlled ? String(value ?? "") : inner;

  const display = useMemo(() => {
    if (format !== "thousand") return raw;
    return formatIDRThousands(raw);
  }, [raw, format]);

  const handleChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");

    if (isControlled) onChange(digitsOnly);
    else setInner(digitsOnly);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary-font">
        {label} {required ? <span className="text-unapproved">*</span> : null}
      </label>

      <div className="relative">
        <input
          required={required}
          type="text"
          inputMode="numeric"
          value={display}
          onChange={handleChange}
          placeholder={placeholder}
          className={[
            "w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-primary-font shadow-sm outline-none placeholder:text-primary-font/40 focus:border-primary/40",
            rightAddon ? "pr-16" : "",
          ].join(" ")}
        />

        {rightAddon ? (
          <span className="absolute inset-y-0 right-3 flex items-center text-sm font-medium text-primary-font/70">
            {rightAddon}
          </span>
        ) : null}

        {name ? <input type="hidden" name={name} value={raw} /> : null}
      </div>
    </div>
  );
}

export function SelectDateForm({
  label,
  required = false,
  customeDate,
  value,
  onChange,
}) {
  return (
    <div>
      <div className="mb-2">
        {label} {required ? <span className="text-unapproved">*</span> : null}
      </div>
      <div className="rounded-lg border border-black/10 bg-white px-4 py-3 shadow-sm">
        <input
          required={required}
          type="date"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full cursor-pointer rounded px-2 py-1 outline-0 ${customeDate ?? ""}`}
        />
      </div>
    </div>
  );
}

export function UploadFileForm({ label, required, value, onChange }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    onChange?.(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName("");
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary-font">
        {label} {required && <span className="text-unapproved">*</span>}
      </label>

      <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
        />

        {preview && (
          <div className="relative my-4 w-fit">
            <img
              src={preview}
              alt="Preview"
              className="max-h-40 rounded-md border border-black/10"
            />

            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 cursor-pointer rounded-full bg-cancel p-1 text-white shadow hover:bg-cancel"
            >
              <FiX size={14} />
            </button>
          </div>
        )}

        {!preview && fileName && (
          <div className="my-3 flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm text-secondary">
            <span>{fileName}</span>
            <button
              type="button"
              onClick={handleRemove}
              className="cursor-pointer text-cancel hover:text-cancel"
            >
              <FiX size={16} />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white transition hover:bg-secondary/90"
        >
          <FiUpload size={16} />
          Upload File
        </button>
      </div>
    </div>
  );
}

export function CheckboxGroupForm({
  label,
  options = [],
  value = [],
  required = false,
  onChange,
  disabled,
}) {
  const handleToggle = (optionValue) => {
    if (disabled) return;
    const current = Array.isArray(value) ? value : [];
    const updated = current.includes(optionValue)
      ? current.filter((v) => v !== optionValue)
      : [...current, optionValue];
    onChange?.(updated);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary-font">
        {label} {required ? <span className="text-unapproved">*</span> : null}
      </label>
      <div className="rounded-lg border border-black/10 bg-white px-4 py-3 shadow-sm space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-3 cursor-pointer rounded-md px-2 py-2 text-sm hover:bg-black/5 transition ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={Array.isArray(value) && value.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              disabled={disabled}
              className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
            />
            <span>{option.label}</span>
          </label>
        ))}
        {options.length === 0 && (
          <p className="text-sm text-primary-font/40 italic">Tidak ada opsi</p>
        )}
      </div>
    </div>
  );
}

export default function FormField({ field, value, onChange, disabled }) {
  if (field.type === "date") {
    return (
      <SelectDateForm
        label={field.label}
        value={value}
        onChange={onChange}
        required={field.required}
        disabled={disabled}
      />
    );
  }

  if (field.type === "text") {
    return (
      <TextForm
        label={field.label}
        value={value}
        onChange={onChange}
        required={field.required}
        placeholder={field.placeholder}
        disabled={disabled}
      />
    );
  }

  if (field.type === "number") {
    return (
      <NumberForm
        label={field.label}
        value={value}
        onChange={onChange}
        required={field.required}
        format={field.format}
        rightAddon={field.rightAddon}
        placeholder={field.placeholder}
        disabled={disabled}
      />
    );
  }

  if (field.type === "select") {
    return (
      <SelectOptionsForm
        label={field.label}
        value={value}
        onChange={onChange}
        required={field.required}
        options={field.options}
        disabled={disabled}
      />
    );
  }

  if (field.type === "upload") {
    return (
      <UploadFileForm
        label={field.label}
        required={field.required}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <TextAreaForm
        label={field.label}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        required={field.required}
        disabled={disabled}
      />
    );
  }

  if (field.type === "password") {
    return (
      <PasswordForm
        label={field.label}
        value={value}
        onChange={onChange}
        required={field.required}
        disabled={disabled}
      />
    );
  }

  if (field.type === "checkbox-group") {
    return (
      <CheckboxGroupForm
        label={field.label}
        value={value}
        onChange={onChange}
        required={field.required}
        options={field.options}
        disabled={disabled}
      />
    );
  }

  return null;
}
