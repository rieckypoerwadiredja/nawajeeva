"use client";
import { formatIDRThousands } from "@/app/utils/number";
import React, { useState, useMemo, useRef } from "react";
import { FaLock } from "react-icons/fa";
import { FiUpload, FiX } from "react-icons/fi";

export function SelectOptionsForm({ label, value, required = false, options }) {
  return (
    <div>
      <div className="mb-2">
        {label} {required && <span className="text-cancel">*</span>}
      </div>
      <div className="rounded-lg border border-black/10 bg-white px-4 py-3 shadow-sm">
        <select
          required={required}
          value={value}
          className={` w-full rounded px-2 py-1 cursor-pointer outline-0`}
        >
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

export function PasswordForm({ label, value, required = false }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold text-primary-font">
        {label}
        {required && <span className="text-cancel">*</span>}
      </div>
      <div className="flex items-center justify-between rounded-md border border-[var(--color-border)] bg-white/60 px-3 py-2 text-sm text-[var(--color-text-primary)]/75 shadow-[var(--shadow-soft)]">
        <span>{value}</span>
        <span className="text-primary-font">
          <FaLock />
        </span>
      </div>
    </div>
  );
}

export function TextAreaForm({ label, value, placeholder, required = false }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary-font">
        {label} {required ? <span className="text-unapproved">*</span> : null}
      </label>
      <textarea
        required={required}
        rows={4}
        value={value}
        className="w-full resize-none rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-primary-font shadow-sm outline-none placeholder:text-primary-font/40 focus:border-primary/40"
        placeholder={placeholder}
      />
    </div>
  );
}

export function TextForm({ label, value, placeholder, required = false }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary-font">
        {label} {required ? <span className="text-unapproved">*</span> : null}
      </label>
      <input
        value={value}
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
  rightAddon, // contoh: "gram" | "Kg" | "Rp"
  format = "plain", // "plain" | "thousand"
  value, // optional (controlled) -> digit string, ex: "1000000"
  onValueChange, // optional (controlled)
  name, // optional, untuk form submit
}) {
  const [inner, setInner] = useState("");

  const isControlled =
    value !== undefined && typeof onValueChange === "function";
  const raw = isControlled ? String(value ?? "") : inner; // simpan digit-only

  const display = useMemo(() => {
    if (format !== "thousand") return raw; // plain: 1000000
    return formatIDRThousands(raw); // thousand: 1.000.000
  }, [raw, format]);

  const handleChange = (e) => {
    if (format === "thousand") {
      // ambil digit saja biar aman
      const digitsOnly = e.target.value.replace(/\D/g, "");
      if (isControlled) onValueChange(digitsOnly);
      else setInner(digitsOnly);
    } else {
      // plain: boleh ketik angka normal, tapi kita tetap amankan ke digit-only
      const digitsOnly = e.target.value.replace(/\D/g, "");
      if (isControlled) onValueChange(digitsOnly);
      else setInner(digitsOnly);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary-font">
        {label} {required ? <span className="text-unapproved">*</span> : null}
      </label>

      <div className="relative">
        <input
          required={required}
          // untuk thousand harus text supaya bisa tampil titik
          type={format === "thousand" ? "text" : "text"}
          inputMode="numeric"
          value={display}
          // onChange={handleChange}
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

        {/* nilai mentah untuk submit form (digit-only) */}
        {name ? <input type="hidden" name={name} value={raw} /> : null}
      </div>
    </div>
  );
}

export function SelectDateForm({ label, required = false, customeDate }) {
  return (
    <div>
      {/* NOTE: FIELD - Date */}
      <div className="mb-2">
        {label} {required ? <span className="text-unapproved">*</span> : null}
      </div>
      <div className="rounded-lg border border-black/10 bg-white px-4 py-3 shadow-sm">
        <input
          required={required}
          type="date"
          className={`w-full rounded px-2 py-1 cursor-pointer outline-0 ${customeDate}`}
        />
      </div>
    </div>
  );
}

export function UploadFileForm({ label, required }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

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
    inputRef.current.value = "";
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary-font">
        {label} {required && <span className="text-unapproved">*</span>}
      </label>

      <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
        {/* Hidden Input */}
        <input
          type="file"
          ref={inputRef}
          // onChange={handleChange}
          className="hidden"
        />

        {/* Preview Area */}
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
              className="absolute -top-2 -right-2 rounded-full bg-cancel p-1 text-white cursor-pointer shadow hover:bg-cancel"
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
              className="text-cancel cursor-pointer hover:text-cancel"
            >
              <FiX size={16} />
            </button>
          </div>
        )}

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="flex cursor-pointer items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white transition hover:bg-secondary/90"
        >
          <FiUpload size={16} />
          Upload File
        </button>
      </div>
    </div>
  );
}

export default function FormField({ field, value, onChange }) {
  if (field.type === "date") {
    return <SelectDateForm label={field.label} required={field.required} />;
  }

  if (field.type === "text") {
    return (
      <TextForm
        label={field.label}
        value={value}
        onChange={onChange}
        required={field.required}
        placeholder={field.placeholder}
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
      />
    );
  }

  if (field.type === "upload") {
    return <UploadFileForm label={field.label} required={field.required} />;
  }

  if (field.type === "textarea") {
    return (
      <TextAreaForm
        label={field.label}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        required={field.required}
      />
    );
  }

  if (field.type === "password") {
    return (
      <PasswordForm
        label={field.label}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        required={field.required}
      />
    );
  }

  return null;
}
