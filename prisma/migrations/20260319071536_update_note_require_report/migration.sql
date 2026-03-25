/*
  Warnings:

  - You are about to drop the column `note` on the `nutrition_brand` table. All the data in the column will be lost.
  - Made the column `date` on table `report_death_plant_generative` required. This step will fail if there are existing NULL values in that column.
  - Made the column `note` on table `report_death_plant_generative` required. This step will fail if there are existing NULL values in that column.
  - Made the column `note` on table `report_death_plant_vegetative` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "nutrition_brand" DROP COLUMN "note";

-- AlterTable
ALTER TABLE "report_death_plant_generative" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "note" SET NOT NULL;

-- AlterTable
ALTER TABLE "report_death_plant_vegetative" ALTER COLUMN "note" SET NOT NULL;
