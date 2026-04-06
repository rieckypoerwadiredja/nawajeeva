"use client";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export function GeneralButton({
  label,
  onClick,
  icon = null,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={(e) => onClick?.(e)}
      className={[
        "inline-flex flex gap-x-1 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold",
        "bg-button-secondary-bg text-button-secondary-text shadow-soft",
        "cursor-pointer transition hover:bg-button-secondary-hover focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]",
        className,
      ].join(" ")}
    >
      {icon && icon}
      {label}
    </button>
  );
}

export function DropdownButton({
  onSelect,
  options,
  value,
  className = "",
  classNameIcon = "",
}) {
  const STATUS_COLOR = {
    submitted: "bg-submitted",
    approved: "bg-approved",
    rejected: "bg-rejected",
    revised: "bg-revised",
  };
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onSelect && onSelect(e.target.value)}
        className={[
          "appearance-none",
          "rounded-md px-2 py-1 pr-6",
          "text-white text-sm font-semibold",
          "shadow-soft cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]",
          STATUS_COLOR[value],
          className,
        ].join(" ")}
      >
        {options.map((option) => (
          <option
            key={option.key}
            value={option.key}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      <RiArrowDownSLine
        className={`pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-white ${classNameIcon}`}
      />
    </div>
  );
}

export function TabsButton({ tabs, activeTab, setActiveTab }) {
  return (
    <div
      className={[
        // mobile: full width + no wrap
        "w-full flex flex-col sm:flex-row gap-2 flex-nowrap",
        // desktop: inline dan rapat (tidak wrap)
        "sm:inline-flex sm:flex-nowrap sm:gap-0 sm:flex",
        "overflow-hidden rounded-md bg-background",
      ].join(" ")}
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.id;
        const isFirst = idx === 0;
        const isLast = idx === tabs.length - 1;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={[
              "flex-1",
              "cursor-pointer px-5 py-2 text-sm font-semibold transition",
              "rounded-t-md focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]",
              "min-h-12", // memastikan tinggi tombol konsisten (misalnya 3rem)
              " items-stretch", // Menjaga tombol meluas agar setinggi elemen lain
              !isLast ? "border-tr border-border sm:mx-2" : "",
              isFirst ? "sm:rounded-tl-md mx-0! sm:mr-2!" : "",
              isLast ? "sm:rounded-tr-md mx-0! sm:ml-2!" : "",
              isActive
                ? "bg-primary text-white"
                : "bg-background text-text-third border-b-2 border-b-secondary hover:text-text-secondary hover:border-primary hover:bg-secondary-background",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function StatusPill({ text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-xs font-semibold text-secondary">
      {text}
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md text-secondary">
        <FaCheck />
      </span>
    </span>
  );
}
