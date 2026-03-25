import { prisma } from "@/app/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await prisma.nutrition_brand.findMany({
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

    return NextResponse.json(
      {
        status: "success",
        statusCode: 200,
        data: brands,
        message: "Brands fetched successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    const response = {
      status: "error",
      statusCode: 500,
      data: null,
      message: error.message || "Failed to fetch brands",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
