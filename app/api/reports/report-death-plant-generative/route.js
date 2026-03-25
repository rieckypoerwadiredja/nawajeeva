import { prisma } from "@/app/utils/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function POST(req) {
  // const session = await getServerSession(authOptions);
  // if (!session || !["GR", "WE", "FA"].includes(session?.user?.roleCode)) {
  //   return NextResponse.json({ status: "error", statusCode: 403, message: "Forbidden: Staff access required" }, { status: 403 });
  // }

  try {
    const body = await req.json();
    console.log(body);

    // validate required fields
    if (
      !body.location ||
      !body.greenhouse ||
      !body.createdBy ||
      !body.title ||
      !body.reason ||
      body.fruitWeightGram === undefined
    ) {
      return NextResponse.json({
        status: "error",
        statusCode: 400,
        message: "All fields are required",
        data: null,
      });
    }

    // get status id "submitted"
    const status = await prisma.report_status.findFirst({
      where: {
        name: "submitted",
      },
    });

    if (!status) {
      throw new Error("Status 'submitted' not found");
    }

    // create report (fruitWeight stored as Float in DB)
    await prisma.report_death_plant_generative.create({
      data: {
        date: body.reportDate ? new Date(body.reportDate) : null,
        locationId: parseInt(body.location),
        greenhouseId: parseInt(body.greenhouse),
        createdById: parseInt(body.createdBy),
        title: body.title,
        reason: body.reason,
        fruitWeight: parseFloat(body.fruitWeightGram),
        note: body.note || null,
        photo: body.photo || null,
        statusId: parseInt(status.id),
      },
    });

    const response = {
      status: "success",
      statusCode: 200,
      data: null,
      message: "Report created successfully",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    const response = {
      status: "error",
      statusCode: 500,
      data: null,
      message: error.message || "Failed to create report",
    };
    return NextResponse.json(response);
  }
}
