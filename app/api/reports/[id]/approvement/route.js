import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";

export async function PUT(req, context) {
  // const session = await getServerSession(authOptions);
  // if (!session || !["ADM"].includes(session?.user?.roleCode)) {
  //   return NextResponse.json({ status: "error", statusCode: 403, message: "Forbidden: Admin or Investor access required" }, { status: 403 });
  // }
  try {
    const body = await req.json();

    const { id } = await context.params;
    const { status, type } = body;

    if (!id) {
      throw new Error("Report ID is required");
    }

    if (!status) {
      throw new Error("Status is required");
    }

    // cari statusId dari code
    const statusData = await prisma.report_status.findUnique({
      where: {
        code: status,
      },
    });

    if (!statusData) {
      return NextResponse.json(
        {
          status: "error",
          message: "Status tidak ditemukan",
        },
        { status: 404 },
      );
    }

    let report;
    switch (type) {
      case "micro_climate":
        report = await prisma.report_micro_climate.update({
          where: {
            id: Number(id),
          },
          data: {
            statusId: statusData.id,
          },
        });
        break;
      case "nutrition_usage":
        report = await prisma.report_nutrition_usage.update({
          where: {
            id: Number(id),
          },
          data: {
            statusId: statusData.id,
          },
        });
        break;
      case "death_plant_vegetative":
        report = await prisma.report_death_plant_vegetative.update({
          where: {
            id: Number(id),
          },
          data: {
            statusId: statusData.id,
          },
        });
        break;
      case "death_plant_generative":
        report = await prisma.report_death_plant_generative.update({
          where: {
            id: Number(id),
          },
          data: {
            statusId: statusData.id,
          },
        });
        break;
      default:
        return NextResponse.json(
          {
            status: "error",
            message: "Report type not found",
          },
          { status: 404 },
        );
    }

    return NextResponse.json({
      status: "success",
      data: report,
      message: "Report updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Failed to update report",
      },
      { status: 500 },
    );
  }
}
