-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "accountId" TEXT,
ALTER COLUMN "promptUsed" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
