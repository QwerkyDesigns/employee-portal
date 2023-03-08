-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "stripeCustomerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usage" (
    "id" SERIAL NOT NULL,
    "availableFunds" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeWebhooks" (
    "id" SERIAL NOT NULL,
    "payloadSignature" TEXT NOT NULL,

    CONSTRAINT "StripeWebhooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_userName_key" ON "Account"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_stripeCustomerId_key" ON "Account"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Usage_accountId_key" ON "Usage"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeWebhooks_payloadSignature_key" ON "StripeWebhooks"("payloadSignature");

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
