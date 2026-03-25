// import "dotenv/config";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@/generated/prisma/client";

// const connectionString = `${process.env.DATABASE_URL}`;

// if (!connectionString) {
//   throw new Error("DATABASE_URL is not defined in the .env file");
// }

// const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter });

// export { prisma };

import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

attachDatabasePool(pool);

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

export { prisma };
