import AddReport from "@/app/components/layouts/AddReport";
import { API_BASE_URL } from "@/app/constants/env";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function page() {
  // const session = await getServerSession(authOptions);

  // if (!session || !["GR", "WE", "FA"].includes(session?.user?.roleCode)) {
  //   return (
  //     <div className="flex justify-center items-center h-full min-h-[50vh]">
  //       <p className="text-xl font-semibold text-text-primary text-center">
  //         Maaf, Anda tidak memiliki akses ke halaman ini.<br/>
  //         <span className="text-sm font-normal">(Notes: Jika Anda baru saja berganti role, harap Sign Out dan Sign In kembali)</span>
  //       </p>
  //     </div>
  //   );
  // }

  try {
    const resBrand = await fetch(`${API_BASE_URL}/brands`);
    const brands = await resBrand.json();

    const user = {
      id: 1,
      code: "GR-IDM-BD-3213",
      name: "Budi Darmawan",
      email: "budi@gmail.com",
      role: {
        name: "Grower",
        code: "GR",
      },
      greenhouse: {
        id: 1,
        name: "Indramayu",
        code: "IDMY",
      },
      location: {
        id: 1,
        name: "bandung",
        code: "BDG",
      },
    };

    if (brands.status !== "success") {
      throw new Error(brands.message);
    }

    return <AddReport data={{ brands: brands.data, user: user }} />;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
