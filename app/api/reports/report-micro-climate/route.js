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
      !body.reportDate ||
      body.temperature === undefined ||
      body.humidity === undefined ||
      body.light === undefined
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

    // create report
    await prisma.report_micro_climate.create({
      data: {
        date: new Date(body.reportDate),
        locationId: parseInt(body.location),
        greenhouseId: parseInt(body.greenhouse),
        createdById: parseInt(body.createdBy),
        temperature: parseFloat(body.temperature),
        humidity: parseFloat(body.humidity),
        light: parseFloat(body.light),
        statusId: parseInt(status.id),
        note: body.note || null,
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
