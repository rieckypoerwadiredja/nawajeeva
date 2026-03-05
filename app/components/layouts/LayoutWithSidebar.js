import React from "react";

function LayoutWithSidebar({
  className,
  primary,
  customPrimary,
  aside,
  customAside,
}) {
  return (
    <section className={`${className}`}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        {/* NOTE: LEFT - FORM CARD */}
        <div className={`${customPrimary}`}>{primary}</div>

        {/* NOTE: RIGHT - SIDEBAR */}
        <aside className={`${customAside}`}>{aside}</aside>
      </div>
    </section>
  );
}

export default LayoutWithSidebar;
