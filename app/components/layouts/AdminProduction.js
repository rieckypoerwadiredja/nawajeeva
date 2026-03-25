"use client";

import React, { useState } from "react";
import { TitleSection } from "../fragments/Text";
import LayoutWithSidebar from "./LayoutWithSidebar";
import { GeneralCard } from "../fragments/Cards";
import { ADMIN_TABS, ROLES_FILTER } from "../../constants/filters";
import { GeneralButton, TabsButton } from "../elements/Button";
import { SelectOptions } from "../elements/Filters";
import FormField from "../elements/Form";
import { CREATE_USER_FORM, UPDATE_USER_FORM } from "../../constants/forms";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import AvatarMini from "../elements/AvatarMini";
import useFetch from "@/app/hooks/useFetch";
import { API_BASE_URL } from "@/app/constants/env";
import callApi from "@/app/utils/callApi";
import Message from "../elements/Message";

export default function AdminProduction() {
  const [role, setRole] = useState("all");
  const [activeTab, setActiveTab] = useState("klapanunggal");

  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch({
    url: `${API_BASE_URL}/users?role=${role}&greenhouse=${activeTab}`,
    deps: [activeTab, role],
  });

  const activeLocation = ADMIN_TABS.find((tab) => tab.key === activeTab)?.label;

  // ======== EDIT USER STATE ========
  const [selectedUser, setSelectedUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const initialFormValues = {
    name: "",
    email: "",
    role: "",
    status: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handlePickUser = (user) => {
    setSelectedUser(user);
    setSubmitMessage(null);
    setFormValues({
      name: user.name ?? "",
      email: user.email ?? "",
      role: user.role?.name ?? "",
      status: user.status?.name ?? "",
      password: "",
    });
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setFormValues(initialFormValues);
    setSubmitMessage(null);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const payload = {
        id: selectedUser.id,
        name: formValues.name,
        email: formValues.email,
        role: formValues.role,
        status: formValues.status,
      };

      if (formValues.password && formValues.password.trim() !== "") {
        payload.password = formValues.password;
      }

      const response = await callApi({
        url: `${API_BASE_URL}/users`,
        method: "PUT",
        body: payload,
      });

      if (response.status === "error") {
        throw new Error(response.message || "Gagal mengupdate user");
      }

      setSubmitMessage({ type: "success", text: "User berhasil diperbarui!" });
      await refetch();
      setSelectedUser(null);
      setFormValues(initialFormValues);
    } catch (err) {
      setSubmitMessage({
        type: "error",
        text: err.message || "Gagal mengupdate user",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ======== CREATE USER STATE ========
  const initialCreateFormValues = {
    name: "",
    email: "",
    role: "",
    greenhouses: [],
    password: "",
  };

  const [createFormValues, setCreateFormValues] = useState(
    initialCreateFormValues,
  );
  const [creating, setCreating] = useState(false);
  const [createMessage, setCreateMessage] = useState(null);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateMessage(null);

    try {
      if (
        !createFormValues.name ||
        !createFormValues.email ||
        !createFormValues.password ||
        !createFormValues.role ||
        !createFormValues.greenhouses ||
        createFormValues.greenhouses.length === 0
      ) {
        throw new Error("Semua field wajib diisi");
      }

      const response = await callApi({
        url: `${API_BASE_URL}/users`,
        method: "POST",
        body: {
          name: createFormValues.name,
          email: createFormValues.email,
          password: createFormValues.password,
          role: createFormValues.role,
          greenhouses: createFormValues.greenhouses,
        },
      });

      if (response.status === "error") {
        throw new Error(response.message || "Gagal membuat user");
      }

      setCreateMessage({
        type: "success",
        text: "User baru berhasil ditambahkan!",
      });

      await refetch();
      setCreateFormValues(initialCreateFormValues);
    } catch (err) {
      setCreateMessage({
        type: "error",
        text: err.message || "Gagal membuat user",
      });
    } finally {
      setCreating(false);
    }
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
                    value={role}
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

              <div className="flex flex-col min-h-[50vh]">
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center">Error: {error.message}</p>}
                {users?.map((user) => (
                  <div
                    key={user.email}
                    onClick={() => handlePickUser(user)}
                    className={`w-full border-y border-border grid grid-cols-12 items-center gap-0 px-4 py-4 text-sm cursor-pointer hover:bg-black/5 ${
                      selectedUser?.email === user.email
                        ? "bg-black/5 cursor-pointer"
                        : ""
                    }`}
                  >
                    <div className="col-span-5 flex items-center gap-3">
                      <AvatarMini name={user.name} />
                      <div className="min-w-0">
                        <div className="font-semibold">{user.name}</div>
                        <div className="truncate text-xs">{user.email}</div>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <div className="font-semibold">{user.role.name}</div>
                      <div className="text-xs max-w-[200px] break-words">
                        {user.greenhouse_access
                          .map((greenhouse) => greenhouse.greenhouse.name)
                          .join(", ")}
                      </div>
                    </div>
                    <div className="col-span-3">{user.status.name}</div>

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
              {/* Status message */}
              {submitMessage && (
                <Message success={submitMessage.type === "success"}>
                  {submitMessage.text}
                </Message>
              )}

              {!selectedUser && (
                <p className="text-sm text-primary-font/50 italic">
                  Pilih user dari daftar di atas untuk mengedit data.
                </p>
              )}

              <form onSubmit={handleUpdateUser} className="mt-5 space-y-4">
                {UPDATE_USER_FORM.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={formValues[field.name] ?? ""}
                    disabled={!selectedUser || submitting}
                    onChange={(val) =>
                      setFormValues((prev) => ({ ...prev, [field.name]: val }))
                    }
                  />
                ))}

                {/* NOTE: SUBMIT BUTTON */}
                <div className="pt-2 flex gap-x-2 justify-end">
                  <GeneralButton
                    type="button"
                    label="Batal"
                    className="bg-muted hover:bg-muted"
                    onClick={handleCancel}
                    disabled={!selectedUser || submitting}
                  />
                  <GeneralButton
                    type="submit"
                    label={submitting ? "Menyimpan..." : "Simpan Perubahan"}
                    disabled={!selectedUser || submitting}
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

                <div className="mb-2 text-sm font-bold text-text-primary">
                  Total Grower & Water Assistant
                </div>
              </div>
            </GeneralCard>

            {/* CREATE USER FORM */}
            <GeneralCard
              title="Tambah User Baru"
              className="flex flex-col gap-y-4"
            >
              {/* Create status message */}
              {createMessage && (
                <Message success={createMessage.type === "success"}>
                  {createMessage.text}
                </Message>
              )}

              <form onSubmit={handleCreateUser} className="space-y-4">
                {CREATE_USER_FORM.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={createFormValues[field.name] ?? ""}
                    disabled={creating}
                    onChange={(val) =>
                      setCreateFormValues((prev) => ({
                        ...prev,
                        [field.name]: val,
                      }))
                    }
                  />
                ))}
                <div className="pt-2">
                  <GeneralButton
                    type="submit"
                    icon={<FaPlus />}
                    label={creating ? "Menyimpan..." : "Tambah User"}
                    disabled={creating}
                  />
                </div>
              </form>
            </GeneralCard>
          </>
        }
      />
    </>
  );
}
