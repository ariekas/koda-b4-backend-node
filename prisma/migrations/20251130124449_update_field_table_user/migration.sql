/*
  Warnings:

  - You are about to drop the column `OtpExpires` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `opt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "OtpExpires",
DROP COLUMN "opt",
ADD COLUMN     "codeOtp" TEXT,
ADD COLUMN     "otpExpires" TIMESTAMP(3);
