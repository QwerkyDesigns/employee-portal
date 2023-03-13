-- CreateTable
CREATE TABLE "OriginalTextDescriptions" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "OriginalTextDescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextRefinements" (
    "id" SERIAL NOT NULL,
    "refinedPrompt" TEXT NOT NULL,
    "aiModelUsed" TEXT NOT NULL,

    CONSTRAINT "TextRefinements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "storageKey" TEXT NOT NULL,
    "promptUsed" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Images_storageKey_key" ON "Images"("storageKey");
