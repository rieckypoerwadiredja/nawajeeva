import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const FIXED_DATE = new Date("2026-03-15T10:00:00+07:00");

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  // reset data tabel yang terkait
  await prisma.report_micro_climate.deleteMany();
  await prisma.report_death_plant_vegetative.deleteMany();
  await prisma.report_death_plant_generative.deleteMany();
  await prisma.report_nutrition_usage.deleteMany();
  await prisma.greenhouse_access.deleteMany();
  await prisma.user.deleteMany();
  await prisma.nutrition_brand.deleteMany();
  await prisma.greenhouse.deleteMany();
  await prisma.location.deleteMany();
  await prisma.role.deleteMany();

  /*
  =========================
  EMPLOYEE STATUS
  =========================
  */

  await prisma.employee_status.createMany({
    data: [
      {
        code: "active",
        name: "active",
      },
      {
        code: "on_leave",
        name: "on leave",
      },
      {
        code: "resigned",
        name: "resigned",
      },
    ],
    skipDuplicates: true,
  });

  /*
  =========================
  REPORT STATUS
  =========================
  */

  await prisma.report_status.createMany({
    data: [
      {
        code: "submitted",
        name: "submitted",
      },
      {
        code: "approved",
        name: "approved",
      },
      {
        code: "rejected",
        name: "rejected",
      },
      {
        code: "revised",
        name: "revised",
      },
    ],
    skipDuplicates: true,
  });

  /*
  =========================
  NUTRITION TYPE
  =========================
  */

  await prisma.nutrition_type.createMany({
    data: [
      {
        code: "solid",
        name: "solid",
      },
      {
        code: "liquid",
        name: "liquid",
      },
    ],
    skipDuplicates: true,
  });

  // 1. role
  const roles = await prisma.role.createMany({
    data: [
      {
        code: "GR",
        name: "grower",
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
      {
        code: "WE",
        name: "water expert",
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
      {
        code: "FA",
        name: "field assistant",
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
      {
        code: "ADM",
        name: "admin",
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
      {
        code: "IVT",
        name: "investor",
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
    ],
  });

  const employeeStatusRows = await prisma.employee_status.findMany();
  const employeeStatusMap: any = {};
  for (const s of employeeStatusRows) {
    employeeStatusMap[s.code] = s;
  }

  const reportStatusRows = await prisma.report_status.findMany();
  const reportStatusMap: any = {};
  for (const s of reportStatusRows) {
    reportStatusMap[s.code] = s;
  }

  const nutritionTypeRows = await prisma.nutrition_type.findMany();
  const nutritionTypeMap: any = {};
  for (const t of nutritionTypeRows) {
    nutritionTypeMap[t.code] = t;
  }

  const roleMap = {};
  const roleRows = await prisma.role.findMany();
  for (const role of roleRows) {
    roleMap[role.code] = role;
  }

  // 2. location
  await prisma.location.createMany({
    data: [
      {
        code: "BDG",
        name: "bandung",
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
      {
        code: "BGR",
        name: "bogor",
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
    ],
  });

  const locationRows = await prisma.location.findMany();
  const locationMap = {};
  for (const loc of locationRows) {
    locationMap[loc.code] = loc;
  }

  // 3. greenhouse
  await prisma.greenhouse.createMany({
    data: [
      {
        code: "PDLG",
        name: "padalarang",
        locationId: locationMap["BDG"].id,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
      {
        code: "IDMY",
        name: "indramayu",
        locationId: locationMap["BDG"].id,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
      {
        code: "LIDO",
        name: "lido",
        locationId: locationMap["BGR"].id,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
      {
        code: "KPGL",
        name: "klapanunggal",
        locationId: locationMap["BGR"].id,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
    ],
  });

  const greenhouseRows = await prisma.greenhouse.findMany();
  const greenhouseMap = {};
  for (const gh of greenhouseRows) {
    greenhouseMap[gh.code] = gh;
  }

  // 4. nutrition brand
  await prisma.nutrition_brand.createMany({
    data: [
      {
        code: "PN",
        name: "power nutrition",
        typeId: nutritionTypeMap["solid"].id,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
      {
        code: "BG",
        name: "bio grow",
        typeId: nutritionTypeMap["liquid"].id,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
    ],
  });

  const brandRows = await prisma.nutrition_brand.findMany();
  const brandMap = {};
  for (const brand of brandRows) {
    brandMap[brand.code] = brand;
  }

  // 5. user
  const usersData = [
    // padalarang
    {
      code: "USR-PDLG-GR-01",
      email: "aji.pambudi@example.com",
      name: "aji pambudi",
      roleCode: "GR",
      greenhouseCode: "PDLG",
    },
    {
      code: "USR-PDLG-GR-02",
      email: "raka.pratama@example.com",
      name: "raka pratama",
      roleCode: "GR",
      greenhouseCode: "PDLG",
    },
    {
      code: "USR-PDLG-WE-01",
      email: "doni.saputra@example.com",
      name: "doni saputra",
      roleCode: "WE",
      greenhouseCode: "PDLG",
    },
    {
      code: "USR-PDLG-FA-01",
      email: "fajar.nugroho@example.com",
      name: "fajar nugroho",
      roleCode: "FA",
      greenhouseCode: "PDLG",
    },

    // indramayu
    {
      code: "USR-IDMY-GR-01",
      email: "bagas.hidayat@example.com",
      name: "bagas hidayat",
      roleCode: "GR",
      greenhouseCode: "IDMY",
    },
    {
      code: "USR-IDMY-GR-02",
      email: "rizky.kurniawan@example.com",
      name: "rizky kurniawan",
      roleCode: "GR",
      greenhouseCode: "IDMY",
    },
    {
      code: "USR-IDMY-WE-01",
      email: "eko.prasetyo@example.com",
      name: "eko prasetyo",
      roleCode: "WE",
      greenhouseCode: "IDMY",
    },
    {
      code: "USR-IDMY-FA-01",
      email: "wahyu.ferdian@example.com",
      name: "wahyu ferdian",
      roleCode: "FA",
      greenhouseCode: "IDMY",
    },

    // lido
    {
      code: "USR-LIDO-GR-01",
      email: "indra.permana@example.com",
      name: "indra permana",
      roleCode: "GR",
      greenhouseCode: "LIDO",
    },
    {
      code: "USR-LIDO-GR-02",
      email: "yogi.ramadhan@example.com",
      name: "yogi ramadhan",
      roleCode: "GR",
      greenhouseCode: "LIDO",
    },
    {
      code: "USR-LIDO-WE-01",
      email: "taufik.akbar@example.com",
      name: "taufik akbar",
      roleCode: "WE",
      greenhouseCode: "LIDO",
    },
    {
      code: "USR-LIDO-FA-01",
      email: "agung.susanto@example.com",
      name: "agung susanto",
      roleCode: "FA",
      greenhouseCode: "LIDO",
    },

    // klapanunggal
    {
      code: "USR-KPGL-GR-01",
      email: "heri.setiawan@example.com",
      name: "heri setiawan",
      roleCode: "GR",
      greenhouseCode: "KPGL",
    },
    {
      code: "USR-KPGL-GR-02",
      email: "galih.maulana@example.com",
      name: "galih maulana",
      roleCode: "GR",
      greenhouseCode: "KPGL",
    },
    {
      code: "USR-KPGL-WE-01",
      email: "maman.surya@example.com",
      name: "maman surya",
      roleCode: "WE",
      greenhouseCode: "KPGL",
    },
    {
      code: "USR-KPGL-FA-01",
      email: "andika.saputro@example.com",
      name: "andika saputro",
      roleCode: "FA",
      greenhouseCode: "KPGL",
    },

    // admin
    {
      code: "USR-ADM-01",
      email: "bima.perkasa@example.com",
      name: "bima perkasa",
      roleCode: "ADM",
      greenhouseCode: null,
    },
    {
      code: "USR-ADM-02",
      email: "surya.darmawan@example.com",
      name: "surya darmawan",
      roleCode: "ADM",
      greenhouseCode: null,
    },

    // investor
    {
      code: "USR-IVT-01",
      email: "dimas.mahendra@example.com",
      name: "dimas mahendra",
      roleCode: "IVT",
      greenhouseCode: null,
    },
  ];

  for (const item of usersData) {
    await prisma.user.create({
      data: {
        code: item.code,
        email: item.email,
        password: passwordHash,
        name: item.name,
        statusId: employeeStatusMap["active"].id,
        roleId: roleMap[item.roleCode].id,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
      },
    });
  }

  const userRows = await prisma.user.findMany();
  const userMap = {};
  for (const user of userRows) {
    userMap[user.code] = user;
  }

  // 6. greenhouse access
  const greenhouseAccessData = [];

  // user greenhouse staff: masing-masing 1 greenhouse
  for (const item of usersData) {
    if (item.greenhouseCode) {
      greenhouseAccessData.push({
        userId: userMap[item.code].id,
        greenhouseId: greenhouseMap[item.greenhouseCode].id,
        createdAt: FIXED_DATE,
      });
    }
  }

  // admin dan investor: akses ke semua greenhouse
  const allGreenhouses = greenhouseRows.map((g) => g.id);
  const fullAccessUsers = ["USR-ADM-01", "USR-ADM-02", "USR-IVT-01"];

  for (const userCode of fullAccessUsers) {
    for (const greenhouseId of allGreenhouses) {
      greenhouseAccessData.push({
        userId: userMap[userCode].id,
        greenhouseId,
        createdAt: FIXED_DATE,
      });
    }
  }

  await prisma.greenhouse_access.createMany({
    data: greenhouseAccessData,
  });

  // helper admin
  const admin1 = userMap["USR-ADM-01"];
  const admin2 = userMap["USR-ADM-02"];

  // helper staff
  const pdlgGrower1 = userMap["USR-PDLG-GR-01"];
  const idmyGrower1 = userMap["USR-IDMY-GR-01"];
  const lidoGrower1 = userMap["USR-LIDO-GR-01"];
  const kpglGrower1 = userMap["USR-KPGL-GR-01"];

  const pdlgWater = userMap["USR-PDLG-WE-01"];
  const idmyWater = userMap["USR-IDMY-WE-01"];

  const pdlgFA = userMap["USR-PDLG-FA-01"];
  const lidoFA = userMap["USR-LIDO-FA-01"];

  // 7. reports - report_micro_climate
  await prisma.report_micro_climate.createMany({
    data: [
      {
        temperature: 24.5,
        humidity: 78.2,
        light: 650,
        statusId: reportStatusMap["submitted"].id,
        date: new Date("2026-03-14T08:00:00+07:00"),
        note: "kondisi pagi cukup stabil",
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
        createdById: pdlgWater.id,
        approvedById: null,
        greenhouseId: greenhouseMap["PDLG"].id,
        locationId: locationMap["BDG"].id,
      },
      {
        temperature: 26.1,
        humidity: 74.5,
        light: 710,
        statusId: reportStatusMap["approved"].id,
        date: new Date("2026-03-15T09:30:00+07:00"),
        note: "siang cenderung lebih terang",
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
        createdById: idmyWater.id,
        approvedById: admin1.id,
        greenhouseId: greenhouseMap["IDMY"].id,
        locationId: locationMap["BDG"].id,
      },
    ],
  });
  // 8. reports - report_death_plant_vegetative
  await prisma.report_death_plant_vegetative.createMany({
    data: [
      {
        title: "tanaman mati blok a",
        reason: "serangan jamur pada fase vegetatif",
        deadPlantCount: 12,
        statusId: reportStatusMap["submitted"].id,
        date: new Date("2026-03-13T10:00:00+07:00"),
        note: "perlu observasi lanjutan",
        photo: null,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
        createdById: pdlgGrower1.id,
        approvedById: null,
        greenhouseId: greenhouseMap["PDLG"].id,
        locationId: locationMap["BDG"].id,
      },
      {
        title: "tanaman layu area timur",
        reason: "drainase kurang baik",
        deadPlantCount: 7,
        statusId: reportStatusMap["approved"].id,
        date: new Date("2026-03-15T07:45:00+07:00"),
        note: "sudah disetujui untuk tindak lanjut",
        photo: null,
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
        createdById: lidoGrower1.id,
        approvedById: admin2.id,
        greenhouseId: greenhouseMap["LIDO"].id,
        locationId: locationMap["BGR"].id,
      },
    ],
  });

  // 9. reports - report_death_plant_generative
  await prisma.report_death_plant_generative.createMany({
    data: [
      {
        title: "buah rontok generatif 1",
        reason: "kelembapan tinggi saat malam",
        fruitWeight: 18.5,
        statusId: reportStatusMap["revised"].id,
        date: new Date("2026-03-12T11:20:00+07:00"),
        note: "perlu revisi data berat panen",
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
        createdById: idmyGrower1.id,
        approvedById: admin1.id,
        greenhouseId: greenhouseMap["IDMY"].id,
        locationId: locationMap["BDG"].id,
      },
      {
        title: "buah busuk generatif 2",
        reason: "sirkulasi udara kurang optimal",
        fruitWeight: 9.3,
        statusId: reportStatusMap["approved"].id,
        date: new Date("2026-03-15T08:15:00+07:00"),
        note: "sudah diverifikasi admin",
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
        createdById: kpglGrower1.id,
        approvedById: admin2.id,
        greenhouseId: greenhouseMap["KPGL"].id,
        locationId: locationMap["BGR"].id,
      },
    ],
  });

  // 10. reports - report_nutrition_usage
  await prisma.report_nutrition_usage.createMany({
    data: [
      {
        quantity: 25,
        statusId: reportStatusMap["submitted"].id,
        date: new Date("2026-03-14T14:00:00+07:00"),
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
        createdById: pdlgFA.id,
        approvedById: null,
        nutrition_brandId: brandMap["PN"].id,
        locationId: locationMap["BDG"].id,
        greenhouseId: greenhouseMap["PDLG"].id,
      },
      {
        quantity: 40,
        statusId: reportStatusMap["approved"].id,
        date: new Date("2026-03-15T09:00:00+07:00"),
        createdAt: FIXED_DATE,
        updatedAt: FIXED_DATE,
        createdById: lidoFA.id,
        approvedById: admin1.id,
        nutrition_brandId: brandMap["BG"].id,
        locationId: locationMap["BGR"].id,
        greenhouseId: greenhouseMap["LIDO"].id,
      },
    ],
  });

  console.log("seed selesai");
}

main()
  .catch((e) => {
    console.error("seed gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
