/*
  Warnings:

  - Made the column `statusTransactionId` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_statusTransactionId_fkey";

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "statusTransactionId" SET NOT NULL,
ALTER COLUMN "statusTransactionId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "OtpExpires" TIMESTAMP(3),
ADD COLUMN     "opt" TEXT;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_statusTransactionId_fkey" FOREIGN KEY ("statusTransactionId") REFERENCES "status_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
