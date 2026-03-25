// pages/api/reports/index.js

import { prisma } from "@/app/utils/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function GET(req) {
  // const session = await getServerSession(authOptions);
  // if (!session || !["ADM", "IVT"].includes(session?.user?.roleCode)) {
  //   return NextResponse.json({ status: "error", statusCode: 403, message: "Forbidden: Admin or Investor access required" }, { status: 403 });
  // }

  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const locationCode = searchParams.get("location") || "all";
    const statusCode = searchParams.get("status") || "all";
    const greenhouseCode = searchParams.get("greenhouse") || "all";

    const today = new Date().toISOString().split("T")[0];

    const start = startDate || today;
    const end = endDate || today;

    if (new Date(start) > new Date(end)) {
      return NextResponse.json({
        status: "error",
        statusCode: 400,
        message: "Start date tidak boleh lebih besar dari end date",
        data: null,
      });
    }

    // console.log(locationCode, statusCode, greenhouseCode);

    const baseWhere = {
      date: {
        gte: new Date(start),
        lte: new Date(end),
      },

      ...(locationCode !== "all" && {
        location: {
          code: locationCode,
        },
      }),
      ...(greenhouseCode !== "all" && {
        greenhouse: {
          code: greenhouseCode,
        },
      }),
      ...(statusCode !== "all" && {
        status: {
          code: statusCode,
        },
      }),
    };
    // get all reports
    const deathPlantVegetativeReports =
      await prisma.report_death_plant_vegetative.findMany({
        where: baseWhere,
        select: {
          id: true,
          date: true,
          createdAt: true,
          updatedAt: true,
          status: true,
          title: true,
          reason: true,
          deadPlantCount: true,
          status: true,
          photo: true,
          note: true,
          location: {
            select: {
              name: true,
              code: true,
            },
          },
          greenhouse: {
            select: {
              name: true,
              code: true,
            },
          },
          createdBy: {
            select: {
              name: true,
            },
          },
          approvedBy: {
            select: {
              name: true,
            },
          },
        },
      });
    const deathPlantGenerativeReports =
      await prisma.report_death_plant_generative.findMany({
        where: baseWhere,
        select: {
          id: true,
          date: true,
          createdAt: true,
          updatedAt: true,
          status: true,
          title: true,
          reason: true,
          fruitWeight: true,
          photo: true,
          note: true,
          location: {
            select: {
              name: true,
              code: true,
            },
          },
          greenhouse: {
            select: {
              name: true,
              code: true,
            },
          },
          createdBy: {
            select: {
              name: true,
            },
          },
          approvedBy: {
            select: {
              name: true,
            },
          },
        },
      });
    const nutritionUsageReports = await prisma.report_nutrition_usage.findMany({
      where: baseWhere,
      select: {
        id: true,
        date: true,
        createdAt: true,
        updatedAt: true,
        quantity: true,
        note: true,
        brand: {
          select: {
            name: true,
            type: {
              select: {
                code: true,
                name: true,
              },
            },
          },
        },
        status: {
          select: {
            code: true,
            name: true,
          },
        },

        location: {
          select: {
            name: true,
            code: true,
          },
        },

        greenhouse: {
          select: {
            name: true,
            code: true,
          },
        },

        createdBy: {
          select: {
            name: true,
          },
        },

        approvedBy: {
          select: {
            name: true,
          },
        },
      },
    });
    const microClimateReports = await prisma.report_micro_climate.findMany({
      where: baseWhere,
      select: {
        id: true,
        date: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        temperature: true,
        humidity: true,
        light: true,
        note: true,
        location: {
          select: {
            name: true,
            code: true,
          },
        },
        greenhouse: {
          select: {
            name: true,
            code: true,
          },
        },
        createdBy: {
          select: {
            name: true,
          },
        },
        approvedBy: {
          select: {
            name: true,
          },
        },
      },
    });

    const greenhouses = await prisma.greenhouse.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    console.log(locations);
    const status = await prisma.report_status.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    // Gabungkan semua laporan ke dalam satu data
    const allReports = {
      deathPlantVegetative: deathPlantVegetativeReports,
      deathPlantGenerative: deathPlantGenerativeReports,
      nutritionUsage: nutritionUsageReports,
      microClimate: microClimateReports,
      filters: {
        greenhouse: greenhouses,
        location: locations,
        status: status,
      },
    };

    const response = {
      status: "success",
      statusCode: 200,
      data: allReports,
      message: "Reports fetched successfully",
    };
    // Kirim response sukses
    return NextResponse.json(response);
  } catch (error) {
    // Tangani error jika terjadi
    console.error(error);
    const response = {
      status: "error",
      statusCode: 500,
      data: null,
      message: error.message || "Failed to fetch reports",
    };
    return NextResponse.json(response);
  }
}
