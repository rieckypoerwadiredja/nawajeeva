"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ApproveButton } from "../elements/Button";
import AvatarMini from "../elements/AvatarMini";
import { RiCloseLine } from "react-icons/ri";

export function GeneralCard({ title, className, children }) {
  return (
    <div
      className={`p-6 sm:p-7 mt-6 rounded-xl border border-black/10 bg-secondary-background shadow-[0_8px_24px_rgba(0,0,0,0.08)] ${className}`}
    >
      {title && (
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[22px] font-semibold text-secondary-font">
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}
export function ReportCard({ data }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  return (
    <GeneralCard className="relative">
      {/* Approve button */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
        <ApproveButton
          isApproved={data.approved.status}
          onApproved={(status) => {
            console.log("status", status);
          }}
        />
      </div>

      {/* Header */}
      <div className="pr-14 sm:pr-16 flex items-center gap-x-3">
        <AvatarMini name={data.reportedBy} size={40} />
        <div>
          <div className="text-base sm:text-xl font-semibold text-primary break-words">
            Greenhouse ID: {data.greenhouseId} - {data.location}
          </div>

          <div className="mt-1 text-xs sm:text-sm text-muted break-words">
            Reported by: {data.reportedBy} ({data.reportedTitle}), Time:{" "}
            {data.time}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <div className="font-semibold text-sm sm:text-base text-color-text-third break-words">
          {data.reportTitle}: {data.reportContent}
        </div>

        {/* Image Area */}
        <div className="mt-3">
          {data.image ? (
            <>
              <div
                onClick={() => setPreviewOpen(true)}
                className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[340px] aspect-square overflow-hidden rounded-lg border border-color-border shadow-sm cursor-pointer hover:bg-color-secondary-soft transition"
              >
                <Image
                  src={data.image}
                  alt="Report Image"
                  fill
                  sizes="340px"
                  className="object-cover"
                />
              </div>

              {/* Preview Modal */}
              {previewOpen && (
                <div
                  className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
                  onClick={() => {
                    setPreviewOpen(false);
                    setZoom(1);
                  }}
                >
                  <div
                    className="relative max-w-full max-h-full overflow-auto bg-surface p-4 rounded-lg shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                    onWheel={(e) => {
                      e.preventDefault();
                      setZoom((prev) =>
                        e.deltaY < 0
                          ? Math.min(prev + 0.2, 3)
                          : Math.max(prev - 0.2, 1),
                      );
                    }}
                  >
                    <Image
                      src={data.image}
                      alt="Preview"
                      width={1200}
                      height={800}
                      className="object-contain transition-transform duration-200"
                      style={{ transform: `scale(${zoom})` }}
                    />

                    <button
                      onClick={() => {
                        setPreviewOpen(false);
                        setZoom(1);
                      }}
                      className="absolute top-3 right-3 bg-color-secondary text-white px-3 py-1 rounded-md text-sm hover:bg-color-secondary-hover transition"
                    >
                      <RiCloseLine className="text-3xl text-black cursor-pointer" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full max-w-[300px] aspect-square rounded-lg border border-dashed border-color-border bg-color-secondary-soft flex items-center justify-center text-sm text-color-text-muted">
              No Image
            </div>
          )}
        </div>

        <div className="mt-3 text-sm sm:text-base text-color-text-primary break-words">
          {data.note}
        </div>
      </div>
    </GeneralCard>
  );
}
