import React from "react";

export function TitleSection({ title }) {
  return (
    <section className="">
      <h1 className="text-[34px] font-semibold tracking-tight text-primary-font">
        {title}
      </h1>
      <div className="mt-4 h-px w-full bg-black/10" />
    </section>
  );
}
