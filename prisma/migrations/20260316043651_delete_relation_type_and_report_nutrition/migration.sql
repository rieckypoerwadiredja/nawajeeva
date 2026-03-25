/*
  Warnings:

  - You are about to drop the column `typeId` on the `report_nutrition_usage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "report_nutrition_usage" DROP CONSTRAINT "report_nutrition_usage_typeId_fkey";

-- AlterTable
ALTER TABLE "report_nutrition_usage" DROP COLUMN "typeId";
