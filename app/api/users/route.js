import bcrypt from "bcrypt";
import { prisma } from "@/app/utils/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function GET(req) {
  // const session = await getServerSession(authOptions);
  // if (!session || session?.user?.roleCode !== "ADM") {
  //   return NextResponse.json({ status: "error", statusCode: 403, message: "Forbidden: Admin access required" }, { status: 403 });
  // }

  try {
    const { searchParams } = new URL(req.url);

    const role = searchParams.get("role");
    console.log(role);
    const greenhouse = searchParams.get("greenhouse");

    // find id role if not "all"
    let roleId = null;
    if (role !== "all") {
      roleId = await prisma.role.findFirst({
        where: {
          name: role,
        },
      });
    }

    // find id greenhouse if not "all"
    let greenhouseId = null;
    if (greenhouse !== "all") {
      greenhouseId = await prisma.greenhouse.findFirst({
        where: {
          name: greenhouse,
        },
      });
    }

    const where = {
      ...(role !== "all" && {
        role: {
          id: roleId.id,
        },
      }),

      ...(greenhouse !== "all" && {
        greenhouse_access: {
          some: {
            greenhouse: {
              id: greenhouseId.id,
            },
          },
        },
      }),
    };

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        code: true,
        email: true,
        name: true,

        role: {
          select: {
            id: true,
            name: true,
          },
        },

        status: {
          select: {
            id: true,
            name: true,
          },
        },

        greenhouse_access: {
          select: {
            id: true,
            greenhouse: {
              select: {
                id: true,
                name: true,
                location: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        status: "success",
        statusCode: 200,
        message: "Users fetched successfully",
        data: users,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: error.message || "Failed to fetch users",
        data: null,
      },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  // const session = await getServerSession(authOptions);
  // if (!session || session?.user?.roleCode !== "ADM") {
  //   return NextResponse.json({ status: "error", statusCode: 403, message: "Forbidden: Admin access required" }, { status: 403 });
  // }

  try {
    const body = await req.json();

    if (!body.email || !body.password || !body.name || !body.role) {
      throw new Error("Nama, email, password, dan role wajib diisi");
    }

    if (
      !body.greenhouses ||
      !Array.isArray(body.greenhouses) ||
      body.greenhouses.length === 0
    ) {
      throw new Error("Minimal pilih satu greenhouse");
    }

    // Resolve role name to role ID
    const role = await prisma.role.findFirst({
      where: { name: body.role },
    });
    if (!role) {
      throw new Error(`Role '${body.role}' tidak ditemukan`);
    }

    // Resolve greenhouse names to greenhouse records (with location)
    const greenhouses = await prisma.greenhouse.findMany({
      where: {
        name: { in: body.greenhouses, mode: "insensitive" },
      },
      include: {
        location: true,
      },
    });

    if (greenhouses.length === 0) {
      throw new Error("Greenhouse tidak ditemukan");
    }

    // Auto-generate unique user code
    // Format: {ROLE_CODE}-{GREENHOUSE_CODES}-{LOCATION_CODES}-{TIMESTAMP}
    // Example: GR-KPGL:LIDO-BDG:BGR-240324173500
    const roleCode = role.code.toUpperCase();
    const greenhouseCodes = greenhouses
      .map((gh) => gh.code.toUpperCase())
      .join(":");
    const locationCodes = [
      ...new Set(greenhouses.map((gh) => gh.location.code.toUpperCase())),
    ].join(":");
    const now = new Date();
    const timestamp =
      String(now.getFullYear()).slice(-2) +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");
    const code =
      body.code ||
      `${roleCode}-${greenhouseCodes}-${locationCodes}-${timestamp}`;

    // Default statusId to 1 (active) if not provided
    const statusId = body.statusId ? parseInt(body.statusId) : 1;

    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create user + greenhouse_access in a transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          code,
          email: body.email,
          password: hashedPassword,
          name: body.name,
          roleId: role.id,
          statusId,
        },
      });

      // Create greenhouse_access records
      await tx.greenhouse_access.createMany({
        data: greenhouses.map((gh) => ({
          userId: newUser.id,
          greenhouseId: gh.id,
        })),
      });

      return newUser;
    });

    return NextResponse.json(
      {
        status: "success",
        statusCode: 201,
        message: "User created successfully",
        data: user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          status: "error",
          statusCode: 400,
          message: `Duplicate field: ${error.meta?.target?.join(", ")}`,
          data: null,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: error.message || "Failed to create user",
        data: null,
      },
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  // const session = await getServerSession(authOptions);
  // if (!session || session?.user?.roleCode !== "ADM") {
  //   return NextResponse.json({ status: "error", statusCode: 403, message: "Forbidden: Admin access required" }, { status: 403 });
  // }

  try {
    const body = await req.json();

    if (!body.id) {
      throw new Error("User ID is required");
    }

    // Build update data, only include fields that are provided
    const updateData = {};
    if (body.name) updateData.name = body.name;
    if (body.email) updateData.email = body.email;
    if (body.code) updateData.code = body.code;

    // Resolve status name to status ID
    if (body.status) {
      const status = await prisma.employee_status.findFirst({
        where: { name: body.status },
      });
      if (!status) {
        throw new Error(`Status '${body.status}' tidak ditemukan`);
      }
      updateData.statusId = status.id;
    }

    // Resolve role name to role ID
    if (body.role) {
      const role = await prisma.role.findFirst({
        where: { name: body.role },
      });
      if (!role) {
        throw new Error(`Role '${body.role}' tidak ditemukan`);
      }
      updateData.roleId = role.id;
    }

    // Hash password if provided
    if (body.password && body.password.trim() !== "") {
      updateData.password = await bcrypt.hash(body.password, 10);
    }

    const user = await prisma.user.update({
      where: {
        id: parseInt(body.id),
      },
      data: updateData,
    });

    return NextResponse.json(
      {
        status: "success",
        statusCode: 200,
        message: "User updated successfully",
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          status: "error",
          statusCode: 400,
          message: `Duplicate field: ${error.meta?.target?.join(", ")}`,
          data: null,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        status: "error",
        statusCode: 500,
        message: error.message || "Failed to update user",
        data: null,
      },
      { status: 500 },
    );
  }
}
