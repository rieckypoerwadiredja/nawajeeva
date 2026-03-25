-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "statusId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "greenhouse_access" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "greenhouseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "greenhouse_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "greenhouse" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "greenhouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_micro_climate" (
    "id" SERIAL NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "light" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "approvedById" INTEGER,
    "greenhouseId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "report_micro_climate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_death_plant_vegetative" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "deadPlantCount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "approvedById" INTEGER,
    "greenhouseId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "report_death_plant_vegetative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_death_plant_generative" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "fruitWeight" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "statusId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "approvedById" INTEGER,
    "greenhouseId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "report_death_plant_generative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_brand" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "nutrition_brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_nutrition_usage" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "statusId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "approvedById" INTEGER,
    "nutrition_brandId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "greenhouseId" INTEGER NOT NULL,

    CONSTRAINT "report_nutrition_usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_status" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_type" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nutrition_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_status" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_code_key" ON "user"("code");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "greenhouse_access_userId_greenhouseId_key" ON "greenhouse_access"("userId", "greenhouseId");

-- CreateIndex
CREATE UNIQUE INDEX "role_id_key" ON "role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "role_code_key" ON "role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "location_id_key" ON "location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "location_code_key" ON "location"("code");

-- CreateIndex
CREATE UNIQUE INDEX "greenhouse_id_key" ON "greenhouse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "greenhouse_code_key" ON "greenhouse"("code");

-- CreateIndex
CREATE UNIQUE INDEX "report_micro_climate_id_key" ON "report_micro_climate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "report_death_plant_vegetative_id_key" ON "report_death_plant_vegetative"("id");

-- CreateIndex
CREATE UNIQUE INDEX "report_death_plant_generative_id_key" ON "report_death_plant_generative"("id");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_brand_id_key" ON "nutrition_brand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_brand_code_key" ON "nutrition_brand"("code");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_brand_name_key" ON "nutrition_brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "report_nutrition_usage_id_key" ON "report_nutrition_usage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "report_status_id_key" ON "report_status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "report_status_code_key" ON "report_status"("code");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_type_id_key" ON "nutrition_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_type_code_key" ON "nutrition_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_status_id_key" ON "employee_status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_status_code_key" ON "employee_status"("code");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "employee_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "greenhouse_access" ADD CONSTRAINT "greenhouse_access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "greenhouse_access" ADD CONSTRAINT "greenhouse_access_greenhouseId_fkey" FOREIGN KEY ("greenhouseId") REFERENCES "greenhouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "greenhouse" ADD CONSTRAINT "greenhouse_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_micro_climate" ADD CONSTRAINT "report_micro_climate_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "report_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_micro_climate" ADD CONSTRAINT "report_micro_climate_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_micro_climate" ADD CONSTRAINT "report_micro_climate_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_micro_climate" ADD CONSTRAINT "report_micro_climate_greenhouseId_fkey" FOREIGN KEY ("greenhouseId") REFERENCES "greenhouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_micro_climate" ADD CONSTRAINT "report_micro_climate_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_death_plant_vegetative" ADD CONSTRAINT "report_death_plant_vegetative_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "report_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_death_plant_vegetative" ADD CONSTRAINT "report_death_plant_vegetative_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_death_plant_vegetative" ADD CONSTRAINT "report_death_plant_vegetative_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_death_plant_vegetative" ADD CONSTRAINT "report_death_plant_vegetative_greenhouseId_fkey" FOREIGN KEY ("greenhouseId") REFERENCES "greenhouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_death_plant_vegetative" ADD CONSTRAINT "report_death_plant_vegetative_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_death_plant_generative" ADD CONSTRAINT "report_death_plant_generative_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "report_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_death_plant_generative" ADD CONSTRAINT "report_death_plant_generative_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_death_plant_generative" ADD CONSTRAINT "report_death_plant_generative_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_death_plant_generative" ADD CONSTRAINT "report_death_plant_generative_greenhouseId_fkey" FOREIGN KEY ("greenhouseId") REFERENCES "greenhouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_death_plant_generative" ADD CONSTRAINT "report_death_plant_generative_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_brand" ADD CONSTRAINT "nutrition_brand_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "nutrition_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_nutrition_usage" ADD CONSTRAINT "report_nutrition_usage_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "report_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_nutrition_usage" ADD CONSTRAINT "report_nutrition_usage_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "nutrition_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_nutrition_usage" ADD CONSTRAINT "report_nutrition_usage_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_nutrition_usage" ADD CONSTRAINT "report_nutrition_usage_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_nutrition_usage" ADD CONSTRAINT "report_nutrition_usage_nutrition_brandId_fkey" FOREIGN KEY ("nutrition_brandId") REFERENCES "nutrition_brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_nutrition_usage" ADD CONSTRAINT "report_nutrition_usage_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_nutrition_usage" ADD CONSTRAINT "report_nutrition_usage_greenhouseId_fkey" FOREIGN KEY ("greenhouseId") REFERENCES "greenhouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
