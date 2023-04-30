-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "sentTo" TEXT[] DEFAULT ARRAY[]::TEXT[];
