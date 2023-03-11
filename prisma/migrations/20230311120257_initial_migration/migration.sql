-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "stripeCustomerId" TEXT NOT NULL,
    "externalServicesId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "usageId" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "ExternalServices" (
    "id" SERIAL NOT NULL,
    "printifyApiKey" TEXT NOT NULL,

    CONSTRAINT "ExternalServices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_userName_key" ON "Account"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_stripeCustomerId_key" ON "Account"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeWebhooks_payloadSignature_key" ON "StripeWebhooks"("payloadSignature");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalServices_printifyApiKey_key" ON "ExternalServices"("printifyApiKey");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_usageId_fkey" FOREIGN KEY ("usageId") REFERENCES "Usage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_externalServicesId_fkey" FOREIGN KEY ("externalServicesId") REFERENCES "ExternalServices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
