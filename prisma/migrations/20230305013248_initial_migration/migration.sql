-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "stripe_customer_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usage" (
    "id" SERIAL NOT NULL,
    "available_funds" DOUBLE PRECISION NOT NULL,
    "updated_at" TIMESTAMP(3),
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeWebhooks" (
    "id" SERIAL NOT NULL,
    "payload_signature" TEXT NOT NULL,

    CONSTRAINT "StripeWebhooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_user_name_key" ON "Account"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_stripe_customer_id_key" ON "Account"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Usage_account_id_key" ON "Usage"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "StripeWebhooks_payload_signature_key" ON "StripeWebhooks"("payload_signature");

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
