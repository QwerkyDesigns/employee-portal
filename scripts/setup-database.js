require('dotenv').config({ path: './scripts/.env.external' });
const config = require('./../dev.config.js');
const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient({
//     datasources: {
//         db: {
//             url: process.env.DATABASE_URL
//         }
//     }
// });
