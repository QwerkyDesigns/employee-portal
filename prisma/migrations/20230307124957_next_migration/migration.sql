/*
  Warnings:

  - You are about to drop the column `created_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_customer_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `payload_signature` on the `StripeWebhooks` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `available_funds` on the `Usage` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Usage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UserName]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[StripeCustomerId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[PayloadSignature]` on the table `StripeWebhooks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[AccountId]` on the table `Usage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Email` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StripeCustomerId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserName` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PayloadSignature` to the `StripeWebhooks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AccountId` to the `Usage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AvailableFunds` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Usage" DROP CONSTRAINT "Usage_account_id_fkey";

-- DropIndex
DROP INDEX "Account_email_key";

-- DropIndex
DROP INDEX "Account_stripe_customer_id_key";

-- DropIndex
DROP INDEX "Account_user_name_key";

-- DropIndex
DROP INDEX "StripeWebhooks_payload_signature_key";

-- DropIndex
DROP INDEX "Usage_account_id_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "created_at",
DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "stripe_customer_id",
DROP COLUMN "updated_at",
DROP COLUMN "user_name",
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Password" TEXT,
ADD COLUMN     "StripeCustomerId" TEXT NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3),
ADD COLUMN     "UserName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StripeWebhooks" DROP COLUMN "payload_signature",
ADD COLUMN     "PayloadSignature" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usage" DROP COLUMN "account_id",
DROP COLUMN "available_funds",
DROP COLUMN "updated_at",
ADD COLUMN     "AccountId" INTEGER NOT NULL,
ADD COLUMN     "AvailableFunds" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Account_UserName_key" ON "Account"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "Account_Email_key" ON "Account"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_StripeCustomerId_key" ON "Account"("StripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeWebhooks_PayloadSignature_key" ON "StripeWebhooks"("PayloadSignature");

-- CreateIndex
CREATE UNIQUE INDEX "Usage_AccountId_key" ON "Usage"("AccountId");

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
