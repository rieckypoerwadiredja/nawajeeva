import AddReport from "@/app/components/layouts/AddReport";
import { prisma } from "@/app/utils/prisma";
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
    const brandsData = await prisma.nutrition_brand.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        type: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
      },
    });

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

    return <AddReport data={{ brands: brandsData, user: user }} />;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
