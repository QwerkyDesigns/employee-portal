/*
  Warnings:

  - Added the required column `imageState` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "imageState" TEXT NOT NULL,
ADD COLUMN     "originId" TEXT NOT NULL DEFAULT '';
