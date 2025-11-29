/*
  Warnings:

  - You are about to drop the column `transactionId` on the `deliverys` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `status_transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "deliverys" DROP CONSTRAINT "deliverys_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "payment_methods" DROP CONSTRAINT "payment_methods_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "status_transactions" DROP CONSTRAINT "status_transactions_transactionId_fkey";

-- DropIndex
DROP INDEX "deliverys_transactionId_key";

-- DropIndex
DROP INDEX "payment_methods_transactionId_key";

-- DropIndex
DROP INDEX "status_transactions_transactionId_key";

-- AlterTable
ALTER TABLE "deliverys" DROP COLUMN "transactionId";

-- AlterTable
ALTER TABLE "payment_methods" DROP COLUMN "transactionId";

-- AlterTable
ALTER TABLE "status_transactions" DROP COLUMN "transactionId";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "deliveryId" INTEGER,
ADD COLUMN     "paymentMethodId" INTEGER,
ADD COLUMN     "statusTransactionId" INTEGER;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_statusTransactionId_fkey" FOREIGN KEY ("statusTransactionId") REFERENCES "status_transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "deliverys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
