"use client";

import React, { useMemo, useState } from "react";
import Header from "../fragments/Header";
import { TitleSection } from "../fragments/Text";
import LayoutWithSidebar from "./LayoutWithSidebar";
import { GeneralCard } from "../fragments/Cards";
import { ADMIN_TABS, ROLES_FILTER } from "@/app/constants/filters";
import { GeneralButton, StatusPill, TabsButton } from "../elements/Button";
import { SelectOptions } from "../elements/Filters";
import FormField from "../elements/Form";
import { UPDATE_USER_FORM } from "@/app/constants/forms";
import { USERS_DUMMY } from "@/app/constants/dummy";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import AvatarMini from "../elements/AvatarMini";

export default function AdminProduction() {
  const [activeTab, setActiveTab] = useState("klapanunggal");
  const activeLocation = ADMIN_TABS.find((tab) => tab.key === activeTab)?.label;
  const [role, setRole] = useState("all");

  const [selectedUser, setSelectedUser] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [rows, setRows] = useState(USERS_DUMMY);

  const handlePickUser = (row) => {
    setSelectedUser(row);
    setFormValues({
      name: row.name ?? "",
      email: row.email ?? "",
      role: row.role ?? "",
      password: row.password ?? "",
    });
  };

  return (
    <>
      {/* Content */}
      <TitleSection title="Kelola Wilayah Area" />

      {/* NOTE: GREENHOUSE INFO LINE */}
      <section className="">
        <p className="text-[18px] text-secondary-font">
          Greenhouse <span className="font-semibold">{activeLocation}</span>
        </p>
      </section>

      <LayoutWithSidebar
        primary={
          <>
            <TabsButton
              tabs={ADMIN_TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <GeneralCard
              title="Informasi Status Karyawan"
              className="flex flex-col gap-y-6"
            >
              <div className="flex w-full justify-between flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <div className="sm:w-auto">
                  <SelectOptions
                    defaultValue="all"
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                    options={ROLES_FILTER}
                  />
                </div>
                <div className="w-full lg:w-auto">
                  <GeneralButton
                    label="Filter"
                    className="w-full lg:w-auto sm:max-w-[150px] mx-auto"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                {rows
                  .filter((row) => row.locationId === activeTab)
                  .filter((row) => (role === "all" ? row : row.role === role))
                  .map((row) => (
                    <div
                      key={row.email}
                      onClick={() => handlePickUser(row)}
                      className={`border-y border-border grid grid-cols-12 items-center gap-0 px-4 py-4 text-sm cursor-pointer hover:bg-black/5 ${
                        selectedUser?.email === row.email
                          ? "bg-black/5 cursor-pointer"
                          : ""
                      }`}
                    >
                      <div className="col-span-6 flex items-center gap-3">
                        <AvatarMini name="Siti Nuraisyah Gunawan" />
                        <div className="min-w-0">
                          <div className="font-semibold">{row.name}</div>
                          <div className="truncate text-xs">{row.email}</div>
                        </div>
                      </div>

                      <div className="col-span-5">
                        <div className="font-semibold">{row.role}</div>
                        <div className="text-xs">{row.roleSub}</div>
                      </div>

                      <div className="col-span-1 items-end">
                        <FaRegEdit />
                      </div>
                    </div>
                  ))}
              </div>
            </GeneralCard>

            <GeneralCard
              title="Edit Pengelola"
              className="flex flex-col gap-y-6"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!selectedUser) return; // block update kalau belum pilih user

                  setRows((prev) =>
                    prev.map((u) =>
                      u.id === selectedUser.id ? { ...u, ...formValues } : u,
                    ),
                  );
                }}
                className="mt-5 space-y-4"
              >
                {UPDATE_USER_FORM.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={formValues[field.name] ?? ""}
                    disabled={!selectedUser}
                    onChange={(val) =>
                      setFormValues((prev) => ({ ...prev, [field.name]: val }))
                    }
                  />
                ))}

                {/* NOTE: SUBMIT BUTTON */}
                <div className="pt-2 flex gap-x-2 justify-end">
                  <GeneralButton
                    type="submit"
                    label="Batal"
                    className="bg-muted hover:bg-muted"
                    onClick={() => {}}
                  />
                  <GeneralButton
                    type="submit"
                    label="Kirim Laporan"
                    onClick={() => {}}
                  />
                </div>
              </form>
            </GeneralCard>
          </>
        }
        aside={
          <>
            <GeneralCard>
              <h3 className="text-base font-semibold text-secondary-font">
                Informasi Area {activeLocation}
              </h3>

              <div className="mt-4 flex items-center gap-3">
                <AvatarMini name="Aji Setiawan" />
                <div>
                  <p className="text-sm font-semibold text-primary-font">Aji</p>
                  <p className="text-xs text-primary-font/60">Admin</p>
                </div>
              </div>

              <div className="mt-4 space-y-3 rounded-lg border border-black/10 bg-white p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-font/70">Jumlah Grower</span>
                  <span className="font-medium text-primary-font">5</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-font/70">
                    Jumlah Water Expert
                  </span>
                  <span className="font-medium text-primary-font">1</span>
                </div>

                <div className="flex flex-col gap-y-2">
                  <span className="text-primary-font/70 font-bold text-sm">
                    Field Assistant
                  </span>
                  <div className="rounded-md border border-border bg-primary-soft p-3">
                    <div className="flex items-center gap-3">
                      <AvatarMini name="Budi" />
                      <div className="min-w-0">
                        <div className="font-semibold text-text-primary">
                          Budi
                        </div>
                        <div className="truncate text-xs text-text-primary">
                          budi@gmail.com
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-2 text-sm font-bold text-[var(--color-text-primary)]/75">
                  Total Grower & Water Assistant
                </div>

                <div className="mt-4 space-y-3">
                  <GeneralButton icon={<FaPlus />} label="Tambah GR / WE" />
                </div>
              </div>
            </GeneralCard>
          </>
        }
      />
    </>
  );
}
