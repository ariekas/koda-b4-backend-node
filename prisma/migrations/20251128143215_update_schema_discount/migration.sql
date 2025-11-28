/*
  Warnings:

  - You are about to drop the column `dicount` on the `discounts` table. All the data in the column will be lost.
  - Added the required column `discount` to the `discounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "discounts" DROP COLUMN "dicount",
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL;
