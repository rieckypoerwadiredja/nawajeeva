import React from "react";
import KpiProduction from "@/app/components/layouts/KpiProduction";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function page() {
  // const session = await getServerSession(authOptions);

  // if (!session || !["ADM", "IVT"].includes(session?.user?.roleCode)) {
  //   return (
  //     <div className="flex justify-center items-center h-full min-h-[50vh]">
  //       <p className="text-xl font-semibold text-text-primary text-center">
  //         Maaf, Anda tidak memiliki akses ke halaman ini.<br/>
  //         <span className="text-sm font-normal">(Notes: Jika Anda baru saja berganti role, harap Sign Out dan Sign In kembali)</span>
  //       </p>
  //     </div>
  //   );
  // }

  return <KpiProduction />;
}
