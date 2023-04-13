/*
  Warnings:

  - A unique constraint covering the columns `[stripeCustomerId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "externalServicesId" INTEGER,
ADD COLUMN     "originalTextDescriptionsId" INTEGER,
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "usageId" INTEGER;

-- CreateTable
CREATE TABLE "Usage" (
    "id" SERIAL NOT NULL,
    "availableFunds" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeWebhooks" (
    "id" SERIAL NOT NULL,
    "payloadSignature" TEXT NOT NULL,

    CONSTRAINT "StripeWebhooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalServiceKeys" (
    "id" SERIAL NOT NULL,
    "printifyApiKey" TEXT NOT NULL,

    CONSTRAINT "ExternalServiceKeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextSubmissions" (
    "id" SERIAL NOT NULL,
    "accountId" TEXT NOT NULL,
    "originalPrompt" TEXT NOT NULL,
    "finalPromptForm" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TextSubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextRefinements" (
    "id" SERIAL NOT NULL,
    "refinedPrompt" TEXT NOT NULL,
    "aiModelUsed" TEXT NOT NULL,
    "TextSubmissionsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TextRefinements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "storageKey" TEXT NOT NULL,
    "promptUsed" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StripeWebhooks_payloadSignature_key" ON "StripeWebhooks"("payloadSignature");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalServiceKeys_printifyApiKey_key" ON "ExternalServiceKeys"("printifyApiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Images_storageKey_key" ON "Images"("storageKey");

-- CreateIndex
CREATE UNIQUE INDEX "Account_stripeCustomerId_key" ON "Account"("stripeCustomerId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_externalServicesId_fkey" FOREIGN KEY ("externalServicesId") REFERENCES "ExternalServiceKeys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_usageId_fkey" FOREIGN KEY ("usageId") REFERENCES "Usage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextSubmissions" ADD CONSTRAINT "TextSubmissions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextRefinements" ADD CONSTRAINT "TextRefinements_TextSubmissionsId_fkey" FOREIGN KEY ("TextSubmissionsId") REFERENCES "TextSubmissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
