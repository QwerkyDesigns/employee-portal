// require("dotenv").config({ path: ".env.development" });
const config = require("./../dev.config.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres:Password01!@localhost:5432/dev",
      },
    },
  });

const data = {
    UserName: "dev-user",
    Email: config.email,
    Password: "12345",
    StripeCustomerId: "cus_NT3Q8CV9Ayl59L",
    Usage: { create: { AvailableFunds: 2.0 } },
};

console.log("Generated Account data:", data);

prisma.account
    .create({ data })
    .then(() => {
        console.log("AccountData stored in the database.");
    })
    .catch((error) => {
        console.error("Failed to store usage data:", error);
    })
    .finally(() => {
        prisma.$disconnect();
    });
